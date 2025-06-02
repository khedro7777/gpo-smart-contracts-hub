
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { 
  Scale, 
  AlertTriangle, 
  FileText, 
  Clock, 
  CheckCircle,
  Upload,
  Users,
  Gavel
} from 'lucide-react';

const SupplierArbitration = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('request');
  const [disputeForm, setDisputeForm] = useState({
    type: '',
    description: '',
    groupId: '',
    memberId: '',
    proposedResolution: ''
  });

  const disputeCases = [
    {
      id: 'DIS-001',
      type: 'Payment Dispute',
      status: 'Under Review',
      progress: 25,
      createdAt: '2025-01-15',
      groupName: 'Tech Startup Collective'
    },
    {
      id: 'DIS-002',
      type: 'Quality Dispute',
      status: 'Evidence Collection',
      progress: 50,
      createdAt: '2025-01-10',
      groupName: 'Healthcare Procurement Alliance'
    }
  ];

  const handleSubmitDispute = () => {
    console.log('Submitting dispute:', disputeForm);
    // Handle form submission
  };

  return (
    <DashboardLayout role="supplier">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Scale className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold">{t('orda', language)}</h1>
            <p className="text-gray-600">{t('disputeResolution', language)}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('request')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'request'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('requestArbitration', language)}
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'cases'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {t('caseTimeline', language)}
          </button>
        </div>

        {activeTab === 'request' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Dispute Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gavel className="h-5 w-5" />
                    {t('arbitrationRequest', language)}
                  </CardTitle>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Fill out the form below to request arbitration for your dispute'
                      : 'املأ النموذج أدناه لطلب التحكيم في نزاعك'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t('disputeType', language)}</Label>
                      <Select value={disputeForm.type} onValueChange={(value) => 
                        setDisputeForm({...disputeForm, type: value})
                      }>
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'en' ? 'Select dispute type' : 'اختر نوع النزاع'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="payment">{t('paymentDispute', language)}</SelectItem>
                          <SelectItem value="quality">{t('qualityDispute', language)}</SelectItem>
                          <SelectItem value="delivery">{t('deliveryDispute', language)}</SelectItem>
                          <SelectItem value="contract">{t('contractViolation', language)}</SelectItem>
                          <SelectItem value="member">{t('memberConflict', language)}</SelectItem>
                          <SelectItem value="voting">{t('votingDispute', language)}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>{t('groupSerialNumber', language)}</Label>
                      <Input 
                        placeholder="GRP-001" 
                        value={disputeForm.groupId}
                        onChange={(e) => setDisputeForm({...disputeForm, groupId: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t('memberID', language)}</Label>
                      <Input 
                        placeholder="MEM-001" 
                        value={disputeForm.memberId}
                        onChange={(e) => setDisputeForm({...disputeForm, memberId: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t('disputeTicketID', language)}</Label>
                      <Input 
                        placeholder={language === 'en' ? 'Auto-generated' : 'يتم إنشاؤه تلقائياً'} 
                        disabled 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>{t('disputeDescription', language)}</Label>
                    <Textarea 
                      placeholder={language === 'en' 
                        ? 'Provide detailed description of the dispute...' 
                        : 'قدم وصفاً تفصيلياً للنزاع...'
                      }
                      rows={4}
                      value={disputeForm.description}
                      onChange={(e) => setDisputeForm({...disputeForm, description: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>{t('proposedResolution', language)}</Label>
                    <Select value={disputeForm.proposedResolution} onValueChange={(value) => 
                      setDisputeForm({...disputeForm, proposedResolution: value})
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'en' ? 'Select proposed resolution' : 'اختر الحل المقترح'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="suspension">{t('temporarySuspension', language)}</SelectItem>
                        <SelectItem value="revote">{t('revote', language)}</SelectItem>
                        <SelectItem value="removal">{t('memberRemoval', language)}</SelectItem>
                        <SelectItem value="escalation">{t('escalation', language)}</SelectItem>
                        <SelectItem value="unknown">{t('unknown', language)}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>{t('evidenceUpload', language)}</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600">
                        {language === 'en' 
                          ? 'Upload supporting documents, screenshots, or evidence'
                          : 'تحميل المستندات الداعمة أو لقطات الشاشة أو الأدلة'
                        }
                      </p>
                      <Button variant="outline" className="mt-2">
                        {language === 'en' ? 'Choose Files' : 'اختر الملفات'}
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handleSubmitDispute} className="w-full">
                    {t('requestArbitration', language)}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Arbitration Info */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{t('appointArbitrators', language)}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    {t('suggestArbitrators', language)}
                  </Button>
                  <Button variant="outline" className="w-full">
                    {t('requestSpecialists', language)}
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    {language === 'en' ? 'Important Notice' : 'إشعار مهم'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p>{t('allPartiesNotified', language)}</p>
                    <p>{t('operationsFrozen', language)}</p>
                    <p className="text-yellow-600">
                      {t('responseRequired', language)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'cases' && (
          <div className="space-y-6">
            {/* Active Cases */}
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'My Dispute Cases' : 'قضايا النزاع الخاصة بي'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disputeCases.map((case_item) => (
                    <div key={case_item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">{case_item.id}</h3>
                          <p className="text-sm text-gray-600">{case_item.type}</p>
                          <p className="text-sm text-gray-500">{case_item.groupName}</p>
                        </div>
                        <Badge variant={case_item.status === 'Under Review' ? 'secondary' : 'default'}>
                          {case_item.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{language === 'en' ? 'Progress' : 'التقدم'}</span>
                          <span>{case_item.progress}%</span>
                        </div>
                        <Progress value={case_item.progress} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-gray-500">
                          {language === 'en' ? 'Created:' : 'تم الإنشاء:'} {case_item.createdAt}
                        </span>
                        <Button variant="outline" size="sm">
                          {language === 'en' ? 'View Details' : 'عرض التفاصيل'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>{t('caseTimeline', language)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{t('requestReceived', language)}</p>
                      <p className="text-sm text-gray-500">2025-01-15 10:30 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{t('underReview', language)}</p>
                      <p className="text-sm text-gray-500">2025-01-15 2:00 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <FileText className="h-4 w-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-400">{t('evidenceCollection', language)}</p>
                      <p className="text-sm text-gray-400">{language === 'en' ? 'Pending' : 'قيد الانتظار'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SupplierArbitration;
