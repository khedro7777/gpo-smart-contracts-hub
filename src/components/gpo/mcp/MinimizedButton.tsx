
import React from 'react';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

interface MinimizedButtonProps {
  onExpand: () => void;
}

const MinimizedButton: React.FC<MinimizedButtonProps> = ({ onExpand }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button
        onClick={onExpand}
        className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
      >
        <Brain className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};

export default MinimizedButton;
