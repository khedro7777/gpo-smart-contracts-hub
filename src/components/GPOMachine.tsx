
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const GPOMachine: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: language === 'en' 
        ? 'Hello! I am GPO Machine. How can I help you today?' 
        : 'مرحباً! أنا GPO Machine. كيف يمكنني مساعدتك اليوم؟', 
      isUser: false 
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message
    const newMessage: Message = {
      id: Date.now(),
      text: message,
      isUser: true,
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Simulate GPO response
    setTimeout(() => {
      const gpoResponse: Message = {
        id: Date.now() + 1,
        text: language === 'en' 
          ? 'I understand your request. I am processing it...' 
          : 'أتفهم طلبك. أنا أعالجه...',
        isUser: false,
      };
      setMessages(prev => [...prev, gpoResponse]);
    }, 1000);
  };

  // Position in the middle client zone
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      {isOpen ? (
        <Card className="w-80 md:w-96 shadow-xl">
          <CardHeader className="bg-gpo-blue text-white">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">GPO Machine</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-white/80"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-64 overflow-y-auto p-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`mb-3 ${msg.isUser ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                      msg.isUser
                        ? 'bg-gpo-blue text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-2 p-2 border-t">
            <Input
              placeholder={t('gpoPlaceholder', language)}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}
            />
            <Button onClick={handleSend}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-send ${language === 'ar' ? 'rtl-flip' : ''}`}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Button 
          size="lg"
          className="rounded-full shadow-lg h-14 w-14 flex items-center justify-center bg-gpo-blue hover:bg-gpo-darkBlue"
          onClick={() => setIsOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </Button>
      )}
    </div>
  );
};

export default GPOMachine;
