
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGroupDiscussions } from '@/hooks/useGroupDiscussions';
import { MessageSquare, Send, AlertTriangle, Lightbulb, Megaphone } from 'lucide-react';

interface GroupDiscussionsProps {
  groupId: string;
}

const GroupDiscussions: React.FC<GroupDiscussionsProps> = ({ groupId }) => {
  const { language } = useLanguage();
  const { discussions, loading, postMessage } = useGroupDiscussions(groupId);
  const [newMessage, setNewMessage] = useState('');
  const [messageType, setMessageType] = useState<'general' | 'suggestion' | 'complaint' | 'admin_notice'>('general');
  const [posting, setPosting] = useState(false);

  const handlePostMessage = async () => {
    if (!newMessage.trim()) return;

    setPosting(true);
    const success = await postMessage(newMessage, messageType);
    if (success) {
      setNewMessage('');
      setMessageType('general');
    }
    setPosting(false);
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'suggestion': return <Lightbulb className="h-4 w-4 text-yellow-600" />;
      case 'complaint': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'admin_notice': return <Megaphone className="h-4 w-4 text-blue-600" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'suggestion': return 'bg-yellow-100 text-yellow-800';
      case 'complaint': return 'bg-red-100 text-red-800';
      case 'admin_notice': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMessageTypeText = (type: string) => {
    switch (type) {
      case 'suggestion': return language === 'ar' ? 'اقتراح' : 'Suggestion';
      case 'complaint': return language === 'ar' ? 'شكوى' : 'Complaint';
      case 'admin_notice': return language === 'ar' ? 'إشعار إداري' : 'Admin Notice';
      default: return language === 'ar' ? 'عام' : 'General';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Post New Message */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {language === 'ar' ? 'مشاركة رسالة جديدة' : 'Post New Message'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <Textarea
                placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-3">
              <Select value={messageType} onValueChange={(value: any) => setMessageType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      {language === 'ar' ? 'عام' : 'General'}
                    </div>
                  </SelectItem>
                  <SelectItem value="suggestion">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      {language === 'ar' ? 'اقتراح' : 'Suggestion'}
                    </div>
                  </SelectItem>
                  <SelectItem value="complaint">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      {language === 'ar' ? 'شكوى' : 'Complaint'}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={handlePostMessage} 
                disabled={posting || !newMessage.trim()}
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                {posting 
                  ? (language === 'ar' ? 'جاري الإرسال...' : 'Posting...') 
                  : (language === 'ar' ? 'إرسال' : 'Post')
                }
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {discussions.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'ar' ? 'لا توجد مناقشات' : 'No discussions yet'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'كن أول من يبدأ المناقشة في هذه المجموعة'
                  : 'Be the first to start a discussion in this group'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          discussions.map((discussion) => (
            <Card key={discussion.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getMessageTypeIcon(discussion.message_type)}
                    <Badge className={getMessageTypeColor(discussion.message_type)}>
                      {getMessageTypeText(discussion.message_type)}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(discussion.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap">{discussion.message}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default GroupDiscussions;
