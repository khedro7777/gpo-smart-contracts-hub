
type TranslationsType = {
  [key: string]: {
    en: string;
    ar: string;
  };
};

export const translations: TranslationsType = {
  // Navigation
  home: {
    en: 'Home',
    ar: 'الرئيسية'
  },
  about: {
    en: 'About Us',
    ar: 'من نحن'
  },
  howItWorks: {
    en: 'How It Works',
    ar: 'كيف تعمل المنصة؟'
  },
  login: {
    en: 'Login',
    ar: 'تسجيل الدخول'
  },
  register: {
    en: 'Register',
    ar: 'تسجيل'
  },
  dashboard: {
    en: 'Dashboard',
    ar: 'لوحة التحكم'
  },
  
  // User Roles
  client: {
    en: 'Client',
    ar: 'عميل'
  },
  freelancer: {
    en: 'Freelancer',
    ar: 'مستقل'
  },
  supplier: {
    en: 'Supplier',
    ar: 'مورد'
  },
  
  // Service Cards
  groupBuying: {
    en: 'Group Buying',
    ar: 'الشراء التعاوني'
  },
  soloContracting: {
    en: 'Solo Contracting',
    ar: 'التعاقد الفردي'
  },
  suppliers: {
    en: 'Suppliers',
    ar: 'الموردين'
  },
  arbitration: {
    en: 'Arbitration (Orda)',
    ar: 'التحكيم (Orda)'
  },
  
  // Dashboard Sections
  myAccount: {
    en: 'My Account',
    ar: 'حسابي'
  },
  myGroups: {
    en: 'My Groups',
    ar: 'مجموعاتي'
  },
  myContracts: {
    en: 'My Contracts',
    ar: 'عقودي'
  },
  notifications: {
    en: 'Notifications',
    ar: 'الإشعارات'
  },
  invoices: {
    en: 'Invoices',
    ar: 'الفواتير'
  },
  
  // GPO Machine
  askGPO: {
    en: 'Ask GPO Machine',
    ar: 'اسأل GPO Machine'
  },
  gpoPlaceholder: {
    en: 'Type your question here...',
    ar: 'اكتب سؤالك هنا...'
  },
  send: {
    en: 'Send',
    ar: 'إرسال'
  },
  
  // Actions
  search: {
    en: 'Search',
    ar: 'بحث'
  },
  create: {
    en: 'Create',
    ar: 'إنشاء'
  },
  join: {
    en: 'Join',
    ar: 'انضمام'
  },
  
  // Welcome
  welcome: {
    en: 'Welcome to GPO',
    ar: 'مرحبًا بك في GPO'
  },
  tagline: {
    en: 'Smart Contracts & Negotiation Platform',
    ar: 'منصة التفاوض والعقود الذكية'
  },
  getStarted: {
    en: 'Get Started',
    ar: 'ابدأ الآن'
  },
  
  // Role Selection
  selectRole: {
    en: 'Select Your Role',
    ar: 'اختر دورك'
  },
  continueAs: {
    en: 'Continue as',
    ar: 'المتابعة كـ'
  },
  
  // Language
  language: {
    en: 'العربية',
    ar: 'English'
  },

  // Workflows
  verification: {
    en: 'Verification',
    ar: 'التحقق'
  },
  registration: {
    en: 'Registration',
    ar: 'التسجيل'
  },
  verificationInvoice: {
    en: 'Verification Invoice',
    ar: 'فاتورة التحقق'
  },
  adminPanel: {
    en: 'Admin Panel Tasks',
    ar: 'مهام لوحة الإدارة'
  },
  serviceSelection: {
    en: 'Service Selection',
    ar: 'اختيار الخدمة'
  },
  contract: {
    en: 'Contract',
    ar: 'العقد'
  },
  groupBuyingWorkflow: {
    en: 'Group Buying Workflow',
    ar: 'سير عمل الشراء الجماعي'
  },
};

export const t = (key: string, language: 'en' | 'ar'): string => {
  return translations[key]?.[language] || key;
};
