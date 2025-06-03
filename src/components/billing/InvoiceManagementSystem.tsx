
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  FileText, 
  DollarSign, 
  Download, 
  Send, 
  Plus, 
  Eye, 
  Edit,
  Search,
  Filter,
  Calendar,
  User,
  Building,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  TrendingUp,
  Receipt
} from 'lucide-react';

const InvoiceManagementSystem = () => {
  const { language } = useLanguage();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadInvoicesData();
  }, []);

  const loadInvoicesData = () => {
    setInvoices([
      {
        id: 'INV-2024-001',
        clientName: language === 'en' ? 'Tech Solutions Inc.' : 'شركة الحلول التقنية',
        amount: 2500,
        currency: 'USD',
        status: 'paid',
        dueDate: '2024-01-15',
        issueDate: '2024-01-01',
        description: language === 'en' ? 'E-commerce platform development' : 'تطوير منصة التجارة الإلكترونية',
        items: [
          { description: 'Frontend Development', quantity: 1, rate: 1500, amount: 1500 },
          { description: 'Backend Development', quantity: 1, rate: 1000, amount: 1000 }
        ],
        paymentMethod: 'bank_transfer',
        freelancer: language === 'en' ? 'Ahmed Hassan' : 'أحمد حسن',
        projectId: 'PRJ-001'
      },
      {
        id: 'INV-2024-002',
        clientName: language === 'en' ? 'StartupX' : 'شركة StartupX',
        amount: 1800,
        currency: 'USD',
        status: 'pending',
        dueDate: '2024-02-10',
        issueDate: '2024-01-25',
        description: language === 'en' ? 'Brand identity design project' : 'مشروع تصميم الهوية التجارية',
        items: [
          { description: 'Logo Design', quantity: 1, rate: 800, amount: 800 },
          { description: 'Brand Guidelines', quantity: 1, rate: 1000, amount: 1000 }
        ],
        paymentMethod: 'paypal',
        freelancer: language === 'en' ? 'Sarah Miller' : 'سارة ميلر',
        projectId: 'PRJ-002'
      },
      {
        id: 'INV-2024-003',
        clientName: language === 'en' ? 'Digital Marketing Co.' : 'شركة التسويق الرقمي',
        amount: 1200,
        currency: 'USD',
        status: 'overdue',
        dueDate: '2024-01-20',
        issueDate: '2024-01-05',
        description: language === 'en' ? 'SEO optimization and content marketing' : 'تحسين محركات البحث والتسويق بالمحتوى',
        items: [
          { description: 'SEO Audit', quantity: 1, rate: 500, amount: 500 },
          { description: 'Content Creation', quantity: 1, rate: 700, amount: 700 }
        ],
        paymentMethod: 'credit_card',
        freelancer: language === 'en' ? 'Mohammed Al-Ahmad' : 'محمد الأحمد',
        projectId: 'PRJ-003'
      }
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertCircle className="h-4 w-4" />;
      case 'draft': return <Edit className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'bank_transfer': return <Building className="h-4 w-4" />;
      case 'paypal': return <DollarSign className="h-4 w-4" />;
      case 'credit_card': return <CreditCard className="h-4 w-4" />;
      default: return <Receipt className="h-4 w-4" />;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.freelancer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const calculateTotalRevenue = () => {
    return invoices.reduce((total, invoice) => total + (invoice.status === 'paid' ? invoice.amount : 0), 0);
  };

  const calculatePendingAmount = () => {
    return invoices.reduce((total, invoice) => total + (invoice.status === 'pending' ? invoice.amount : 0), 0);
  };

  const calculateOverdueAmount = () => {
    return invoices.reduce((total, invoice) => total + (invoice.status === 'overdue' ? invoice.amount : 0), 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <FileText className="h-8 w-8 mr-3 text-blue-600" />
            {language === 'en' ? 'Invoice Management' : 'إدارة الفواتير'}
          </h2>
          <p className="text-gray-600 mt-2">
            {language === 'en' 
              ? 'Create, track, and manage invoices for all projects and freelancers'
              : 'إنشاء وتتبع وإدارة الفواتير لجميع المشاريع والمستقلين'
            }
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          {language === 'en' ? 'Create Invoice' : 'إنشاء فاتورة'}
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{language === 'en' ? 'Total Revenue' : 'إجمالي الإيرادات'}</p>
                <p className="text-2xl font-bold text-green-600">${calculateTotalRevenue().toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{language === 'en' ? 'Pending Amount' : 'المبلغ المعلق'}</p>
                <p className="text-2xl font-bold text-yellow-600">${calculatePendingAmount().toLocaleString()}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{language === 'en' ? 'Overdue Amount' : 'المبلغ المتأخر'}</p>
                <p className="text-2xl font-bold text-red-600">${calculateOverdueAmount().toLocaleString()}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{language === 'en' ? 'Total Invoices' : 'إجمالي الفواتير'}</p>
                <p className="text-2xl font-bold text-blue-600">{invoices.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="invoices">
            {language === 'en' ? 'All Invoices' : 'جميع الفواتير'}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === 'en' ? 'Analytics' : 'التحليلات'}
          </TabsTrigger>
          <TabsTrigger value="settings">
            {language === 'en' ? 'Settings' : 'الإعدادات'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder={language === 'en' ? 'Search by client name, invoice ID, or freelancer...' : 'البحث باسم العميل أو رقم الفاتورة أو المستقل...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={language === 'en' ? 'Filter by status' : 'تصفية حسب الحالة'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{language === 'en' ? 'All Status' : 'جميع الحالات'}</SelectItem>
                <SelectItem value="paid">{language === 'en' ? 'Paid' : 'مدفوع'}</SelectItem>
                <SelectItem value="pending">{language === 'en' ? 'Pending' : 'معلق'}</SelectItem>
                <SelectItem value="overdue">{language === 'en' ? 'Overdue' : 'متأخر'}</SelectItem>
                <SelectItem value="draft">{language === 'en' ? 'Draft' : 'مسودة'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Invoices List */}
          <div className="grid gap-4">
            {filteredInvoices.map((invoice) => (
              <Card key={invoice.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{invoice.id}</h3>
                        <Badge className={getStatusColor(invoice.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(invoice.status)}
                            <span>
                              {invoice.status === 'paid' ? (language === 'en' ? 'Paid' : 'مدفوع') :
                               invoice.status === 'pending' ? (language === 'en' ? 'Pending' : 'معلق') :
                               invoice.status === 'overdue' ? (language === 'en' ? 'Overdue' : 'متأخر') :
                               language === 'en' ? 'Draft' : 'مسودة'}
                            </span>
                          </div>
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{invoice.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2" />
                          {invoice.clientName}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          {invoice.freelancer}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {language === 'en' ? 'Due:' : 'الاستحقاق:'} {invoice.dueDate}
                        </div>
                        <div className="flex items-center">
                          {getPaymentMethodIcon(invoice.paymentMethod)}
                          <span className="ml-2">
                            {invoice.paymentMethod === 'bank_transfer' ? (language === 'en' ? 'Bank Transfer' : 'تحويل بنكي') :
                             invoice.paymentMethod === 'paypal' ? 'PayPal' :
                             language === 'en' ? 'Credit Card' : 'بطاقة ائتمان'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ${invoice.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">{invoice.currency}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      {language === 'en' ? 'View' : 'عرض'}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      {language === 'en' ? 'Download' : 'تحميل'}
                    </Button>
                    {invoice.status === 'pending' && (
                      <Button size="sm">
                        <Send className="h-4 w-4 mr-1" />
                        {language === 'en' ? 'Send Reminder' : 'إرسال تذكير'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Revenue Breakdown' : 'تفصيل الإيرادات'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'en' ? 'Paid Invoices' : 'الفواتير المدفوعة'}</span>
                    <span className="font-semibold">${calculateTotalRevenue().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'en' ? 'Pending Payments' : 'المدفوعات المعلقة'}</span>
                    <span className="font-semibold">${calculatePendingAmount().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'en' ? 'Overdue Amount' : 'المبلغ المتأخر'}</span>
                    <span className="font-semibold text-red-600">${calculateOverdueAmount().toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Payment Methods' : 'طرق الدفع'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      <span className="text-sm text-gray-600">{language === 'en' ? 'Bank Transfer' : 'تحويل بنكي'}</span>
                    </div>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span className="text-sm text-gray-600">PayPal</span>
                    </div>
                    <span className="font-semibold">35%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      <span className="text-sm text-gray-600">{language === 'en' ? 'Credit Card' : 'بطاقة ائتمان'}</span>
                    </div>
                    <span className="font-semibold">20%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>{language === 'en' ? 'Invoice Settings' : 'إعدادات الفواتير'}</CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? 'Configure default settings for invoice creation and management'
                  : 'تكوين الإعدادات الافتراضية لإنشاء وإدارة الفواتير'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{language === 'en' ? 'Default Currency' : 'العملة الافتراضية'}</label>
                  <Select defaultValue="USD">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="SAR">SAR - Saudi Riyal</SelectItem>
                      <SelectItem value="AED">AED - UAE Dirham</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{language === 'en' ? 'Payment Terms (Days)' : 'شروط الدفع (أيام)'}</label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 {language === 'en' ? 'days' : 'يوم'}</SelectItem>
                      <SelectItem value="30">30 {language === 'en' ? 'days' : 'يوم'}</SelectItem>
                      <SelectItem value="45">45 {language === 'en' ? 'days' : 'يوم'}</SelectItem>
                      <SelectItem value="60">60 {language === 'en' ? 'days' : 'يوم'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">{language === 'en' ? 'Invoice Footer Notes' : 'ملاحظات تذييل الفاتورة'}</label>
                <Textarea 
                  placeholder={language === 'en' 
                    ? 'Add default terms and conditions or payment instructions...'
                    : 'أضف الشروط والأحكام الافتراضية أو تعليمات الدفع...'
                  }
                  rows={4}
                />
              </div>

              <Button>
                {language === 'en' ? 'Save Settings' : 'حفظ الإعدادات'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvoiceManagementSystem;
