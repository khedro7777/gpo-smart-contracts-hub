
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
            currentStep >= step.id 
              ? 'bg-blue-600 border-blue-600 text-white' 
              : 'border-gray-300 text-gray-400'
          }`}>
            {currentStep > step.id ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              React.createElement(step.icon, { className: "h-5 w-5" })
            )}
          </div>
          <span className={`ml-2 text-sm font-medium ${
            currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
          }`}>
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div className={`ml-4 w-16 h-0.5 ${
              currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
