
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Scale, Clock, Shield, FileText, Users, CheckCircle, AlertCircle } from 'lucide-react';

const Arbitration = () => {
  const { language } = useLanguage();
  const [disputeForm, setDisputeForm] = useState({
    disputeType: '',
    groupId: '',
    description: '',
    proposedResolution: '',
    priority: ''
  });

  const disputeTypes = [
    { value: 'payment', label: language === 'en' ? 'Payment Dispute' : 'نزاع دفع' },
    { value: 'quality', label: language === 'en' ? 'Quality Dispute' : 'نزاع جودة' },
    { value: 'delivery', label: language === 'en' ? 'Delivery Dispute' : 'نزاع تسليم' },
    { value: 'contract', label: language === 'en' ? 'Contract Violation' : 'انتهاك عقد' },
    { value: 'member', label: language === 'en' ? 'Member Conflict' : 'صراع أعضاء' },
    { value: 'voting', label: language === 'en' ? 'Voting Dispute' : 'نزاع تصويت' },
  ];

  const features = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: language === 'en' ? 'Fast Resolution' : 'حل سريع',
      description: language === 'en' 
        ? 'Average resolution time of 7-14 days'
        : 'متوسط وقت الحل 7-14 يومًا'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: language === 'en' ? 'Secure Process' : 'عملية آمنة',
      description: language === 'en' 
        ? 'Confidential and legally binding'
        : 'سرية وملزمة قانونيًا'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: language === 'en' ? 'Expert Arbitrators' : 'محكمون خبراء',
      description: language === 'en' 
        ? 'Industry specialists and legal experts'
        : 'متخصصون في الصناعة وخبراء قانونيون'
    }
  ];

  const mockCases = [
    {
      id: 'ARB-2024-001',
      type: language === 'en' ? 'Payment Dispute' : 'نزاع دفع',
      status: language === 'en' ? 'Under Review' : 'قيد المراجعة',
      submittedDate: '2024-01-15',
      priority: 'high'
    },
    {
      id: 'ARB-2024-002',
      type: language === 'en' ? 'Quality Dispute' : 'نزاع جودة',
      status: language === 'en' ? 'In Arbitration' : 'في التحكيم',
      submittedDate: '2024-01-10',
      priority: 'medium'
    },
    {
      id: 'ARB-2024-003',
      type: language === 'en' ? 'Contract Violation' : 'انتهاك عقد',
      status: language === 'en' ? 'Resolved' : 'محلول',
      submittedDate: '2024-01-05',
      priority: 'low'
    }
  ];

  const handleSubmitDispute = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dispute submitted:', disputeForm);
    // Handle dispute submission logic
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Under Review' || status === 'قيد المراجعة') {
      return <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>;
    } else if (status === 'In Arbitration' || status === 'في التحكيم') {
      return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>;
    } else if (status === 'Resolved' || status === 'محلول') {
      return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
    }
    return <Badge>{status}</Badge>;
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === 'high') {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    } else if (priority === 'medium') {
      return <Clock className="h-4 w-4 text-yellow-500" />;
    }
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Scale className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'en' ? 'Commercial Arbitration (ORDA)' : 'التحكيم التجاري (ORDA)'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Our Online Dispute Resolution system provides fast, fair, and binding arbitration for commercial disputes within the GPO platform.'
              : 'يوفر نظام حل النزاعات الإلكتروني لدينا تحكيمًا سريعًا وعادلًا وملزمًا للنزاعات التجارية داخل منصة GPO.'
            }
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">
              {language === 'en' ? 'Overview' : 'نظرة عامة'}
            </TabsTrigger>
            <TabsTrigger value="submit">
              {language === 'en' ? 'Submit Dispute' : 'إرسال نزاع'}
            </TabsTrigger>
            <TabsTrigger value="cases">
              {language === 'en' ? 'My Cases' : 'قضاياي'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {language === 'en' ? 'How It Works' : 'كيف يعمل'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                      <span>{language === 'en' ? 'Submit your dispute with evidence' : 'اقدم نزاعك مع الأدلة'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                      <span>{language === 'en' ? 'All parties are notified' : 'يتم إشعار جميع الأطراف'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                      <span>{language === 'en' ? 'Arbitrator reviews evidence' : 'يراجع المحكم الأدلة'}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                      <span>{language === 'en' ? 'Binding decision is issued' : 'يصدر قرار ملزم'}</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{language === 'en' ? 'Dispute Types' : 'أنواع النزاعات'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {disputeTypes.map((type) => (
                      <div key={type.value} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Scale className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">{type.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Submit Dispute' : 'إرسال نزاع'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Provide details about your dispute for review'
                    : 'قدم تفاصيل نزاعك للمراجعة'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitDispute} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{language === 'en' ? 'Dispute Type' : 'نوع النزاع'} *</Label>
                      <Select value={disputeForm.disputeType} onValueChange={(value) => setDisputeForm({...disputeForm, disputeType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'en' ? 'Select dispute type' : 'اختر نوع النزاع'} />
                        </SelectTrigger>
                        <SelectContent>
                          {disputeTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="groupId">
                        {language === 'en' ? 'Group ID' : 'معرف المجموعة'} *
                      </Label>
                      <Input
                        id="groupId"
                        value={disputeForm.groupId}
                        onChange={(e) => setDisputeForm({...disputeForm, groupId: e.target.value})}
                        placeholder={language === 'en' ? 'Enter group ID' : 'أدخل معرف المجموعة'}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">
                      {language === 'en' ? 'Dispute Description' : 'وصف النزاع'} *
                    </Label>
                    <Textarea
                      id="description"
                      value={disputeForm.description}
                      onChange={(e) => setDisputeForm({...disputeForm, description: e.target.value})}
                      placeholder={language === 'en' 
                        ? 'Provide detailed description of the dispute...'
                        : 'قدم وصفًا مفصلاً للنزاع...'
                      }
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proposedResolution">
                      {language === 'en' ? 'Proposed Resolution' : 'الحل المقترح'}
                    </Label>
                    <Textarea
                      id="proposedResolution"
                      value={disputeForm.proposedResolution}
                      onChange={(e) => setDisputeForm({...disputeForm, proposedResolution: e.target.value})}
                      placeholder={language === 'en' 
                        ? 'What resolution would you like to see?'
                        : 'ما الحل الذي تود رؤيته؟'
                      }
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    {language === 'en' ? 'Submit Dispute' : 'إرسال النزاع'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cases">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'My Arbitration Cases' : 'قضايا التحكيم الخاصة بي'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Track the status of your submitted disputes'
                    : 'تتبع حالة النزاعات المرسلة'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCases.map((case_) => (
                    <div key={case_.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{case_.id}</h3>
                          {getPriorityIcon(case_.priority)}
                        </div>
                        {getStatusBadge(case_.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{case_.type}</p>
                      <p className="text-xs text-gray-500">
                        {language === 'en' ? 'Submitted:' : 'تم الإرسال:'} {case_.submittedDate}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Arbitration;
