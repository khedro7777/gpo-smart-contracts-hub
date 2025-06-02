
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send, Bot, User, Mic, MicOff } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick_reply' | 'custom';
}

interface QuickReply {
  content_type: string;
  title: string;
  payload: string;
}

const RasaChatbot = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'en' 
        ? 'Hello! I\'m your GPO assistant. How can I help you today?' 
        : 'مرحباً! أنا مساعد GPO الخاص بك. كيف يمكنني مساعدتك اليوم؟',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Simulate Rasa API call
      const response = await simulateRasaResponse(text, language);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'en' 
          ? 'Sorry, I encountered an error. Please try again.' 
          : 'عذراً، واجهت خطأ. يرجى المحاولة مرة أخرى.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateRasaResponse = async (text: string, lang: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const lowercaseText = text.toLowerCase();
    
    // Intent recognition simulation
    if (lowercaseText.includes('price') || lowercaseText.includes('cost') || lowercaseText.includes('سعر') || lowercaseText.includes('تكلفة')) {
      return {
        text: lang === 'en' 
          ? 'I can help you with pricing information. Would you like to see current market prices or get a quote for specific products?'
          : 'يمكنني مساعدتك في معلومات التسعير. هل تريد رؤية أسعار السوق الحالية أم الحصول على عرض أسعار لمنتجات محددة؟'
      };
    }

    if (lowercaseText.includes('group') || lowercaseText.includes('join') || lowercaseText.includes('مجموعة') || lowercaseText.includes('انضمام')) {
      return {
        text: lang === 'en' 
          ? 'I can help you find and join purchasing groups. What type of products are you interested in purchasing?'
          : 'يمكنني مساعدتك في العثور على مجموعات الشراء والانضمام إليها. ما نوع المنتجات التي تهتم بشرائها؟'
      };
    }

    if (lowercaseText.includes('contract') || lowercaseText.includes('agreement') || lowercaseText.includes('عقد') || lowercaseText.includes('اتفاقية')) {
      return {
        text: lang === 'en' 
          ? 'I can assist with contract-related queries. Would you like to create a new contract, review existing ones, or get help with contract terms?'
          : 'يمكنني المساعدة في الاستفسارات المتعلقة بالعقود. هل تريد إنشاء عقد جديد أم مراجعة العقود الموجودة أم الحصول على مساعدة في شروط العقد؟'
      };
    }

    if (lowercaseText.includes('supplier') || lowercaseText.includes('vendor') || lowercaseText.includes('مورد') || lowercaseText.includes('بائع')) {
      return {
        text: lang === 'en' 
          ? 'I can help you find reliable suppliers or manage your supplier relationships. What specific assistance do you need?'
          : 'يمكنني مساعدتك في العثور على موردين موثوقين أو إدارة علاقاتك مع الموردين. ما المساعدة المحددة التي تحتاجها؟'
      };
    }

    // Default response
    return {
      text: lang === 'en' 
        ? 'I understand you\'re asking about procurement. Could you please provide more details so I can assist you better?'
        : 'أفهم أنك تسأل عن المشتريات. هل يمكنك تقديم المزيد من التفاصيل حتى أتمكن من مساعدتك بشكل أفضل؟'
    };
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = language === 'en' ? 'en-US' : 'ar-SA';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          {language === 'en' ? 'GPO Smart Assistant' : 'المساعد الذكي لـ GPO'}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                
                <div className={`max-w-[70%] rounded-lg px-3 py-2 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-gray-600" />
                </div>
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
              placeholder={language === 'en' ? 'Type your message...' : 'اكتب رسالتك...'}
              disabled={isLoading}
              className="flex-1"
            />
            
            <Button
              onClick={handleVoiceInput}
              variant="outline"
              size="icon"
              disabled={isLoading}
              className={isListening ? 'bg-red-100 border-red-300' : ''}
            >
              {isListening ? <MicOff className="h-4 w-4 text-red-600" /> : <Mic className="h-4 w-4" />}
            </Button>
            
            <Button
              onClick={() => sendMessage(inputText)}
              disabled={isLoading || !inputText.trim()}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RasaChatbot;
