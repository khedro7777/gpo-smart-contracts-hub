import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGroups, CreateGroupData } from '@/hooks/useGroups';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const CreateGroupDialog = () => {
  const { language } = useLanguage();
  const { createGroup } = useGroups();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateGroupData>({
    name: '',
    description: '',
    type: '',
    service_gateway: '',
    business_objective: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.service_gateway) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }
    
    setLoading(true);
    
    const result = await createGroup(formData);
    if (result) {
      setOpen(false);
      setFormData({
        name: '',
        description: '',
        type: '',
        service_gateway: '',
        business_objective: ''
      });
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          {language === 'ar' ? 'إنشاء مجموعة' : 'Create Group'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {language === 'ar' ? 'إنشاء مجموعة جديدة' : 'Create New Group'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              {language === 'ar' ? 'اسم المجموعة' : 'Group Name'} *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">
              {language === 'ar' ? 'نوع المجموعة' : 'Group Type'} *
            </Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'ar' ? 'اختر النوع' : 'Select Type'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="procurement">{language === 'ar' ? 'شراء تعاوني' : 'Procurement'}</SelectItem>
                <SelectItem value="marketing">{language === 'ar' ? 'تسويق تعاوني' : 'Marketing'}</SelectItem>
                <SelectItem value="company_formation">{language === 'ar' ? 'تأسيس شركات' : 'Company Formation'}</SelectItem>
                <SelectItem value="freelance">{language === 'ar' ? 'مستقلين' : 'Freelance'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="service_gateway">
              {language === 'ar' ? 'بوابة الخدمة' : 'Service Gateway'} *
            </Label>
            <Select value={formData.service_gateway} onValueChange={(value) => setFormData({...formData, service_gateway: value})}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'ar' ? 'اختر البوابة' : 'Select Gateway'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpo">{language === 'ar' ? 'GPO' : 'GPO'}</SelectItem>
                <SelectItem value="arbitration">{language === 'ar' ? 'التحكيم' : 'Arbitration'}</SelectItem>
                <SelectItem value="investment">{language === 'ar' ? 'الاستثمار' : 'Investment'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="business_objective">
              {language === 'ar' ? 'الهدف التجاري' : 'Business Objective'}
            </Label>
            <Textarea
              id="business_objective"
              value={formData.business_objective}
              onChange={(e) => setFormData({...formData, business_objective: e.target.value})}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              {language === 'ar' ? 'الوصف' : 'Description'}
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (language === 'ar' ? 'جاري الإنشاء...' : 'Creating...') : (language === 'ar' ? 'إنشاء' : 'Create')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;
