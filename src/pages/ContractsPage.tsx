
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  DollarSign, 
  Calendar, 
  User,
  Download,
  Eye,
  Edit
} from 'lucide-react';

const ContractsPage = () => {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('active');

  const contracts = [
    {
      id: 1,
      title: i18n.language === 'ar' ? 'عقد المعدات الطبية' : 'Medical Equipment Contract',
      supplier: 'MedTech Solutions',
      value: '$450,000',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      progress: 75
    },
    {
      id: 2,
      title: i18n.language === 'ar' ? 'عقد البرمجيات' : 'Software License Contract',
      supplier: 'TechCorp Inc.',
      value: '$125,000',
      status: 'pending',
      startDate: '2024-02-01',
      endDate: '2025-02-01',
      progress: 0
    },
    {
      id: 3,
      title: i18n.language === 'ar' ? 'عقد اللوازم المكتبية' : 'Office Supplies Contract',
      supplier: 'OfficeMax Pro',
      value: '$25,000',
      status: 'completed',
      startDate: '2023-06-01',
      endDate: '2024-06-01',
      progress: 100
    },
    {
      id: 4,
      title: i18n.language === 'ar' ? 'عقد خدمات التنظيف' : 'Cleaning Services Contract',
      supplier: 'CleanPro Services',
      value: '$36,000',
      status: 'expiring',
      startDate: '2023-12-01',
      endDate: '2024-12-31',
      progress: 90
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'expiring': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'expiring': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return i18n.language === 'ar' ? 'نشط' : 'Active';
      case 'pending': return i18n.language === 'ar' ? 'معلق' : 'Pending';
      case 'completed': return i18n.language === 'ar' ? 'مكتمل' : 'Completed';
      case 'expiring': return i18n.language === 'ar' ? 'منتهي الصلاحية' : 'Expiring';
      default: return status;
    }
  };

  const filteredContracts = (status: string) => {
    if (status === 'all') return contracts;
    return contracts.filter(contract => contract.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {i18n.language === 'ar' ? 'إدارة العقود' : 'Contract Management'}
          </h1>
          <p className="text-gray-600">
            {i18n.language === 'ar' 
              ? 'تتبع وإدارة جميع عقودك التجارية'
              : 'Track and manage all your business contracts'
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {i18n.language === 'ar' ? 'العقود النشطة' : 'Active Contracts'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {i18n.language === 'ar' ? 'القيمة الإجمالية' : 'Total Value'}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">$2.4M</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {i18n.language === 'ar' ? 'تنتهي قريباً' : 'Expiring Soon'}
                  </p>
                  <p className="text-2xl font-bold text-red-600">3</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {i18n.language === 'ar' ? 'معدل الامتثال' : 'Compliance Rate'}
                  </p>
                  <p className="text-2xl font-bold text-purple-600">94%</p>
                </div>
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contracts Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{i18n.language === 'ar' ? 'جميع العقود' : 'All Contracts'}</span>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                {i18n.language === 'ar' ? 'عقد جديد' : 'New Contract'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="active">
                  {i18n.language === 'ar' ? 'نشط' : 'Active'}
                </TabsTrigger>
                <TabsTrigger value="pending">
                  {i18n.language === 'ar' ? 'معلق' : 'Pending'}
                </TabsTrigger>
                <TabsTrigger value="completed">
                  {i18n.language === 'ar' ? 'مكتمل' : 'Completed'}
                </TabsTrigger>
                <TabsTrigger value="all">
                  {i18n.language === 'ar' ? 'الكل' : 'All'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <div className="space-y-4">
                  {filteredContracts(activeTab).map((contract) => (
                    <Card key={contract.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{contract.title}</h3>
                              <Badge className={getStatusColor(contract.status)}>
                                {getStatusIcon(contract.status)}
                                <span className="ml-1">{getStatusText(contract.status)}</span>
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>{contract.supplier}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                <span>{contract.value}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{contract.startDate} - {contract.endDate}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{contract.progress}% {i18n.language === 'ar' ? 'مكتمل' : 'Complete'}</span>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-4">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${contract.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContractsPage;
