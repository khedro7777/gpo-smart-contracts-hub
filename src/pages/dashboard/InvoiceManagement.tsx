
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import InvoiceManagementSystem from '@/components/billing/InvoiceManagementSystem';

const InvoiceManagement = () => {
  return (
    <DashboardLayout role="supplier">
      <InvoiceManagementSystem />
    </DashboardLayout>
  );
};

export default InvoiceManagement;
