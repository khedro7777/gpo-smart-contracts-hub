
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import { 
  Send, 
  Mic, 
  MicOff, 
  Paperclip, 
  Bot, 
  User, 
  Zap, 
  Settings,
  RotateCcw,
  Download,
  Share2
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

const AIPromptBox = () => {
  const { i18n } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: i18n.language === 'ar' 
        ? 'مرحباً! أنا مساعد GPO الذكي. كيف يمكنني مساعدتك اليوم في إدارة أعمالك وتحسين عمليات الشراء؟'
        : 'Hello! I\'m your intelligent GPO assistant. How can I help you today with your business management and procurement optimization?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!prompt.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: prompt,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setPrompt('');
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      role: 'assistant',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      
      const aiResponse: Message = {
        id: (Date.now() + 2).toString(),
        content: i18n.language === 'ar'
          ? `فهمت طلبك "${prompt}". دعني أحلل البيانات وأقدم لك أفضل التوصيات لتحسين عمليات الشراء وإدارة الموردين.`
          : `I understand your request "${prompt}". Let me analyze the data and provide you with the best recommendations for optimizing procurement and supplier management.`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice recognition implementation would go here
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedPrompts = [
    i18n.language === 'ar' ? 'تحليل أنماط الإنفاق الحالية' : 'Analyze current spending patterns',
    i18n.language === 'ar' ? 'العثور على موردين جدد' : 'Find new suppliers',
    i18n.language === 'ar' ? 'تحسين استراتيجية المفاوضات' : 'Optimize negotiation strategy',
    i18n.language === 'ar' ? 'إنشاء تقرير المخاطر' : 'Generate risk assessment report'
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">
              {i18n.language === 'ar' ? 'مساعد GPO الذكي' : 'GPO AI Assistant'}
            </h2>
            <p className="text-sm text-gray-500">
              {i18n.language === 'ar' ? 'نشط الآن' : 'Active now'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>
            
            <div className={`max-w-[70%] ${message.role === 'user' ? 'text-right' : ''}`}>
              <div className={`rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border shadow-sm'
              }`}>
                {message.isTyping ? (
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{message.content}</p>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1 px-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length === 1 && (
        <div className="px-6 pb-4">
          <p className="text-sm text-gray-600 mb-3">
            {i18n.language === 'ar' ? 'اقتراحات للبداية:' : 'Suggested prompts:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setPrompt(suggestion)}
                className="text-xs h-8"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                i18n.language === 'ar'
                  ? 'اكتب رسالتك هنا... (اضغط Enter للإرسال)'
                  : 'Type your message here... (Press Enter to send)'
              }
              className="min-h-[60px] max-h-[200px] resize-none pr-20 text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              disabled={isLoading}
            />
            
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceInput}
                className="h-8 w-8 p-0"
                disabled={isLoading}
              >
                {isListening ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                disabled={isLoading}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={handleSendMessage}
                disabled={!prompt.trim() || isLoading}
                size="sm"
                className="h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {i18n.language === 'ar' ? 'مدعوم بـ GPO AI' : 'Powered by GPO AI'}
              </Badge>
              <span>
                {i18n.language === 'ar' ? 'الوضع الذكي نشط' : 'Smart mode active'}
              </span>
            </div>
            <Button variant="ghost" size="sm" className="h-6 text-xs">
              <RotateCcw className="h-3 w-3 mr-1" />
              {i18n.language === 'ar' ? 'محادثة جديدة' : 'New conversation'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPromptBox;
