
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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-center mb-4 text-gpo-blue">
          {icon}
        </div>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-center">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={action}>
          {t('getStarted', language)}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
