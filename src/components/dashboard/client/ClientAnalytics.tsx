
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
import { TrendingUp, DollarSign, Users, Target } from 'lucide-react';

const ClientAnalytics: React.FC = () => {
  const { language } = useLanguage();

  // Mock data for charts
  const monthlyData = [
    { month: language === 'ar' ? 'يناير' : 'Jan', groups: 4, contracts: 12, savings: 15000 },
    { month: language === 'ar' ? 'فبراير' : 'Feb', groups: 6, contracts: 18, savings: 22000 },
    { month: language === 'ar' ? 'مارس' : 'Mar', groups: 8, contracts: 25, savings: 28000 },
    { month: language === 'ar' ? 'أبريل' : 'Apr', groups: 12, contracts: 35, savings: 35000 },
    { month: language === 'ar' ? 'مايو' : 'May', groups: 15, contracts: 42, savings: 45000 },
    { month: language === 'ar' ? 'يونيو' : 'Jun', groups: 18, contracts: 48, savings: 52000 },
  ];

  const groupPhaseData = [
    { name: language === 'ar' ? 'نشط' : 'Active', value: 35, color: '#10B981' },
    { name: language === 'ar' ? 'انتظار' : 'Pending', value: 25, color: '#F59E0B' },
    { name: language === 'ar' ? 'تفاوض' : 'Negotiation', value: 30, color: '#3B82F6' },
    { name: language === 'ar' ? 'مكتمل' : 'Completed', value: 10, color: '#6B7280' },
  ];

  const performanceMetrics = [
    {
      title: language === 'ar' ? 'معدل النجاح' : 'Success Rate',
      value: '94%',
      change: '+2.5%',
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: language === 'ar' ? 'متوسط التوفير' : 'Average Savings',
      value: '18.5%',
      change: '+3.2%',
      icon: DollarSign,
      color: 'text-blue-600'
    },
    {
      title: language === 'ar' ? 'رضا الأعضاء' : 'Member Satisfaction',
      value: '4.8/5',
      change: '+0.3',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: language === 'ar' ? 'الكفاءة التشغيلية' : 'Operational Efficiency',
      value: '87%',
      change: '+5.1%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {language === 'ar' ? 'التحليلات والتقارير' : 'Analytics & Reports'}
        </h2>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">{metric.change}</span>
                  </div>
                </div>
                <div className={`p-3 bg-gray-50 rounded-full`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'الأداء الشهري' : 'Monthly Performance'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="contracts" fill="#3B82F6" name={language === 'ar' ? 'العقود' : 'Contracts'} />
                <Bar dataKey="groups" fill="#10B981" name={language === 'ar' ? 'المجموعات' : 'Groups'} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Group Phase Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'توزيع مراحل المجموعات' : 'Group Phase Distribution'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={groupPhaseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {groupPhaseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Savings Trend */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ar' ? 'اتجاه التوفير' : 'Savings Trend'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`$${value?.toLocaleString()}`, language === 'ar' ? 'التوفير' : 'Savings']}
              />
              <Line 
                type="monotone" 
                dataKey="savings" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientAnalytics;
