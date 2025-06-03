
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import FreelancerManagementSystem from '@/components/freelancers/FreelancerManagementSystem';

const FreelancerManagement = () => {
  return (
    <DashboardLayout role="supplier">
      <FreelancerManagementSystem />
    </DashboardLayout>
  );
};

export default FreelancerManagement;
