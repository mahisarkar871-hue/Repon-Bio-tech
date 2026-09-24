import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  onSnapshot,
  writeBatch,
  Unsubscribe,
} from 'firebase/firestore';
import config from '../../firebase-applet-config.json';
import { StudentProfile } from '../types';
import { SEED_STUDENTS } from '../data/mockData';

const app = initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
});

export const db = config.firestoreDatabaseId
  ? getFirestore(app, config.firestoreDatabaseId)
  : getFirestore(app);

const STUDENTS_COLLECTION = 'students';

/**
 * Normalizes phone numbers to 11 digits (e.g., 017XXXXXXXX)
 */
export const normalizePhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length > 11 && digits.startsWith('88')) {
    return digits.slice(2);
  }
  return digits;
};

/**
 * Seed initial students into Firestore if empty
 */
export async function seedInitialStudents(): Promise<void> {
  try {
    const colRef = collection(db, STUDENTS_COLLECTION);
    const snap = await getDocs(colRef);
    if (snap.empty) {
      const batch = writeBatch(db);
      for (const student of SEED_STUDENTS) {
        const docRef = doc(db, STUDENTS_COLLECTION, student.id);
        batch.set(docRef, {
          ...student,
          cleanPhone: normalizePhone(student.studentPhone),
        });
      }
      await batch.commit();
      console.log('Successfully seeded demo students in Firestore.');
    }
  } catch (err) {
    console.warn('Could not seed initial students to Firestore:', err);
  }
}

/**
 * Save or update student profile in Firestore
 */
export async function saveStudentToFirestore(student: StudentProfile): Promise<void> {
  try {
    const docRef = doc(db, STUDENTS_COLLECTION, student.id);
    await setDoc(
      docRef,
      {
        ...student,
        cleanPhone: normalizePhone(student.studentPhone),
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.error('Failed to save student to Firestore:', err);
    throw err;
  }
}

/**
 * Search student by phone number or ID in Firestore
 */
export async function findStudentInFirestore(queryText: string): Promise<StudentProfile | null> {
  const clean = normalizePhone(queryText);
  const trimmed = queryText.trim().toUpperCase();

  try {
    // 1. Try by document ID (student ID, e.g. RS-BIO-28-1024)
    if (trimmed.startsWith('RS-') || trimmed.includes('-')) {
      const docRef = doc(db, STUDENTS_COLLECTION, trimmed);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return snap.data() as StudentProfile;
      }
    }

    // 2. Try by normalized phone
    if (clean.length >= 10) {
      const colRef = collection(db, STUDENTS_COLLECTION);
      const q = query(colRef, where('cleanPhone', '==', clean));
      const querySnap = await getDocs(q);
      if (!querySnap.empty) {
        return querySnap.docs[0].data() as StudentProfile;
      }

      // Also try matching original studentPhone field
      const qPhone = query(colRef, where('studentPhone', '==', queryText.trim()));
      const querySnapPhone = await getDocs(qPhone);
      if (!querySnapPhone.empty) {
        return querySnapPhone.docs[0].data() as StudentProfile;
      }
    }

    // 3. Fallback: scan collection for matching endsWith or case-insensitive ID
    const allSnap = await getDocs(collection(db, STUDENTS_COLLECTION));
    for (const d of allSnap.docs) {
      const s = d.data() as StudentProfile & { cleanPhone?: string };
      const sClean = s.cleanPhone || normalizePhone(s.studentPhone || '');
      if (sClean === clean || (clean.length >= 8 && sClean.endsWith(clean))) {
        return s;
      }
      if (s.id.toUpperCase() === trimmed) {
        return s;
      }
    }

    return null;
  } catch (err) {
    console.warn('Error querying student in Firestore, fallback will be used:', err);
    return null;
  }
}

/**
 * Real-time listener for a student document
 */
export function subscribeToStudent(
  studentId: string,
  onUpdate: (student: StudentProfile | null) => void
): Unsubscribe {
  const docRef = doc(db, STUDENTS_COLLECTION, studentId);
  return onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        onUpdate(snap.data() as StudentProfile);
      } else {
        onUpdate(null);
      }
    },
    (error) => {
      console.warn('Firestore subscription error:', error);
    }
  );
}

/**
 * Update monthly payment in Firestore
 */
export async function updateStudentPaymentInFirestore(
  studentId: string,
  monthName: string,
  trxId: string
): Promise<StudentProfile | null> {
  try {
    const docRef = doc(db, STUDENTS_COLLECTION, studentId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
      return null;
    }

    const data = snap.data() as StudentProfile;
    const updatedPayments = data.payments.map((p) => {
      if (p.month.toLowerCase() === monthName.toLowerCase() && p.status === 'DUE') {
        return {
          ...p,
          status: 'PAID' as const,
          trxId,
          paidAt: new Date().toISOString().split('T')[0],
          method: 'bKash Personal',
        };
      }
      return p;
    });

    await updateDoc(docRef, {
      payments: updatedPayments,
      updatedAt: new Date().toISOString(),
    });

    return {
      ...data,
      payments: updatedPayments,
    };
  } catch (err) {
    console.error('Failed to update student payment in Firestore:', err);
    throw err;
  }
}

/**
 * Fetch all registered students count per slot
 */
export async function fetchAllStudentsFromFirestore(): Promise<StudentProfile[]> {
  try {
    const snap = await getDocs(collection(db, STUDENTS_COLLECTION));
    return snap.docs.map((d) => d.data() as StudentProfile);
  } catch (err) {
    console.warn('Error fetching all students from Firestore:', err);
    return [];
  }
}
