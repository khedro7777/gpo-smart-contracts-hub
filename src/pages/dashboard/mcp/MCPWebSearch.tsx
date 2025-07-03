
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, Globe, FileText, Image } from 'lucide-react';

const MCPWebSearch = () => {
  const { language } = useLanguage();

  const searchTypes = [
    {
      icon: <Search className="h-6 w-6" />,
      title: language === 'en' ? 'General Search' : 'البحث العام',
      description: language === 'en' ? 'Search the web for any information' : 'البحث في الويب عن أي معلومات'
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: language === 'en' ? 'News Search' : 'البحث في الأخبار',
      description: language === 'en' ? 'Find latest news and articles' : 'العثور على آخر الأخبار والمقالات'
    },
    {
      icon: <Image className="h-6 w-6" />,
      title: language === 'en' ? 'Image Search' : 'البحث في الصور',
      description: language === 'en' ? 'Search for images and visuals' : 'البحث عن الصور والمرئيات'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: language === 'en' ? 'Academic Search' : 'البحث الأكاديمي',
      description: language === 'en' ? 'Search academic papers and research' : 'البحث في الأوراق الأكاديمية والبحوث'
    }
  ];

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {language === 'en' ? 'Web Search' : 'البحث على الويب'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Search the web and extract valuable information'
                : 'البحث في الويب واستخراج المعلومات القيمة'
              }
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Quick Search' : 'البحث السريع'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input 
                placeholder={language === 'en' ? 'Enter your search query...' : 'أدخل استعلام البحث...'}
                className="flex-1"
              />
              <Button>
                <Search className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Search' : 'بحث'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {searchTypes.map((search, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className="flex justify-center text-green-600 mb-2">
                  {search.icon}
                </div>
                <CardTitle className="text-lg">{search.title}</CardTitle>
                <CardDescription>{search.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  {language === 'en' ? 'Start Search' : 'بدء البحث'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Search History' : 'سجل البحث'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              {language === 'en' 
                ? 'No searches performed yet. Start searching above.'
                : 'لم يتم إجراء بحث بعد. ابدأ البحث أعلاه.'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MCPWebSearch;
