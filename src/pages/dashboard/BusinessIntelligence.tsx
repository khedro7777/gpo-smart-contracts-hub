
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import BusinessIntelligenceDashboard from '@/components/gpo/BusinessIntelligenceDashboard';

const BusinessIntelligence = () => {
  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Business Intelligence</h1>
            <p className="text-gray-600 mt-2">
              Harvard Business School methodology-based analytics
            </p>
          </div>
        </div>
        <BusinessIntelligenceDashboard />
      </div>
    </DashboardLayout>
  );
};

export default BusinessIntelligence;
