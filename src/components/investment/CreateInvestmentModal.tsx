
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building2 } from 'lucide-react';

interface CreateInvestmentModalProps {
  onCreateInvestment: (data: any) => void;
}

const CreateInvestmentModal: React.FC<CreateInvestmentModalProps> = ({ onCreateInvestment }) => {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    industry: '',
    targetFunding: '',
    investmentRange: '',
    expectedReturns: '',
    timeline: '',
    riskLevel: 'medium',
    country: '',
    businessPlan: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateInvestment({
      ...formData,
      targetFunding: parseInt(formData.targetFunding),
      currentFunding: 0,
      investors: 0,
      status: 'active'
    });
    setOpen(false);
    setFormData({
      title: '',
      description: '',
      industry: '',
      targetFunding: '',
      investmentRange: '',
      expectedReturns: '',
      timeline: '',
      riskLevel: 'medium',
      country: '',
      businessPlan: ''
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Building2 className="h-4 w-4 mr-2" />
          {language === 'ar' ? 'إنشاء فرصة استثمارية' : 'Create Investment'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {language === 'ar' ? 'إنشاء فرصة استثمارية جديدة' : 'Create New Investment Opportunity'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">
                {language === 'ar' ? 'عنوان المشروع' : 'Project Title'}
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="industry">
                {language === 'ar' ? 'القطاع' : 'Industry'}
              </Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => handleChange('industry', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">
              {language === 'ar' ? 'وصف المشروع' : 'Project Description'}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="targetFunding">
                {language === 'ar' ? 'الهدف المالي ($)' : 'Target Funding ($)'}
              </Label>
              <Input
                id="targetFunding"
                type="number"
                value={formData.targetFunding}
                onChange={(e) => handleChange('targetFunding', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="investmentRange">
                {language === 'ar' ? 'نطاق الاستثمار' : 'Investment Range'}
              </Label>
              <Input
                id="investmentRange"
                placeholder="e.g., $50K - $500K"
                value={formData.investmentRange}
                onChange={(e) => handleChange('investmentRange', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="expectedReturns">
                {language === 'ar' ? 'العائد المتوقع' : 'Expected Returns'}
              </Label>
              <Input
                id="expectedReturns"
                placeholder="e.g., 25-40%"
                value={formData.expectedReturns}
                onChange={(e) => handleChange('expectedReturns', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="timeline">
                {language === 'ar' ? 'الإطار الزمني' : 'Timeline'}
              </Label>
              <Input
                id="timeline"
                placeholder="e.g., 2-3 years"
                value={formData.timeline}
                onChange={(e) => handleChange('timeline', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="riskLevel">
                {language === 'ar' ? 'مستوى المخاطر' : 'Risk Level'}
              </Label>
              <Select value={formData.riskLevel} onValueChange={(value) => handleChange('riskLevel', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{language === 'ar' ? 'منخفض' : 'Low'}</SelectItem>
                  <SelectItem value="medium">{language === 'ar' ? 'متوسط' : 'Medium'}</SelectItem>
                  <SelectItem value="high">{language === 'ar' ? 'عالي' : 'High'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="country">
              {language === 'ar' ? 'البلد' : 'Country'}
            </Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="businessPlan">
              {language === 'ar' ? 'خطة العمل' : 'Business Plan'}
            </Label>
            <Textarea
              id="businessPlan"
              value={formData.businessPlan}
              onChange={(e) => handleChange('businessPlan', e.target.value)}
              rows={4}
              placeholder={language === 'ar' ? 'اشرح خطة عملك بالتفصيل...' : 'Describe your business plan in detail...'}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button type="submit" className="flex-1">
              {language === 'ar' ? 'إنشاء الفرصة' : 'Create Opportunity'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvestmentModal;
