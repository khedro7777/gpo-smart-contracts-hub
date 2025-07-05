
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
import { Megaphone, Target, TrendingUp, Users, Share2, BarChart3, Globe, Zap } from 'lucide-react';

interface MarketingCampaign {
  campaignName: string;
  campaignType: 'digital' | 'traditional' | 'influencer' | 'content' | 'social_media';
  targetAudience: string;
  budget: number;
  duration: number;
  objectives: string[];
  channels: string[];
  targetMarkets: string[];
  kpis: string[];
  additionalNotes: string;
}

const MarketingGateway: React.FC = () => {
  const { t } = useTranslation(['common', 'dashboard']);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState<MarketingCampaign>({
    campaignName: '',
    campaignType: 'digital',
    targetAudience: '',
    budget: 0,
    duration: 30,
    objectives: [],
    channels: [],
    targetMarkets: [],
    kpis: [],
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const campaignTypes = [
    { value: 'digital', label: t('Digital Marketing'), icon: '💻', description: t('Online advertising and digital campaigns') },
    { value: 'traditional', label: t('Traditional Media'), icon: '📺', description: t('TV, radio, print advertising') },
    { value: 'influencer', label: t('Influencer Marketing'), icon: '⭐', description: t('Partner with influencers and content creators') },
    { value: 'content', label: t('Content Marketing'), icon: '📝', description: t('Blog posts, videos, and educational content') },
    { value: 'social_media', label: t('Social Media'), icon: '📱', description: t('Social platforms and community building') }
  ];

  const marketingObjectives = [
    { value: 'brand_awareness', label: t('Brand Awareness') },
    { value: 'lead_generation', label: t('Lead Generation') },
    { value: 'customer_acquisition', label: t('Customer Acquisition') },
    { value: 'sales_increase', label: t('Sales Increase') },
    { value: 'market_expansion', label: t('Market Expansion') },
    { value: 'customer_retention', label: t('Customer Retention') }
  ];

  const marketingChannels = [
    { value: 'google_ads', label: t('Google Ads') },
    { value: 'facebook_ads', label: t('Facebook Ads') },
    { value: 'instagram', label: t('Instagram') },
    { value: 'linkedin', label: t('LinkedIn') },
    { value: 'youtube', label: t('YouTube') },
    { value: 'email', label: t('Email Marketing') },
    { value: 'seo', label: t('SEO') },
    { value: 'content', label: t('Content Marketing') }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const request = await GatewayService.submitRequest('marketing', formData);
      if (request) {
        toast({
          title: t('Campaign Submitted'),
          description: t('Your marketing campaign has been submitted successfully'),
        });
        // Reset form
        setFormData({
          campaignName: '',
          campaignType: 'digital',
          targetAudience: '',
          budget: 0,
          duration: 30,
          objectives: [],
          channels: [],
          targetMarkets: [],
          kpis: [],
          additionalNotes: ''
        });
      }
    } catch (error) {
      toast({
        title: t('Error'),
        description: t('Failed to submit marketing campaign'),
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleArrayItem = (array: string[], item: string, setter: (value: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Megaphone className="h-8 w-8 text-orange-600" />
            <h1 className="text-3xl font-bold">{t('Marketing Gateway')}</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('Collaborate on marketing campaigns to share costs and amplify your reach')}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="create">{t('Create Campaign')}</TabsTrigger>
            <TabsTrigger value="active">{t('Active Campaigns')}</TabsTrigger>
            <TabsTrigger value="marketplace">{t('Join Campaigns')}</TabsTrigger>
            <TabsTrigger value="analytics">{t('Performance')}</TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Share2 className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold">{t('Shared Costs')}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{t('Split marketing expenses with partners')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold">{t('Wider Reach')}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{t('Access larger audiences together')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold">{t('Better ROI')}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{t('Improved return on investment')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <h3 className="font-semibold">{t('Expert Support')}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{t('Professional marketing guidance')}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('Create Marketing Campaign')}</CardTitle>
                <CardDescription>
                  {t('Design your marketing campaign and invite collaborators')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="campaignName">{t('Campaign Name')}</Label>
                      <Input
                        id="campaignName"
                        placeholder={t('Enter campaign name')}
                        value={formData.campaignName}
                        onChange={(e) => setFormData(prev => ({ ...prev, campaignName: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t('Campaign Type')}</Label>
                      <Select value={formData.campaignType} onValueChange={(value: any) => setFormData(prev => ({ ...prev, campaignType: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {campaignTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <span>{type.icon}</span>
                                <span>{type.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">{t('Target Audience')}</Label>
                    <Textarea
                      id="targetAudience"
                      placeholder={t('Describe your target audience demographics and characteristics')}
                      value={formData.targetAudience}
                      onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">{t('Total Budget')} ($)</Label>
                      <Input
                        id="budget"
                        type="number"
                        min="0"
                        value={formData.budget}
                        onChange={(e) => setFormData(prev => ({ ...prev, budget: parseFloat(e.target.value) }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">{t('Campaign Duration')} ({t('days')})</Label>
                      <Input
                        id="duration"
                        type="number"
                        min="1"
                        value={formData.duration}
                        onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>{t('Marketing Objectives')}</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {marketingObjectives.map((objective) => (
                        <div
                          key={objective.value}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            formData.objectives.includes(objective.value)
                              ? 'bg-blue-50 border-blue-300'
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => toggleArrayItem(
                            formData.objectives,
                            objective.value,
                            (newObjectives) => setFormData(prev => ({ ...prev, objectives: newObjectives }))
                          )}
                        >
                          <p className="text-sm font-medium">{objective.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>{t('Marketing Channels')}</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {marketingChannels.map((channel) => (
                        <div
                          key={channel.value}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            formData.channels.includes(channel.value)
                              ? 'bg-green-50 border-green-300'
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => toggleArrayItem(
                            formData.channels,
                            channel.value,
                            (newChannels) => setFormData(prev => ({ ...prev, channels: newChannels }))
                          )}
                        >
                          <p className="text-sm font-medium">{channel.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">{t('Additional Notes')}</Label>
                    <Textarea
                      id="additionalNotes"
                      placeholder={t('Any additional requirements or special instructions')}
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={isSubmitting} className="flex-1">
                      {isSubmitting ? t('Creating...') : t('Create Marketing Campaign')}
                    </Button>
                    <Button type="button" variant="outline">
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
                <CardTitle>{t('Active Marketing Campaigns')}</CardTitle>
                <CardDescription>
                  {t('Monitor and manage your active marketing campaigns')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Megaphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{t('No active campaigns at the moment')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketplace">
            <Card>
              <CardHeader>
                <CardTitle>{t('Join Marketing Campaigns')}</CardTitle>
                <CardDescription>
                  {t('Discover and join collaborative marketing opportunities')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{t('Campaign marketplace coming soon')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>{t('Campaign Performance')}</CardTitle>
                <CardDescription>
                  {t('Track ROI and campaign effectiveness')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">{t('Performance analytics coming soon')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MarketingGateway;
