
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

interface GroupInvitation {
  id: number;
  name: string;
  invitedBy: string;
  members: number;
  expiresIn: string;
}

interface GroupInvitationsProps {
  invitations: GroupInvitation[];
}

const GroupInvitations: React.FC<GroupInvitationsProps> = ({ invitations }) => {
  const { language } = useLanguage();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('pendingInvitations', language)}</CardTitle>
        <CardDescription>
          {t('groupInvitationsDesc', language)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {invitations.map((invitation) => (
            <div key={invitation.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{invitation.name}</h3>
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? 'Invited by' : 'دعوة من'}: {invitation.invitedBy}
                  </p>
                  <p className="text-sm text-gray-500">
                    {invitation.members} {t('members', language)}
                  </p>
                  <p className="text-sm text-red-500 mt-1">
                    {language === 'en' ? 'Expires in' : 'تنتهي في'}: {invitation.expiresIn}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  {t('decline', language)}
                </Button>
                <Button size="sm">
                  {t('accept', language)}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupInvitations;
