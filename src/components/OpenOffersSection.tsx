
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGroups } from '@/hooks/useGroups';
import { Users, Clock, MapPin, Eye, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OpenOffersSection = () => {
  const { language } = useLanguage();
  const { groups, loading } = useGroups();
  const navigate = useNavigate();

  // Show only active groups looking for members
  const openOffers = groups
    .filter(group => group.status === 'active')
    .slice(0, 6);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'procurement': return 'bg-blue-100 text-blue-800';
      case 'marketing': return 'bg-green-100 text-green-800';
      case 'company_formation': return 'bg-purple-100 text-purple-800';
      case 'freelance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'procurement': return language === 'ar' ? 'شراء تعاوني' : 'Procurement';
      case 'marketing': return language === 'ar' ? 'تسويق تعاوني' : 'Marketing';
      case 'company_formation': return language === 'ar' ? 'تأسيس شركات' : 'Company Formation';
      case 'freelance': return language === 'ar' ? 'مستقلين' : 'Freelance';
      default: return type;
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'ar' ? 'العروض المفتوحة' : 'Open Opportunities'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'انضم إلى المجموعات النشطة واستفد من القوة الجماعية'
              : 'Join active groups and benefit from collective power'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {openOffers.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className={getTypeColor(group.type)}>
                    {getTypeText(group.type)}
                  </Badge>
                  <Badge variant="outline" className="text-green-600">
                    {language === 'ar' ? 'يقبل أعضاء' : 'Accepting Members'}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{group.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-2">{group.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="h-4 w-4" />
                    <span>{group.member_count || 0} {language === 'ar' ? 'عضو' : 'members'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(group.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{group.service_gateway}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => navigate('/groups')}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'عرض' : 'View'}
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => navigate('/groups')}
                    className="flex-1"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {language === 'ar' ? 'انضمام' : 'Join'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => navigate('/groups')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {language === 'ar' ? 'عرض جميع المجموعات' : 'View All Groups'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OpenOffersSection;
