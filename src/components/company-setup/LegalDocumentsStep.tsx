
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface LegalDocumentsStepProps {
  language: 'en' | 'ar';
}

const LegalDocumentsStep: React.FC<LegalDocumentsStepProps> = ({ language }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {language === 'en' ? 'Trade License' : 'الرخصة التجارية'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-4">
                {language === 'en' 
                  ? 'Upload your trade license document'
                  : 'حمل وثيقة الرخصة التجارية'
                }
              </p>
              <Button variant="outline">
                {language === 'en' ? 'Choose File' : 'اختر ملف'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {language === 'en' ? 'Tax Certificate' : 'شهادة ضريبية'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-4">
                {language === 'en' 
                  ? 'Upload your tax registration certificate'
                  : 'حمل شهادة التسجيل الضريبي'
                }
              </p>
              <Button variant="outline">
                {language === 'en' ? 'Choose File' : 'اختر ملف'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {language === 'en' ? 'Additional Documents' : 'وثائق إضافية'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {language === 'en' 
                ? 'Upload any additional documents required for your industry or country'
                : 'حمل أي وثائق إضافية مطلوبة لصناعتك أو بلدك'
              }
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <Button variant="outline">
                {language === 'en' ? 'Upload Documents' : 'حمل الوثائق'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalDocumentsStep;
