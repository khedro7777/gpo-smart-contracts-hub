
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useTranslation } from 'react-i18next';
import { ChevronUp, ChevronDown, Maximize2, Minimize2 } from 'lucide-react';

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
  const [isExpanded, setIsExpanded] = useState(false);

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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setIsCollapsed(false);
    }
  };

  if (isMinimized) {
    return <MinimizedButton onExpand={() => setIsMinimized(false)} />;
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
      isExpanded 
        ? 'w-full max-w-2xl h-[80vh]' 
        : 'w-full max-w-sm sm:w-96 max-w-[calc(100vw-2rem)]'
    }`}>
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm h-full flex flex-col">
        <div className="flex items-center justify-between p-4">
          <MCPHeader onMinimize={() => setIsMinimized(true)} />
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="h-6 w-6 p-0"
            >
              {isExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
            </Button>
          </div>
        </div>
        
        <div className="px-4 pb-3">
          <ModeSelector activeMode={activeMode} onModeChange={setActiveMode} />
        </div>

        <Collapsible open={!isCollapsed} onOpenChange={setIsCollapsed} className="flex-1 flex flex-col">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-between p-2 flex-shrink-0">
              <span className="text-sm">
                {i18n.language === 'ar' ? 'المحتوى' : 'Content'}
              </span>
              {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">
              <MCPContent activeMode={activeMode} />
            </div>
            
            <div className="px-4 pb-4 flex-shrink-0">
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
