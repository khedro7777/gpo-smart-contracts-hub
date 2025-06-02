
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SmartNotifications from '@/components/enhanced/SmartNotifications';

const SupplierNotifications = () => {
  return (
    <DashboardLayout role="supplier">
      <SmartNotifications />
    </DashboardLayout>
  );
};

export default SupplierNotifications;
