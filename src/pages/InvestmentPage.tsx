// ============================================
// 💰 INVESTMENT PAGE WRAPPER
// ============================================
// Purpose: Main page wrapper for investment gateway functionality
// Used in: /investment route
// Features: Investment opportunities, portfolio management, company formation
// Location: Investment section of the platform
// Dependencies: InvestmentGateway component, Layout wrapper
// ============================================

import React from 'react';
import Layout from '@/components/layout/Layout';
import InvestmentGateway from '@/components/investment/InvestmentGateway';

const InvestmentPage: React.FC = () => {
  return (
    <Layout>
      <InvestmentGateway />
    </Layout>
  );
};

export default InvestmentPage;