
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import WorkflowDiagram from '@/components/WorkflowDiagram';
import GPOMachine from '@/components/GPOMachine';

const HowItWorks = () => {
  const { language } = useLanguage();
  
  const workflowSteps = [
    { id: 'verification', label: language === 'en' ? 'Verification' : 'التحقق' },
    { id: 'registration', label: language === 'en' ? 'Registration' : 'التسجيل' },
    { id: 'verificationInvoice', label: language === 'en' ? 'Verification Invoice' : 'فاتورة التحقق' },
    { id: 'adminPanel', label: language === 'en' ? 'Admin Panel Tasks' : 'مهام لوحة الإدارة' },
    { id: 'serviceSelection', label: language === 'en' ? 'Service Selection' : 'اختيار الخدمة' },
    { id: 'contract', label: language === 'en' ? 'Contract' : 'العقد' },
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          {language === 'en' ? 'How GPO Works' : 'كيف تعمل منصة GPO؟'}
        </h1>
        
        <div className="max-w-4xl mx-auto mb-16">
          <div className="prose lg:prose-xl mx-auto">
            {language === 'en' ? (
              <p className="lead text-xl text-center mb-12">
                GPO simplifies group purchasing and contracting through a structured workflow that ensures transparency, security, and efficiency for all parties involved.
              </p>
            ) : (
              <p className="lead text-xl text-center mb-12">
                تبسط منصة GPO عمليات الشراء الجماعي والتعاقد من خلال سير عمل منظم يضمن الشفافية والأمان والكفاءة لجميع الأطراف المعنية.
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <WorkflowDiagram 
              title={language === 'en' ? 'Client Workflow' : 'سير عمل العميل'}
              steps={workflowSteps}
            />
            
            <WorkflowDiagram 
              title={language === 'en' ? 'Group Buying Workflow' : 'سير عمل الشراء الجماعي'}
              steps={[
                { id: 'verification', label: language === 'en' ? 'Verification' : 'التحقق' },
                { id: 'groupBuying', label: language === 'en' ? 'Group Buying' : 'الشراء التعاوني' },
                { id: 'serviceSelection', label: language === 'en' ? 'Service Selection' : 'اختيار الخدمة' },
                { id: 'verificationInvoice', label: language === 'en' ? 'Verification Invoice' : 'فاتورة التحقق' },
                { id: 'contract', label: language === 'en' ? 'Contract' : 'العقد' },
                { id: 'registration', label: language === 'en' ? 'Registration' : 'التسجيل' },
              ]}
            />
          </div>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'For Clients' : 'للعملاء'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  {language === 'en' 
                    ? '1. Register and verify your account' 
                    : '1. سجل وتحقق من حسابك'}
                </p>
                <p>
                  {language === 'en' 
                    ? '2. Join an existing group or create a new one' 
                    : '2. انضم إلى مجموعة موجودة أو أنشئ مجموعة جديدة'}
                </p>
                <p>
                  {language === 'en' 
                    ? '3. Define your requirements with GPO Machine assistance' 
                    : '3. حدد متطلباتك بمساعدة GPO Machine'}
                </p>
                <p>
                  {language === 'en' 
                    ? '4. Review supplier offers and vote with your group' 
                    : '4. راجع عروض الموردين وصوّت مع مجموعتك'}
                </p>
                <p>
                  {language === 'en' 
                    ? '5. Finalize the contract and make secure payments' 
                    : '5. ضع اللمسات الأخيرة على العقد وقم بإجراء المدفوعات الآمنة'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'For Freelancers' : 'للمستقلين'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  {language === 'en' 
                    ? '1. Create your professional profile' 
                    : '1. أنشئ ملفك الشخصي المهني'}
                </p>
                <p>
                  {language === 'en' 
                    ? '2. Choose between solo or group-based services' 
                    : '2. اختر بين الخدمات الفردية أو القائمة على المجموعات'}
                </p>
                <p>
                  {language === 'en' 
                    ? '3. Receive relevant project opportunities from GPO Machine' 
                    : '3. استلم فرص المشاريع ذات الصلة من GPO Machine'}
                </p>
                <p>
                  {language === 'en' 
                    ? '4. Submit proposals and negotiate terms' 
                    : '4. قدّم العروض وتفاوض على الشروط'}
                </p>
                <p>
                  {language === 'en' 
                    ? '5. Complete projects and get paid securely' 
                    : '5. أكمل المشاريع واحصل على المدفوعات بشكل آمن'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'For Suppliers' : 'للموردين'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  {language === 'en' 
                    ? '1. Register and verify your business' 
                    : '1. سجّل وتحقق من عملك التجاري'}
                </p>
                <p>
                  {language === 'en' 
                    ? '2. Receive RFQs from client groups' 
                    : '2. استلم طلبات عروض الأسعار من مجموعات العملاء'}
                </p>
                <p>
                  {language === 'en' 
                    ? '3. Submit competitive offers with GPO Machine guidance' 
                    : '3. قدم عروضًا تنافسية بإرشاد GPO Machine'}
                </p>
                <p>
                  {language === 'en' 
                    ? '4. Coordinate with winning bids' 
                    : '4. نسق مع العروض الفائزة'}
                </p>
                <p>
                  {language === 'en' 
                    ? '5. Fulfill orders and receive guaranteed payments' 
                    : '5. نفّذ الطلبات واستلم المدفوعات المضمونة'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <GPOMachine />
    </Layout>
  );
};

export default HowItWorks;
