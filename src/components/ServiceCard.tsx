
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, description, icon, action }) => {
  const { language } = useLanguage();
  
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 max-w-sm mx-auto">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-3 text-gpo-blue">
          {icon}
        </div>
        <CardTitle className="text-lg md:text-xl font-semibold px-2 leading-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow px-4 pb-2">
        <CardDescription className="text-center text-sm md:text-base leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center pt-2 pb-4">
        <Button 
          onClick={action}
          className="w-full max-w-[200px] text-sm md:text-base py-2 px-4"
          size="sm"
        >
          {t('getStarted', language)}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
