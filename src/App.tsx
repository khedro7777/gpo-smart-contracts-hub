
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/sonner';
import LandingPage from './pages/Index';
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
              <Route path="/" element={<LandingPage />} />
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
            </Routes>
          </BrowserRouter>
        </div>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
