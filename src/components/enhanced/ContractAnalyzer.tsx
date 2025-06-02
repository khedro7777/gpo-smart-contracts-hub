
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, AlertTriangle, CheckCircle, TrendingUp, Shield, Clock } from 'lucide-react';

interface ContractAnalysis {
  riskScore: number;
  complianceScore: number;
  recommendations: string[];
  keyTerms: string[];
  potentialIssues: string[];
  financialImpact: {
    costSavings: number;
    riskExposure: number;
  };
}

const ContractAnalyzer = () => {
  const { language } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);

  const analyzeContract = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockAnalysis: ContractAnalysis = {
      riskScore: 25,
      complianceScore: 92,
      recommendations: [
        language === 'en' ? 'Add force majeure clause for better risk protection' : 'أضف بند القوة القاهرة لحماية أفضل من المخاطر',
        language === 'en' ? 'Clarify payment terms and penalties' : 'وضح شروط الدفع والغرامات',
        language === 'en' ? 'Include data protection compliance clauses' : 'أدرج بنود الامتثال لحماية البيانات',
        language === 'en' ? 'Review termination conditions' : 'راجع شروط الإنهاء'
      ],
      keyTerms: [
        language === 'en' ? 'Payment within 30 days' : 'الدفع خلال 30 يوماً',
        language === 'en' ? 'Quality assurance requirements' : 'متطلبات ضمان الجودة',
        language === 'en' ? 'Delivery timeline: 45 days' : 'الجدولة الزمنية للتسليم: 45 يوماً',
        language === 'en' ? 'Warranty period: 2 years' : 'فترة الضمان: سنتين'
      ],
      potentialIssues: [
        language === 'en' ? 'Ambiguous delivery terms' : 'شروط تسليم غامضة',
        language === 'en' ? 'Limited liability coverage' : 'تغطية محدودة للمسؤولية',
        language === 'en' ? 'Missing dispute resolution mechanism' : 'آلية حل النزاعات مفقودة'
      ],
      financialImpact: {
        costSavings: 15.5,
        riskExposure: 8.2
      }
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600 bg-green-100';
    if (score < 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getComplianceColor = (score: number) => {
    if (score > 80) return 'text-green-600 bg-green-100';
    if (score > 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {language === 'en' ? 'AI Contract Analyzer' : 'محلل العقود بالذكاء الاصطناعي'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">
                {language === 'en' 
                  ? 'Upload a contract document for AI-powered analysis'
                  : 'ارفع وثيقة عقد للتحليل بالذكاء الاصطناعي'
                }
              </p>
              <Button onClick={analyzeContract} disabled={isAnalyzing}>
                {isAnalyzing 
                  ? (language === 'en' ? 'Analyzing...' : 'جاري التحليل...')
                  : (language === 'en' ? 'Analyze Contract' : 'تحليل العقد')
                }
              </Button>
            </div>
            
            {isAnalyzing && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  {language === 'en' ? 'AI Analysis in Progress...' : 'تحليل الذكاء الاصطناعي قيد التقدم...'}
                </p>
                <Progress value={33} className="h-2" />
                <p className="text-xs text-gray-500">
                  {language === 'en' ? 'Scanning contract terms and conditions...' : 'فحص شروط وأحكام العقد...'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === 'en' ? 'Risk Score' : 'نقاط المخاطر'}
                    </p>
                    <p className="text-2xl font-bold">{analysis.riskScore}%</p>
                  </div>
                  <Badge className={getRiskColor(analysis.riskScore)}>
                    {analysis.riskScore < 30 ? (language === 'en' ? 'Low' : 'منخفض') :
                     analysis.riskScore < 70 ? (language === 'en' ? 'Medium' : 'متوسط') :
                     (language === 'en' ? 'High' : 'عالي')}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === 'en' ? 'Compliance' : 'الامتثال'}
                    </p>
                    <p className="text-2xl font-bold">{analysis.complianceScore}%</p>
                  </div>
                  <Badge className={getComplianceColor(analysis.complianceScore)}>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {language === 'en' ? 'Good' : 'جيد'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === 'en' ? 'Cost Savings' : 'توفير التكلفة'}
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {analysis.financialImpact.costSavings}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      {language === 'en' ? 'Risk Exposure' : 'التعرض للمخاطر'}
                    </p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {analysis.financialImpact.riskExposure}%
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  {language === 'en' ? 'Key Terms Identified' : 'الشروط الرئيسية المحددة'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.keyTerms.map((term, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{term}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="h-5 w-5" />
                  {language === 'en' ? 'Potential Issues' : 'المشاكل المحتملة'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.potentialIssues.map((issue, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm">{issue}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Clock className="h-5 w-5" />
                {language === 'en' ? 'AI Recommendations' : 'توصيات الذكاء الاصطناعي'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {analysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-sm text-blue-900">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ContractAnalyzer;
