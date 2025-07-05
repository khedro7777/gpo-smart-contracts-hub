
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const ClientAnalytics = () => {
  const { language } = useLanguage();

  // Sample data for charts
  const monthlyData = [
    { month: language === 'ar' ? 'يناير' : 'Jan', savings: 2400, groups: 3 },
    { month: language === 'ar' ? 'فبراير' : 'Feb', savings: 3200, groups: 4 },
    { month: language === 'ar' ? 'مارس' : 'Mar', savings: 2800, groups: 5 },
    { month: language === 'ar' ? 'أبريل' : 'Apr', savings: 4100, groups: 6 },
    { month: language === 'ar' ? 'مايو' : 'May', savings: 3600, groups: 7 }
  ];

  const categoryData = [
    { name: language === 'ar' ? 'الشراء التعاوني' : 'Procurement', value: 40, color: '#3B82F6' },
    { name: language === 'ar' ? 'التسويق' : 'Marketing', value: 25, color: '#10B981' },
    { name: language === 'ar' ? 'الخدمات' : 'Services', value: 20, color: '#F59E0B' },
    { name: language === 'ar' ? 'أخرى' : 'Others', value: 15, color: '#EF4444' }
  ];

  const performanceData = [
    { metric: language === 'ar' ? 'معدل النجاح' : 'Success Rate', value: 94, target: 90 },
    { metric: language === 'ar' ? 'رضا العملاء' : 'Client Satisfaction', value: 4.8, target: 4.5 },
    { metric: language === 'ar' ? 'التوفير المتوسط' : 'Avg Savings', value: 23, target: 20 },
    { metric: language === 'ar' ? 'وقت التسليم' : 'Delivery Time', value: 85, target: 80 }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {performanceData.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{item.metric}</p>
                <p className="text-2xl font-bold text-blue-600">
                  {item.metric.includes('Satisfaction') ? `${item.value}/5` : `${item.value}%`}
                </p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(item.value / (item.metric.includes('Satisfaction') ? 5 : 100)) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {language === 'ar' ? 'الهدف:' : 'Target:'} {item.target}{item.metric.includes('Satisfaction') ? '/5' : '%'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Savings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'التوفير الشهري' : 'Monthly Savings'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="savings" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Group Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'نمو المجموعات' : 'Group Growth'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="groups" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'توزيع الفئات' : 'Category Distribution'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ROI Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'تحليل العائد على الاستثمار' : 'ROI Analysis'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">
                  {language === 'ar' ? 'إجمالي التوفير' : 'Total Savings'}
                </h4>
                <p className="text-2xl font-bold text-green-600">$18,320</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  {language === 'ar' ? 'الاستثمار المدفوع' : 'Investment Paid'}
                </h4>
                <p className="text-2xl font-bold text-blue-600">$2,450</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">
                  {language === 'ar' ? 'العائد على الاستثمار' : 'ROI'}
                </h4>
                <p className="text-2xl font-bold text-purple-600">648%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ar' ? 'تفاصيل الأداء' : 'Performance Details'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 font-semibold">
                    {language === 'ar' ? 'المقياس' : 'Metric'}
                  </th>
                  <th className="pb-2 font-semibold">
                    {language === 'ar' ? 'القيمة الحالية' : 'Current Value'}
                  </th>
                  <th className="pb-2 font-semibold">
                    {language === 'ar' ? 'الهدف' : 'Target'}
                  </th>
                  <th className="pb-2 font-semibold">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">{language === 'ar' ? 'المجموعات النشطة' : 'Active Groups'}</td>
                  <td className="py-2">7</td>
                  <td className="py-2">5</td>
                  <td className="py-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {language === 'ar' ? 'تجاوز الهدف' : 'Above Target'}
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">{language === 'ar' ? 'التوفير الشهري' : 'Monthly Savings'}</td>
                  <td className="py-2">$3,600</td>
                  <td className="py-2">$3,000</td>
                  <td className="py-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {language === 'ar' ? 'تجاوز الهدف' : 'Above Target'}
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">{language === 'ar' ? 'معدل إكمال المشاريع' : 'Project Completion Rate'}</td>
                  <td className="py-2">94%</td>
                  <td className="py-2">90%</td>
                  <td className="py-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {language === 'ar' ? 'ممتاز' : 'Excellent'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientAnalytics;
