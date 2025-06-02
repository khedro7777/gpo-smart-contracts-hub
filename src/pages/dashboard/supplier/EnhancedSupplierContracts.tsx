
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import ContractAnalyzer from '@/components/enhanced/ContractAnalyzer';
import { Search, Filter, Download, Eye, Edit, Plus, BarChart3 } from 'lucide-react';

const EnhancedSupplierContracts = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  
  // Enhanced mock data for contracts with more details
  const contracts = [
    {
      id: 1,
      title: language === 'en' ? 'Office Equipment Supply Contract' : 'عقد توريد معدات مكتبية',
      client: language === 'en' ? 'Tech Startup Collective' : 'مجموعة الشركات الناشئة التقنية',
      value: language === 'en' ? '$12,500' : '12,500 دولار',
      status: language === 'en' ? 'Active' : 'نشط',
      date: language === 'en' ? 'May 10, 2025' : '10 مايو 2025',
      endDate: language === 'en' ? 'Nov 10, 2025' : '10 نوفمبر 2025',
      progress: 65,
      riskLevel: 'Low',
      aiScore: 92,
      category: language === 'en' ? 'IT Equipment' : 'معدات تقنية'
    },
    {
      id: 2,
      title: language === 'en' ? 'Healthcare Supplies Agreement' : 'اتفاقية المستلزمات الطبية',
      client: language === 'en' ? 'Healthcare Procurement Alliance' : 'تحالف المشتريات الصحية',
      value: language === 'en' ? '$28,750' : '28,750 دولار',
      status: language === 'en' ? 'Pending Review' : 'قيد المراجعة',
      date: language === 'en' ? 'May 15, 2025' : '15 مايو 2025',
      endDate: language === 'en' ? 'May 15, 2026' : '15 مايو 2026',
      progress: 25,
      riskLevel: 'Medium',
      aiScore: 78,
      category: language === 'en' ? 'Medical' : 'طبي'
    },
    {
      id: 3,
      title: language === 'en' ? 'Software Licenses Bundle' : 'حزمة تراخيص برمجية',
      client: language === 'en' ? 'Educational Institutions Group' : 'مجموعة المؤسسات التعليمية',
      value: language === 'en' ? '$35,200' : '35,200 دولار',
      status: language === 'en' ? 'Completed' : 'مكتمل',
      date: language === 'en' ? 'April 28, 2025' : '28 أبريل 2025',
      endDate: language === 'en' ? 'April 28, 2025' : '28 أبريل 2025',
      progress: 100,
      riskLevel: 'Low',
      aiScore: 95,
      category: language === 'en' ? 'Software' : 'برمجيات'
    },
    {
      id: 4,
      title: language === 'en' ? 'Cloud Services Package' : 'حزمة خدمات سحابية',
      client: language === 'en' ? 'Government Agencies Collective' : 'مجموعة الهيئات الحكومية',
      value: language === 'en' ? '$42,000' : '42,000 دولار',
      status: language === 'en' ? 'Negotiation' : 'تفاوض',
      date: language === 'en' ? 'April 15, 2025' : '15 أبريل 2025',
      endDate: language === 'en' ? 'April 15, 2026' : '15 أبريل 2026',
      progress: 45,
      riskLevel: 'High',
      aiScore: 68,
      category: language === 'en' ? 'Cloud Services' : 'خدمات سحابية'
    },
  ];
  
  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'Active': 'bg-green-100 text-green-800',
      'نشط': 'bg-green-100 text-green-800',
      'Pending Review': 'bg-yellow-100 text-yellow-800',
      'قيد المراجعة': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-blue-100 text-blue-800',
      'مكتمل': 'bg-blue-100 text-blue-800',
      'Negotiation': 'bg-purple-100 text-purple-800',
      'تفاوض': 'bg-purple-100 text-purple-800'
    };
    
    return <Badge className={statusMap[status] || 'bg-gray-100 text-gray-800'}>{status}</Badge>;
  };

  const getRiskBadge = (risk: string) => {
    const riskMap: { [key: string]: string } = {
      'Low': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'High': 'bg-red-100 text-red-800'
    };
    
    return <Badge variant="outline" className={riskMap[risk]}>{risk}</Badge>;
  };

  const getAIScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contract.status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout role="supplier">
      <div className="flex flex-col gap-6">
        {/* Header with Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              {t('myContracts', language)}
            </h2>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Manage and analyze your contracts with AI-powered insights'
                : 'إدارة وتحليل عقودك برؤى مدعومة بالذكاء الاصطناعي'
              }
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={() => setShowAnalyzer(!showAnalyzer)} variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              {language === 'en' ? 'AI Analyzer' : 'محلل الذكاء الاصطناعي'}
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {language === 'en' ? 'New Contract' : 'عقد جديد'}
            </Button>
          </div>
        </div>

        {/* AI Contract Analyzer */}
        {showAnalyzer && (
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'en' ? 'AI Contract Analyzer' : 'محلل العقود بالذكاء الاصطناعي'}
              </CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? 'Upload and analyze contracts with advanced AI for risk assessment and optimization'
                  : 'ارفع وحلل العقود بالذكاء الاصطناعي المتقدم لتقييم المخاطر والتحسين'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContractAnalyzer />
            </CardContent>
          </Card>
        )}

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder={language === 'en' ? 'Search contracts...' : 'البحث في العقود...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder={language === 'en' ? 'Filter by status' : 'فلترة حسب الحالة'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'en' ? 'All Status' : 'جميع الحالات'}</SelectItem>
                  <SelectItem value="active">{language === 'en' ? 'Active' : 'نشط'}</SelectItem>
                  <SelectItem value="pending">{language === 'en' ? 'Pending' : 'قيد الانتظار'}</SelectItem>
                  <SelectItem value="completed">{language === 'en' ? 'Completed' : 'مكتمل'}</SelectItem>
                  <SelectItem value="negotiation">{language === 'en' ? 'Negotiation' : 'تفاوض'}</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Enhanced Contracts Table */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t('activeContracts', language)}</span>
              <Badge variant="secondary">
                {filteredContracts.length} {language === 'en' ? 'contracts' : 'عقد'}
              </Badge>
            </CardTitle>
            <CardDescription>
              {t('contractsManagement', language)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('contract', language)}</TableHead>
                    <TableHead>{t('client', language)}</TableHead>
                    <TableHead>{t('value', language)}</TableHead>
                    <TableHead>{t('status', language)}</TableHead>
                    <TableHead>{language === 'en' ? 'Progress' : 'التقدم'}</TableHead>
                    <TableHead>{language === 'en' ? 'Risk' : 'المخاطر'}</TableHead>
                    <TableHead>{language === 'en' ? 'AI Score' : 'نقاط الذكاء الاصطناعي'}</TableHead>
                    <TableHead>{t('actions', language)}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContracts.map((contract) => (
                    <TableRow key={contract.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <p className="font-medium">{contract.title}</p>
                          <p className="text-xs text-gray-500">{contract.category}</p>
                        </div>
                      </TableCell>
                      <TableCell>{contract.client}</TableCell>
                      <TableCell className="font-medium">{contract.value}</TableCell>
                      <TableCell>{getStatusBadge(contract.status)}</TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${contract.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{contract.progress}%</span>
                      </TableCell>
                      <TableCell>{getRiskBadge(contract.riskLevel)}</TableCell>
                      <TableCell>
                        <span className={`font-bold ${getAIScoreColor(contract.aiScore)}`}>
                          {contract.aiScore}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default EnhancedSupplierContracts;
