
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

const DiscoverGroups: React.FC = () => {
  const { language } = useLanguage();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('discoverGroups', language)}</CardTitle>
        <CardDescription>
          {t('discoverGroupsDesc', language)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <Search className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="mt-4 text-lg font-semibold">{t('findGroups', language)}</h3>
          <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
            {t('findGroupsDesc', language)}
          </p>
          <Button className="mt-4">
            {t('searchGroups', language)}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscoverGroups;
