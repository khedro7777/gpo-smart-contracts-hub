
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Vote, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  TrendingUp,
  Calendar,
  BarChart3
} from 'lucide-react';

const VotingCenter = () => {
  const { language } = useLanguage();
  const [selectedVote, setSelectedVote] = useState<string | null>(null);

  // Mock voting data
  const activeVotes = [
    {
      id: '1',
      title: language === 'ar' ? 'اختيار مورد معدات المكاتب' : 'Office Equipment Supplier Selection',
      description: language === 'ar' ? 'التصويت على أفضل مورد لمعدات المكاتب' : 'Vote for the best office equipment supplier',
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      totalVotes: 12,
      requiredVotes: 15,
      userVoted: false,
      options: [
        { id: 'opt1', text: language === 'ar' ? 'الشركة العربية للمعدات' : 'Arab Equipment Co.', votes: 7 },
        { id: 'opt2', text: language === 'ar' ? 'مكتب الشرق الأوسط' : 'Middle East Office', votes: 3 },
        { id: 'opt3', text: language === 'ar' ? 'الحلول المتقدمة' : 'Advanced Solutions', votes: 2 }
      ]
    },
    {
      id: '2',
      title: language === 'ar' ? 'تعديل شروط العقد' : 'Contract Terms Amendment',
      description: language === 'ar' ? 'التصويت على تعديلات شروط العقد' : 'Vote on contract terms amendments',
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      totalVotes: 8,
      requiredVotes: 10,
      userVoted: true,
      options: [
        { id: 'opt1', text: language === 'ar' ? 'موافق على التعديلات' : 'Approve amendments', votes: 5 },
        { id: 'opt2', text: language === 'ar' ? 'رفض التعديلات' : 'Reject amendments', votes: 3 }
      ]
    }
  ];

  const completedVotes = [
    {
      id: '3',
      title: language === 'ar' ? 'اختيار استراتيجية التسويق' : 'Marketing Strategy Selection',
      result: language === 'ar' ? 'الاستراتيجية الرقمية' : 'Digital Strategy',
      completedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      totalVotes: 18,
      winningPercentage: 67
    },
    {
      id: '4',
      title: language === 'ar' ? 'تخصيص الميزانية' : 'Budget Allocation',
      result: language === 'ar' ? 'الخطة المتوازنة' : 'Balanced Plan',
      completedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      totalVotes: 22,
      winningPercentage: 73
    }
  ];

  const handleVote = (voteId: string, optionId: string) => {
    console.log(`Voting on ${voteId} for option ${optionId}`);
    setSelectedVote(optionId);
    // Here you would typically call an API to submit the vote
  };

  const getTimeRemaining = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return language === 'ar' ? `${days} يوم` : `${days} days`;
    } else if (hours > 0) {
      return language === 'ar' ? `${hours} ساعة` : `${hours} hours`;
    } else {
      return language === 'ar' ? 'أقل من ساعة' : 'Less than 1 hour';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {language === 'ar' ? 'مركز التصويت' : 'Voting Center'}
        </h1>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'شارك في اتخاذ القرارات الجماعية للمجموعات'
            : 'Participate in collective decision-making for groups'
          }
        </p>
      </div>

      {/* Voting Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {language === 'ar' ? 'التصويتات النشطة' : 'Active Votes'}
                </p>
                <p className="text-2xl font-bold text-blue-600">{activeVotes.length}</p>
              </div>
              <Vote className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {language === 'ar' ? 'المشاركة' : 'Participation'}
                </p>
                <p className="text-2xl font-bold text-green-600">87%</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {language === 'ar' ? 'القرارات المتخذة' : 'Decisions Made'}
                </p>
                <p className="text-2xl font-bold text-purple-600">{completedVotes.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  {language === 'ar' ? 'نقاط التصويت' : 'Voting Points'}
                </p>
                <p className="text-2xl font-bold text-orange-600">120</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Voting Interface */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">
            {language === 'ar' ? 'التصويتات النشطة' : 'Active Votes'}
          </TabsTrigger>
          <TabsTrigger value="completed">
            {language === 'ar' ? 'مكتملة' : 'Completed'}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            {language === 'ar' ? 'التحليلات' : 'Analytics'}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="space-y-6">
            {activeVotes.map((vote) => (
              <Card key={vote.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{vote.title}</CardTitle>
                      <p className="text-gray-600 mb-3">{vote.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{getTimeRemaining(vote.deadline)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{vote.totalVotes}/{vote.requiredVotes}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      {vote.userVoted ? (
                        <Badge className="bg-green-100 text-green-800">
                          {language === 'ar' ? 'تم التصويت' : 'Voted'}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          {language === 'ar' ? 'في انتظار التصويت' : 'Pending Vote'}
                        </Badge>
                      )}
                      
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {Math.round((vote.totalVotes / vote.requiredVotes) * 100)}%
                        </p>
                        <Progress 
                          value={(vote.totalVotes / vote.requiredVotes) * 100} 
                          className="w-24"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {vote.options.map((option) => (
                      <div 
                        key={option.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedVote === option.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        } ${vote.userVoted ? 'cursor-not-allowed opacity-75' : ''}`}
                        onClick={() => !vote.userVoted && handleVote(vote.id, option.id)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option.text}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{option.votes}</span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${(option.votes / vote.totalVotes) * 100 || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {!vote.userVoted && (
                    <div className="mt-4 pt-4 border-t">
                      <Button 
                        className="w-full"
                        disabled={!selectedVote}
                        onClick={() => selectedVote && handleVote(vote.id, selectedVote)}
                      >
                        {language === 'ar' ? 'تأكيد التصويت' : 'Submit Vote'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="space-y-4">
            {completedVotes.map((vote) => (
              <Card key={vote.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{vote.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {vote.completedDate.toLocaleDateString(
                              language === 'ar' ? 'ar-SA' : 'en-US'
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{vote.totalVotes} {language === 'ar' ? 'صوت' : 'votes'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-green-600 mb-1">
                        {vote.result}
                      </p>
                      <p className="text-sm text-gray-600">
                        {vote.winningPercentage}% {language === 'ar' ? 'موافقة' : 'approval'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  {language === 'ar' ? 'إحصائيات التصويت' : 'Voting Statistics'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>{language === 'ar' ? 'متوسط المشاركة:' : 'Average Participation:'}</span>
                    <span className="font-semibold">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'ar' ? 'إجمالي القرارات:' : 'Total Decisions:'}</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'ar' ? 'معدل الإجماع:' : 'Consensus Rate:'}</span>
                    <span className="font-semibold">73%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{language === 'ar' ? 'وقت القرار المتوسط:' : 'Avg Decision Time:'}</span>
                    <span className="font-semibold">3.2 {language === 'ar' ? 'أيام' : 'days'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'التصويتات القادمة' : 'Upcoming Votes'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="font-medium text-yellow-800">
                      {language === 'ar' ? 'تحديث سياسة الخصوصية' : 'Privacy Policy Update'}
                    </p>
                    <p className="text-sm text-yellow-600">
                      {language === 'ar' ? 'يبدأ خلال 3 أيام' : 'Starts in 3 days'}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-800">
                      {language === 'ar' ? 'اختيار شريك تقني جديد' : 'New Tech Partner Selection'}
                    </p>
                    <p className="text-sm text-blue-600">
                      {language === 'ar' ? 'يبدأ خلال 5 أيام' : 'Starts in 5 days'}
                    </p>
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

export default VotingCenter;
