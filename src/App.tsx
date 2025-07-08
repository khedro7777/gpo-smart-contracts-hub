
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Index from '@/pages/Index';
import MultiLevelDashboard from '@/pages/dashboard/MultiLevelDashboard';
import FreelancerManagement from '@/pages/dashboard/FreelancerManagement';
import FreelancerDashboardPage from '@/pages/dashboard/freelancer/FreelancerDashboard';
import SupplierDashboard from '@/pages/dashboard/supplier/SupplierDashboard';
import PortalsOverview from '@/pages/PortalsOverview';
import PortalDashboardPage from '@/pages/PortalDashboardPage';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard/multi-level/:dashboardType/:id?" element={<MultiLevelDashboard />} />
            <Route path="/dashboard/freelancer" element={<FreelancerDashboardPage />} />
            <Route path="/dashboard/freelancer-management" element={<FreelancerManagement />} />
            <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
            
            {/* Portal Routes */}
            <Route path="/portals" element={<PortalsOverview />} />
            <Route path="/dashboard/portal/:portalId" element={<PortalDashboardPage />} />
            
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
