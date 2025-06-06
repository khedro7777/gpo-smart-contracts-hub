
import React from 'react';
import ModernWorkspace from '@/components/workspace/ModernWorkspace';
import { useLanguage } from '@/contexts/LanguageContext';

const ModernWorkspacePage = () => {
  const { direction } = useLanguage();
  
  return (
    <div className={`min-h-screen ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
      <ModernWorkspace />
    </div>
  );
};

export default ModernWorkspacePage;
