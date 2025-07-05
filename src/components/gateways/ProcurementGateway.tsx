
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { GatewayService } from '@/services/GatewayService';
import { ShoppingCart, Users, TrendingDown, Package, Calculator, FileText } from 'lucide-react';

interface ProcurementRequest {
  category: string;
  productName: string;
  specifications: string;
  quantity: number;
  targetPrice: number;
  urgency: 'low' | 'medium' | 'high';
  groupSize: number;
  deliveryLocation: string;
  additionalRequirements: string;
}

const ProcurementGateway: React.FC = () => {
  const { t } = useTranslation(['common', 'dashboard']);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState<ProcurementRequest>({
    category: '',
    productName: '',
    specifications: '',
    quantity: 1,
    targetPrice: 0,
    urgency: 'medium',
    groupSize: 5,
    deliveryLocation: '',
    additionalRequirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'office_supplies', label: t('Office Supplies'), icon: '📎' },
    { value: 'technology', label: t('Technology'), icon: '💻' },
    { value: 'furniture', label: t('Furniture'), icon: '🪑' },
    { value: 'medical', label: t('Medical Equipment'), icon: '🏥' },
    { value: 'construction', label: t('Construction Materials'), icon: '🏗️' },
    { value: 'automotive', label: t('Automotive Parts'), icon: '🚗' },
    { value: 'industrial', label: t('Industrial Equipment'), icon: '🏭' },
    { value: 'food_beverages', label: t('Food & Beverages'), icon: '🍽️' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const request = await GatewayService.submitRequest('procurement', formData);
      if (request) {
        toast({
          title: t('Request Submitted'),
          description: t('Your procurement request has been submitted successfully'),
        });
        setFormData({
          category: '',
          productName: '',
          specifications: '',
          quantity: 1,
          targetPrice: 0,
          urgency: 'medium',
          groupSize: 5,
          deliveryLocation: '',
          additionalRequirements: ''
        });
      } else {
        throw new Error('Failed to submit request');
      }
    } catch (error) {
      toast({
        title: t('Error'),
        description: t('Failed to submit procurement request'),
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const estimatedSavings = Math.max(0, (formData.targetPrice * formData.quantity * 0.15));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold">{t('Procurement Gateway')}</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('Join forces with other buyers to achieve better pricing through collective purchasing power')}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="create">{t('Create Request')}</TabsTrigger>
            <TabsTrigger value="active">{t('Active Groups')}</TabsTrigger>
            <TabsTrigger value="marketplace">{t('Marketplace')}</TabsTrigger>
            <TabsTrigger value="analytics">{t('Analytics')}</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold">{t('Group Buying')}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{t('Form groups to negotiate better prices')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold">{t('Cost Reduction')}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{t('Average savings of 15-30%')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold">{t('Quality Assurance')}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{t('Verified suppliers and products')}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('Create Procurement Request')}</CardTitle>
                <CardDescription>
                  {t('Specify your requirements and let others join your group')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">{t('Product Category')}</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('Select category')} />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center gap-2">
                                <span>{category.icon}</span>
                                <span>{category.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="productName">{t('Product Name')}</Label>
                      <Input
                        id="productName"
                        placeholder={t('Enter product name')}
                        value={formData.productName}
                        onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specifications">{t('Product Specifications')}</Label>
                    <Textarea
                      id="specifications"
                      placeholder={t('Detailed specifications and requirements')}
                      value={formData.specifications}
                      onChange={(e) => setFormData(prev => ({ ...prev, specifications: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">{t('Quantity Needed')}</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="targetPrice">{t('Target Unit Price')}</Label>
                      <Input
                        id="targetPrice"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.targetPrice}
                        onChange={(e) => setFormData(prev => ({ ...prev, targetPrice: parseFloat(e.target.value) }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="urgency">{t('Urgency Level')}</Label>
                      <Select value={formData.urgency} onValueChange={(value: any) => setFormData(prev => ({ ...prev, urgency: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">{t('Low')}</SelectItem>
                          <SelectItem value="medium">{t('Medium')}</SelectItem>
                          <SelectItem value="high">{t('High')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="groupSize">{t('Desired Group Size')}</Label>
                      <Input
                        id="groupSize"
                        type="number"
                        min="2"
                        value={formData.groupSize}
                        onChange={(e) => setFormData(prev => ({ ...prev, groupSize: parseInt(e.target.value) }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deliveryLocation">{t('Delivery Location')}</Label>
                      <Input
                        id="deliveryLocation"
                        placeholder={t('City or address')}
                        value={formData.deliveryLocation}
                        onChange={(e) => setFormData(prev => ({ ...prev, deliveryLocation: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalRequirements">{t('Additional Requirements')}</Label>
                    <Textarea
                      id="additionalRequirements"
                      placeholder={t('Any special requirements or notes')}
                      value={formData.additionalRequirements}
                      onChange={(e) => setFormData(prev => ({ ...prev, additionalRequirements: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  {estimatedSavings > 0 && (
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Calculator className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-semibold text-green-800">
                              {t('Estimated Savings')}: ${estimatedSavings.toFixed(2)}
                            </p>
                            <p className="text-sm text-green-600">
                              {t('Based on 15% average group discount')}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? t('Submitting...') : t('Create Procurement Group')}
                    </Button>
                    <Button type="button" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      {t('Save as Draft')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>{t('Active Procurement Groups')}</CardTitle>
                <CardDescription>
                  {t('Join existing procurement groups or track your active requests')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{t('No active procurement groups at the moment')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketplace">
            <Card>
              <CardHeader>
                <CardTitle>{t('Procurement Marketplace')}</CardTitle>
                <CardDescription>
                  {t('Browse available products and join procurement groups')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{t('Marketplace coming soon')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>{t('Procurement Analytics')}</CardTitle>
                <CardDescription>
                  {t('Track your savings and procurement performance')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{t('Analytics dashboard coming soon')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProcurementGateway;
