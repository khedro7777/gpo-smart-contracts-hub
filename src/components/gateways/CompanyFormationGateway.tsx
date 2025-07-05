
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { GatewayService } from '@/services/GatewayService';
import { useCountries } from '@/hooks/useCountriesData';
import { Building2, Users, FileText, Globe, DollarSign, Shield, Clock, CheckCircle } from 'lucide-react';

interface CompanyFormationData {
  companyName: string;
  incorporationCountry: string;
  businessType: string;
  shareCapital: string;
  foundersCount: number;
  businessObjective: string;
  isGroupFormation: boolean;
  industry: string;
  expectedRevenue: string;
  employeeCount: number;
  bankingRequirements: string[];
  legalServices: string[];
  additionalServices: string[];
  timeline: string;
  budget: string;
}

const CompanyFormationGateway: React.FC = () => {
  const { t } = useTranslation(['common', 'dashboard']);
  const { toast } = useToast();
  const { data: countries } = useCountries();
  const [activeTab, setActiveTab] = useState('formation');
  const [formData, setFormData] = useState<CompanyFormationData>({
    companyName: '',
    incorporationCountry: '',
    businessType: '',
    shareCapital: '',
    foundersCount: 1,
    businessObjective: '',
    isGroupFormation: false,
    industry: '',
    expectedRevenue: '',
    employeeCount: 0,
    bankingRequirements: [],
    legalServices: [],
    additionalServices: [],
    timeline: '',
    budget: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const businessTypes = [
    { 
      value: 'llc', 
      label: t('Limited Liability Company'),
      description: t('Flexible structure for small to medium businesses'),
      features: [t('Limited liability protection'), t('Tax flexibility'), t('Operational simplicity')]
    },
    { 
      value: 'corporation', 
      label: t('Corporation'),
      description: t('Suitable for larger businesses with multiple shareholders'),
      features: [t('Stock issuance'), t('Professional management'), t('Growth potential')]
    },
    { 
      value: 'partnership', 
      label: t('Partnership'),
      description: t('Business owned by two or more partners'),
      features: [t('Shared profits and losses'), t('Joint liability'), t('Flexible management')]
    },
    { 
      value: 'sole_proprietorship', 
      label: t('Sole Proprietorship'),
      description: t('Single-owner business structure'),
      features: [t('Complete control'), t('Simple setup'), t('Direct taxation')]
    },
    { 
      value: 'cooperative', 
      label: t('Cooperative'),
      description: t('Member-owned business organization'),
      features: [t('Democratic control'), t('Member benefits'), t('Social impact')]
    }
  ];

  const industries = [
    { value: 'technology', label: t('Technology & Software') },
    { value: 'finance', label: t('Financial Services') },
    { value: 'healthcare', label: t('Healthcare & Medical') },
    { value: 'education', label: t('Education & Training') },
    { value: 'retail', label: t('Retail & E-commerce') },
    { value: 'manufacturing', label: t('Manufacturing') },
    { value: 'consulting', label: t('Consulting & Professional Services') },
    { value: 'real_estate', label: t('Real Estate') },
    { value: 'hospitality', label: t('Hospitality & Tourism') },
    { value: 'other', label: t('Other') }
  ];

  const bankingServices = [
    { value: 'business_account', label: t('Business Bank Account') },
    { value: 'merchant_services', label: t('Merchant Services') },
    { value: 'business_loans', label: t('Business Loans') },
    { value: 'credit_facilities', label: t('Credit Facilities') },
    { value: 'international_banking', label: t('International Banking') }
  ];

  const legalServices = [
    { value: 'trademark', label: t('Trademark Registration') },
    { value: 'contracts', label: t('Contract Templates') },
    { value: 'compliance', label: t('Regulatory Compliance') },
    { value: 'intellectual_property', label: t('Intellectual Property') },
    { value: 'employment_law', label: t('Employment Law') }
  ];

  const additionalServices = [
    { value: 'accounting', label: t('Accounting Setup') },
    { value: 'tax_planning', label: t('Tax Planning') },
    { value: 'insurance', label: t('Business Insurance') },
    { value: 'registered_office', label: t('Registered Office') },
    { value: 'virtual_office', label: t('Virtual Office Services') }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const request = await GatewayService.submitRequest('company_formation', formData);
      if (request) {
        toast({
          title: t('Formation Request Submitted'),
          description: t('Your company formation request has been submitted successfully'),
        });
        // Reset form or redirect
      }
    } catch (error) {
      toast({
        title: t('Error'),
        description: t('Failed to submit company formation request'),
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleArrayItem = (array: string[], item: string, setter: (value: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">{t('Company Formation Gateway')}</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('Establish your company with expert guidance in multiple jurisdictions. Choose between solo or group formation.')}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="formation">{t('Company Formation')}</TabsTrigger>
            <TabsTrigger value="services">{t('Additional Services')}</TabsTrigger>
            <TabsTrigger value="tracking">{t('Track Progress')}</TabsTrigger>
            <TabsTrigger value="resources">{t('Resources')}</TabsTrigger>
          </TabsList>

          <TabsContent value="formation" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className={`cursor-pointer transition-colors ${!formData.isGroupFormation ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, isGroupFormation: false }))}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    {t('Solo Formation')}
                  </CardTitle>
                  <CardDescription>
                    {t('Form your company independently with full control over decisions')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {t('Complete ownership control')}</li>
                    <li>• {t('Faster decision making')}</li>
                    <li>• {t('Direct communication with authorities')}</li>
                    <li>• {t('Streamlined process')}</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className={`cursor-pointer transition-colors ${formData.isGroupFormation ? 'ring-2 ring-blue-500' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, isGroupFormation: true }))}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    {t('Group Formation')}
                  </CardTitle>
                  <CardDescription>
                    {t('Collaborate with partners to establish a joint company')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {t('Shared costs and responsibilities')}</li>
                    <li>• {t('Collaborative decision making')}</li>
                    <li>• {t('Built-in voting and governance')}</li>
                    <li>• {t('Risk distribution')}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('Company Formation Details')}</CardTitle>
                <CardDescription>
                  {t('Provide the necessary information for your company formation')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">{t('Company Name')}</Label>
                      <Input
                        id="companyName"
                        placeholder={t('Enter company name')}
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="incorporationCountry">{t('Incorporation Country')}</Label>
                      <Select value={formData.incorporationCountry} onValueChange={(value) => setFormData(prev => ({ ...prev, incorporationCountry: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('Select country')} />
                        </SelectTrigger>
                        <SelectContent>
                          {countries?.map((country) => (
                            <SelectItem key={country.id} value={country.code}>
                              <div className="flex items-center gap-2">
                                <span>{country.flag_emoji}</span>
                                <span>{country.name_en}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>{t('Business Type')}</Label>
                    <div className="grid md:grid-cols-1 gap-4">
                      {businessTypes.map((type) => (
                        <Card 
                          key={type.value}
                          className={`cursor-pointer transition-colors ${formData.businessType === type.value ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                          onClick={() => setFormData(prev => ({ ...prev, businessType: type.value }))}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="font-medium text-lg">{type.label}</div>
                                <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {type.features.map((feature, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              {formData.businessType === type.value && (
                                <CheckCircle className="h-5 w-5 text-blue-600" />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="industry">{t('Industry')}</Label>
                      <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('Select industry')} />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry.value} value={industry.value}>
                              {industry.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shareCapital">{t('Initial Share Capital')}</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="shareCapital"
                          placeholder="0.00"
                          value={formData.shareCapital}
                          onChange={(e) => setFormData(prev => ({ ...prev, shareCapital: e.target.value }))}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="foundersCount">{t('Number of Founders')}</Label>
                      <Input
                        id="foundersCount"
                        type="number"
                        min="1"
                        value={formData.foundersCount}
                        onChange={(e) => setFormData(prev => ({ ...prev, foundersCount: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessObjective">{t('Business Objective')}</Label>
                    <Textarea
                      id="businessObjective"
                      placeholder={t('Describe the main business activities and objectives')}
                      value={formData.businessObjective}
                      onChange={(e) => setFormData(prev => ({ ...prev, businessObjective: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {t('Legal Documentation Included')}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {t('Multi-Jurisdiction Support')}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      {t('Compliance Guaranteed')}
                    </Badge>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting 
                        ? t('Processing...')
                        : formData.isGroupFormation 
                          ? t('Create Formation Group') 
                          : t('Start Formation Process')
                      }
                    </Button>
                    <Button type="button" variant="outline">
                      {t('Save as Draft')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('Additional Services')}</CardTitle>
                <CardDescription>
                  {t('Select additional services to complete your business setup')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>{t('Banking Requirements')}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {bankingServices.map((service) => (
                      <div
                        key={service.value}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.bankingRequirements.includes(service.value)
                            ? 'bg-blue-50 border-blue-300'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => toggleArrayItem(
                          formData.bankingRequirements,
                          service.value,
                          (newServices) => setFormData(prev => ({ ...prev, bankingRequirements: newServices }))
                        )}
                      >
                        <p className="font-medium">{service.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>{t('Legal Services')}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {legalServices.map((service) => (
                      <div
                        key={service.value}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.legalServices.includes(service.value)
                            ? 'bg-green-50 border-green-300'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => toggleArrayItem(
                          formData.legalServices,
                          service.value,
                          (newServices) => setFormData(prev => ({ ...prev, legalServices: newServices }))
                        )}
                      >
                        <p className="font-medium">{service.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>{t('Additional Services')}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {additionalServices.map((service) => (
                      <div
                        key={service.value}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.additionalServices.includes(service.value)
                            ? 'bg-purple-50 border-purple-300'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => toggleArrayItem(
                          formData.additionalServices,
                          service.value,
                          (newServices) => setFormData(prev => ({ ...prev, additionalServices: newServices }))
                        )}
                      >
                        <p className="font-medium">{service.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking">
            <Card>
              <CardHeader>
                <CardTitle>{t('Track Formation Progress')}</CardTitle>
                <CardDescription>
                  {t('Monitor the status of your company formation requests')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{t('No formation requests to track')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>{t('Formation Resources')}</CardTitle>
                <CardDescription>
                  {t('Helpful guides and resources for company formation')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{t('Resource library coming soon')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyFormationGateway;
