// ============================================
// 🗺️ INVOICE SITEMAP COMPONENT
// ============================================
// Purpose: Interactive sitemap for invoice navigation and organization
// Used in: InvoicesPage for better UX and navigation
// Features: Visual hierarchy, quick navigation, search functionality
// Location: Invoice management system - sitemap overlay
// ============================================

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { 
  Map, 
  Search, 
  FileText, 
  DollarSign, 
  Users, 
  Calendar,
  TrendingUp,
  Settings,
  Filter,
  Download,
  Eye,
  X
} from 'lucide-react';

// ============================================
// 📊 TYPE DEFINITIONS
// ============================================

interface SitemapNode {
  id: string;
  title: string;
  type: 'category' | 'page' | 'action';
  icon: React.ElementType;
  children?: SitemapNode[];
  count?: number;
  status?: string;
}

interface InvoiceSitemapProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

const InvoiceSitemap: React.FC<InvoiceSitemapProps> = ({ isOpen, onClose, onNavigate }) => {
  const { i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // ============================================
  // 🗺️ SITEMAP STRUCTURE
  // ============================================
  const sitemapStructure: SitemapNode[] = [
    {
      id: 'invoices',
      title: i18n.language === 'ar' ? 'الفواتير' : 'Invoices',
      type: 'category',
      icon: FileText,
      children: [
        {
          id: 'all-invoices',
          title: i18n.language === 'ar' ? 'جميع الفواتير' : 'All Invoices',
          type: 'page',
          icon: FileText,
          count: 156
        },
        {
          id: 'draft-invoices',
          title: i18n.language === 'ar' ? 'المسودات' : 'Draft Invoices',
          type: 'page',
          icon: FileText,
          count: 12,
          status: 'draft'
        },
        {
          id: 'sent-invoices',
          title: i18n.language === 'ar' ? 'المرسلة' : 'Sent Invoices',
          type: 'page',
          icon: FileText,
          count: 89,
          status: 'sent'
        },
        {
          id: 'paid-invoices',
          title: i18n.language === 'ar' ? 'المدفوعة' : 'Paid Invoices',
          type: 'page',
          icon: FileText,
          count: 134,
          status: 'paid'
        },
        {
          id: 'overdue-invoices',
          title: i18n.language === 'ar' ? 'المتأخرة' : 'Overdue Invoices',
          type: 'page',
          icon: FileText,
          count: 8,
          status: 'overdue'
        }
      ]
    },
    {
      id: 'clients',
      title: i18n.language === 'ar' ? 'العملاء' : 'Clients',
      type: 'category',
      icon: Users,
      children: [
        {
          id: 'all-clients',
          title: i18n.language === 'ar' ? 'جميع العملاء' : 'All Clients',
          type: 'page',
          icon: Users,
          count: 45
        },
        {
          id: 'active-clients',
          title: i18n.language === 'ar' ? 'العملاء النشطون' : 'Active Clients',
          type: 'page',
          icon: Users,
          count: 38
        },
        {
          id: 'new-clients',
          title: i18n.language === 'ar' ? 'عملاء جدد' : 'New Clients',
          type: 'page',
          icon: Users,
          count: 7
        }
      ]
    },
    {
      id: 'payments',
      title: i18n.language === 'ar' ? 'المدفوعات' : 'Payments',
      type: 'category',
      icon: DollarSign,
      children: [
        {
          id: 'payment-history',
          title: i18n.language === 'ar' ? 'سجل المدفوعات' : 'Payment History',
          type: 'page',
          icon: DollarSign
        },
        {
          id: 'pending-payments',
          title: i18n.language === 'ar' ? 'مدفوعات معلقة' : 'Pending Payments',
          type: 'page',
          icon: DollarSign,
          count: 23
        },
        {
          id: 'payment-methods',
          title: i18n.language === 'ar' ? 'طرق الدفع' : 'Payment Methods',
          type: 'page',
          icon: DollarSign
        }
      ]
    },
    {
      id: 'reports',
      title: i18n.language === 'ar' ? 'التقارير' : 'Reports',
      type: 'category',
      icon: TrendingUp,
      children: [
        {
          id: 'financial-reports',
          title: i18n.language === 'ar' ? 'التقارير المالية' : 'Financial Reports',
          type: 'page',
          icon: TrendingUp
        },
        {
          id: 'client-reports',
          title: i18n.language === 'ar' ? 'تقارير العملاء' : 'Client Reports',
          type: 'page',
          icon: TrendingUp
        },
        {
          id: 'tax-reports',
          title: i18n.language === 'ar' ? 'تقارير الضرائب' : 'Tax Reports',
          type: 'page',
          icon: TrendingUp
        }
      ]
    },
    {
      id: 'actions',
      title: i18n.language === 'ar' ? 'الإجراءات' : 'Quick Actions',
      type: 'category',
      icon: Settings,
      children: [
        {
          id: 'create-invoice',
          title: i18n.language === 'ar' ? 'إنشاء فاتورة' : 'Create Invoice',
          type: 'action',
          icon: FileText
        },
        {
          id: 'add-client',
          title: i18n.language === 'ar' ? 'إضافة عميل' : 'Add Client',
          type: 'action',
          icon: Users
        },
        {
          id: 'export-data',
          title: i18n.language === 'ar' ? 'تصدير البيانات' : 'Export Data',
          type: 'action',
          icon: Download
        },
        {
          id: 'settings',
          title: i18n.language === 'ar' ? 'الإعدادات' : 'Settings',
          type: 'action',
          icon: Settings
        }
      ]
    }
  ];

  // ============================================
  // 🔍 SEARCH FUNCTIONALITY
  // ============================================
  const filterNodes = (nodes: SitemapNode[], query: string): SitemapNode[] => {
    if (!query) return nodes;
    
    return nodes.reduce((filtered: SitemapNode[], node) => {
      const matchesTitle = node.title.toLowerCase().includes(query.toLowerCase());
      const filteredChildren = node.children ? filterNodes(node.children, query) : [];
      
      if (matchesTitle || filteredChildren.length > 0) {
        filtered.push({
          ...node,
          children: filteredChildren.length > 0 ? filteredChildren : node.children
        });
      }
      
      return filtered;
    }, []);
  };

  // ============================================
  // 🎨 UTILITY FUNCTIONS
  // ============================================
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNodeClick = (node: SitemapNode) => {
    // Navigate to the specific page/action
    onNavigate(node.id);
    onClose();
  };

  // ============================================
  // 🎯 RENDER COMPONENTS
  // ============================================
  const renderNode = (node: SitemapNode, level: number = 0) => {
    const IconComponent = node.icon;
    const hasChildren = node.children && node.children.length > 0;
    
    return (
      <div key={node.id} className={`${level > 0 ? 'ml-6' : ''}`}>
        <div 
          className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
            node.type === 'action' ? 'border border-dashed border-gray-300' : ''
          }`}
          onClick={() => handleNodeClick(node)}
        >
          <div className="flex items-center gap-3">
            <IconComponent className={`h-5 w-5 ${
              node.type === 'category' ? 'text-blue-600' : 
              node.type === 'action' ? 'text-green-600' : 'text-gray-600'
            }`} />
            <span className={`${node.type === 'category' ? 'font-semibold' : ''}`}>
              {node.title}
            </span>
            {node.count && (
              <Badge variant="secondary" className="ml-2">
                {node.count}
              </Badge>
            )}
            {node.status && (
              <Badge className={getStatusColor(node.status)}>
                {node.status}
              </Badge>
            )}
          </div>
          {node.type === 'page' && (
            <Eye className="h-4 w-4 text-gray-400" />
          )}
        </div>
        
        {hasChildren && (
          <div className="mt-2 space-y-1">
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  const filteredNodes = filterNodes(sitemapStructure, searchQuery);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Map className="h-6 w-6 text-blue-600" />
              {i18n.language === 'ar' ? 'خريطة الموقع - الفواتير' : 'Invoice Sitemap'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={i18n.language === 'ar' ? 'البحث في الصفحات...' : 'Search pages...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        
        <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-150px)]">
          <div className="space-y-4">
            {filteredNodes.length > 0 ? (
              filteredNodes.map(node => renderNode(node))
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {i18n.language === 'ar' ? 'لا توجد نتائج' : 'No Results Found'}
                </h3>
                <p className="text-gray-600">
                  {i18n.language === 'ar' 
                    ? 'جرب كلمات بحث أخرى'
                    : 'Try different search terms'
                  }
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceSitemap;