
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, CheckCircle } from 'lucide-react';

interface VerificationStepProps {
  language: 'en' | 'ar';
}

const VerificationStep: React.FC<VerificationStepProps> = ({ language }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <Shield className="h-16 w-16 mx-auto text-blue-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2">
          {language === 'en' ? 'Verification in Progress' : 'التحقق قيد التقدم'}
        </h3>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Our team is reviewing your documents. This process typically takes 2-3 business days.'
            : 'يراجع فريقنا وثائقك. تستغرق هذه العملية عادة 2-3 أيام عمل.'
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <p className="text-sm font-medium">
              {language === 'en' ? 'Documents Received' : 'تم استلام الوثائق'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="h-8 w-8 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <Shield className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-sm font-medium">
              {language === 'en' ? 'Under Review' : 'قيد المراجعة'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="h-8 w-8 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-2">
              <CheckCircle className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-400">
              {language === 'en' ? 'Approval Pending' : 'في انتظار الموافقة'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerificationStep;
