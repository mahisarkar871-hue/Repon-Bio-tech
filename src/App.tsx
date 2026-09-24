/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BatchType, StudentProfile } from './types';
import { BioCanvas } from './components/BioCanvas';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TeacherProfile } from './components/TeacherProfile';
import { BatchSchedules } from './components/BatchSchedules';
import { FeeCalculator } from './components/FeeCalculator';
import { LocationContact } from './components/LocationContact';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { RegistrationModal } from './components/RegistrationModal';
import { StudentPortalModal } from './components/StudentPortalModal';
import { getLoggedInStudent, findStudentByPhone } from './utils/storage';
import { subscribeToStudent } from './lib/firebase';

export default function App() {
  const [loggedInStudent, setLoggedInStudent] = useState<StudentProfile | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [preselectedBatch, setPreselectedBatch] = useState<BatchType>('HSC 28');
  const [preselectedSlot, setPreselectedSlot] = useState<string>('');

  // Check login session on mount and listen to auth changes
  useEffect(() => {
    const student = getLoggedInStudent();
    if (student) {
      setLoggedInStudent(student);
    }

    const handleAuthChange = (e: any) => {
      const phone = e.detail;
      if (phone) {
        const refreshed = findStudentByPhone(phone);
        setLoggedInStudent(refreshed);
      } else {
        setLoggedInStudent(null);
      }
    };

    window.addEventListener('repon_bio_auth_change', handleAuthChange);
    return () => window.removeEventListener('repon_bio_auth_change', handleAuthChange);
  }, []);

  // Real-time Firestore sync when logged in
  useEffect(() => {
    if (!loggedInStudent?.id) return;
    const unsubscribe = subscribeToStudent(loggedInStudent.id, (fresh) => {
      if (fresh) {
        setLoggedInStudent(fresh);
      }
    });
    return () => unsubscribe();
  }, [loggedInStudent?.id]);

  const handleOpenRegister = (batch?: BatchType, slot?: string) => {
    if (batch) setPreselectedBatch(batch);
    if (slot) setPreselectedSlot(slot);
    setIsRegisterOpen(true);
  };

  const handleSelectSlotFromSchedule = (batch: BatchType, slotString: string) => {
    setPreselectedBatch(batch);
    setPreselectedSlot(slotString);
    setIsRegisterOpen(true);
  };

  const handleLoginSuccess = (student: StudentProfile) => {
    setLoggedInStudent(student);
    setIsPortalOpen(true);
  };

  const handleRegisterSuccess = (student: StudentProfile) => {
    setLoggedInStudent(student);
    setIsPortalOpen(true);
  };

  const handleOpenPortal = () => {
    if (loggedInStudent) {
      setIsPortalOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020b14] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      {/* Custom bioluminescent cursor follower */}
      <CustomCursor />

      {/* Background Interactive Bio & DNA Helix Canvas */}
      <BioCanvas />

      {/* Main App Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar
          onOpenRegister={() => handleOpenRegister('HSC 28')}
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenPortal={handleOpenPortal}
          loggedInStudent={loggedInStudent}
        />

        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onOpenRegister={() => handleOpenRegister('HSC 28')}
            onOpenLogin={() => setIsLoginOpen(true)}
            onOpenPortal={handleOpenPortal}
            isLoggedIn={Boolean(loggedInStudent)}
          />

          {/* Teacher Profile & Academic Pedagogy */}
          <TeacherProfile />

          {/* Batch Schedules (HSC 28 & HSC 27) */}
          <BatchSchedules
            onSelectSlot={handleSelectSlotFromSchedule}
            onOpenRegister={() => handleOpenRegister(preselectedBatch, preselectedSlot)}
          />

          {/* Interactive Fee Calculator & bKash Payment */}
          <FeeCalculator onOpenRegister={() => handleOpenRegister('HSC 28')} />

          {/* Location & Counseling Venue at Chanmari Math */}
          <LocationContact />
        </main>

        {/* Quiet Clean Footer */}
        <Footer
          onOpenRegister={() => handleOpenRegister('HSC 28')}
          onOpenLogin={() => setIsLoginOpen(true)}
        />
      </div>

      {/* Login Modal (Mobile Number Login) */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onOpenRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      {/* Registration Modal (New Enrolment) */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        preselectedBatch={preselectedBatch}
        preselectedSlot={preselectedSlot}
        onRegisterSuccess={handleRegisterSuccess}
      />

      {/* Student Portal & Dashboard Modal */}
      {loggedInStudent && (
        <StudentPortalModal
          isOpen={isPortalOpen}
          onClose={() => setIsPortalOpen(false)}
          student={loggedInStudent}
          onStudentUpdated={(updated) => setLoggedInStudent(updated)}
        />
      )}
    </div>
  );
}
