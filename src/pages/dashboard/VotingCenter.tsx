
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import AdvancedVotingSystem from '@/components/voting/AdvancedVotingSystem';

const VotingCenter = () => {
  return (
    <DashboardLayout role="client">
      <AdvancedVotingSystem />
    </DashboardLayout>
  );
};

export default VotingCenter;
