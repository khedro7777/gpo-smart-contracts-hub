
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { WorkflowStep } from '@/types/gateway';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Play, 
  Pause, 
  RotateCcw 
} from 'lucide-react';

interface WorkflowManagerProps {
  steps: WorkflowStep[];
  onStepUpdate?: (stepId: string, status: string) => void;
  onWorkflowComplete?: () => void;
  canEdit?: boolean;
}

const WorkflowManager: React.FC<WorkflowManagerProps> = ({
  steps,
  onStepUpdate,
  onWorkflowComplete,
  canEdit = false
}) => {
  const { language } = useLanguage();
  const [currentSteps, setCurrentSteps] = useState<WorkflowStep[]>(steps);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  useEffect(() => {
    setCurrentSteps(steps);
  }, [steps]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      'pending': language === 'ar' ? 'في الانتظار' : 'Pending',
      'in_progress': language === 'ar' ? 'قيد التنفيذ' : 'In Progress',
      'completed': language === 'ar' ? 'مكتمل' : 'Completed',
      'failed': language === 'ar' ? 'فشل' : 'Failed'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const calculateProgress = () => {
    const completed = currentSteps.filter(step => step.status === 'completed').length;
    return (completed / currentSteps.length) * 100;
  };

  const handleStepAction = (stepId: string, action: string) => {
    const updatedSteps = currentSteps.map(step => {
      if (step.id === stepId) {
        let newStatus = step.status;
        
        switch (action) {
          case 'start':
            newStatus = 'in_progress';
            break;
          case 'complete':
            newStatus = 'completed';
            break;
          case 'fail':
            newStatus = 'failed';
            break;
          case 'reset':
            newStatus = 'pending';
            break;
        }

        return {
          ...step,
          status: newStatus,
          completedAt: newStatus === 'completed' ? new Date().toISOString() : step.completedAt
        };
      }
      return step;
    });

    setCurrentSteps(updatedSteps);
    
    if (onStepUpdate) {
      onStepUpdate(stepId, updatedSteps.find(s => s.id === stepId)?.status || 'pending');
    }

    // Check if workflow is complete
    const allCompleted = updatedSteps.every(step => step.status === 'completed');
    if (allCompleted && onWorkflowComplete) {
      onWorkflowComplete();
    }
  };

  const canExecuteStep = (step: WorkflowStep, index: number) => {
    if (index === 0) return true;
    const previousStep = currentSteps[index - 1];
    return previousStep?.status === 'completed';
  };

  return (
    <div className="space-y-6">
      {/* Workflow Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              {language === 'ar' ? 'تقدم سير العمل' : 'Workflow Progress'}
            </span>
            <Badge variant="outline">
              {Math.round(calculateProgress())}% {language === 'ar' ? 'مكتمل' : 'Complete'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={calculateProgress()} className="mb-4" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              {currentSteps.filter(s => s.status === 'completed').length} / {currentSteps.length} {language === 'ar' ? 'خطوات مكتملة' : 'steps completed'}
            </span>
            <span>
              {currentSteps.filter(s => s.status === 'in_progress').length} {language === 'ar' ? 'قيد التنفيذ' : 'in progress'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Steps */}
      <div className="space-y-4">
        {currentSteps.map((step, index) => (
          <Card 
            key={step.id} 
            className={`transition-all duration-200 ${
              selectedStep === step.id ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(step.status)}
                  <div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(step.status)}>
                    {getStatusText(step.status)}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {language === 'ar' ? 'خطوة' : 'Step'} {index + 1}
                  </span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Step Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {step.requirements && step.requirements.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">
                      {language === 'ar' ? 'المتطلبات' : 'Requirements'}
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {step.requirements.map((req, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {step.outputs && step.outputs.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">
                      {language === 'ar' ? 'المخرجات' : 'Outputs'}
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {step.outputs.map((output, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          {output}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Step Metadata */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {step.assignedTo && (
                  <span>
                    {language === 'ar' ? 'مُكلف إلى:' : 'Assigned to:'} {step.assignedTo}
                  </span>
                )}
                {step.dueDate && (
                  <span>
                    {language === 'ar' ? 'موعد التسليم:' : 'Due:'} {new Date(step.dueDate).toLocaleDateString()}
                  </span>
                )}
                {step.completedAt && (
                  <span>
                    {language === 'ar' ? 'اكتمل في:' : 'Completed:'} {new Date(step.completedAt).toLocaleDateString()}
                  </span>
                )}
              </div>

              {/* Step Actions */}
              {canEdit && (
                <div className="flex gap-2 pt-2 border-t">
                  {step.status === 'pending' && canExecuteStep(step, index) && (
                    <Button
                      size="sm"
                      onClick={() => handleStepAction(step.id, 'start')}
                      className="flex items-center gap-1"
                    >
                      <Play className="h-3 w-3" />
                      {language === 'ar' ? 'ابدأ' : 'Start'}
                    </Button>
                  )}
                  
                  {step.status === 'in_progress' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleStepAction(step.id, 'complete')}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-3 w-3" />
                        {language === 'ar' ? 'إكمال' : 'Complete'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStepAction(step.id, 'fail')}
                        className="flex items-center gap-1 text-red-600 border-red-600"
                      >
                        <XCircle className="h-3 w-3" />
                        {language === 'ar' ? 'فشل' : 'Fail'}
                      </Button>
                    </>
                  )}
                  
                  {(step.status === 'completed' || step.status === 'failed') && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStepAction(step.id, 'reset')}
                      className="flex items-center gap-1"
                    >
                      <RotateCcw className="h-3 w-3" />
                      {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkflowManager;
