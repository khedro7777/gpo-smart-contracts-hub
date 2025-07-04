
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGroupVoting } from '@/hooks/useGroupVoting';
import { Vote, Clock, CheckCircle, Users } from 'lucide-react';

interface GroupVotingProps {
  groupId: string;
  userRole: 'member' | 'admin' | 'creator';
}

const GroupVoting: React.FC<GroupVotingProps> = ({ groupId, userRole }) => {
  const { language } = useLanguage();
  const { votingSessions, userVotes, loading, castVote } = useGroupVoting(groupId);
  const [selectedCandidates, setSelectedCandidates] = useState<{ [key: string]: string[] }>({});
  const [voting, setVoting] = useState<{ [key: string]: boolean }>({});

  const handleCandidateSelection = (sessionId: string, candidateId: string) => {
    const currentSelections = selectedCandidates[sessionId] || [];
    const session = votingSessions.find(s => s.id === sessionId);
    const maxSelections = session?.max_selections || 1;

    if (currentSelections.includes(candidateId)) {
      // Remove candidate
      setSelectedCandidates(prev => ({
        ...prev,
        [sessionId]: currentSelections.filter(id => id !== candidateId)
      }));
    } else if (currentSelections.length < maxSelections) {
      // Add candidate
      setSelectedCandidates(prev => ({
        ...prev,
        [sessionId]: [...currentSelections, candidateId]
      }));
    }
  };

  const handleVote = async (sessionId: string) => {
    const selections = selectedCandidates[sessionId] || [];
    if (selections.length === 0) return;

    setVoting(prev => ({ ...prev, [sessionId]: true }));
    const success = await castVote(sessionId, selections);
    if (success) {
      setSelectedCandidates(prev => ({ ...prev, [sessionId]: [] }));
    }
    setVoting(prev => ({ ...prev, [sessionId]: false }));
  };

  const hasUserVoted = (sessionId: string) => {
    return userVotes.some(vote => vote.voting_session_id === sessionId);
  };

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'admin_election': return 'bg-blue-100 text-blue-800';
      case 'decision': return 'bg-green-100 text-green-800';
      case 'contract_approval': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSessionTypeText = (type: string) => {
    switch (type) {
      case 'admin_election': return language === 'ar' ? 'انتخاب المشرفين' : 'Admin Election';
      case 'decision': return language === 'ar' ? 'قرار' : 'Decision';
      case 'contract_approval': return language === 'ar' ? 'موافقة العقد' : 'Contract Approval';
      default: return type;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {votingSessions.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {language === 'ar' ? 'لا توجد جلسات تصويت' : 'No voting sessions'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'لم يتم إنشاء أي جلسة تصويت في هذه المجموعة بعد'
                : 'No voting sessions have been created in this group yet'
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        votingSessions.map((session) => {
          const userHasVoted = hasUserVoted(session.id);
          const currentSelections = selectedCandidates[session.id] || [];
          const isVoting = voting[session.id] || false;

          return (
            <Card key={session.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Vote className="h-5 w-5" />
                    {session.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getSessionTypeColor(session.type)}>
                      {getSessionTypeText(session.type)}
                    </Badge>
                    {session.status === 'completed' && (
                      <Badge variant="outline" className="text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {language === 'ar' ? 'مكتمل' : 'Completed'}
                      </Badge>
                    )}
                    {userHasVoted && (
                      <Badge variant="outline" className="text-blue-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {language === 'ar' ? 'صوت' : 'Voted'}
                      </Badge>
                    )}
                  </div>
                </div>
                {session.description && (
                  <p className="text-gray-600">{session.description}</p>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {session.deadline && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>
                      {language === 'ar' ? 'الموعد النهائي:' : 'Deadline:'} {' '}
                      {new Date(session.deadline).toLocaleString()}
                    </span>
                  </div>
                )}

                {session.type === 'admin_election' && session.candidates.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {language === 'ar' ? 'المرشحون' : 'Candidates'} 
                      <span className="text-sm text-gray-600">
                        ({language === 'ar' ? 'اختر' : 'Select'} {session.max_selections})
                      </span>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {session.candidates.map((candidateId) => (
                        <div key={candidateId} className="flex items-center space-x-2 p-3 border rounded-lg">
                          <Checkbox
                            checked={currentSelections.includes(candidateId)}
                            onCheckedChange={() => handleCandidateSelection(session.id, candidateId)}
                            disabled={userHasVoted || session.status !== 'active'}
                          />
                          <span className="flex-1">
                            {/* This would normally show the candidate name from profiles */}
                            {language === 'ar' ? 'مرشح' : 'Candidate'} {candidateId.slice(-8)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!userHasVoted && session.status === 'active' && (
                  <div className="flex justify-end pt-4">
                    <Button 
                      onClick={() => handleVote(session.id)}
                      disabled={currentSelections.length === 0 || isVoting}
                    >
                      {isVoting 
                        ? (language === 'ar' ? 'جاري التصويت...' : 'Voting...') 
                        : (language === 'ar' ? 'تصويت' : 'Vote')
                      }
                    </Button>
                  </div>
                )}

                {session.status === 'completed' && session.results && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">
                      {language === 'ar' ? 'النتائج' : 'Results'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'ar' ? 'تفاصيل النتائج قيد التطوير' : 'Results details under development'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default GroupVoting;
