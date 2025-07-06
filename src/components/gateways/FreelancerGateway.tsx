
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import PremiumGate from '@/components/premium/PremiumGate';
import { 
  Briefcase, 
  Users, 
  Star, 
  Trophy,
  Code,
  Palette,
  PenTool
} from 'lucide-react';

const FreelancerGateway = () => {
  const { language } = useLanguage();

  return (
    <PremiumGate feature={language === 'ar' ? 'بوابة العمل الحر' : 'Freelancer Gateway'}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Briefcase className="h-8 w-8 text-blue-600" />
              {language === 'ar' ? 'بوابة العمل الحر' : 'Freelancer Gateway'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'منصة للمستقلين وأصحاب الأعمال للتعاون في المشاريع'
                : 'Platform for freelancers and business owners to collaborate on projects'
              }
            </p>
          </div>
          
          <div className="text-center py-12">
            <PenTool className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'ar' ? 'بوابة العمل الحر قيد التطوير' : 'Freelancer Gateway Under Development'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'ستتوفر منصة العمل الحر قريباً'
                : 'Freelancer platform will be available soon'
              }
            </p>
          </div>
        </div>
      </div>
    </PremiumGate>
  );
};

export default FreelancerGateway;
