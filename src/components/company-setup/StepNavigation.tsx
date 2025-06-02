
import React from 'react';
import { Button } from '@/components/ui/button';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  language: 'en' | 'ar';
}

const StepNavigation: React.FC<StepNavigationProps> = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  language 
}) => {
  return (
    <div className="flex justify-between pt-6">
      <Button 
        variant="outline" 
        onClick={onPrevious}
        disabled={currentStep === 1}
      >
        {language === 'en' ? 'Previous' : 'السابق'}
      </Button>
      
      <Button 
        onClick={onNext}
        disabled={currentStep === totalSteps}
      >
        {currentStep === totalSteps 
          ? (language === 'en' ? 'Complete Setup' : 'إكمال الإعداد')
          : (language === 'en' ? 'Next' : 'التالي')
        }
      </Button>
    </div>
  );
};

export default StepNavigation;
