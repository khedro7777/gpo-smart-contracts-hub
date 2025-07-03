
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGroups } from '@/hooks/useGroups';
import CreateGroupDialog from '@/components/groups/CreateGroupDialog';
import GroupCard from '@/components/groups/GroupCard';
import { Search, Filter, Users, TrendingUp, Building, Briefcase } from 'lucide-react';

const GroupsPage = () => {
  const { language } = useLanguage();
  const { groups, loading } = useGroups();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || group.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || group.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const groupsByType = {
    procurement: filteredGroups.filter(g => g.type === 'procurement').length,
    marketing: filteredGroups.filter(g => g.type === 'marketing').length,
    company_formation: filteredGroups.filter(g => g.type === 'company_formation').length,
    freelance: filteredGroups.filter(g => g.type === 'freelance').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'المجموعات النشطة' : 'Active Groups'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'استكشف وانضم إلى المجموعات التعاونية'
                : 'Explore and join collaborative groups'
              }
            </p>
          </div>
          <CreateGroupDialog />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {language === 'ar' ? 'الشراء التعاوني' : 'Procurement'}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">{groupsByType.procurement}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {language === 'ar' ? 'التسويق التعاوني' : 'Marketing'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">{groupsByType.marketing}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {language === 'ar' ? 'تأسيس الشركات' : 'Company Formation'}
                  </p>
                  <p className="text-2xl font-bold text-purple-600">{groupsByType.company_formation}</p>
                </div>
                <Building className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    {language === 'ar' ? 'المستقلون' : 'Freelance'}
                  </p>
                  <p className="text-2xl font-bold text-orange-600">{groupsByType.freelance}</p>
                </div>
                <Briefcase className="h-8 w-8 text-orange-600" />
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
                    placeholder={language === 'ar' ? 'البحث في المجموعات...' : 'Search groups...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-48">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={language === 'ar' ? 'نوع المجموعة' : 'Group Type'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === 'ar' ? 'جميع الأنواع' : 'All Types'}</SelectItem>
                    <SelectItem value="procurement">{language === 'ar' ? 'شراء تعاوني' : 'Procurement'}</SelectItem>
                    <SelectItem value="marketing">{language === 'ar' ? 'تسويق تعاوني' : 'Marketing'}</SelectItem>
                    <SelectItem value="company_formation">{language === 'ar' ? 'تأسيس شركات' : 'Company Formation'}</SelectItem>
                    <SelectItem value="freelance">{language === 'ar' ? 'مستقلون' : 'Freelance'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'ar' ? 'الحالة' : 'Status'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{language === 'ar' ? 'جميع الحالات' : 'All Status'}</SelectItem>
                    <SelectItem value="active">{language === 'ar' ? 'نشط' : 'Active'}</SelectItem>
                    <SelectItem value="pending">{language === 'ar' ? 'معلق' : 'Pending'}</SelectItem>
                    <SelectItem value="completed">{language === 'ar' ? 'مكتمل' : 'Completed'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <GroupCard 
              key={group.id} 
              group={group}
              onView={(group) => console.log('View group:', group)}
            />
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'ar' ? 'لا توجد مجموعات' : 'No groups found'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'لا توجد مجموعات تطابق معايير البحث المحددة'
                : 'No groups match the selected criteria'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupsPage;
