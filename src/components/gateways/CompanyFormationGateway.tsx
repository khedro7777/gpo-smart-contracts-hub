
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import PremiumGate from '@/components/premium/PremiumGate';
import { 
  Building, 
  Users, 
  FileText, 
  Shield,
  Globe,
  CheckCircle,
  Clock
} from 'lucide-react';

const CompanyFormationGateway = () => {
  const { language } = useLanguage();

  return (
    <PremiumGate feature={language === 'ar' ? 'بوابة تأسيس الشركات' : 'Company Formation Gateway'}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Building className="h-8 w-8 text-blue-600" />
              {language === 'ar' ? 'بوابة تأسيس الشركات' : 'Company Formation Gateway'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'تأسيس الشركات بشكل جماعي وإدارة الشراكات التجارية'
                : 'Collaborative company formation and business partnership management'
              }
            </p>
          </div>
          
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'ar' ? 'بوابة تأسيس الشركات قيد التطوير' : 'Company Formation Gateway Under Development'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'ستتوفر خدمات تأسيس الشركات قريباً'
                : 'Company formation services will be available soon'
              }
            </p>
          </div>
        </div>
      </div>
    </PremiumGate>
  );
};

export default CompanyFormationGateway;
