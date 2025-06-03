
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, Upload, Shield, Download, Eye, Check, Clock } from 'lucide-react';

const ContractDocumentation = () => {
  const { language } = useLanguage();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: language === 'en' ? 'Blockchain Verification' : 'التحقق بالبلوك تشين',
      description: language === 'en' 
        ? 'Immutable document storage and verification'
        : 'تخزين وتحقق الوثائق غير القابل للتغيير'
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: language === 'en' ? 'Digital Signatures' : 'التوقيعات الرقمية',
      description: language === 'en' 
        ? 'Legally binding electronic signatures'
        : 'توقيعات إلكترونية ملزمة قانونيًا'
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: language === 'en' ? 'Interactive Preview' : 'معاينة تفاعلية',
      description: language === 'en' 
        ? 'Real-time document preview and editing'
        : 'معاينة وتحرير الوثائق في الوقت الفعلي'
    }
  ];

  const mockContracts = [
    {
      id: 'DOC-2024-001',
      name: language === 'en' ? 'Supply Agreement - Office Equipment' : 'اتفاقية التوريد - معدات المكاتب',
      status: language === 'en' ? 'Signed' : 'موقع',
      uploadDate: '2024-01-15',
      signers: 3,
      ipfsHash: 'QmX7Zd2...abc123'
    },
    {
      id: 'DOC-2024-002',
      name: language === 'en' ? 'Service Contract - IT Support' : 'عقد خدمة - دعم تقني',
      status: language === 'en' ? 'Pending Signatures' : 'في انتظار التوقيعات',
      uploadDate: '2024-01-12',
      signers: 1,
      ipfsHash: 'QmY8Ae3...def456'
    },
    {
      id: 'DOC-2024-003',
      name: language === 'en' ? 'Partnership Agreement' : 'اتفاقية شراكة',
      status: language === 'en' ? 'Draft' : 'مسودة',
      uploadDate: '2024-01-10',
      signers: 0,
      ipfsHash: null
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      console.log('File uploaded:', file.name);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Signed' || status === 'موقع') {
      return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
    } else if (status === 'Pending Signatures' || status === 'في انتظار التوقيعات') {
      return <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>;
    } else if (status === 'Draft' || status === 'مسودة') {
      return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
    return <Badge>{status}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    if (status === 'Signed' || status === 'موقع') {
      return <Check className="h-4 w-4 text-green-600" />;
    } else if (status === 'Pending Signatures' || status === 'في انتظار التوقيعات') {
      return <Clock className="h-4 w-4 text-yellow-600" />;
    } else {
      return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <FileText className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'en' ? 'Contract Documentation' : 'توثيق العقود'}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'en' 
              ? 'Upload, sign, and store contracts securely with blockchain verification and IPFS storage for maximum security and accessibility.'
              : 'ارفع ووقع واحفظ العقود بأمان مع التحقق بالبلوك تشين وتخزين IPFS لأقصى درجات الأمان وإمكانية الوصول.'
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
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">
              {language === 'en' ? 'Upload Document' : 'رفع وثيقة'}
            </TabsTrigger>
            <TabsTrigger value="contracts">
              {language === 'en' ? 'My Contracts' : 'عقودي'}
            </TabsTrigger>
            <TabsTrigger value="preview">
              {language === 'en' ? 'Preview' : 'معاينة'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Upload New Contract' : 'رفع عقد جديد'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Upload a contract document for secure storage and digital signing'
                    : 'ارفع وثيقة عقد للتخزين الآمن والتوقيع الرقمي'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">
                      {language === 'en' ? 'Upload Contract Document' : 'رفع وثيقة العقد'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {language === 'en' 
                        ? 'Supported formats: PDF, DOC, DOCX (Max 10MB)'
                        : 'الصيغ المدعومة: PDF, DOC, DOCX (الحد الأقصى 10 ميجابايت)'
                      }
                    </p>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button variant="outline" asChild>
                        <span>{language === 'en' ? 'Choose File' : 'اختر ملف'}</span>
                      </Button>
                    </Label>
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                  </div>
                  
                  {uploadedFile && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        {language === 'en' ? 'File uploaded:' : 'تم رفع الملف:'} {uploadedFile.name}
                      </p>
                    </div>
                  )}
                </div>

                {uploadedFile && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contractTitle">
                          {language === 'en' ? 'Contract Title' : 'عنوان العقد'} *
                        </Label>
                        <Input
                          id="contractTitle"
                          placeholder={language === 'en' ? 'Enter contract title' : 'أدخل عنوان العقد'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contractType">
                          {language === 'en' ? 'Contract Type' : 'نوع العقد'} *
                        </Label>
                        <Input
                          id="contractType"
                          placeholder={language === 'en' ? 'e.g., Service Agreement' : 'مثال: اتفاقية خدمة'}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1">
                        {language === 'en' ? 'Save to IPFS' : 'حفظ في IPFS'}
                      </Button>
                      <Button variant="outline" className="flex-1">
                        {language === 'en' ? 'Preview Document' : 'معاينة الوثيقة'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contracts">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'My Contracts' : 'عقودي'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Manage your uploaded and signed contracts'
                    : 'إدارة العقود المرفوعة والموقعة'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockContracts.map((contract) => (
                    <div key={contract.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          {getStatusIcon(contract.status)}
                          <div>
                            <h3 className="font-semibold">{contract.name}</h3>
                            <p className="text-sm text-gray-600">ID: {contract.id}</p>
                          </div>
                        </div>
                        {getStatusBadge(contract.status)}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-gray-500">{language === 'en' ? 'Upload Date:' : 'تاريخ الرفع:'}</span>
                          <p className="font-medium">{contract.uploadDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">{language === 'en' ? 'Signers:' : 'الموقعون:'}</span>
                          <p className="font-medium">{contract.signers}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500">IPFS:</span>
                          <p className="font-mono text-xs">{contract.ipfsHash || 'N/A'}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          {language === 'en' ? 'Preview' : 'معاينة'}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          {language === 'en' ? 'Download' : 'تحميل'}
                        </Button>
                        {contract.status !== 'Signed' && contract.status !== 'موقع' && (
                          <Button size="sm">
                            {language === 'en' ? 'Sign' : 'توقيع'}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Document Preview' : 'معاينة الوثيقة'}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Interactive preview of your contract document'
                    : 'معاينة تفاعلية لوثيقة العقد'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-lg text-gray-600 mb-2">
                    {language === 'en' ? 'No document selected for preview' : 'لم يتم اختيار وثيقة للمعاينة'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {language === 'en' 
                      ? 'Upload a document to see the interactive preview'
                      : 'ارفع وثيقة لرؤية المعاينة التفاعلية'
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ContractDocumentation;
