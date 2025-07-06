
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/sonner';
import ComprehensiveHomePage from './pages/ComprehensiveHomePage';
import SignUp from './pages/Auth';
import SignIn from './pages/Auth';
import Dashboard from './pages/dashboard/client/ClientDashboard';
import ClientDashboard from './pages/dashboard/client/ClientDashboard';
import SupplierDashboard from './pages/dashboard/supplier/SupplierDashboard';
import FreelancerDashboard from './pages/dashboard/freelancer/FreelancerDashboard';
import GroupsPage from './pages/GroupsPage';
import VotingCenter from './pages/dashboard/VotingCenter';
import GPOWorkspace from './components/gpo/GPOWorkspace';
import GroupRoomPage from './pages/GroupRoomPage';
import InvestmentPage from './pages/InvestmentPage';

// Gateway Imports
import GatewaysPage from './pages/GatewaysPage';
import ProcurementGateway from './components/gateways/ProcurementGateway';
import MarketingGateway from './components/gateways/MarketingGateway';
import CompanyFormationGateway from './components/gateways/CompanyFormationGateway';
import FreelancerGateway from './components/gateways/FreelancerGateway';

function App() {
  return (
    <QueryClientProvider client={new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    })}>
      <LanguageProvider>
        <div className="min-h-screen bg-background font-sans antialiased">
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ComprehensiveHomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/client" element={<ClientDashboard />} />
              <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
              <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
              <Route path="/groups" element={<GroupsPage />} />
              <Route path="/voting" element={<VotingCenter />} />
              <Route path="/gpo" element={<GPOWorkspace activeGroups={12} totalContracts={45} monthlyVolume={2500000} successRate={94} />} />
              <Route path="/groups/:groupId/room" element={<GroupRoomPage />} />
              
              {/* Gateway Routes */}
              <Route path="/gateways" element={<GatewaysPage />} />
              <Route path="/gateways/procurement" element={<ProcurementGateway />} />
              <Route path="/gateways/marketing" element={<MarketingGateway />} />
              <Route path="/gateways/company-formation" element={<CompanyFormationGateway />} />
              <Route path="/gateways/freelancer" element={<FreelancerGateway />} />
              <Route path="/gateways/investment" element={<InvestmentPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
