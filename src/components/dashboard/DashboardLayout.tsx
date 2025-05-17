
import React from 'react';
import DashboardSidebar from './DashboardSidebar';
import { Toaster } from '@/components/ui/sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import GPOMachine from '../GPOMachine';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'client' | 'freelancer' | 'supplier';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const { direction } = useLanguage();
  
  return (
    <div className="min-h-screen flex">
      <Toaster position={direction === 'rtl' ? 'top-left' : 'top-right'} />
      
      <div className={`${direction === 'rtl' ? 'order-2' : 'order-1'}`}>
        <DashboardSidebar role={role} />
      </div>
      
      <div className={`flex-1 ${direction === 'rtl' ? 'order-1 text-right' : 'order-2 text-left'}`}>
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
          </h1>
          <LanguageSwitcher />
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
      
      <GPOMachine />
    </div>
  );
};

export default DashboardLayout;
