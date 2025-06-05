
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useTranslation } from 'react-i18next';
import { ChevronUp, ChevronDown } from 'lucide-react';

// Import the new components
import MinimizedButton from './mcp/MinimizedButton';
import MCPHeader from './mcp/MCPHeader';
import ModeSelector from './mcp/ModeSelector';
import MCPContent from './mcp/MCPContent';
import InputArea from './mcp/InputArea';

const MCPIntelligenceHub = () => {
  const { i18n } = useTranslation();
  const [activeMode, setActiveMode] = useState<'manual' | 'ai' | 'ask'>('ai');
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Implement voice recognition logic here
  };

  if (isMinimized) {
    return <MinimizedButton onExpand={() => setIsMinimized(false)} />;
  }

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-sm sm:w-96 max-w-[calc(100vw-2rem)] z-40">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <MCPHeader onMinimize={() => setIsMinimized(true)} />
        
        <div className="px-4 pb-3">
          <ModeSelector activeMode={activeMode} onModeChange={setActiveMode} />
        </div>

        <Collapsible open={!isCollapsed} onOpenChange={setIsCollapsed}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-between p-2">
              <span className="text-sm">
                {i18n.language === 'ar' ? 'المحتوى' : 'Content'}
              </span>
              {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <MCPContent activeMode={activeMode} />
            
            <div className="px-4 pb-4">
              <InputArea
                message={message}
                setMessage={setMessage}
                onSendMessage={handleSendMessage}
                isListening={isListening}
                onVoiceInput={handleVoiceInput}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default MCPIntelligenceHub;
