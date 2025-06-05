
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from 'react-i18next';
import { Send, Mic, Paperclip, Zap } from 'lucide-react';

interface InputAreaProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  isListening: boolean;
  onVoiceInput: () => void;
}

const InputArea: React.FC<InputAreaProps> = ({
  message,
  setMessage,
  onSendMessage,
  isListening,
  onVoiceInput
}) => {
  const { i18n } = useTranslation();

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            placeholder={
              i18n.language === 'ar' 
                ? 'كيف يمكنني مساعدتك في عملك اليوم؟'
                : 'How can I help you with your business today?'
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[60px] resize-none pr-20 text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSendMessage();
              }
            }}
          />
          <div className="absolute bottom-2 right-2 flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={onVoiceInput}
            >
              <Mic className={`h-3 w-3 ${isListening ? 'text-red-500' : 'text-gray-500'}`} />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Paperclip className="h-3 w-3 text-gray-500" />
            </Button>
          </div>
        </div>
        <Button 
          onClick={onSendMessage}
          disabled={!message.trim()}
          className="h-10 w-10 p-0 bg-blue-600 hover:bg-blue-700 flex-shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>
          {i18n.language === 'ar' ? 'مدعوم بـ GPO AI' : 'Powered by GPO AI'}
        </span>
        <span className="flex items-center gap-1">
          <Zap className="h-3 w-3" />
          {i18n.language === 'ar' ? 'الوضع الذكي' : 'Smart Mode'}
        </span>
      </div>
    </div>
  );
};

export default InputArea;
