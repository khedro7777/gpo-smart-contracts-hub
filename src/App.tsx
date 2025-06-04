
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Auth from '@/pages/Auth';
import HowItWorks from '@/pages/HowItWorks';
import RoleSelect from '@/pages/RoleSelect';
import NotFound from '@/pages/NotFound';
import GPOWorkspacePage from '@/pages/GPOWorkspacePage';

// Dashboard pages
import ClientDashboard from '@/pages/dashboard/client/ClientDashboard';
import ClientGroups from '@/pages/dashboard/client/ClientGroups';
import ClientVoting from '@/pages/dashboard/client/ClientVoting';
import FreelancerDashboard from '@/pages/dashboard/freelancer/FreelancerDashboard';
import FreelancerProjects from '@/pages/dashboard/freelancer/FreelancerProjects';
import SupplierDashboard from '@/pages/dashboard/supplier/SupplierDashboard';
import SupplierGroups from '@/pages/dashboard/supplier/SupplierGroups';
import SupplierRFQs from '@/pages/dashboard/supplier/SupplierRFQs';
import SupplierContracts from '@/pages/dashboard/supplier/SupplierContracts';
import SupplierInvoices from '@/pages/dashboard/supplier/SupplierInvoices';
import SupplierAccount from '@/pages/dashboard/supplier/SupplierAccount';
import SupplierNotifications from '@/pages/dashboard/supplier/SupplierNotifications';
import SupplierArbitration from '@/pages/dashboard/supplier/SupplierArbitration';
import BusinessIntelligence from '@/pages/dashboard/BusinessIntelligence';
import BusinessManagement from '@/pages/dashboard/BusinessManagement';
import VotingCenter from '@/pages/dashboard/VotingCenter';
import FreelancerManagement from '@/pages/dashboard/FreelancerManagement';
import CompanySetup from '@/pages/dashboard/CompanySetup';
import InvoiceManagement from '@/pages/dashboard/InvoiceManagement';
import AIInsights from '@/pages/dashboard/AIInsights';

// Service pages
import Arbitration from '@/pages/services/Arbitration';
import CompanyIncorporation from '@/pages/services/CompanyIncorporation';
import ContractDocumentation from '@/pages/services/ContractDocumentation';

// Gateway components
import CompanyFormationGateway from '@/components/gateways/CompanyFormationGateway';
import FreelancerGateway from '@/components/gateways/FreelancerGateway';

function App() {
  const { i18n } = useTranslation();
  
  // Set document direction based on language
  document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = i18n.language;

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/role-select" element={<RoleSelect />} />
      <Route path="/workspace" element={<GPOWorkspacePage />} />
      
      {/* Gateway Routes */}
      <Route path="/gateways/company-formation" element={<CompanyFormationGateway />} />
      <Route path="/gateways/freelancers" element={<FreelancerGateway />} />
      
      {/* Client Dashboard Routes */}
      <Route path="/dashboard/client" element={<ClientDashboard />} />
      <Route path="/dashboard/client/groups" element={<ClientGroups />} />
      <Route path="/dashboard/client/voting" element={<ClientVoting />} />
      
      {/* Freelancer Dashboard Routes */}
      <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
      <Route path="/dashboard/freelancer/projects" element={<FreelancerProjects />} />
      
      {/* Supplier Dashboard Routes */}
      <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
      <Route path="/dashboard/supplier/groups" element={<SupplierGroups />} />
      <Route path="/dashboard/supplier/rfqs" element={<SupplierRFQs />} />
      <Route path="/dashboard/supplier/contracts" element={<SupplierContracts />} />
      <Route path="/dashboard/supplier/invoices" element={<SupplierInvoices />} />
      <Route path="/dashboard/supplier/account" element={<SupplierAccount />} />
      <Route path="/dashboard/supplier/notifications" element={<SupplierNotifications />} />
      <Route path="/dashboard/supplier/arbitration" element={<SupplierArbitration />} />
      
      {/* Shared Dashboard Routes */}
      <Route path="/dashboard/business-intelligence" element={<BusinessIntelligence />} />
      <Route path="/dashboard/business-management" element={<BusinessManagement />} />
      <Route path="/dashboard/voting" element={<VotingCenter />} />
      <Route path="/dashboard/freelancer-management" element={<FreelancerManagement />} />
      <Route path="/dashboard/company-setup" element={<CompanySetup />} />
      <Route path="/dashboard/invoice-management" element={<InvoiceManagement />} />
      <Route path="/dashboard/ai-insights" element={<AIInsights />} />
      
      {/* Service Routes */}
      <Route path="/services/arbitration" element={<Arbitration />} />
      <Route path="/services/company-incorporation" element={<CompanyIncorporation />} />
      <Route path="/services/contract-documentation" element={<ContractDocumentation />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
