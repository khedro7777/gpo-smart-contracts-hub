
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  FileText, 
  CreditCard, 
  Users, 
  UserCheck,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming' | 'blocked';
  icon: React.ElementType;
  action?: string;
  actionUrl?: string;
}

interface UserWorkflowGuideProps {
  userType: 'visitor' | 'restricted' | 'verified';
  portalType: 'kyc_points' | 'free' | 'mcp_required';
  currentStep: string;
}

const UserWorkflowGuide: React.FC<UserWorkflowGuideProps> = ({
  userType,
  portalType,
  currentStep
}) => {
  const { language } = useLanguage();

  const getWorkflowSteps = (): WorkflowStep[] => {
    const baseSteps: WorkflowStep[] = [
      {
        id: 'register',
        title: language === 'ar' ? 'إنشاء حساب' : 'Create Account',
        description: language === 'ar' ? 'تسجيل حساب جديد في المنصة' : 'Register a new account on the platform',
        status: userType === 'visitor' ? 'current' : 'completed',
        icon: UserCheck,
        action: language === 'ar' ? 'سجل الآن' : 'Register Now',
        actionUrl: '/signup'
      }
    ];

    if (portalType === 'kyc_points') {
      baseSteps.push(
        {
          id: 'kyc',
          title: language === 'ar' ? 'رفع مستندات KYC' : 'Upload KYC Documents',
          description: language === 'ar' ? 'رفع الوثائق المطلوبة للتحقق من الهوية' : 'Upload required documents for identity verification',
          status: userType === 'visitor' ? 'upcoming' : (currentStep === 'kyc' ? 'current' : 'completed'),
          icon: FileText,
          action: language === 'ar' ? 'رفع الوثائق' : 'Upload Documents',
        },
        {
          id: 'admin_approval',
          title: language === 'ar' ? 'موافقة الإدارة' : 'Admin Approval',
          description: language === 'ar' ? 'انتظار موافقة الإدارة على مستندات KYC' : 'Waiting for admin approval on KYC documents',
          status: currentStep === 'admin_approval' ? 'current' : (userType === 'verified' ? 'completed' : 'upcoming'),
          icon: Clock,
        },
        {
          id: 'points_payment',
          title: language === 'ar' ? 'دفع النقاط' : 'Points Payment',
          description: language === 'ar' ? 'دفع النقاط المطلوبة للانضمام للمجموعة' : 'Pay required points to join the group',
          status: currentStep === 'points_payment' ? 'current' : 'upcoming',
          icon: CreditCard,
          action: language === 'ar' ? 'ادفع النقاط' : 'Pay Points',
        }
      );
    } else if (portalType === 'mcp_required') {
      baseSteps.push(
        {
          id: 'mcp_exam',
          title: language === 'ar' ? 'اختبار MCP' : 'MCP Exam',
          description: language === 'ar' ? 'اجتياز اختبار المؤهلات المهنية' : 'Pass the professional qualification exam',
          status: currentStep === 'mcp_exam' ? 'current' : 'upcoming',
          icon: FileText,
          action: language === 'ar' ? 'ابدأ الاختبار' : 'Start Exam',
        }
      );
    }

    // Common final steps
    baseSteps.push(
      {
        id: 'manager_approval',
        title: language === 'ar' ? 'موافقة المدراء' : 'Manager Approval',
        description: language === 'ar' ? 'تصويت ثلثي المدراء على طلب الانضمام' : 'Two-thirds of managers vote on join request',
        status: currentStep === 'manager_approval' ? 'current' : 'upcoming',
        icon: Users,
      },
      {
        id: 'group_access',
        title: language === 'ar' ? 'الوصول للمجموعة' : 'Group Access',
        description: language === 'ar' ? 'الحصول على الوصول الكامل لغرفة المجموعة' : 'Gain full access to group room',
        status: currentStep === 'group_access' ? 'completed' : 'upcoming',
        icon: CheckCircle,
      }
    );

    return baseSteps;
  };

  const steps = getWorkflowSteps();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'current': return <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'upcoming': return <Clock className="h-5 w-5 text-gray-400" />;
      case 'blocked': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500 bg-green-50';
      case 'current': return 'border-blue-500 bg-blue-50';
      case 'upcoming': return 'border-gray-300 bg-gray-50';
      case 'blocked': return 'border-red-500 bg-red-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          {language === 'ar' ? 'دليل سير العمل' : 'Workflow Guide'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <div className={`p-4 rounded-lg border-2 ${getStatusColor(step.status)}`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {getStatusIcon(step.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{step.title}</h4>
                    <Badge variant={step.status === 'completed' ? 'default' : 'secondary'}>
                      {step.status === 'completed' && (language === 'ar' ? 'مكتمل' : 'Completed')}
                      {step.status === 'current' && (language === 'ar' ? 'جاري' : 'Current')}
                      {step.status === 'upcoming' && (language === 'ar' ? 'قادم' : 'Upcoming')}
                      {step.status === 'blocked' && (language === 'ar' ? 'محظور' : 'Blocked')}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                  
                  {step.action && step.status === 'current' && (
                    <Button size="sm" className="w-full">
                      {step.action}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-full w-0.5 h-4 bg-gray-300 transform -translate-x-1/2" />
            )}
          </div>
        ))}

        {/* Exit Process Info */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">
            {language === 'ar' ? 'عملية الخروج' : 'Exit Process'}
          </h4>
          <p className="text-sm text-gray-600">
            {language === 'ar' 
              ? 'طلب انسحاب ← موافقة الإدارة ← فقدان حقوق الوصول ← أرشفة البيانات'
              : 'Withdrawal Request → Admin Approval → Loss of Access Rights → Data Archival'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserWorkflowGuide;
