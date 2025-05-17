
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
  
  // Supplier Groups Page
  activeGroups: {
    en: 'Active Groups',
    ar: 'المجموعات النشطة'
  },
  groupsSupplying: {
    en: 'Groups you are currently supplying to',
    ar: 'المجموعات التي تقوم بتوريدها حاليًا'
  },
  groupName: {
    en: 'Group Name',
    ar: 'اسم المجموعة'
  },
  members: {
    en: 'Members',
    ar: 'الأعضاء'
  },
  status: {
    en: 'Status',
    ar: 'الحالة'
  },
  lastActivity: {
    en: 'Last Activity',
    ar: 'آخر نشاط'
  },
  groupRFQs: {
    en: 'Group RFQs',
    ar: 'طلبات العروض للمجموعات'
  },
  recentRFQs: {
    en: 'Recent requests for quotation from groups',
    ar: 'طلبات العروض الأخيرة من المجموعات'
  },
  pendingResponse: {
    en: 'Pending Response',
    ar: 'في انتظار الرد'
  },
  responded: {
    en: 'Responded',
    ar: 'تم الرد'
  },
  underReview: {
    en: 'Under Review',
    ar: 'قيد المراجعة'
  },
  
  // RFQs Page
  rfqs: {
    en: 'RFQs',
    ar: 'طلبات عروض الأسعار'
  },
  pendingRFQs: {
    en: 'Pending RFQs',
    ar: 'طلبات العروض المعلقة'
  },
  respondedRFQs: {
    en: 'Responded RFQs',
    ar: 'طلبات العروض المردودة'
  },
  rfqsNeedingResponse: {
    en: 'RFQs that need your response',
    ar: 'طلبات العروض التي تحتاج إلى ردك'
  },
  rfqsYouResponded: {
    en: 'RFQs you have responded to',
    ar: 'طلبات العروض التي رددت عليها'
  },
  view: {
    en: 'View',
    ar: 'عرض'
  },
  respond: {
    en: 'Respond',
    ar: 'الرد'
  },
  viewDetails: {
    en: 'View Details',
    ar: 'عرض التفاصيل'
  },
  
  // Contracts Page
  activeContracts: {
    en: 'Active Contracts',
    ar: 'العقود النشطة'
  },
  contractsManagement: {
    en: 'Manage your contracts with clients',
    ar: 'إدارة عقودك مع العملاء'
  },
  client: {
    en: 'Client',
    ar: 'العميل'
  },
  value: {
    en: 'Value',
    ar: 'القيمة'
  },
  date: {
    en: 'Date',
    ar: 'التاريخ'
  },
  actions: {
    en: 'Actions',
    ar: 'الإجراءات'
  },
  
  // Invoices Page
  recentInvoices: {
    en: 'Recent Invoices',
    ar: 'الفواتير الأخيرة'
  },
  invoiceManagement: {
    en: 'Manage your invoices and payments',
    ar: 'إدارة الفواتير والمدفوعات الخاصة بك'
  },
  createInvoice: {
    en: 'Create Invoice',
    ar: 'إنشاء فاتورة'
  },
  invoiceId: {
    en: 'Invoice ID',
    ar: 'رقم الفاتورة'
  },
  title: {
    en: 'Title',
    ar: 'العنوان'
  },
  amount: {
    en: 'Amount',
    ar: 'المبلغ'
  },
  download: {
    en: 'Download',
    ar: 'تنزيل'
  },
  
  // Account Page
  profile: {
    en: 'Profile',
    ar: 'الملف الشخصي'
  },
  companyInfo: {
    en: 'Company Info',
    ar: 'معلومات الشركة'
  },
  payment: {
    en: 'Payment',
    ar: 'الدفع'
  },
  personalInformation: {
    en: 'Personal Information',
    ar: 'المعلومات الشخصية'
  },
  managePersonalInfo: {
    en: 'Manage your personal information',
    ar: 'إدارة معلوماتك الشخصية'
  },
  fullName: {
    en: 'Full Name',
    ar: 'الاسم الكامل'
  },
  email: {
    en: 'Email',
    ar: 'البريد الإلكتروني'
  },
  phone: {
    en: 'Phone',
    ar: 'الهاتف'
  },
  position: {
    en: 'Position',
    ar: 'المنصب'
  },
  save: {
    en: 'Save',
    ar: 'حفظ'
  },
  security: {
    en: 'Security',
    ar: 'الأمان'
  },
  managePassword: {
    en: 'Manage your password',
    ar: 'إدارة كلمة المرور الخاصة بك'
  },
  currentPassword: {
    en: 'Current Password',
    ar: 'كلمة المرور الحالية'
  },
  newPassword: {
    en: 'New Password',
    ar: 'كلمة المرور الجديدة'
  },
  confirmPassword: {
    en: 'Confirm Password',
    ar: 'تأكيد كلمة المرور'
  },
  updatePassword: {
    en: 'Update Password',
    ar: 'تحديث كلمة المرور'
  },
  companyInformation: {
    en: 'Company Information',
    ar: 'معلومات الشركة'
  },
  manageCompanyInfo: {
    en: 'Manage your company information',
    ar: 'إدارة معلومات شركتك'
  },
  companyName: {
    en: 'Company Name',
    ar: 'اسم الشركة'
  },
  taxId: {
    en: 'Tax ID',
    ar: 'الرقم الضريبي'
  },
  address: {
    en: 'Address',
    ar: 'العنوان'
  },
  website: {
    en: 'Website',
    ar: 'الموقع الإلكتروني'
  },
  businessDocuments: {
    en: 'Business Documents',
    ar: 'وثائق الأعمال'
  },
  uploadDocuments: {
    en: 'Upload your business documents',
    ar: 'تحميل وثائق عملك'
  },
  commercialRegister: {
    en: 'Commercial Register',
    ar: 'السجل التجاري'
  },
  taxCertificate: {
    en: 'Tax Certificate',
    ar: 'الشهادة الضريبية'
  },
  upload: {
    en: 'Upload',
    ar: 'تحميل'
  },
  saveDocuments: {
    en: 'Save Documents',
    ar: 'حفظ المستندات'
  },
  verificationStatus: {
    en: 'Verification Status',
    ar: 'حالة التحقق'
  },
  verificationDesc: {
    en: 'Check your verification status',
    ar: 'تحقق من حالة التحقق الخاصة بك'
  },
  emailVerification: {
    en: 'Email Verification',
    ar: 'التحقق من البريد الإلكتروني'
  },
  phoneVerification: {
    en: 'Phone Verification',
    ar: 'التحقق من الهاتف'
  },
  businessVerification: {
    en: 'Business Verification',
    ar: 'التحقق من الأعمال'
  },
  kycVerification: {
    en: 'KYC Verification',
    ar: 'التحقق من هوية العميل'
  },
  verified: {
    en: 'Verified',
    ar: 'تم التحقق'
  },
  pending: {
    en: 'Pending',
    ar: 'قيد الانتظار'
  },
  notStarted: {
    en: 'Not Started',
    ar: 'لم يبدأ بعد'
  },
  start: {
    en: 'Start',
    ar: 'بدء'
  },
  paymentMethods: {
    en: 'Payment Methods',
    ar: 'طرق الدفع'
  },
  managePaymentMethods: {
    en: 'Manage your payment methods',
    ar: 'إدارة طرق الدفع الخاصة بك'
  },
  bankTransfer: {
    en: 'Bank Transfer',
    ar: 'تحويل بنكي'
  },
  primary: {
    en: 'Primary',
    ar: 'أساسي'
  },
  setAsPrimary: {
    en: 'Set as Primary',
    ar: 'تعيين كأساسي'
  },
  addPaymentMethod: {
    en: 'Add Payment Method',
    ar: 'إضافة طريقة دفع'
  },
  
  // Notifications Page
  unread: {
    en: 'Unread',
    ar: 'غير مقروءة'
  },
  all: {
    en: 'All',
    ar: 'الكل'
  },
  markAllAsRead: {
    en: 'Mark All as Read',
    ar: 'تحديد الكل كمقروء'
  },
  unreadNotifications: {
    en: 'Unread Notifications',
    ar: 'الإشعارات غير المقروءة'
  },
  unreadNotificationsDesc: {
    en: 'Your unread notifications',
    ar: 'إشعاراتك غير المقروءة'
  },
  allNotifications: {
    en: 'All Notifications',
    ar: 'جميع الإشعارات'
  },
  allNotificationsDesc: {
    en: 'View all your notifications',
    ar: 'عرض جميع إشعاراتك'
  },
  markAsRead: {
    en: 'Mark as Read',
    ar: 'تحديد كمقروء'
  },
  notificationSettings: {
    en: 'Notification Settings',
    ar: 'إعدادات الإشعارات'
  },
  notificationSettingsDesc: {
    en: 'Manage your notification preferences',
    ar: 'إدارة تفضيلات الإشعارات الخاصة بك'
  },
  emailNotifications: {
    en: 'Email Notifications',
    ar: 'إشعارات البريد الإلكتروني'
  },
  receiveEmailNotifications: {
    en: 'Receive notifications via email',
    ar: 'تلقي الإشعارات عبر البريد الإلكتروني'
  },
  pushNotifications: {
    en: 'Push Notifications',
    ar: 'الإشعارات المنبثقة'
  },
  receivePushNotifications: {
    en: 'Receive push notifications',
    ar: 'تلقي الإشعارات المنبثقة'
  },
  configure: {
    en: 'Configure',
    ar: 'تكوين'
  },
  
  // Freelancer Projects Page
  myProjects: {
    en: 'My Projects',
    ar: 'مشاريعي'
  },
  findProjects: {
    en: 'Find Projects',
    ar: 'البحث عن مشاريع'
  },
  activeProjects: {
    en: 'Active Projects',
    ar: 'المشاريع النشطة'
  },
  completedProjects: {
    en: 'Completed Projects',
    ar: 'المشاريع المكتملة'
  },
  opportunities: {
    en: 'Opportunities',
    ar: 'الفرص'
  },
  currentProjectsDesc: {
    en: 'Projects you are currently working on',
    ar: 'المشاريع التي تعمل عليها حاليًا'
  },
  completedProjectsDesc: {
    en: 'Projects you have completed',
    ar: 'المشاريع التي أكملتها'
  },
  opportunitiesDesc: {
    en: 'Available projects that match your skills',
    ar: 'المشاريع المتاحة التي تتناسب مع مهاراتك'
  },
  updateProgress: {
    en: 'Update Progress',
    ar: 'تحديث التقدم'
  },
  applyNow: {
    en: 'Apply Now',
    ar: 'تقديم طلب الآن'
  },
  
  // Client Groups Page
  createNewGroup: {
    en: 'Create New Group',
    ar: 'إنشاء مجموعة جديدة'
  },
  invitations: {
    en: 'Invitations',
    ar: 'الدعوات'
  },
  discover: {
    en: 'Discover',
    ar: 'استكشاف'
  },
  progress: {
    en: 'Progress',
    ar: 'التقدم'
  },
  viewMembers: {
    en: 'View Members',
    ar: 'عرض الأعضاء'
  },
  manageGroup: {
    en: 'Manage Group',
    ar: 'إدارة المجموعة'
  },
  pendingInvitations: {
    en: 'Pending Invitations',
    ar: 'الدعوات المعلقة'
  },
  groupInvitationsDesc: {
    en: 'Groups you have been invited to',
    ar: 'المجموعات التي تمت دعوتك إليها'
  },
  decline: {
    en: 'Decline',
    ar: 'رفض'
  },
  accept: {
    en: 'Accept',
    ar: 'قبول'
  },
  discoverGroups: {
    en: 'Discover Groups',
    ar: 'استكشاف المجموعات'
  },
  discoverGroupsDesc: {
    en: 'Find groups to join',
    ar: 'البحث عن مجموعات للانضمام إليها'
  },
  findGroups: {
    en: 'Find Groups',
    ar: 'البحث عن مجموعات'
  },
  findGroupsDesc: {
    en: 'Search for groups based on your needs and interests',
    ar: 'ابحث عن مجموعات بناءً على احتياجاتك واهتماماتك'
  },
  searchGroups: {
    en: 'Search Groups',
    ar: 'البحث عن مجموعات'
  },
  
  // Additional Terms
  manageRFQs: {
    en: 'Manage RFQs',
    ar: 'إدارة طلبات عروض الأسعار'
  },
  rfq: {
    en: 'RFQ',
    ar: 'طلب عرض سعر'
  }
};

export const t = (key: string, language: 'en' | 'ar'): string => {
  return translations[key]?.[language] || key;
};
