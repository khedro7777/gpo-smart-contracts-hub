
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/sonner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { direction } = useLanguage();
  
  return (
    <div className={`min-h-screen flex flex-col ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
      <Toaster position={direction === 'rtl' ? 'top-left' : 'top-right'} />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
