
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, FileText, Globe, DollarSign } from 'lucide-react';
import { useCountries } from '@/hooks/useCountriesData';

interface CompanyFormationData {
  companyName: string;
  incorporationCountry: string;
  businessType: string;
  shareCapital: string;
  foundersCount: number;
  businessObjective: string;
  isGroupFormation: boolean;
}

const CompanyFormationGateway: React.FC = () => {
  const { t } = useTranslation(['common', 'dashboard']);
  const { data: countries } = useCountries();
  
  const [formData, setFormData] = useState<CompanyFormationData>({
    companyName: '',
    incorporationCountry: '',
    businessType: '',
    shareCapital: '',
    foundersCount: 1,
    businessObjective: '',
    isGroupFormation: false,
  });

  const businessTypes = [
    { value: 'llc', label: t('Limited Liability Company'), description: t('Flexible structure for small to medium businesses') },
    { value: 'corporation', label: t('Corporation'), description: t('Suitable for larger businesses with multiple shareholders') },
    { value: 'partnership', label: t('Partnership'), description: t('Business owned by two or more partners') },
    { value: 'sole_proprietorship', label: t('Sole Proprietorship'), description: t('Single-owner business structure') },
    { value: 'cooperative', label: t('Cooperative'), description: t('Member-owned business organization') },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Company Formation Data:', formData);
    // Handle form submission
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">{t('Company Formation Gateway')}</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('Establish your company with expert guidance in multiple jurisdictions. Choose between solo or group formation.')}
          </p>
        </div>

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

              <div className="space-y-2">
                <Label>{t('Business Type')}</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {businessTypes.map((type) => (
                    <Card 
                      key={type.value}
                      className={`cursor-pointer transition-colors ${formData.businessType === type.value ? 'ring-2 ring-blue-500' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, businessType: type.value }))}
                    >
                      <CardContent className="p-4">
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
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
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  {formData.isGroupFormation ? t('Create Formation Group') : t('Start Formation Process')}
                </Button>
                <Button type="button" variant="outline">
                  {t('Save as Draft')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyFormationGateway;
