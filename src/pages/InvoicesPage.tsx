
// ============================================
// 📄 INVOICES PAGE COMPONENT
// ============================================
// Purpose: Complete invoice management system with sitemap navigation
// Used in: Main invoice dashboard and management
// Features: Invoice CRUD, client management, payment tracking, analytics
// Location: /invoices route - main invoice interface
// Dependencies: InvoiceSitemap component for navigation
// ============================================

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import InvoiceSitemap from '@/components/invoice/InvoiceSitemap';
import { 
  Receipt, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Search,
  Filter,
  Download,
  Send,
  Eye,
  Plus,
  Map
} from 'lucide-react';

const InvoicesPage = () => {
  const { i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  // ============================================
  // 🗺️ SITEMAP STATE MANAGEMENT
  // ============================================
  const [sitemapOpen, setSitemapOpen] = useState(false);

  // ============================================
  // 🧭 NAVIGATION HANDLER
  // ============================================
  const handleSitemapNavigation = (path: string) => {
    console.log('Navigating to:', path);
    // Add navigation logic here based on path
    // This could integrate with React Router or state management
  };

  const invoices = [
    {
      id: 'INV-2024-001',
      client: 'MedCorp Healthcare',
      amount: 45000,
      dueDate: '2024-01-15',
      issueDate: '2023-12-15',
      status: 'paid',
      description: i18n.language === 'ar' ? 'معدات طبية - دفعة Q1' : 'Medical Equipment - Q1 Batch'
    },
    {
      id: 'INV-2024-002', 
      client: 'TechStart Solutions',
      amount: 12500,
      dueDate: '2024-01-20',
      issueDate: '2023-12-20',
      status: 'pending',
      description: i18n.language === 'ar' ? 'تراخيص برمجيات' : 'Software Licensing'
    },
    {
      id: 'INV-2024-003',
      client: 'Global Manufacturing',
      amount: 78000,
      dueDate: '2024-01-10',
      issueDate: '2023-12-10',
      status: 'overdue',
      description: i18n.language === 'ar' ? 'مواد صناعية' : 'Industrial Materials'
    },
    {
      id: 'INV-2024-004',
      client: 'EduTech Institute',
      amount: 23000,
      dueDate: '2024-01-25',
      issueDate: '2023-12-25',
      status: 'sent',
      description: i18n.language === 'ar' ? 'أجهزة تعليمية' : 'Educational Equipment'
    },
    {
      id: 'INV-2024-005',
      client: 'RetailChain Plus',
      amount: 56000,
      dueDate: '2024-02-01',
      issueDate: '2024-01-01',
      status: 'draft',
      description: i18n.language === 'ar' ? 'منتجات استهلاكية' : 'Consumer Products'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4" />;
      case 'sent': return <Send className="h-4 w-4" />;
      case 'draft': return <Receipt className="h-4 w-4" />;
      default: return <Receipt className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return i18n.language === 'ar' ? 'مدفوع' : 'Paid';
      case 'pending': return i18n.language === 'ar' ? 'معلق' : 'Pending';
      case 'overdue': return i18n.language === 'ar' ? 'متأخر' : 'Overdue';
      case 'sent': return i18n.language === 'ar' ? 'مرسل' : 'Sent';
      case 'draft': return i18n.language === 'ar' ? 'مسودة' : 'Draft';
      default: return status;
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'pending' || inv.status === 'sent').reduce((sum, invoice) => sum + invoice.amount, 0);
  const overdueAmount = invoices.filter(inv => inv.status === 'overdue').reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {i18n.language === 'ar' ? 'إدارة الفواتير' : 'Invoice Management'}
            </h1>
            <p className="text-gray-600">
              {i18n.language === 'ar' 
                ? 'تتبع وإدارة جميع فواتيرك'
                : 'Track and manage all your invoices'
              }
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setSitemapOpen(true)}
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <Map className="h-4 w-4 mr-2" />
              {i18n.language === 'ar' ? 'خريطة الموقع' : 'Sitemap'}
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              {i18n.language === 'ar' ? 'فاتورة جديدة' : 'New Invoice'}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {i18n.language === 'ar' ? 'إجمالي الفواتير' : 'Total Invoices'}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">${totalAmount.toLocaleString()}</p>
                </div>
                <Receipt className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {i18n.language === 'ar' ? 'المبالغ المدفوعة' : 'Paid Amount'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">${paidAmount.toLocaleString()}</p>
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
                    {i18n.language === 'ar' ? 'المبالغ المعلقة' : 'Pending Amount'}
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">${pendingAmount.toLocaleString()}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {i18n.language === 'ar' ? 'المبالغ المتأخرة' : 'Overdue Amount'}
                  </p>
                  <p className="text-2xl font-bold text-red-600">${overdueAmount.toLocaleString()}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder={i18n.language === 'ar' ? 'البحث في الفواتير...' : 'Search invoices...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={i18n.language === 'ar' ? 'تصفية بالحالة' : 'Filter by status'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{i18n.language === 'ar' ? 'جميع الحالات' : 'All Status'}</SelectItem>
                    <SelectItem value="paid">{i18n.language === 'ar' ? 'مدفوع' : 'Paid'}</SelectItem>
                    <SelectItem value="pending">{i18n.language === 'ar' ? 'معلق' : 'Pending'}</SelectItem>
                    <SelectItem value="overdue">{i18n.language === 'ar' ? 'متأخر' : 'Overdue'}</SelectItem>
                    <SelectItem value="sent">{i18n.language === 'ar' ? 'مرسل' : 'Sent'}</SelectItem>
                    <SelectItem value="draft">{i18n.language === 'ar' ? 'مسودة' : 'Draft'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoices List */}
        <Card>
          <CardHeader>
            <CardTitle>{i18n.language === 'ar' ? 'جميع الفواتير' : 'All Invoices'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInvoices.map((invoice) => (
                <Card key={invoice.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{invoice.id}</h3>
                          <Badge className={getStatusColor(invoice.status)}>
                            {getStatusIcon(invoice.status)}
                            <span className="ml-1">{getStatusText(invoice.status)}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-2">
                          <div>
                            <span className="font-medium">{i18n.language === 'ar' ? 'العميل:' : 'Client:'}</span>
                            <p>{invoice.client}</p>
                          </div>
                          <div>
                            <span className="font-medium">{i18n.language === 'ar' ? 'المبلغ:' : 'Amount:'}</span>
                            <p className="text-lg font-bold text-gray-900">${invoice.amount.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="font-medium">{i18n.language === 'ar' ? 'تاريخ الإصدار:' : 'Issue Date:'}</span>
                            <p>{invoice.issueDate}</p>
                          </div>
                          <div>
                            <span className="font-medium">{i18n.language === 'ar' ? 'تاريخ الاستحقاق:' : 'Due Date:'}</span>
                            <p>{invoice.dueDate}</p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600">{invoice.description}</p>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        {invoice.status === 'draft' && (
                          <Button variant="outline" size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ============================================ */}
        {/* 🗺️ SITEMAP OVERLAY COMPONENT */}
        {/* ============================================ */}
        <InvoiceSitemap 
          isOpen={sitemapOpen}
          onClose={() => setSitemapOpen(false)}
          onNavigate={handleSitemapNavigation}
        />
      </div>
    </div>
  );
};

export default InvoicesPage;
