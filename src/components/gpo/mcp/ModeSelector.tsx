
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Settings, Brain, MessageSquare } from 'lucide-react';

interface ModeSelectorProps {
  activeMode: 'manual' | 'ai' | 'ask';
  onModeChange: (mode: 'manual' | 'ai' | 'ask') => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ activeMode, onModeChange }) => {
  const { i18n } = useTranslation();

  const modes = [
    { key: 'manual', label: i18n.language === 'ar' ? 'يدوي' : 'Manual', icon: <Settings className="h-3 w-3" /> },
    { key: 'ai', label: i18n.language === 'ar' ? 'ذكاء اصطناعي' : 'AI', icon: <Brain className="h-3 w-3" /> },
    { key: 'ask', label: i18n.language === 'ar' ? 'اسأل' : 'Ask', icon: <MessageSquare className="h-3 w-3" /> }
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
      {modes.map((mode) => (
        <Button
          key={mode.key}
          variant={activeMode === mode.key ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onModeChange(mode.key as any)}
          className="flex-1 h-7 text-xs gap-1"
        >
          {mode.icon}
          <span className="hidden sm:inline">{mode.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default ModeSelector;
