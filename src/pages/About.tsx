
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import GPOMachine from '@/components/GPOMachine';

const About = () => {
  const { language } = useLanguage();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          {language === 'en' ? 'About GPO' : 'عن GPO'}
        </h1>
        
        <div className="max-w-3xl mx-auto prose lg:prose-xl">
          {language === 'en' ? (
            <>
              <p>
                GPO is a revolutionary platform that combines the power of group purchasing with smart contracts and AI-driven negotiation. Our mission is to simplify complex business transactions and make collaborative purchasing accessible to everyone.
              </p>
              
              <h2>Our Vision</h2>
              <p>
                To create a transparent, efficient marketplace where businesses and individuals can join forces, reduce costs, and build trust through smart contracting and collaborative decision-making.
              </p>
              
              <h2>What Makes Us Different</h2>
              <ul>
                <li><strong>AI-Powered Assistant:</strong> Our GPO Machine guides users through every step of the process, from group formation to contract execution.</li>
                <li><strong>Blockchain Security:</strong> Contracts and agreements are securely documented and stored on IPFS for maximum security and transparency.</li>
                <li><strong>Multi-Language Support:</strong> We're committed to serving a global audience with full support for Arabic and English interfaces.</li>
                <li><strong>Fair Dispute Resolution:</strong> Our Orda arbitration system ensures that conflicts are resolved fairly and efficiently.</li>
              </ul>
              
              <h2>Our Team</h2>
              <p>
                GPO was founded by a team of experts in procurement, contract law, and blockchain technology. We combine decades of experience to create a platform that addresses the real challenges of business transactions.
              </p>
            </>
          ) : (
            <>
              <p>
                GPO هي منصة ثورية تجمع بين قوة الشراء الجماعي مع العقود الذكية والتفاوض المدعوم بالذكاء الاصطناعي. مهمتنا هي تبسيط المعاملات التجارية المعقدة وجعل الشراء التعاوني متاحًا للجميع.
              </p>
              
              <h2>رؤيتنا</h2>
              <p>
                إنشاء سوق شفافة وفعالة حيث يمكن للشركات والأفراد توحيد قواهم، وتقليل التكاليف، وبناء الثقة من خلال التعاقد الذكي وصنع القرار التعاوني.
              </p>
              
              <h2>ما الذي يميزنا</h2>
              <ul>
                <li><strong>مساعد مدعوم بالذكاء الاصطناعي:</strong> يوجه GPO Machine المستخدمين من خلال كل خطوة من خطوات العملية، من تكوين المجموعة إلى تنفيذ العقد.</li>
                <li><strong>أمان البلوكتشين:</strong> يتم توثيق العقود والاتفاقيات وتخزينها بشكل آمن على IPFS لتحقيق أقصى قدر من الأمان والشفافية.</li>
                <li><strong>دعم متعدد اللغات:</strong> نحن ملتزمون بخدمة جمهور عالمي مع دعم كامل للواجهات العربية والإنجليزية.</li>
                <li><strong>حل النزاعات العادل:</strong> يضمن نظام التحكيم Orda لدينا حل النزاعات بشكل عادل وفعال.</li>
              </ul>
              
              <h2>فريقنا</h2>
              <p>
                تم تأسيس GPO من قبل فريق من الخبراء في مجال المشتريات وقانون العقود وتكنولوجيا البلوكتشين. نحن نجمع بين عقود من الخبرة لإنشاء منصة تعالج التحديات الحقيقية للمعاملات التجارية.
              </p>
            </>
          )}
        </div>
      </div>
      
      <GPOMachine />
    </Layout>
  );
};

export default About;
