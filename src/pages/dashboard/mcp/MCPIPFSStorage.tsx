
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, Download, File, Folder, HardDrive } from 'lucide-react';

const MCPIPFSStorage = () => {
  const { language } = useLanguage();

  const storageFeatures = [
    {
      icon: <Upload className="h-6 w-6" />,
      title: language === 'en' ? 'Upload Files' : 'رفع الملفات',
      description: language === 'en' ? 'Upload files to IPFS network' : 'رفع الملفات إلى شبكة IPFS'
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: language === 'en' ? 'Download Files' : 'تحميل الملفات',
      description: language === 'en' ? 'Download files from IPFS' : 'تحميل الملفات من IPFS'
    },
    {
      icon: <Folder className="h-6 w-6" />,
      title: language === 'en' ? 'File Manager' : 'مدير الملفات',
      description: language === 'en' ? 'Organize your files and folders' : 'تنظيم الملفات والمجلدات'
    },
    {
      icon: <HardDrive className="h-6 w-6" />,
      title: language === 'en' ? 'Storage Analytics' : 'تحليلات التخزين',
      description: language === 'en' ? 'Monitor storage usage and costs' : 'مراقبة استخدام التخزين والتكاليف'
    }
  ];

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {language === 'en' ? 'IPFS File Storage' : 'تخزين الملفات IPFS'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Decentralized file storage using IPFS technology'
                : 'تخزين الملفات اللامركزي باستخدام تقنية IPFS'
              }
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {storageFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="flex justify-center text-purple-600 mb-2">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  {language === 'en' ? 'Open' : 'فتح'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <File className="h-5 w-5" />
                {language === 'en' ? 'Recent Files' : 'الملفات الأخيرة'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                {language === 'en' 
                  ? 'No files uploaded yet. Start by uploading your first file.'
                  : 'لم يتم رفع ملفات بعد. ابدأ برفع أول ملف.'
                }
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="h-5 w-5" />
                {language === 'en' ? 'Storage Usage' : 'استخدام التخزين'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Used Space' : 'المساحة المستخدمة'}</span>
                  <span>0 MB</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Available Space' : 'المساحة المتاحة'}</span>
                  <span>1 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MCPIPFSStorage;
