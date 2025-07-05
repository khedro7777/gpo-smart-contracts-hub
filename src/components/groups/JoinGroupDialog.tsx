
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle, Clock, Users } from 'lucide-react';

interface JoinGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (acceptTerms: boolean) => void;
  groupName: string;
  pointsRequired: number;
  groupStatus: string;
  isLoading?: boolean;
}

const JoinGroupDialog: React.FC<JoinGroupDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  groupName,
  pointsRequired,
  groupStatus,
  isLoading = false
}) => {
  const { language } = useLanguage();
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleConfirm = () => {
    onConfirm(acceptTerms);
    setAcceptTerms(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setAcceptTerms(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            {language === 'ar' ? 'تأكيد المشاركة' : 'Confirm Participation'}
          </DialogTitle>
          <DialogDescription>
            {language === 'ar' 
              ? `انضمام إلى مجموعة: ${groupName}`
              : `Joining group: ${groupName}`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Terms and Conditions */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">
              {language === 'ar' ? 'الشروط والأحكام:' : 'Terms and Conditions:'}
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                {language === 'ar' 
                  ? '• يجب قبول عقد المجموعة والشروط'
                  : '• You must accept the group contract and terms'
                }
              </li>
              <li>
                {language === 'ar' 
                  ? '• الالتزام بقوانين وآداب المجموعة'
                  : '• Comply with group rules and etiquette'
                }
              </li>
              <li>
                {language === 'ar' 
                  ? '• المشاركة الفعالة في أنشطة المجموعة'
                  : '• Active participation in group activities'
                }
              </li>
            </ul>
          </div>

          {/* Points Information */}
          {pointsRequired > 0 && (
            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">
                  {language === 'ar' ? 'معلومات النقاط' : 'Points Information'}
                </span>
              </div>
              <p className="text-sm text-yellow-700">
                {groupStatus === 'pending_members' ? (
                  language === 'ar' 
                    ? `سيتم حجز ${pointsRequired} نقطة حتى تفعيل المجموعة`
                    : `${pointsRequired} points will be held until group activation`
                ) : (
                  language === 'ar' 
                    ? `سيتم خصم ${pointsRequired} نقطة فوراً`
                    : `${pointsRequired} points will be deducted immediately`
                )}
              </p>
            </div>
          )}

          {/* Group Status */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>
              {language === 'ar' ? 'حالة المجموعة:' : 'Group Status:'} {' '}
              <span className="font-medium">
                {groupStatus === 'pending_members' 
                  ? (language === 'ar' ? 'انتظار الأعضاء' : 'Pending Members')
                  : (language === 'ar' ? 'نشط' : 'Active')
                }
              </span>
            </span>
          </div>

          {/* Accept Terms Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="accept-terms" 
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <label 
              htmlFor="accept-terms" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {language === 'ar' 
                ? 'أوافق على الشروط والأحكام والعقد'
                : 'I agree to the terms, conditions, and contract'
              }
            </label>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleCancel}>
            {language === 'ar' ? 'إلغاء' : 'Cancel'}
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!acceptTerms || isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading 
              ? (language === 'ar' ? 'جاري الانضمام...' : 'Joining...')
              : (language === 'ar' ? 'موافق والانضمام' : 'Agree and Join')
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JoinGroupDialog;
