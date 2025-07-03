
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/utils/translations';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  href, 
  icon, 
  title, 
  active 
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        active
          ? "bg-gpo-blue text-white"
          : "text-gray-500 hover:bg-gray-100"
      )}
    >
      <span className={active ? "text-white" : "text-gray-500"}>
        {icon}
      </span>
      <span>{title}</span>
    </Link>
  );
};

interface DashboardSidebarProps {
  role: 'client' | 'freelancer' | 'supplier';
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ role }) => {
  const { language } = useLanguage();
  const location = useLocation();
  
  // All dashboard items available for all users
  const allDashboards = [
    {
      href: '/dashboard/client',
      title: language === 'en' ? 'Client Dashboard' : 'لوحة العميل',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-check"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
      ),
    },
    {
      href: '/dashboard/freelancer',
      title: language === 'en' ? 'Freelancer Dashboard' : 'لوحة المستقل',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
      ),
    },
    {
      href: '/dashboard/supplier',
      title: language === 'en' ? 'Supplier Dashboard' : 'لوحة المورد',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h2"/><path d="M5 6h9l4 4v8c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="18" r="2"/><path d="M15 18H9"/><circle cx="17" cy="18" r="2"/></svg>
      ),
    },
  ];
  
  const sidebarItems = [
    {
      href: `/dashboard/${role}/account`,
      title: t('myAccount', language),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      ),
    },
    {
      href: `/dashboard/${role}/groups`,
      title: t('myGroups', language),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      ),
    },
    {
      href: `/dashboard/${role}/contracts`,
      title: t('myContracts', language),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
      ),
    },
    {
      href: `/dashboard/${role}/notifications`,
      title: t('notifications', language),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
      ),
    },
    {
      href: `/dashboard/${role}/invoices`,
      title: t('invoices', language),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-receipt"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/></svg>
      ),
    },
    {
      href: `/dashboard/${role}/arbitration`,
      title: t('orda', language),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scale"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
      ),
    },
  ];

  // Business & AI Services
  const businessItems = [
    {
      href: '/dashboard/company-setup',
      title: language === 'en' ? 'Company Setup' : 'تأسيس الشركة',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
      ),
    },
    {
      href: '/dashboard/business-management',
      title: language === 'en' ? 'Business Management' : 'إدارة الأعمال',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
      ),
    },
    {
      href: '/dashboard/ai-insights',
      title: language === 'en' ? 'AI Insights' : 'رؤى الذكاء الاصطناعي',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>
      ),
    }
  ];

  // MCP Dashboard items
  const mcpItems = [
    {
      href: '/dashboard/mcp',
      title: language === 'en' ? 'MCP Dashboard' : 'لوحة تحكم MCP',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
      ),
    },
    {
      href: '/dashboard/mcp/chart-server',
      title: language === 'en' ? 'Chart Generator' : 'منشئ الرسوم البيانية',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 9h6v6H9z"/><path d="M21 15v4a2 2 0 0 1-2 2h-4"/><path d="M21 9V5a2 2 0 0 0-2-2h-4"/><path d="M3 9V5a2 2 0 0 1 2-2h4"/><path d="M3 15v4a2 2 0 0 0 2 2h4"/></svg>
      ),
    },
    {
      href: '/dashboard/mcp/web-search',
      title: language === 'en' ? 'Web Search' : 'البحث على الويب',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      ),
    },
    {
      href: '/dashboard/mcp/ipfs',
      title: language === 'en' ? 'File Storage (IPFS)' : 'تخزين الملفات (IPFS)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6l-3-3 3-3v6"/></svg>
      ),
    },
    {
      href: '/dashboard/mcp/manim',
      title: language === 'en' ? 'Video Generator' : 'منشئ الفيديو',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
      ),
    },
    {
      href: '/dashboard/mcp/deep-wiki',
      title: language === 'en' ? 'Deep Wiki' : 'ويكي عميق',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      ),
    },
    {
      href: '/dashboard/mcp/ashra',
      title: language === 'en' ? 'Code Analysis' : 'تحليل الكود',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      ),
    }
  ];
  
  return (
    <div className="w-64 bg-white border-r h-full p-4 overflow-y-auto">
      <div className="mb-8 px-2">
        <Link to="/" className="text-xl font-bold text-gpo-blue">
          GPO
        </Link>
        <p className="text-sm text-gray-500 mt-1">
          {t('tagline', language)}
        </p>
      </div>

      {/* Home Button */}
      <div className="mb-6">
        <SidebarItem
          href="/"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          }
          title={language === 'en' ? 'Home' : 'الرئيسية'}
          active={location.pathname === '/'}
        />
      </div>
      
      <nav className="space-y-6">
        {/* All Dashboards Section */}
        <div>
          <h3 className="text-xs uppercase text-gray-400 font-semibold mb-3 px-3">
            {language === 'en' ? 'Dashboards' : 'لوحات التحكم'}
          </h3>
          <div className="space-y-2">
            {allDashboards.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                title={item.title}
                active={location.pathname === item.href}
              />
            ))}
          </div>
        </div>

        {/* User Features Section */}
        <div>
          <h3 className="text-xs uppercase text-gray-400 font-semibold mb-3 px-3">
            {language === 'en' ? 'User Features' : 'ميزات المستخدم'}
          </h3>
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                title={item.title}
                active={location.pathname === item.href}
              />
            ))}
          </div>
        </div>

        {/* Business Services Section */}
        <div>
          <h3 className="text-xs uppercase text-gray-400 font-semibold mb-3 px-3">
            {language === 'en' ? 'Business Services' : 'الخدمات التجارية'}
          </h3>
          <div className="space-y-2">
            {businessItems.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                title={item.title}
                active={location.pathname === item.href}
              />
            ))}
          </div>
        </div>

        {/* MCP Services Section */}
        <div>
          <h3 className="text-xs uppercase text-gray-400 font-semibold mb-3 px-3">
            {language === 'en' ? 'MCP Services' : 'خدمات MCP'}
          </h3>
          <div className="space-y-2">
            {mcpItems.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                title={item.title}
                active={location.pathname === item.href}
              />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
