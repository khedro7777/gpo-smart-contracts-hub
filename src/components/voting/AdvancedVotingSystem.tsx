
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Vote, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  BarChart3,
  FileText,
  MessageSquare,
  Calendar,
  Target,
  TrendingUp,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Minus
} from 'lucide-react';

const AdvancedVotingSystem = () => {
  const { language } = useLanguage();
  const [activeVotes, setActiveVotes] = useState<any[]>([]);
  const [completedVotes, setCompletedVotes] = useState<any[]>([]);
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});

  useEffect(() => {
    loadVotingData();
  }, []);

  const loadVotingData = () => {
    setActiveVotes([
      {
        id: 'vote-001',
        title: language === 'en' ? 'Contract Terms Amendment - Project Alpha' : 'تعديل شروط العقد - مشروع ألفا',
        description: language === 'en' 
          ? 'Proposal to modify delivery timeline from 30 days to 45 days due to additional requirements'
          : 'اقتراح لتعديل موعد التسليم من 30 يوم إلى 45 يوم بسبب المتطلبات الإضافية',
        type: 'contract_amendment',
        status: 'active',
        startDate: '2024-01-15',
        endDate: '2024-01-22',
        totalVoters: 12,
        votesFor: 8,
        votesAgainst: 2,
        abstentions: 0,
        remainingVoters: 2,
        proposer: {
          name: language === 'en' ? 'Ahmed Hassan' : 'أحمد حسن',
          role: 'Project Manager',
          avatar: '/api/placeholder/40/40'
        },
        requiredQuorum: 75,
        currentQuorum: 83,
        details: {
          currentTerms: language === 'en' ? 'Delivery within 30 days' : 'التسليم خلال 30 يوم',
          proposedTerms: language === 'en' ? 'Delivery within 45 days with additional features' : 'التسليم خلال 45 يوم مع ميزات إضافية',
          impact: language === 'en' ? 'Budget increase of $500, extended timeline' : 'زيادة الميزانية بـ 500 دولار، تمديد الجدول الزمني'
        }
      },
      {
        id: 'vote-002',
        title: language === 'en' ? 'New Supplier Selection - Office Supplies' : 'اختيار مورد جديد - المستلزمات المكتبية',
        description: language === 'en' 
          ? 'Vote to approve TechSupply Co. as our new office supplies vendor based on competitive pricing'
          : 'التصويت لاعتماد شركة TechSupply كمورد جديد للمستلزمات المكتبية بناءً على الأسعار التنافسية',
        type: 'supplier_selection',
        status: 'active',
        startDate: '2024-01-18',
        endDate: '2024-01-25',
        totalVoters: 8,
        votesFor: 5,
        votesAgainst: 1,
        abstentions: 1,
        remainingVoters: 1,
        proposer: {
          name: language === 'en' ? 'Sarah Miller' : 'سارة ميلر',
          role: 'Procurement Lead',
          avatar: '/api/placeholder/40/40'
        },
        requiredQuorum: 70,
        currentQuorum: 87,
        details: {
          currentSupplier: language === 'en' ? 'OfficeMax Solutions' : 'شركة OfficeMax للحلول',
          proposedSupplier: language === 'en' ? 'TechSupply Co.' : 'شركة TechSupply',
          savings: language === 'en' ? '15% cost reduction, better delivery terms' : 'خفض التكلفة بنسبة 15%، شروط تسليم أفضل'
        }
      }
    ]);

    setCompletedVotes([
      {
        id: 'vote-003',
        title: language === 'en' ? 'Budget Allocation - Q1 2024' : 'توزيع الميزانية - الربع الأول 2024',
        description: language === 'en' 
          ? 'Approved budget distribution for marketing, development, and operations'
          : 'توزيع الميزانية المعتمد للتسويق والتطوير والعمليات',
        type: 'budget_allocation',
        status: 'approved',
        completedDate: '2024-01-10',
        totalVoters: 15,
        votesFor: 12,
        votesAgainst: 2,
        abstentions: 1,
        finalQuorum: 93,
        result: 'approved'
      }
    ]);
  };

  const handleVote = (voteId: string, choice: 'for' | 'against' | 'abstain') => {
    setUserVotes(prev => ({ ...prev, [voteId]: choice }));
    
    // Update vote counts
    setActiveVotes(prev => 
      prev.map(vote => {
        if (vote.id === voteId) {
          const updatedVote = { ...vote };
          
          // Remove previous vote if exists
          if (userVotes[voteId]) {
            if (userVotes[voteId] === 'for') updatedVote.votesFor--;
            else if (userVotes[voteId] === 'against') updatedVote.votesAgainst--;
            else updatedVote.abstentions--;
          } else {
            updatedVote.remainingVoters--;
          }
          
          // Add new vote
          if (choice === 'for') updatedVote.votesFor++;
          else if (choice === 'against') updatedVote.votesAgainst++;
          else updatedVote.abstentions++;
          
          // Update quorum
          const totalVoted = updatedVote.votesFor + updatedVote.votesAgainst + updatedVote.abstentions;
          updatedVote.currentQuorum = Math.round((totalVoted / updatedVote.totalVoters) * 100);
          
          return updatedVote;
        }
        return vote;
      })
    );
  };

  const getVoteTypeIcon = (type: string) => {
    switch (type) {
      case 'contract_amendment': return <FileText className="h-5 w-5" />;
      case 'supplier_selection': return <Users className="h-5 w-5" />;
      case 'budget_allocation': return <BarChart3 className="h-5 w-5" />;
      default: return <Vote className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <Vote className="h-4 w-4" />;
    }
  };

  const calculateTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
      return language === 'en' ? `${diffDays} days remaining` : `${diffDays} أيام متبقية`;
    } else {
      return language === 'en' ? 'Voting ended' : 'انتهى التصويت';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Vote className="h-8 w-8 mr-3 text-blue-600" />
            {language === 'en' ? 'Group Voting System' : 'نظام التصويت الجماعي'}
          </h2>
          <p className="text-gray-600 mt-2">
            {language === 'en' 
              ? 'Participate in group decisions and track voting progress'
              : 'شارك في القرارات الجماعية وتتبع تقدم التصويت'
            }
          </p>
        </div>
      </div>

      {/* Voting Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{language === 'en' ? 'Active Votes' : 'التصويتات النشطة'}</p>
                <p className="text-2xl font-bold text-blue-600">{activeVotes.length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{language === 'en' ? 'Completed Votes' : 'التصويتات المكتملة'}</p>
                <p className="text-2xl font-bold text-green-600">{completedVotes.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{language === 'en' ? 'Your Participation' : 'مشاركتك'}</p>
                <p className="text-2xl font-bold text-purple-600">85%</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{language === 'en' ? 'Avg. Quorum' : 'متوسط النصاب'}</p>
                <p className="text-2xl font-bold text-orange-600">78%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">
            {language === 'en' ? 'Active Votes' : 'التصويتات النشطة'}
          </TabsTrigger>
          <TabsTrigger value="completed">
            {language === 'en' ? 'Completed Votes' : 'التصويتات المكتملة'}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === 'en' ? 'Analytics' : 'التحليلات'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeVotes.map((vote) => (
            <Card key={vote.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="text-blue-600 mt-1">
                      {getVoteTypeIcon(vote.type)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{vote.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {vote.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(vote.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(vote.status)}
                        <span>{language === 'en' ? 'Active' : 'نشط'}</span>
                      </div>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Proposer Info */}
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar>
                    <AvatarImage src={vote.proposer.avatar} />
                    <AvatarFallback>{vote.proposer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{vote.proposer.name}</p>
                    <p className="text-sm text-gray-600">{vote.proposer.role}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-sm text-gray-600">{language === 'en' ? 'Proposed on' : 'مقترح في'}</p>
                    <p className="text-sm font-medium">{vote.startDate}</p>
                  </div>
                </div>

                {/* Vote Details */}
                {vote.details && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">
                        {language === 'en' ? 'Current Terms' : 'الشروط الحالية'}
                      </h4>
                      <p className="text-sm text-blue-700">{vote.details.currentTerms || vote.details.currentSupplier}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">
                        {language === 'en' ? 'Proposed Change' : 'التغيير المقترح'}
                      </h4>
                      <p className="text-sm text-blue-700">{vote.details.proposedTerms || vote.details.proposedSupplier}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900 mb-1">
                        {language === 'en' ? 'Impact' : 'التأثير'}
                      </h4>
                      <p className="text-sm text-blue-700">{vote.details.impact || vote.details.savings}</p>
                    </div>
                  </div>
                )}

                {/* Voting Progress */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{language === 'en' ? 'Voting Progress' : 'تقدم التصويت'}</h4>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{calculateTimeRemaining(vote.endDate)}</p>
                      <p className="text-sm font-medium">
                        {language === 'en' ? 'Quorum:' : 'النصاب:'} {vote.currentQuorum}% 
                        ({language === 'en' ? 'Required:' : 'مطلوب:'} {vote.requiredQuorum}%)
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <ThumbsUp className="h-5 w-5 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-green-600">{vote.votesFor}</p>
                      <p className="text-sm text-green-700">{language === 'en' ? 'For' : 'مع'}</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <ThumbsDown className="h-5 w-5 text-red-600" />
                      </div>
                      <p className="text-2xl font-bold text-red-600">{vote.votesAgainst}</p>
                      <p className="text-sm text-red-700">{language === 'en' ? 'Against' : 'ضد'}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center mb-2">
                        <Minus className="h-5 w-5 text-gray-600" />
                      </div>
                      <p className="text-2xl font-bold text-gray-600">{vote.abstentions}</p>
                      <p className="text-sm text-gray-700">{language === 'en' ? 'Abstain' : 'امتناع'}</p>
                    </div>
                  </div>

                  <Progress value={vote.currentQuorum} className="h-2" />
                  
                  <p className="text-sm text-gray-600 text-center">
                    {vote.remainingVoters} {language === 'en' ? 'members haven\'t voted yet' : 'عضو لم يصوت بعد'}
                  </p>
                </div>

                {/* Voting Actions */}
                {!userVotes[vote.id] ? (
                  <div className="flex space-x-3 justify-center">
                    <Button 
                      onClick={() => handleVote(vote.id, 'for')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Vote For' : 'صوت مع'}
                    </Button>
                    <Button 
                      onClick={() => handleVote(vote.id, 'against')}
                      variant="destructive"
                    >
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Vote Against' : 'صوت ضد'}
                    </Button>
                    <Button 
                      onClick={() => handleVote(vote.id, 'abstain')}
                      variant="outline"
                    >
                      <Minus className="h-4 w-4 mr-2" />
                      {language === 'en' ? 'Abstain' : 'امتناع'}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-blue-800 font-medium">
                      {language === 'en' ? 'You voted:' : 'صوتك:'} {
                        userVotes[vote.id] === 'for' ? (language === 'en' ? 'For' : 'مع') :
                        userVotes[vote.id] === 'against' ? (language === 'en' ? 'Against' : 'ضد') :
                        language === 'en' ? 'Abstain' : 'امتناع'
                      }
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => {
                        setUserVotes(prev => {
                          const newVotes = { ...prev };
                          delete newVotes[vote.id];
                          return newVotes;
                        });
                      }}
                    >
                      {language === 'en' ? 'Change Vote' : 'تغيير الصوت'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedVotes.map((vote) => (
            <Card key={vote.id} className="opacity-75">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{vote.title}</h3>
                    <p className="text-gray-600 mb-3">{vote.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{language === 'en' ? 'Completed:' : 'مكتمل:'} {vote.completedDate}</span>
                      <span>{language === 'en' ? 'Final Quorum:' : 'النصاب النهائي:'} {vote.finalQuorum}%</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(vote.result)}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(vote.result)}
                      <span>
                        {vote.result === 'approved' ? (language === 'en' ? 'Approved' : 'موافق عليه') :
                         language === 'en' ? 'Rejected' : 'مرفوض'}
                      </span>
                    </div>
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-2 bg-green-50 rounded">
                    <p className="font-bold text-green-600">{vote.votesFor}</p>
                    <p className="text-xs text-green-700">{language === 'en' ? 'For' : 'مع'}</p>
                  </div>
                  <div className="p-2 bg-red-50 rounded">
                    <p className="font-bold text-red-600">{vote.votesAgainst}</p>
                    <p className="text-xs text-red-700">{language === 'en' ? 'Against' : 'ضد'}</p>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <p className="font-bold text-gray-600">{vote.abstentions}</p>
                    <p className="text-xs text-gray-700">{language === 'en' ? 'Abstain' : 'امتناع'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Participation Trends' : 'اتجاهات المشاركة'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'en' ? 'Average Participation' : 'متوسط المشاركة'}</span>
                    <span className="font-semibold">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'en' ? 'Quick Response Rate' : 'معدل الاستجابة السريعة'}</span>
                    <span className="font-semibold">76%</span>
                  </div>
                  <Progress value={76} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{language === 'en' ? 'Consensus Rate' : 'معدل الإجماع'}</span>
                    <span className="font-semibold">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Vote Categories' : 'فئات التصويت'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm text-gray-600">{language === 'en' ? 'Contract Amendments' : 'تعديلات العقود'}</span>
                    </div>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-green-600" />
                      <span className="text-sm text-gray-600">{language === 'en' ? 'Supplier Decisions' : 'قرارات الموردين'}</span>
                    </div>
                    <span className="font-semibold">30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2 text-purple-600" />
                      <span className="text-sm text-gray-600">{language === 'en' ? 'Budget Allocations' : 'توزيع الميزانيات'}</span>
                    </div>
                    <span className="font-semibold">25%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedVotingSystem;
