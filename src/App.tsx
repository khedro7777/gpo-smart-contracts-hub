
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";

import Index from "./pages/Index";
import RoleSelect from "./pages/RoleSelect";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import ClientDashboard from "./pages/dashboard/client/ClientDashboard";
import FreelancerDashboard from "./pages/dashboard/freelancer/FreelancerDashboard";
import SupplierDashboard from "./pages/dashboard/supplier/SupplierDashboard";
import SupplierGroups from "./pages/dashboard/supplier/SupplierGroups";
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
            <Route path="/role-select" element={<RoleSelect />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard/client" element={<ClientDashboard />} />
            <Route path="/dashboard/freelancer" element={<FreelancerDashboard />} />
            <Route path="/dashboard/supplier" element={<SupplierDashboard />} />
            <Route path="/dashboard/supplier/groups" element={<SupplierGroups />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
