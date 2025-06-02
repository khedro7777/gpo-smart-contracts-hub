
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Star, MapPin, Award, TrendingUp, Filter } from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  rating: number;
  matchScore: number;
  location: string;
  specialization: string[];
  certifications: string[];
  priceRange: string;
  deliveryTime: string;
  capacity: string;
  sustainability: number;
  riskScore: number;
}

const SupplierMatchingEngine = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filters, setFilters] = useState({
    minRating: 0,
    maxPrice: '',
    location: '',
    certification: ''
  });

  const mockSuppliers: Supplier[] = [
    {
      id: '1',
      name: language === 'en' ? 'TechCorp Solutions' : 'حلول تيك كورب',
      rating: 4.8,
      matchScore: 95,
      location: language === 'en' ? 'Dubai, UAE' : 'دبي، الإمارات',
      specialization: [
        language === 'en' ? 'IT Equipment' : 'معدات تقنية',
        language === 'en' ? 'Software' : 'برمجيات'
      ],
      certifications: ['ISO 9001', 'ISO 27001'],
      priceRange: language === 'en' ? '$$' : 'متوسط',
      deliveryTime: language === 'en' ? '7-14 days' : '7-14 يوم',
      capacity: language === 'en' ? 'High' : 'عالية',
      sustainability: 85,
      riskScore: 15
    },
    {
      id: '2',
      name: language === 'en' ? 'Global Supplies Inc' : 'مؤسسة الإمدادات العالمية',
      rating: 4.6,
      matchScore: 87,
      location: language === 'en' ? 'Riyadh, Saudi Arabia' : 'الرياض، السعودية',
      specialization: [
        language === 'en' ? 'Office Supplies' : 'مستلزمات مكتبية',
        language === 'en' ? 'Furniture' : 'أثاث'
      ],
      certifications: ['ISO 9001', 'Green Certification'],
      priceRange: language === 'en' ? '$' : 'منخفض',
      deliveryTime: language === 'en' ? '3-7 days' : '3-7 أيام',
      capacity: language === 'en' ? 'Medium' : 'متوسطة',
      sustainability: 78,
      riskScore: 22
    },
    {
      id: '3',
      name: language === 'en' ? 'Innovation Partners' : 'شركاء الابتكار',
      rating: 4.9,
      matchScore: 92,
      location: language === 'en' ? 'Cairo, Egypt' : 'القاهرة، مصر',
      specialization: [
        language === 'en' ? 'Medical Equipment' : 'معدات طبية',
        language === 'en' ? 'Laboratory Supplies' : 'مستلزمات مختبرية'
      ],
      certifications: ['ISO 13485', 'FDA Approved'],
      priceRange: language === 'en' ? '$$$' : 'عالي',
      deliveryTime: language === 'en' ? '10-21 days' : '10-21 يوم',
      capacity: language === 'en' ? 'High' : 'عالية',
      sustainability: 92,
      riskScore: 8
    }
  ];

  const searchSuppliers = async () => {
    setIsSearching(true);
    
    // Simulate AI-powered search
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSuppliers(mockSuppliers);
    setIsSearching(false);
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 75) return 'text-blue-600 bg-blue-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRiskColor = (score: number) => {
    if (score < 20) return 'text-green-600';
    if (score < 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  useEffect(() => {
    // Auto-search on component mount
    searchSuppliers();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            {language === 'en' ? 'AI-Powered Supplier Matching' : 'مطابقة الموردين بالذكاء الاصطناعي'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder={language === 'en' ? 'Search for products or services...' : 'البحث عن المنتجات أو الخدمات...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchSuppliers()}
                className="flex-1"
              />
              <Button onClick={searchSuppliers} disabled={isSearching}>
                <Search className="h-4 w-4 mr-2" />
                {isSearching 
                  ? (language === 'en' ? 'Searching...' : 'جاري البحث...')
                  : (language === 'en' ? 'Search' : 'بحث')
                }
              </Button>
              <Button variant="outline">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {isSearching && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'AI is analyzing suppliers...' : 'الذكاء الاصطناعي يحلل الموردين...'}
                </p>
                <Progress value={66} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {suppliers.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {language === 'en' ? 'Recommended Suppliers' : 'الموردون الموصى بهم'}
            </h3>
            <Badge variant="secondary">
              {suppliers.length} {language === 'en' ? 'matches found' : 'مطابقة'}
            </Badge>
          </div>

          <div className="grid gap-4">
            {suppliers.map((supplier) => (
              <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold">{supplier.name}</h4>
                        <Badge className={getMatchColor(supplier.matchScore)}>
                          {supplier.matchScore}% {language === 'en' ? 'match' : 'مطابقة'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{supplier.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{supplier.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className={`h-4 w-4 ${getRiskColor(supplier.riskScore)}`} />
                          <span className={getRiskColor(supplier.riskScore)}>
                            {language === 'en' ? 'Risk' : 'المخاطر'}: {supplier.riskScore}%
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {supplier.specialization.map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">
                            {language === 'en' ? 'Price Range:' : 'نطاق السعر:'}
                          </span>
                          <p className="font-medium">{supplier.priceRange}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">
                            {language === 'en' ? 'Delivery:' : 'التسليم:'}
                          </span>
                          <p className="font-medium">{supplier.deliveryTime}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">
                            {language === 'en' ? 'Capacity:' : 'السعة:'}
                          </span>
                          <p className="font-medium">{supplier.capacity}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">
                            {language === 'en' ? 'Sustainability:' : 'الاستدامة:'}
                          </span>
                          <p className="font-medium text-green-600">{supplier.sustainability}%</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        {supplier.certifications.map((cert, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm">
                        {language === 'en' ? 'Contact' : 'اتصال'}
                      </Button>
                      <Button variant="outline" size="sm">
                        {language === 'en' ? 'View Profile' : 'عرض الملف'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierMatchingEngine;
