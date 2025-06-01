
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WorkflowStep {
  id: string;
  label: string;
  next?: string[];
}

interface WorkflowDiagramProps {
  title: string;
  steps: WorkflowStep[];
}

const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({ title, steps }) => {
  const { language } = useLanguage();
  
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gpo-blue text-white">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="bg-white border-2 border-gpo-blue rounded-lg p-4 w-60 text-center mb-2">
                {step.label}
              </div>
              
              {index < steps.length - 1 && (
                <div className="h-8 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down text-gpo-blue"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowDiagram;
