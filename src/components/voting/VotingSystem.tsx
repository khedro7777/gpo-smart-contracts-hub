
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';

interface VotingOption {
  id: number;
  text: string;
  votes: number;
}

interface VotingProps {
  title: string;
  description?: string;
  options: VotingOption[];
  totalVotes: number;
  requiredVotes: number;
  endDate: string;
  isOpen: boolean;
  onVote?: (optionId: number) => void;
}

const VotingSystem: React.FC<VotingProps> = ({ 
  title, 
  description, 
  options, 
  totalVotes, 
  requiredVotes, 
  endDate, 
  isOpen,
  onVote 
}) => {
  const { language } = useLanguage();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  
  const handleVote = () => {
    if (selectedOption !== null && !hasVoted && onVote) {
      onVote(selectedOption);
      setHasVoted(true);
    }
  };
  
  const getPercentage = (votes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <Badge className={isOpen ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
            {isOpen ? t('active', language) : t('votingClosed', language)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            {options.map((option) => (
              <div key={option.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {!hasVoted && isOpen ? (
                      <input
                        type="radio"
                        name="vote"
                        id={`option-${option.id}`}
                        checked={selectedOption === option.id}
                        onChange={() => setSelectedOption(option.id)}
                        className="w-4 h-4"
                      />
                    ) : null}
                    <label htmlFor={`option-${option.id}`} className="text-sm font-medium">{option.text}</label>
                  </div>
                  <span className="text-sm font-medium">{getPercentage(option.votes)}%</span>
                </div>
                <Progress value={getPercentage(option.votes)} className="h-2" />
                <div className="text-xs text-gray-500">{option.votes} {t('votes', language)}</div>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 text-sm">
            <div>
              <span className="font-medium">{t('votesRequired', language)}:</span> {requiredVotes}
            </div>
            <div>
              <span className="font-medium">{t('voteEnds', language)}:</span> {endDate}
            </div>
            <div>
              <span className="font-medium">{t('totalVotes', language)}:</span> {totalVotes}
            </div>
          </div>
        </div>
      </CardContent>
      {isOpen && !hasVoted && (
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleVote}
            disabled={selectedOption === null}
          >
            {t('voteNow', language)}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default VotingSystem;
