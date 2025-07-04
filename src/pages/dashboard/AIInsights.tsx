
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EnhancedMCPDashboard from '@/components/mcp/EnhancedMCPDashboard';

const AIInsights = () => {
  return (
    <DashboardLayout role="client">
      <EnhancedMCPDashboard />
    </DashboardLayout>
  );
};

export default AIInsights;
