
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Globe,
  Target,
  DollarSign
} from 'lucide-react';

interface InvestmentOpportunity {
  id: string;
  title: string;
  description: string;
  industry: string;
  investmentRange: string;
  expectedReturns: string;
  timeline: string;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'active' | 'funded' | 'closed';
  currentFunding: number;
  targetFunding: number;
  investors: number;
  country: string;
}

interface InvestmentOpportunityCardProps {
  opportunity: InvestmentOpportunity;
  onInvest: (id: string) => void;
  onViewDetails: (id: string) => void;
}

const InvestmentOpportunityCard: React.FC<InvestmentOpportunityCardProps> = ({
  opportunity,
  onInvest,
  onViewDetails
}) => {
  const { language } = useLanguage();

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'funded': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const fundingProgress = (opportunity.currentFunding / opportunity.targetFunding) * 100;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{opportunity.title}</CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">{opportunity.description}</p>
          </div>
          <div className="flex flex-col gap-2 ml-4">
            <Badge className={getStatusColor(opportunity.status)}>
              {opportunity.status}
            </Badge>
            <Badge className={getRiskColor(opportunity.riskLevel)}>
              {opportunity.riskLevel} risk
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Section */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>{formatCurrency(opportunity.currentFunding)}</span>
            <span className="font-semibold">{formatCurrency(opportunity.targetFunding)}</span>
          </div>
          <Progress value={fundingProgress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {Math.round(fundingProgress)}% {language === 'ar' ? 'مكتمل' : 'funded'}
          </p>
        </div>

        {/* Investment Details Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-green-600" />
            <span>{opportunity.expectedReturns}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span>{opportunity.timeline}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-600" />
            <span>{opportunity.investors} {language === 'ar' ? 'مستثمر' : 'investors'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-orange-600" />
            <span>{opportunity.country}</span>
          </div>
        </div>

        {/* Investment Range */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">
              {language === 'ar' ? 'نطاق الاستثمار' : 'Investment Range'}
            </span>
          </div>
          <span className="font-semibold text-green-600">{opportunity.investmentRange}</span>
        </div>

        {/* Industry Tag */}
        <div className="text-center">
          <Badge variant="outline" className="text-xs">
            {opportunity.industry}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={() => onViewDetails(opportunity.id)}
          >
            {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
          </Button>
          <Button 
            className="flex-1"
            onClick={() => onInvest(opportunity.id)}
            disabled={opportunity.status !== 'active'}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'استثمر الآن' : 'Invest Now'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentOpportunityCard;
