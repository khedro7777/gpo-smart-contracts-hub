
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import PremiumGate from '@/components/premium/PremiumGate';
import { 
  Vote, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Calendar,
  BarChart3
} from 'lucide-react';

interface VotingItem {
  id: string;
  title: string;
  description: string;
  type: 'group_decision' | 'admin_election' | 'contract_approval' | 'budget_allocation';
  status: 'active' | 'completed' | 'pending';
  deadline: string;
  votesFor: number;
  votesAgainst: number;
  totalVoters: number;
  groupName: string;
  userVoted: boolean;
  requiredMajority: number;
}

const VotingCenter = () => {
  const { language } = useLanguage();

  const [votingItems] = useState<VotingItem[]>([
    {
      id: '1',
      title: language === 'ar' ? 'موافقة على عقد موردين جدد' : 'New Supplier Contract Approval',
      description: language === 'ar' 
        ? 'التصويت على الموافقة على عقد مع موردين جدد لمنتجات التقنية'
        : 'Vote to approve contract with new suppliers for technology products',
      type: 'contract_approval',
      status: 'active',
      deadline: '2024-12-15',
      votesFor: 8,
      votesAgainst: 2,
      totalVoters: 15,
      groupName: language === 'ar' ? 'مجموعة الشراء التقني' : 'Tech Procurement Group',
      userVoted: false,
      requiredMajority: 67
    },
    {
      id: '2',
      title: language === 'ar' ? 'انتخاب إدارة المجموعة' : 'Group Admin Election',
      description: language === 'ar'
        ? 'انتخاب أعضاء جدد لإدارة مجموعة التسويق التعاوني'
        : 'Election of new administrators for cooperative marketing group',
      type: 'admin_election',
      status: 'active',
      deadline: '2024-12-20',
      votesFor: 12,
      votesAgainst: 3,
      totalVoters: 25,
      groupName: language === 'ar' ? 'مجموعة التسويق التعاوني' : 'Cooperative Marketing Group',
      userVoted: true,
      requiredMajority: 60
    },
    {
      id: '3',
      title: language === 'ar' ? 'تخصيص الميزانية السنوية' : 'Annual Budget Allocation',
      description: language === 'ar'
        ? 'التصويت على توزيع الميزانية السنوية للمشاريع المختلفة'
        : 'Vote on annual budget distribution for various projects',
      type: 'budget_allocation',
      status: 'completed',
      deadline: '2024-12-01',
      votesFor: 18,
      votesAgainst: 7,
      totalVoters: 25,
      groupName: language === 'ar' ? 'مجموعة الاستثمار' : 'Investment Group',
      userVoted: true,
      requiredMajority: 75
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'admin_election': return Users;
      case 'contract_approval': return CheckCircle;
      case 'budget_allocation': return BarChart3;
      default: return Vote;
    }
  };

  const handleVote = (itemId: string, voteType: 'for' | 'against') => {
    console.log(`Voting ${voteType} on item ${itemId}`);
  };

  const calculateProgress = (item: VotingItem) => {
    return (item.votesFor / item.totalVoters) * 100;
  };

  const isVotePassing = (item: VotingItem) => {
    const currentPercentage = (item.votesFor / (item.votesFor + item.votesAgainst)) * 100;
    return currentPercentage >= item.requiredMajority;
  };

  return (
    <PremiumGate feature={language === 'ar' ? 'مركز التصويت' : 'Voting Center'}>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Vote className="h-8 w-8 text-blue-600" />
              {language === 'ar' ? 'مركز التصويت' : 'Voting Center'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'شارك في القرارات المهمة وانتخابات المجموعات'
                : 'Participate in important decisions and group elections'
              }
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'التصويتات النشطة' : 'Active Votes'}
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {votingItems.filter(item => item.status === 'active').length}
                    </p>
                  </div>
                  <Vote className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'في انتظار تصويتي' : 'Awaiting My Vote'}
                    </p>
                    <p className="text-2xl font-bold text-orange-600">
                      {votingItems.filter(item => item.status === 'active' && !item.userVoted).length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'مكتملة' : 'Completed'}
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {votingItems.filter(item => item.status === 'completed').length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'معدل المشاركة' : 'Participation Rate'}
                    </p>
                    <p className="text-2xl font-bold text-purple-600">85%</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Voting Items */}
          <div className="space-y-6">
            {votingItems.map((item) => {
              const TypeIcon = getTypeIcon(item.type);
              const progress = calculateProgress(item);
              const isPassing = isVotePassing(item);

              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <TypeIcon className="h-5 w-5 text-blue-600" />
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                          {item.userVoted && (
                            <Badge variant="outline" className="text-green-600">
                              {language === 'ar' ? 'تم التصويت' : 'Voted'}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{item.description}</p>
                        <p className="text-sm text-muted-foreground">{item.groupName}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Progress and Stats */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{language === 'ar' ? 'التقدم' : 'Progress'}</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>
                          {language === 'ar' ? 'موافق:' : 'For:'} {item.votesFor} | 
                          {language === 'ar' ? ' مخالف:' : ' Against:'} {item.votesAgainst}
                        </span>
                        <span>
                          {item.votesFor + item.votesAgainst} / {item.totalVoters} {language === 'ar' ? 'صوت' : 'votes'}
                        </span>
                      </div>
                    </div>

                    {/* Voting Status */}
                    <div className="flex items-center gap-2">
                      {isPassing ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm ${isPassing ? 'text-green-600' : 'text-red-600'}`}>
                        {isPassing 
                          ? (language === 'ar' ? 'يمر بالأغلبية المطلوبة' : 'Passing with required majority')
                          : (language === 'ar' ? 'لا يحقق الأغلبية المطلوبة' : 'Not meeting required majority')
                        }
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({item.requiredMajority}% {language === 'ar' ? 'مطلوب' : 'required'})
                      </span>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {language === 'ar' ? 'الموعد النهائي:' : 'Deadline:'} {item.deadline}
                      </span>
                      {item.status === 'active' && (
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>

                    {/* Voting Buttons */}
                    {item.status === 'active' && !item.userVoted && (
                      <div className="flex gap-3 pt-4">
                        <Button 
                          onClick={() => handleVote(item.id, 'for')}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {language === 'ar' ? 'موافق' : 'Vote For'}
                        </Button>
                        <Button 
                          onClick={() => handleVote(item.id, 'against')}
                          variant="outline" 
                          className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          {language === 'ar' ? 'مخالف' : 'Vote Against'}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </PremiumGate>
  );
};

export default VotingCenter;
