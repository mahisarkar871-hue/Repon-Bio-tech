import { StudentProfile } from '../types';
import { SEED_STUDENTS } from '../data/mockData';
import {
  saveStudentToFirestore,
  findStudentInFirestore,
  updateStudentPaymentInFirestore,
  seedInitialStudents,
} from '../lib/firebase';

const STUDENTS_STORAGE_KEY = 'repon_sir_biology_students_v1';
const SESSION_STORAGE_KEY = 'repon_sir_biology_session_phone_v1';

// Seed Firestore in background on module load
seedInitialStudents().catch((err) => {
  console.warn('Initial seed failed:', err);
});

export const getStoredStudents = (): StudentProfile[] => {
  try {
    const raw = localStorage.getItem(STUDENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(SEED_STUDENTS));
      return SEED_STUDENTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return SEED_STUDENTS;
  } catch {
    return SEED_STUDENTS;
  }
};

/**
 * Save student both locally and in Firestore
 */
export const saveStudent = async (newStudent: StudentProfile): Promise<void> => {
  // Update local cache first for instant UX
  const current = getStoredStudents();
  const filtered = current.filter(
    (s) =>
      s.id !== newStudent.id &&
      s.studentPhone.replace(/\D/g, '') !== newStudent.studentPhone.replace(/\D/g, '')
  );
  const updated = [newStudent, ...filtered];

  try {
    localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(updated));
    setLoggedInStudentPhone(newStudent.studentPhone);
    window.dispatchEvent(new CustomEvent('repon_bio_auth_change', { detail: newStudent.studentPhone }));
  } catch (err) {
    console.error('Failed to save student record to local storage', err);
  }

  // Persist in Firestore
  try {
    await saveStudentToFirestore(newStudent);
  } catch (err) {
    console.error('Firestore save failed, local copy preserved', err);
  }
};

/**
 * Find student by phone or ID: checks Firestore first, then local cache
 */
export const findStudentByPhone = (phoneQuery: string): StudentProfile | null => {
  if (!phoneQuery || !phoneQuery.trim()) return null;
  const clean = phoneQuery.replace(/\D/g, '');
  const students = getStoredStudents();
  return (
    students.find((s) => {
      const sClean = s.studentPhone.replace(/\D/g, '');
      return (
        sClean === clean ||
        (clean.length >= 10 && sClean.endsWith(clean)) ||
        s.id.toLowerCase() === phoneQuery.trim().toLowerCase()
      );
    }) || null
  );
};

export const findStudentAsync = async (phoneQuery: string): Promise<StudentProfile | null> => {
  if (!phoneQuery || !phoneQuery.trim()) return null;

  // Try Firestore first
  try {
    const fromFirestore = await findStudentInFirestore(phoneQuery);
    if (fromFirestore) {
      // Sync to local cache
      const current = getStoredStudents();
      const filtered = current.filter((s) => s.id !== fromFirestore.id);
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify([fromFirestore, ...filtered]));
      return fromFirestore;
    }
  } catch (err) {
    console.warn('Firestore lookup failed, checking local storage', err);
  }

  // Fallback to local storage
  return findStudentByPhone(phoneQuery);
};

export const getLoggedInStudent = (): StudentProfile | null => {
  try {
    const phone = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!phone) return null;
    return findStudentByPhone(phone);
  } catch {
    return null;
  }
};

export const setLoggedInStudentPhone = (phone: string): void => {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, phone);
    window.dispatchEvent(new CustomEvent('repon_bio_auth_change', { detail: phone }));
  } catch (err) {
    console.error('Failed to save session', err);
  }
};

export const logoutStudent = (): void => {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('repon_bio_auth_change', { detail: null }));
  } catch (err) {
    console.error('Failed to logout', err);
  }
};

export const updateStudentPayment = async (
  studentIdOrPhone: string,
  monthName: string,
  trxId: string
): Promise<StudentProfile | null> => {
  // Update local cache
  const students = getStoredStudents();
  const cleanQuery = studentIdOrPhone.replace(/\D/g, '');

  const targetIndex = students.findIndex(
    (s) =>
      s.id === studentIdOrPhone ||
      (cleanQuery && s.studentPhone.replace(/\D/g, '').endsWith(cleanQuery))
  );

  let updatedTarget: StudentProfile | null = null;

  if (targetIndex !== -1) {
    const target = { ...students[targetIndex] };
    target.payments = target.payments.map((p) => {
      if (p.month.toLowerCase() === monthName.toLowerCase() && p.status === 'DUE') {
        return {
          ...p,
          status: 'PAID',
          trxId,
          paidAt: new Date().toISOString().split('T')[0],
          method: 'bKash Personal',
        };
      }
      return p;
    });

    students[targetIndex] = target;
    updatedTarget = target;
    try {
      localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students));
      window.dispatchEvent(new CustomEvent('repon_bio_auth_change', { detail: target.studentPhone }));
    } catch (err) {
      console.error('Failed to update student payment in local storage', err);
    }
  }

  // Update in Firestore
  try {
    const firestoreUpdated = await updateStudentPaymentInFirestore(
      updatedTarget ? updatedTarget.id : studentIdOrPhone,
      monthName,
      trxId
    );
    if (firestoreUpdated) {
      return firestoreUpdated;
    }
  } catch (err) {
    console.warn('Firestore payment update warning:', err);
  }

  return updatedTarget;
};
