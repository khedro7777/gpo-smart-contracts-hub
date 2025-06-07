
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Users, 
  Shield, 
  Globe, 
  DollarSign, 
  Calendar,
  Upload,
  Download,
  Eye,
  Building2
} from 'lucide-react';

interface ContractData {
  title: string;
  parties: string[];
  contractType: string;
  jurisdiction: string;
  value: string;
  duration: string;
  terms: string;
  isMultiParty: boolean;
}

const Web2ContractFormation: React.FC = () => {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('create');
  const [contractData, setContractData] = useState<ContractData>({
    title: '',
    parties: [''],
    contractType: '',
    jurisdiction: '',
    value: '',
    duration: '',
    terms: '',
    isMultiParty: false,
  });

  const contractTypes = [
    { value: 'service', label: i18n.language === 'ar' ? 'عقد خدمة' : 'Service Agreement' },
    { value: 'supply', label: i18n.language === 'ar' ? 'عقد توريد' : 'Supply Contract' },
    { value: 'employment', label: i18n.language === 'ar' ? 'عقد عمل' : 'Employment Contract' },
    { value: 'partnership', label: i18n.language === 'ar' ? 'عقد شراكة' : 'Partnership Agreement' },
    { value: 'nda', label: i18n.language === 'ar' ? 'اتفاقية سرية' : 'Non-Disclosure Agreement' },
  ];

  const jurisdictions = [
    { value: 'uae', label: i18n.language === 'ar' ? 'الإمارات العربية المتحدة' : 'United Arab Emirates' },
    { value: 'sa', label: i18n.language === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia' },
    { value: 'uk', label: i18n.language === 'ar' ? 'المملكة المتحدة' : 'United Kingdom' },
    { value: 'us', label: i18n.language === 'ar' ? 'الولايات المتحدة' : 'United States' },
    { value: 'sg', label: i18n.language === 'ar' ? 'سنغافورة' : 'Singapore' },
  ];

  const addParty = () => {
    setContractData(prev => ({
      ...prev,
      parties: [...prev.parties, '']
    }));
  };

  const updateParty = (index: number, value: string) => {
    setContractData(prev => ({
      ...prev,
      parties: prev.parties.map((party, i) => i === index ? value : party)
    }));
  };

  const removeParty = (index: number) => {
    if (contractData.parties.length > 1) {
      setContractData(prev => ({
        ...prev,
        parties: prev.parties.filter((_, i) => i !== index)
      }));
    }
  };

  const generateContract = () => {
    console.log('Generating Web2 contract:', contractData);
    // Here would be the logic to generate the contract using traditional legal frameworks
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">
              {i18n.language === 'ar' ? 'تشكيل العقود Web2' : 'Web2 Contract Formation'}
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {i18n.language === 'ar' 
              ? 'إنشاء وإدارة العقود التقليدية مع الإطار القانوني المعياري'
              : 'Create and manage traditional contracts with standard legal frameworks'
            }
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create">
              {i18n.language === 'ar' ? 'إنشاء عقد' : 'Create Contract'}
            </TabsTrigger>
            <TabsTrigger value="templates">
              {i18n.language === 'ar' ? 'القوالب' : 'Templates'}
            </TabsTrigger>
            <TabsTrigger value="review">
              {i18n.language === 'ar' ? 'مراجعة' : 'Review'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {i18n.language === 'ar' ? 'تفاصيل العقد' : 'Contract Details'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      {i18n.language === 'ar' ? 'عنوان العقد' : 'Contract Title'} *
                    </Label>
                    <Input
                      id="title"
                      placeholder={i18n.language === 'ar' ? 'أدخل عنوان العقد' : 'Enter contract title'}
                      value={contractData.title}
                      onChange={(e) => setContractData(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contractType">
                      {i18n.language === 'ar' ? 'نوع العقد' : 'Contract Type'} *
                    </Label>
                    <Select value={contractData.contractType} onValueChange={(value) => setContractData(prev => ({ ...prev, contractType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={i18n.language === 'ar' ? 'اختر نوع العقد' : 'Select contract type'} />
                      </SelectTrigger>
                      <SelectContent>
                        {contractTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{i18n.language === 'ar' ? 'أطراف العقد' : 'Contract Parties'}</Label>
                    <Button onClick={addParty} variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      {i18n.language === 'ar' ? 'إضافة طرف' : 'Add Party'}
                    </Button>
                  </div>
                  
                  {contractData.parties.map((party, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder={i18n.language === 'ar' ? `الطرف ${index + 1}` : `Party ${index + 1}`}
                        value={party}
                        onChange={(e) => updateParty(index, e.target.value)}
                        className="flex-1"
                      />
                      {contractData.parties.length > 1 && (
                        <Button 
                          onClick={() => removeParty(index)} 
                          variant="outline" 
                          size="sm"
                          className="text-red-600"
                        >
                          {i18n.language === 'ar' ? 'حذف' : 'Remove'}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jurisdiction">
                      {i18n.language === 'ar' ? 'الاختصاص القضائي' : 'Jurisdiction'} *
                    </Label>
                    <Select value={contractData.jurisdiction} onValueChange={(value) => setContractData(prev => ({ ...prev, jurisdiction: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder={i18n.language === 'ar' ? 'اختر الاختصاص' : 'Select jurisdiction'} />
                      </SelectTrigger>
                      <SelectContent>
                        {jurisdictions.map((jurisdiction) => (
                          <SelectItem key={jurisdiction.value} value={jurisdiction.value}>
                            {jurisdiction.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="value">
                      {i18n.language === 'ar' ? 'قيمة العقد' : 'Contract Value'}
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="value"
                        placeholder="0.00"
                        value={contractData.value}
                        onChange={(e) => setContractData(prev => ({ ...prev, value: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">
                      {i18n.language === 'ar' ? 'مدة العقد' : 'Contract Duration'}
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="duration"
                        placeholder={i18n.language === 'ar' ? 'مثال: سنة واحدة' : 'e.g., 1 year'}
                        value={contractData.duration}
                        onChange={(e) => setContractData(prev => ({ ...prev, duration: e.target.value }))}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="terms">
                    {i18n.language === 'ar' ? 'الشروط والأحكام' : 'Terms and Conditions'} *
                  </Label>
                  <Textarea
                    id="terms"
                    placeholder={i18n.language === 'ar' ? 'أدخل الشروط والأحكام التفصيلية' : 'Enter detailed terms and conditions'}
                    value={contractData.terms}
                    onChange={(e) => setContractData(prev => ({ ...prev, terms: e.target.value }))}
                    rows={6}
                  />
                </div>

                <div className="flex items-center gap-4 pt-4 border-t">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    {i18n.language === 'ar' ? 'إطار قانوني معياري' : 'Standard Legal Framework'}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {i18n.language === 'ar' ? 'متعدد الاختصاصات' : 'Multi-Jurisdiction'}
                  </Badge>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button onClick={generateContract} className="flex-1">
                    {i18n.language === 'ar' ? 'إنشاء العقد' : 'Generate Contract'}
                  </Button>
                  <Button variant="outline">
                    {i18n.language === 'ar' ? 'حفظ كمسودة' : 'Save as Draft'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>{i18n.language === 'ar' ? 'قوالب العقود' : 'Contract Templates'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contractTypes.map((template) => (
                    <Card key={template.value} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="h-6 w-6 text-blue-600" />
                          <h3 className="font-semibold">{template.label}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {i18n.language === 'ar' ? 'قالب معياري متوافق مع القوانين المحلية' : 'Standard template compliant with local laws'}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            {i18n.language === 'ar' ? 'معاينة' : 'Preview'}
                          </Button>
                          <Button size="sm">
                            {i18n.language === 'ar' ? 'استخدام' : 'Use Template'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="review">
            <Card>
              <CardHeader>
                <CardTitle>{i18n.language === 'ar' ? 'مراجعة العقد' : 'Contract Review'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg text-gray-600 mb-2">
                    {i18n.language === 'ar' ? 'لا يوجد عقد للمراجعة' : 'No contract to review'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {i18n.language === 'ar' 
                      ? 'قم بإنشاء عقد أولاً لمراجعته هنا'
                      : 'Create a contract first to review it here'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Web2ContractFormation;
