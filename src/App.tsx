
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

// Enhanced shared dashboard routes
import CompanySetup from "./pages/dashboard/CompanySetup";
import BusinessManagement from "./pages/dashboard/BusinessManagement";
import AIInsights from "./pages/dashboard/AIInsights";
import FreelancerManagement from "./pages/dashboard/FreelancerManagement";
import InvoiceManagement from "./pages/dashboard/InvoiceManagement";
import VotingCenter from "./pages/dashboard/VotingCenter";
import BusinessIntelligence from "./pages/dashboard/BusinessIntelligence";

// New service pages
import CompanyIncorporation from "./pages/services/CompanyIncorporation";
import Arbitration from "./pages/services/Arbitration";
import ContractDocumentation from "./pages/services/ContractDocumentation";

// GPO Workspace
import GPOWorkspacePage from "./pages/GPOWorkspacePage";

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
            
            {/* GPO Workspace */}
            <Route path="/workspace" element={<GPOWorkspacePage />} />
            
            {/* Service Routes */}
            <Route path="/services/company-incorporation" element={<CompanyIncorporation />} />
            <Route path="/services/arbitration" element={<Arbitration />} />
            <Route path="/services/contract-documentation" element={<ContractDocumentation />} />
            
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
            
            {/* Enhanced Shared Dashboard Routes */}
            <Route path="/dashboard/company-setup" element={<CompanySetup />} />
            <Route path="/dashboard/business-management" element={<BusinessManagement />} />
            <Route path="/dashboard/ai-insights" element={<AIInsights />} />
            <Route path="/dashboard/freelancer-management" element={<FreelancerManagement />} />
            <Route path="/dashboard/invoice-management" element={<InvoiceManagement />} />
            <Route path="/dashboard/voting-center" element={<VotingCenter />} />
            <Route path="/dashboard/business-intelligence" element={<BusinessIntelligence />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
