export type BatchType = 'HSC 28' | 'HSC 27' | 'ICT Special';

export interface BatchSlot {
  id: string;
  batch: BatchType;
  days: string;
  time: string;
  subject?: string;
  totalSeats: number;
  enrolledCount: number;
}

export interface PaymentMonth {
  id: string;
  month: string;
  year: number;
  amount: number;
  status: 'PAID' | 'DUE' | 'UPCOMING';
  trxId?: string;
  paidAt?: string;
  method?: string;
}

export interface ExamRecord {
  id: string;
  title: string;
  subject: string;
  date: string;
  chapter: string;
  score: number;
  totalMarks: number;
  highestScore: number;
  rank: number;
  totalStudents: number;
  grade: string;
  remarks: string;
}

export interface StudentProfile {
  id: string; // e.g. RS-BIO-28-1042
  name: string;
  studentPhone: string; // Primary login credential
  guardianPhone: string;
  college: string;
  batch: BatchType;
  slot: string;
  admissionFee: number; // 2000 BDT
  admissionTrxId: string;
  registeredAt: string;
  status: 'Confirmed' | 'Verified';
  avatar?: string;
  payments: PaymentMonth[];
  exams: ExamRecord[];
}

export interface TeacherInfo {
  name: string;
  nickname: string;
  designation: string;
  department: string;
  institution: string;
  education: string[];
  expertise: string;
  location: string;
  phone: string;
  rawPhone: string;
  photoUrl: string;
  monthlyFee: number;
  admissionFee: number;
}
