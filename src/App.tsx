
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import RoleSelect from "./pages/RoleSelect";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";

// Client routes
import ClientDashboard from "./pages/dashboard/client/ClientDashboard";
import ClientGroups from "./pages/dashboard/client/ClientGroups";
import ClientVoting from "./pages/dashboard/client/ClientVoting";

// Freelancer routes
import FreelancerDashboard from "./pages/dashboard/freelancer/FreelancerDashboard";
import FreelancerProjects from "./pages/dashboard/freelancer/FreelancerProjects";

// Supplier routes
import SupplierDashboard from "./pages/dashboard/supplier/SupplierDashboard";
import SupplierGroups from "./pages/dashboard/supplier/SupplierGroups";
import SupplierRFQs from "./pages/dashboard/supplier/SupplierRFQs";
import SupplierContracts from "./pages/dashboard/supplier/SupplierContracts";
import SupplierInvoices from "./pages/dashboard/supplier/SupplierInvoices";
import SupplierAccount from "./pages/dashboard/supplier/SupplierAccount";
import SupplierNotifications from "./pages/dashboard/supplier/SupplierNotifications";
import SupplierArbitration from "./pages/dashboard/supplier/SupplierArbitration";

// New pages
import CompanySetup from "./pages/dashboard/CompanySetup";
import BusinessManagement from "./pages/dashboard/BusinessManagement";
import AIInsights from "./pages/dashboard/AIInsights";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/role-select" element={<RoleSelect />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            
            {/* Client Routes */}
            <Route path="/dashboard/client" element={<ClientDashboard />} />
            <Route path="/dashboard/client/groups" element={<ClientGroups />} />
            <Route path="/dashboard/client/voting" element={<ClientVoting />} />
            
            {/* Freelancer Routes */}
            <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
            <Route path="/dashboard/freelancer/projects" element={<FreelancerProjects />} />
            
            {/* Supplier Routes */}
            <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
            <Route path="/dashboard/supplier/groups" element={<SupplierGroups />} />
            <Route path="/dashboard/supplier/rfqs" element={<SupplierRFQs />} />
            <Route path="/dashboard/supplier/contracts" element={<SupplierContracts />} />
            <Route path="/dashboard/supplier/invoices" element={<SupplierInvoices />} />
            <Route path="/dashboard/supplier/account" element={<SupplierAccount />} />
            <Route path="/dashboard/supplier/notifications" element={<SupplierNotifications />} />
            <Route path="/dashboard/supplier/arbitration" element={<SupplierArbitration />} />
            
            {/* Shared Dashboard Routes */}
            <Route path="/dashboard/company-setup" element={<CompanySetup />} />
            <Route path="/dashboard/business-management" element={<BusinessManagement />} />
            <Route path="/dashboard/ai-insights" element={<AIInsights />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
