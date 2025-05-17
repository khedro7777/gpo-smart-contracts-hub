
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

const SupplierGroups = () => {
  const { language } = useLanguage();
  
  // Mock data for groups
  const groups = [
    {
      id: 1,
      name: language === 'en' ? 'Tech Startup Collective' : 'مجموعة الشركات الناشئة التقنية',
      members: 15,
      status: language === 'en' ? 'Active' : 'نشط',
      lastActivity: language === 'en' ? '2 days ago' : 'منذ يومين'
    },
    {
      id: 2,
      name: language === 'en' ? 'Healthcare Procurement Alliance' : 'تحالف المشتريات الصحية',
      members: 8,
      status: language === 'en' ? 'Active' : 'نشط',
      lastActivity: language === 'en' ? '1 week ago' : 'منذ أسبوع'
    },
    {
      id: 3,
      name: language === 'en' ? 'Educational Institutions Group' : 'مجموعة المؤسسات التعليمية',
      members: 12,
      status: language === 'en' ? 'Active' : 'نشط',
      lastActivity: language === 'en' ? '3 days ago' : 'منذ 3 أيام'
    },
    {
      id: 4,
      name: language === 'en' ? 'Government Agencies Collective' : 'مجموعة الهيئات الحكومية',
      members: 5,
      status: language === 'en' ? 'Pending' : 'قيد الانتظار',
      lastActivity: language === 'en' ? '5 days ago' : 'منذ 5 أيام'
    }
  ];
  
  return (
    <DashboardLayout role="supplier">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {t('myGroups', language)}
          </h2>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Active Groups' : 'المجموعات النشطة'}</CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Groups you are currently supplying to' 
                : 'المجموعات التي تقوم بتوريدها حاليًا'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'en' ? 'Group Name' : 'اسم المجموعة'}</TableHead>
                  <TableHead>{language === 'en' ? 'Members' : 'الأعضاء'}</TableHead>
                  <TableHead>{language === 'en' ? 'Status' : 'الحالة'}</TableHead>
                  <TableHead>{language === 'en' ? 'Last Activity' : 'آخر نشاط'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups.map(group => (
                  <TableRow key={group.id}>
                    <TableCell className="font-medium">{group.name}</TableCell>
                    <TableCell>{group.members}</TableCell>
                    <TableCell>{group.status}</TableCell>
                    <TableCell>{group.lastActivity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{language === 'en' ? 'Group RFQs' : 'طلبات العروض للمجموعات'}</CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Recent requests for quotation from groups' 
                : 'طلبات العروض الأخيرة من المجموعات'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">
                    {language === 'en' ? 'Office Equipment (Group A)' : 'معدات مكتبية (المجموعة أ)'}
                  </h3>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {language === 'en' ? 'Pending Response' : 'في انتظار الرد'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {language === 'en' ? 'Received 2 days ago' : 'تم استلامها منذ يومين'}
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">
                    {language === 'en' ? 'IT Hardware (Group B)' : 'أجهزة تكنولوجيا المعلومات (المجموعة ب)'}
                  </h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {language === 'en' ? 'Responded' : 'تم الرد'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {language === 'en' ? 'Received 4 days ago' : 'تم استلامها منذ 4 أيام'}
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">
                    {language === 'en' ? 'Software Licenses (Group C)' : 'تراخيص البرمجيات (المجموعة ج)'}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {language === 'en' ? 'Under Review' : 'قيد المراجعة'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {language === 'en' ? 'Received 6 days ago' : 'تم استلامها منذ 6 أيام'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SupplierGroups;
