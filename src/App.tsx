
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import RoleSelect from "./pages/RoleSelect";
import NotFound from "./pages/NotFound";
import GroupsPage from "./pages/GroupsPage";
import ContractsPage from "./pages/ContractsPage";
import InvoicesPage from "./pages/InvoicesPage";
import NotificationsPage from "./pages/NotificationsPage";
import InvestmentPage from "./pages/InvestmentPage";
import GPOWorkspacePage from "./pages/GPOWorkspacePage";
import ModernWorkspacePage from "./pages/ModernWorkspacePage";

// Dashboard Pages
import ClientDashboard from "./pages/dashboard/client/ClientDashboard";
import ClientGroups from "./pages/dashboard/client/ClientGroups";
import ClientVoting from "./pages/dashboard/client/ClientVoting";
import FreelancerDashboard from "./pages/dashboard/freelancer/FreelancerDashboard";
import FreelancerProjects from "./pages/dashboard/freelancer/FreelancerProjects";
import SupplierDashboard from "./pages/dashboard/supplier/SupplierDashboard";
import SupplierGroups from "./pages/dashboard/supplier/SupplierGroups";
import SupplierContracts from "./pages/dashboard/supplier/SupplierContracts";
import EnhancedSupplierContracts from "./pages/dashboard/supplier/EnhancedSupplierContracts";
import SupplierInvoices from "./pages/dashboard/supplier/SupplierInvoices";
import SupplierRFQs from "./pages/dashboard/supplier/SupplierRFQs";
import SupplierAccount from "./pages/dashboard/supplier/SupplierAccount";
import SupplierArbitration from "./pages/dashboard/supplier/SupplierArbitration";
import SupplierNotifications from "./pages/dashboard/supplier/SupplierNotifications";

// Dashboard Management Pages
import BusinessManagement from "./pages/dashboard/BusinessManagement";
import CompanySetup from "./pages/dashboard/CompanySetup";
import FreelancerManagement from "./pages/dashboard/FreelancerManagement";
import InvoiceManagement from "./pages/dashboard/InvoiceManagement";
import VotingCenter from "./pages/dashboard/VotingCenter";
import BusinessIntelligence from "./pages/dashboard/BusinessIntelligence";
import AIInsights from "./pages/dashboard/AIInsights";
import MCPDashboard from "./pages/dashboard/MCPDashboard";

// MCP Pages
import MCPChartServer from "./pages/dashboard/mcp/MCPChartServer";
import MCPWebSearch from "./pages/dashboard/mcp/MCPWebSearch";
import MCPIPFSStorage from "./pages/dashboard/mcp/MCPIPFSStorage";
import MCPManim from "./pages/dashboard/mcp/MCPManim";
import MCPDeepWiki from "./pages/dashboard/mcp/MCPDeepWiki";
import MCPAshra from "./pages/dashboard/mcp/MCPAshra";

// Services Pages
import Arbitration from "./pages/services/Arbitration";
import CompanyIncorporation from "./pages/services/CompanyIncorporation";
import ContractDocumentation from "./pages/services/ContractDocumentation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/role-select" element={<RoleSelect />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/contracts" element={<ContractsPage />} />
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/investment" element={<InvestmentPage />} />
            <Route path="/workspace" element={<GPOWorkspacePage />} />
            <Route path="/modern-workspace" element={<ModernWorkspacePage />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard/client" element={<ClientDashboard />} />
            <Route path="/dashboard/client/groups" element={<ClientGroups />} />
            <Route path="/dashboard/client/voting" element={<ClientVoting />} />
            <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
            <Route path="/dashboard/freelancer/projects" element={<FreelancerProjects />} />
            <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
            <Route path="/dashboard/supplier/groups" element={<SupplierGroups />} />
            <Route path="/dashboard/supplier/contracts" element={<SupplierContracts />} />
            <Route path="/dashboard/supplier/enhanced-contracts" element={<EnhancedSupplierContracts />} />
            <Route path="/dashboard/supplier/invoices" element={<SupplierInvoices />} />
            <Route path="/dashboard/supplier/rfqs" element={<SupplierRFQs />} />
            <Route path="/dashboard/supplier/account" element={<SupplierAccount />} />
            <Route path="/dashboard/supplier/arbitration" element={<SupplierArbitration />} />
            <Route path="/dashboard/supplier/notifications" element={<SupplierNotifications />} />
            
            {/* Dashboard Management Routes */}
            <Route path="/dashboard/business" element={<BusinessManagement />} />
            <Route path="/dashboard/company-setup" element={<CompanySetup />} />
            <Route path="/dashboard/freelancer-management" element={<FreelancerManagement />} />
            <Route path="/dashboard/invoice-management" element={<InvoiceManagement />} />
            <Route path="/dashboard/voting" element={<VotingCenter />} />
            <Route path="/dashboard/business-intelligence" element={<BusinessIntelligence />} />
            <Route path="/dashboard/ai-insights" element={<AIInsights />} />
            <Route path="/dashboard/mcp" element={<MCPDashboard />} />
            
            {/* MCP Service Routes */}
            <Route path="/dashboard/mcp/chart-server" element={<MCPChartServer />} />
            <Route path="/dashboard/mcp/web-search" element={<MCPWebSearch />} />
            <Route path="/dashboard/mcp/ipfs-storage" element={<MCPIPFSStorage />} />
            <Route path="/dashboard/mcp/manim" element={<MCPManim />} />
            <Route path="/dashboard/mcp/deep-wiki" element={<MCPDeepWiki />} />
            <Route path="/dashboard/mcp/ashra" element={<MCPAshra />} />
            
            {/* Services Routes */}
            <Route path="/services/arbitration" element={<Arbitration />} />
            <Route path="/services/company-incorporation" element={<CompanyIncorporation />} />
            <Route path="/services/contract-documentation" element={<ContractDocumentation />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
