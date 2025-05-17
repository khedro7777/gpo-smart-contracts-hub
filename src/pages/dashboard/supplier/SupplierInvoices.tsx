
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

const SupplierInvoices = () => {
  const { language } = useLanguage();
  
  // Mock data for invoices
  const invoices = [
    {
      id: 'INV-001',
      title: language === 'en' ? 'Office Equipment Supply' : 'توريد معدات مكتبية',
      client: language === 'en' ? 'Tech Startup Collective' : 'مجموعة الشركات الناشئة التقنية',
      amount: language === 'en' ? '$12,500' : '12,500 دولار',
      status: language === 'en' ? 'Paid' : 'مدفوع',
      date: language === 'en' ? 'May 12, 2025' : '12 مايو 2025',
    },
    {
      id: 'INV-002',
      title: language === 'en' ? 'Healthcare Supplies' : 'مستلزمات طبية',
      client: language === 'en' ? 'Healthcare Procurement Alliance' : 'تحالف المشتريات الصحية',
      amount: language === 'en' ? '$28,750' : '28,750 دولار',
      status: language === 'en' ? 'Pending' : 'قيد الانتظار',
      date: language === 'en' ? 'May 15, 2025' : '15 مايو 2025',
    },
    {
      id: 'INV-003',
      title: language === 'en' ? 'Software Licenses Bundle' : 'حزمة تراخيص برمجية',
      client: language === 'en' ? 'Educational Institutions Group' : 'مجموعة المؤسسات التعليمية',
      amount: language === 'en' ? '$35,200' : '35,200 دولار',
      status: language === 'en' ? 'Paid' : 'مدفوع',
      date: language === 'en' ? 'April 30, 2025' : '30 أبريل 2025',
    },
    {
      id: 'INV-004',
      title: language === 'en' ? 'Cloud Services Package' : 'حزمة خدمات سحابية',
      client: language === 'en' ? 'Government Agencies Collective' : 'مجموعة الهيئات الحكومية',
      amount: language === 'en' ? '$42,000' : '42,000 دولار',
      status: language === 'en' ? 'Overdue' : 'متأخر',
      date: language === 'en' ? 'April 15, 2025' : '15 أبريل 2025',
    },
  ];
  
  const getStatusBadge = (status: string) => {
    if (status === 'Paid' || status === 'مدفوع') {
      return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
    } else if (status === 'Pending' || status === 'قيد الانتظار') {
      return <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">{status}</Badge>;
    }
  };
  
  return (
    <DashboardLayout role="supplier">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {t('invoices', language)}
          </h2>
          <Button>
            {t('createInvoice', language)}
          </Button>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t('recentInvoices', language)}</CardTitle>
            <CardDescription>
              {t('invoiceManagement', language)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('invoiceId', language)}</TableHead>
                  <TableHead>{t('title', language)}</TableHead>
                  <TableHead>{t('client', language)}</TableHead>
                  <TableHead>{t('amount', language)}</TableHead>
                  <TableHead>{t('status', language)}</TableHead>
                  <TableHead>{t('date', language)}</TableHead>
                  <TableHead>{t('actions', language)}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.title}</TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button variant="outline" size="sm">
                        {t('view', language)}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t('download', language)}
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

export default SupplierInvoices;
