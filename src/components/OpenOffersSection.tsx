
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Users, Package, UserCheck, Calendar, MapPin, Vote } from 'lucide-react';

const OpenOffersSection = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Mock data for open offers
  const openOffers = {
    lookingForMembers: [
      {
        id: 1,
        name: language === 'en' ? 'Medical Equipment Group - Egypt' : 'مجموعة معدات طبية - مصر',
        type: language === 'en' ? 'Group Buying' : 'شراء جماعي',
        country: language === 'en' ? 'Egypt' : 'مصر',
        status: language === 'en' ? 'Active' : 'نشط',
        members: '5/15',
        created: language === 'en' ? '3 days ago' : 'منذ 3 أيام',
        sector: language === 'en' ? 'Healthcare' : 'رعاية صحية'
      },
      {
        id: 2,
        name: language === 'en' ? 'Tech Startup Marketing - UAE' : 'تسويق الشركات الناشئة - الإمارات',
        type: language === 'en' ? 'Cooperative Marketing' : 'تسويق تعاوني',
        country: language === 'en' ? 'UAE' : 'الإمارات',
        status: language === 'en' ? 'Voting' : 'تصويت',
        members: '8/12',
        created: language === 'en' ? '1 week ago' : 'منذ أسبوع',
        sector: language === 'en' ? 'Technology' : 'تكنولوجيا'
      }
    ],
    lookingForSuppliers: [
      {
        id: 3,
        name: language === 'en' ? 'Office Furniture Procurement - Saudi Arabia' : 'شراء أثاث مكتبي - السعودية',
        type: language === 'en' ? 'Supplier Request' : 'طلب موردين',
        country: language === 'en' ? 'Saudi Arabia' : 'السعودية',
        status: language === 'en' ? 'Negotiation' : 'تفاوض',
        members: '10/10',
        created: language === 'en' ? '5 days ago' : 'منذ 5 أيام',
        sector: language === 'en' ? 'Office Equipment' : 'معدات مكتبية'
      }
    ],
    lookingForFreelancers: [
      {
        id: 4,
        name: language === 'en' ? 'Website Development Project - Jordan' : 'مشروع تطوير موقع - الأردن',
        type: language === 'en' ? 'Freelancer Request' : 'طلب مستقلين',
        country: language === 'en' ? 'Jordan' : 'الأردن',
        status: language === 'en' ? 'Active' : 'نشط',
        members: '1/3',
        created: language === 'en' ? '2 days ago' : 'منذ يومين',
        sector: language === 'en' ? 'Web Development' : 'تطوير الويب'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'نشط':
        return 'bg-green-100 text-green-800';
      case 'voting':
      case 'تصويت':
        return 'bg-blue-100 text-blue-800';
      case 'negotiation':
      case 'تفاوض':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getIcon = (type: string) => {
    if (type.includes('Buying') || type.includes('شراء')) {
      return <Users className="h-5 w-5" />;
    } else if (type.includes('Marketing') || type.includes('تسويق')) {
      return <Vote className="h-5 w-5" />;
    } else if (type.includes('Supplier') || type.includes('موردين')) {
      return <Package className="h-5 w-5" />;
    } else {
      return <UserCheck className="h-5 w-5" />;
    }
  };

  const OfferCard = ({ offer }: { offer: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getIcon(offer.type)}
            <CardTitle className="text-lg">{offer.name}</CardTitle>
          </div>
          <Badge className={getStatusColor(offer.status)}>
            {offer.status}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {offer.country}
          </span>
          <span>{offer.sector}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>{language === 'en' ? 'Type:' : 'النوع:'}</span>
            <span>{offer.type}</span>
          </div>
          <div className="flex justify-between">
            <span>{language === 'en' ? 'Members:' : 'الأعضاء:'}</span>
            <span>{offer.members}</span>
          </div>
          <div className="flex justify-between">
            <span>{language === 'en' ? 'Created:' : 'تاريخ الإنشاء:'}</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {offer.created}
            </span>
          </div>
        </div>
        <Button 
          className="w-full mt-4" 
          variant="outline"
          onClick={() => navigate(`/group-details/${offer.id}`)}
        >
          {t('viewDetails', language)}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('openOffers', language)}
        </h2>
        
        <div className="space-y-12">
          {/* Groups Looking for Members */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Users className="h-5 w-5 text-gpo-blue" />
              {language === 'en' ? 'Groups Looking for Members' : 'مجموعات تبحث عن أعضاء'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openOffers.lookingForMembers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>

          {/* Groups Looking for Suppliers */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Package className="h-5 w-5 text-gpo-blue" />
              {language === 'en' ? 'Groups Looking for Suppliers' : 'مجموعات تبحث عن موردين'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openOffers.lookingForSuppliers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>

          {/* Groups Looking for Freelancers */}
          <div>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-gpo-blue" />
              {language === 'en' ? 'Groups Requesting Freelancers' : 'مجموعات تطلب مستقلين'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openOffers.lookingForFreelancers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenOffersSection;
