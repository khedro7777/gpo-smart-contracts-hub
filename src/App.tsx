import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MultiLevelDashboard from '@/pages/dashboard/MultiLevelDashboard';
import FreelancerManagement from '@/pages/dashboard/FreelancerManagement';
import FreelancerDashboardPage from '@/pages/dashboard/freelancer/FreelancerDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          
          {/* Dashboard Routes */}
          <Route path="/dashboard/multi-level/:dashboardType/:id?" element={<MultiLevelDashboard />} />
          <Route path="/dashboard/freelancer" element={<FreelancerDashboardPage />} />
          <Route path="/dashboard/freelancer-management" element={<FreelancerManagement />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
