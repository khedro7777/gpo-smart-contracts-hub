
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCountries } from '@/hooks/useCountriesData';
import { 
  ShoppingCart, 
  TrendingUp, 
  Building2, 
  UserCheck, 
  Factory, 
  Scale,
  Users,
  User
} from 'lucide-react';

interface CreateGroupFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ onSubmit, onCancel }) => {
  const { language } = useLanguage();
  const { data: countries } = useCountries();
  
  const [formData, setFormData] = useState({
    groupType: 'collective', // collective or individual
    gatewayType: '',
    name: '',
    description: '',
    businessObjective: '',
    jurisdiction: '',
    incorporationCountry: '',
    minimumMembers: 3,
    maximumMembers: 50,
    businessModel: '',
    legalFrameworkType: ''
  });

  const gateways = [
    {
      id: 'group_buying',
      title: language === 'en' ? 'Group Buying' : 'الشراء التعاوني',
      description: language === 'en' ? 'Collective procurement with better pricing' : 'الشراء الجماعي بأسعار أفضل',
      icon: ShoppingCart,
      color: 'bg-blue-500',
      framework: 'framework_agreement'
    },
    {
      id: 'cooperative_marketing',
      title: language === 'en' ? 'Cooperative Marketing' : 'التسويق التعاوني',
      description: language === 'en' ? 'Joint marketing campaigns and partnerships' : 'حملات تسويقية مشتركة وشراكات',
      icon: TrendingUp,
      color: 'bg-green-500',
      framework: 'loi_mou'
    },
    {
      id: 'company_formation',
      title: language === 'en' ? 'Company Formation' : 'تأسيس الشركات',
      description: language === 'en' ? 'Form companies in multiple jurisdictions' : 'تأسيس شركات في دول متعددة',
      icon: Building2,
      color: 'bg-purple-500',
      framework: 'company_law'
    },
    {
      id: 'freelancer_hiring',
      title: language === 'en' ? 'Freelancer Hiring' : 'توظيف المستقلين',
      description: language === 'en' ? 'Find and hire qualified freelancers' : 'العثور على وتوظيف المستقلين المؤهلين',
      icon: UserCheck,
      color: 'bg-orange-500',
      framework: 'sla_contract'
    },
    {
      id: 'supplier_sourcing',
      title: language === 'en' ? 'Supplier Sourcing' : 'البحث عن الموردين',
      description: language === 'en' ? 'Source suppliers and manage RFQs' : 'البحث عن الموردين وإدارة طلبات الأسعار',
      icon: Factory,
      color: 'bg-red-500',
      framework: 'rfq_itt'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    const selectedGateway = gateways.find(g => g.id === formData.gatewayType);
    const submissionData = {
      ...formData,
      legalFrameworkType: selectedGateway?.framework,
      serviceGateway: formData.gatewayType,
      type: formData.groupType === 'collective' ? 'group' : 'individual'
    };
    
    onSubmit(submissionData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {language === 'en' ? 'Create New Group' : 'إنشاء مجموعة جديدة'}
        </h1>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Choose your collaboration type and define your business objectives'
            : 'اختر نوع التعاون وحدد أهدافك التجارية'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Group Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {language === 'en' ? 'Collaboration Type' : 'نوع التعاون'}
            </CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Choose between individual or collective collaboration'
                : 'اختر بين التعاون الفردي أو الجماعي'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              value={formData.groupType} 
              onValueChange={(value) => setFormData({...formData, groupType: value})}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="collective" id="collective" />
                <Label htmlFor="collective" className="flex items-center gap-3 cursor-pointer flex-1">
                  <Users className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-medium">
                      {language === 'en' ? 'Collective Group' : 'مجموعة جماعية'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {language === 'en' ? 'Multiple members working together' : 'أعضاء متعددون يعملون معاً'}
                    </div>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual" className="flex items-center gap-3 cursor-pointer flex-1">
                  <User className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">
                      {language === 'en' ? 'Individual Project' : 'مشروع فردي'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {language === 'en' ? 'Solo buyer or seller' : 'مشتري أو بائع منفرد'}
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Gateway Selection */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Business Gateway' : 'بوابة الأعمال'}
            </CardTitle>
            <CardDescription>
              {language === 'en' 
                ? 'Select the type of business collaboration you want to create'
                : 'اختر نوع التعاون التجاري الذي تريد إنشاؤه'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gateways.map((gateway) => (
                <div 
                  key={gateway.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.gatewayType === gateway.id 
                      ? 'border-gpo-blue bg-blue-50' 
                      : 'hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setFormData({...formData, gatewayType: gateway.id})}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${gateway.color} text-white`}>
                      <gateway.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{gateway.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{gateway.description}</p>
                      {formData.gatewayType === gateway.id && (
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {language === 'en' ? 'Selected' : 'مختار'}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Basic Information' : 'المعلومات الأساسية'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">
                {language === 'en' ? 'Group/Project Name' : 'اسم المجموعة/المشروع'}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder={language === 'en' ? 'Enter a descriptive name' : 'أدخل اسماً وصفياً'}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">
                {language === 'en' ? 'Description' : 'الوصف'}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder={language === 'en' 
                  ? 'Describe what you want to achieve...' 
                  : 'اوصف ما تريد تحقيقه...'
                }
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="businessObjective">
                {language === 'en' ? 'Business Objective' : 'الهدف التجاري'}
              </Label>
              <Textarea
                id="businessObjective"
                value={formData.businessObjective}
                onChange={(e) => setFormData({...formData, businessObjective: e.target.value})}
                placeholder={language === 'en' 
                  ? 'Define your specific business goals...' 
                  : 'حدد أهدافك التجارية المحددة...'
                }
                rows={3}
              />
            </div>

            {countries && (
              <div>
                <Label htmlFor="jurisdiction">
                  {language === 'en' ? 'Jurisdiction' : 'الولاية القضائية'}
                </Label>
                <Select 
                  value={formData.jurisdiction} 
                  onValueChange={(value) => setFormData({...formData, jurisdiction: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'en' ? 'Select jurisdiction' : 'اختر الولاية القضائية'} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-2">
                          <span>{country.flag_emoji}</span>
                          <span>{language === 'en' ? country.name_en : country.name_ar}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.groupType === 'collective' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minimumMembers">
                    {language === 'en' ? 'Minimum Members' : 'الحد الأدنى للأعضاء'}
                  </Label>
                  <Input
                    id="minimumMembers"
                    type="number"
                    min="2"
                    max="100"
                    value={formData.minimumMembers}
                    onChange={(e) => setFormData({...formData, minimumMembers: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="maximumMembers">
                    {language === 'en' ? 'Maximum Members' : 'الحد الأقصى للأعضاء'}
                  </Label>
                  <Input
                    id="maximumMembers"
                    type="number"
                    min={formData.minimumMembers}
                    max="100"
                    value={formData.maximumMembers}
                    onChange={(e) => setFormData({...formData, maximumMembers: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            {language === 'en' ? 'Cancel' : 'إلغاء'}
          </Button>
          <Button 
            type="submit" 
            className="bg-gpo-blue hover:bg-gpo-blue/90"
            disabled={!formData.gatewayType || !formData.name}
          >
            {language === 'en' ? 'Create Group' : 'إنشاء المجموعة'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroupForm;
