
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

const SupplierContracts = () => {
  const { language } = useLanguage();
  
  // Mock data for contracts
  const contracts = [
    {
      id: 1,
      title: language === 'en' ? 'Office Equipment Supply' : 'توريد معدات مكتبية',
      client: language === 'en' ? 'Tech Startup Collective' : 'مجموعة الشركات الناشئة التقنية',
      value: language === 'en' ? '$12,500' : '12,500 دولار',
      status: language === 'en' ? 'Active' : 'نشط',
      date: language === 'en' ? 'May 10, 2025' : '10 مايو 2025',
    },
    {
      id: 2,
      title: language === 'en' ? 'Healthcare Supplies' : 'مستلزمات طبية',
      client: language === 'en' ? 'Healthcare Procurement Alliance' : 'تحالف المشتريات الصحية',
      value: language === 'en' ? '$28,750' : '28,750 دولار',
      status: language === 'en' ? 'Pending' : 'قيد الانتظار',
      date: language === 'en' ? 'May 15, 2025' : '15 مايو 2025',
    },
    {
      id: 3,
      title: language === 'en' ? 'Software Licenses Bundle' : 'حزمة تراخيص برمجية',
      client: language === 'en' ? 'Educational Institutions Group' : 'مجموعة المؤسسات التعليمية',
      value: language === 'en' ? '$35,200' : '35,200 دولار',
      status: language === 'en' ? 'Completed' : 'مكتمل',
      date: language === 'en' ? 'April 28, 2025' : '28 أبريل 2025',
    },
    {
      id: 4,
      title: language === 'en' ? 'Cloud Services Package' : 'حزمة خدمات سحابية',
      client: language === 'en' ? 'Government Agencies Collective' : 'مجموعة الهيئات الحكومية',
      value: language === 'en' ? '$42,000' : '42,000 دولار',
      status: language === 'en' ? 'Completed' : 'مكتمل',
      date: language === 'en' ? 'April 15, 2025' : '15 أبريل 2025',
    },
  ];
  
  const getStatusBadge = (status: string) => {
    if (status === 'Active' || status === 'نشط') {
      return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
    } else if (status === 'Pending' || status === 'قيد الانتظار') {
      return <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>;
    } else {
      return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>;
    }
  };
  
  return (
    <DashboardLayout role="supplier">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {t('myContracts', language)}
          </h2>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t('activeContracts', language)}</CardTitle>
            <CardDescription>
              {t('contractsManagement', language)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('contract', language)}</TableHead>
                  <TableHead>{t('client', language)}</TableHead>
                  <TableHead>{t('value', language)}</TableHead>
                  <TableHead>{t('status', language)}</TableHead>
                  <TableHead>{t('date', language)}</TableHead>
                  <TableHead>{t('actions', language)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.title}</TableCell>
                    <TableCell>{contract.client}</TableCell>
                    <TableCell>{contract.value}</TableCell>
                    <TableCell>{getStatusBadge(contract.status)}</TableCell>
                    <TableCell>{contract.date}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        {t('view', language)}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SupplierContracts;
