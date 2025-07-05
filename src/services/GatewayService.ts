
import { supabase } from '@/integrations/supabase/client';

export interface GatewayRequest {
  id: string;
  userId: string;
  gatewayType: 'procurement' | 'marketing' | 'company_formation' | 'freelancer';
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  data: any;
  createdAt: string;
  updatedAt: string;
}

export class GatewayService {
  static async submitRequest(gatewayType: string, data: any): Promise<GatewayRequest | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const request = {
        user_id: user.id,
        gateway_type: gatewayType,
        status: 'pending',
        data: data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // In a real implementation, this would be stored in a database
      console.log('Gateway request submitted:', request);
      
      return {
        id: crypto.randomUUID(),
        userId: user.id,
        gatewayType: gatewayType as any,
        status: 'pending',
        data: data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error submitting gateway request:', error);
      return null;
    }
  }

  static async getRequestStatus(requestId: string): Promise<GatewayRequest | null> {
    // Mock implementation - would fetch from database
    return null;
  }

  static async getUserRequests(): Promise<GatewayRequest[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      // Mock implementation - would fetch from database
      return [];
    } catch (error) {
      console.error('Error fetching user requests:', error);
      return [];
    }
  }
}
