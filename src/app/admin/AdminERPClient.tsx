'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  CheckCircle2, 
  Package, 
  Users, 
  UserCheck, 
  BookOpen, 
  MapPin, 
  MessageSquare, 
  Image as ImageIcon, 
  Globe, 
  BarChart3, 
  Settings, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Phone, 
  MessageCircle, 
  Copy, 
  FileDown, 
  X, 
  RefreshCw, 
  Check, 
  DollarSign, 
  CreditCard, 
  Award,
  Clock,
  Download,
  Save,
  Star,
  Sparkles,
  Upload,
  Video,
  ExternalLink,
  Layers,
  Link as LinkIcon,
  Crown,
  CheckCircle,
  LogOut,
  Menu,
  Mail,
  ArrowUpRight
} from 'lucide-react';
import { 
  getAdminERPData, 
  updateBookingWorkflowStatusAction, 
  deleteBookingAction,
  upsertPackageAction, 
  deletePackageAction, 
  upsertHotelAction, 
  deleteHotelAction, 
  upsertLeadAction, 
  deleteLeadAction,
  convertLeadToBookingAction, 
  upsertCustomerAction,
  deleteCustomerAction,
  upsertArticleAction,
  deleteArticleAction,
  upsertSacredPlaceAction,
  deleteSacredPlaceAction,
  upsertTestimonialAction,
  deleteTestimonialAction,
  upsertMediaItemAction,
  deleteMediaItemAction,
  upsertHeroSlideAction,
  deleteHeroSlideAction,
  updateSiteSettingsAction,
  logoutAdminAction
} from './actions';

type ModuleTab = 
  | 'dashboard'
  | 'booking_requests'
  | 'confirmed_bookings'
  | 'hero_slides'
  | 'packages'
  | 'customers'
  | 'leads_crm'
  | 'knowledge_centre'
  | 'sacred_places'
  | 'testimonials'
  | 'media_library'
  | 'seo_manager'
  | 'reports'
  | 'settings';

type Role = 'SUPER_ADMIN' | 'ADMIN' | 'BOOKING_EXECUTIVE' | 'CONTENT_MANAGER' | 'SEO_MANAGER' | 'ACCOUNTS';

interface AdminERPClientProps {
  initialData: {
    preBookings?: any[];
    leads?: any[];
    customers?: any[];
    packages?: any[];
    hotels?: any[];
    articles?: any[];
    sacredPlaces?: any[];
    testimonials?: any[];
    mediaItems?: any[];
    heroSlides?: any[];
    siteSettings?: any;
  };
  session?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

// ==========================================================
// REUSABLE UNIVERSAL MEDIA UPLOADER COMPONENT (IMAGE, VIDEO & URL)
// ==========================================================
function MediaUploaderInput({ 
  label, 
  value, 
  onChange 
}: { 
  label: string; 
  value: string; 
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        onChange(data.url);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('File upload error');
    } finally {
      setUploading(false);
    }
  };

  const isVideo = value?.match(/\.(mp4|webm|ogg|mov)$/i) || value?.includes('video');

  return (
    <div className="space-y-2">
      <label className="block font-semibold text-xs text-slate-300">{label}</label>
      <div className="flex gap-2">
        <input 
          type="text" 
          value={value || ''} 
          onChange={e => onChange(e.target.value)} 
          placeholder="Paste Image/Video URL or upload file..."
          className="flex-1 p-3 bg-slate-900/90 border border-slate-700 rounded-xl text-white font-bold text-xs focus:outline-none focus:border-[#F48D08]"
        />
        <label className="bg-gradient-to-r from-[#F48D08] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white px-4 py-3 rounded-xl font-bold text-xs cursor-pointer flex items-center gap-1.5 shrink-0 shadow-md">
          <Upload className={`w-4 h-4 ${uploading ? 'animate-spin' : ''}`} />
          <span>{uploading ? 'Uploading...' : 'Browse File'}</span>
          <input 
            type="file" 
            accept="image/*,video/*" 
            onChange={handleFileUpload} 
            className="hidden" 
          />
        </label>
      </div>

      {value && (
        <div className="mt-2 h-32 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 relative group shadow-inner flex items-center justify-center p-2">
          {isVideo ? (
            <video src={value} controls className="w-full h-full object-cover" />
          ) : (
            <img 
              src={value} 
              alt="Preview" 
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = '/Pind-Daan-Wale.svg';
              }}
              className="w-full h-full object-contain" 
            />
          )}
          <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-amber-400 border border-amber-500/30">
            {isVideo ? '🎥 Live Video Preview' : '🖼️ Live Image Preview'}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminERPClient({ initialData, session }: AdminERPClientProps) {
  const [activeTab, setActiveTab] = useState<ModuleTab>('dashboard');
  const [currentRole, setCurrentRole] = useState<Role>((session?.role as Role) || 'SUPER_ADMIN');
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = async () => {
    if (confirm('क्या आप एडमिन पैनल से लॉगआउट करना चाहते हैं? / Are you sure you want to log out?')) {
      setLoggingOut(true);
      try {
        await logoutAdminAction();
      } catch (_) {}
      window.location.href = '/admin/login';
    }
  };

  // ERP Database State
  const [preBookings, setPreBookings] = useState<any[]>(initialData.preBookings || []);
  const [leads, setLeads] = useState<any[]>(initialData.leads || []);
  const [customers, setCustomers] = useState<any[]>(initialData.customers || []);
  const [packages, setPackages] = useState<any[]>(initialData.packages || []);
  const [hotels, setHotels] = useState<any[]>(initialData.hotels || []);
  const [articles, setArticles] = useState<any[]>(initialData.articles || []);
  const [sacredPlaces, setSacredPlaces] = useState<any[]>(initialData.sacredPlaces || []);
  const [testimonials, setTestimonials] = useState<any[]>(initialData.testimonials || []);
  const [mediaItems, setMediaItems] = useState<any[]>(initialData.mediaItems || []);
  const [heroSlides, setHeroSlides] = useState<any[]>(initialData.heroSlides || []);
  const [siteSettings, setSiteSettings] = useState<any>(initialData.siteSettings || {});
  const [sacredPlaceSearch, setSacredPlaceSearch] = useState<string>('');

  // Copy Feedback Toast
  const [copyToast, setCopyToast] = useState('');

  // Modal State for Forms
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>('');

  // Dynamic Forms State
  const [heroSlideForm, setHeroSlideForm] = useState({
    id: '',
    badge: 'GAYA JI SACRED PILGRIMAGE',
    title: '',
    subtitle: '',
    mediaType: 'IMAGE',
    mediaUrl: '/images/hero_cinematic.jpg',
    ctaLabel: 'Begin Your Sacred Journey',
    ctaLink: '/pre-booking',
    secondaryCtaLabel: 'Explore Gaya Ji Heritage',
    secondaryCtaLink: '/gaya-ji',
    order: 1,
    isActive: true
  });

  // ENTERPRISE 17-FIELD PACKAGE FORM
  const [packageForm, setPackageForm] = useState({
    id: '',
    slug: '',
    title: '',
    hindiTitle: '',
    duration: '1 Day (1 Night Stay)',
    badge: 'MOST POPULAR',
    priceINR: 9449,
    priceUSD: 129,
    goldPriceINR: 14449,
    goldPriceUSD: 199,
    shortDesc: 'एक दिन की यह पूर्ण व्यवस्था, जो देगा सुकून और शांति।',
    scripturalSignificance: 'Garuda Purana: Single Pind offered at Vishnupad grants instant Moksha to departed ancestors.',
    inclusions: 'पिंडदान एवं पूजा सामग्री\nऑटो द्वारा पिकअप एवं ड्रॉप\nसात्विक भोजन\nआरामदायक 1 नाइट स्टे की व्यवस्था\n2 से अधिक होने पर अतिरिक्त शुल्क लगेगा',
    goldInclusions: 'पिंडदान एवं पूजा सामग्री\nकैब द्वारा पिकअप एवं ड्रॉप (Private AC SUV / Innova)\nसात्विक भोजन (Pure Veg Gourmet)\nआरामदायक 1 नाइट 4-Star Resort स्टे की व्यवस्था\n2 से अधिक होने पर अतिरिक्त शुल्क लगेगा',
    exclusions: 'Personal expenses & Extra vehicle toll fees beyond itinerary',
    vedisCovered: 'Falgu River, Vishnupad Mandir, Akshayavat',
    panditType: '4th-Gen Hereditary Gaya Teerth Panda',
    foodIncluded: 'Pure Sattvic Meals Included (सात्विक भोजन)',
    image: '/images/gaya_vishnupad.jpg'
  });

  const [articleForm, setArticleForm] = useState({
    id: '',
    title: '',
    slug: '',
    category: 'Scriptural Knowledge',
    summary: '',
    content: '',
    heroImage: '/images/gaya_vishnupad.jpg',
    readTime: '5 min read'
  });

  const [placeForm, setPlaceForm] = useState({
    id: '',
    name: '',
    hindiName: '',
    tagline: '',
    description: '',
    history: '',
    heroImage: '/images/gaya_vishnupad.jpg'
  });

  const [testimonialForm, setTestimonialForm] = useState({
    id: '',
    author: '',
    city: '',
    country: 'India',
    ritual: '3-Day Complete Tri-Sthali Pind Daan',
    content: '',
    rating: 5,
    avatarUrl: '/images/gaya_vishnupad.jpg',
    videoUrl: '',
    poojaImage: '/images/pind_daan_vidhi.jpg',
    status: 'APPROVED'
  });

  const [mediaForm, setMediaForm] = useState({
    id: '',
    title: '',
    folder: 'Images',
    url: '/images/gaya_vishnupad.jpg',
    tags: 'gaya, temple'
  });

  const [settingsForm, setSettingsForm] = useState({
    companyName: initialData.siteSettings?.companyName || 'PindDaanWale 2.0',
    logoUrl: initialData.siteSettings?.logoUrl || '/images/pinddaanwale_logo.png',
    helpdeskPhone: initialData.siteSettings?.helpdeskPhone || '+91 7463055338',
    email: initialData.siteSettings?.email || 'support@pinddaanwale.com',
    address: initialData.siteSettings?.address || 'Vishnupad Temple Compound, Gaya Ji, Bihar - 823001',
    bankName: initialData.siteSettings?.bankName || 'State Bank of India',
    accountName: initialData.siteSettings?.accountName || 'PindDaanWale Pilgrimage Services',
    accountNumber: initialData.siteSettings?.accountNumber || '40982317822',
    ifscCode: initialData.siteSettings?.ifscCode || 'SBIN0000078',
    upiId: initialData.siteSettings?.upiId || '7463055338@sbi',
    footerBgImage: initialData.siteSettings?.footerBgImage || '/images/gaya_vishnupad.jpg',
    upiQrImage: initialData.siteSettings?.upiQrImage || '/images/gaya_vishnupad.jpg',
    metaTitle: initialData.siteSettings?.metaTitle || 'PindDaanWale | Sacred & Authentic Gaya Ji Pind Daan',
    metaDescription: initialData.siteSettings?.metaDescription || 'The definitive digital platform for sacred rites, Pind Daan, and Pitru Paksha at Vishnupad Temple, Gaya Ji.',
    canonicalUrl: initialData.siteSettings?.canonicalUrl || 'https://www.pinddaanwale.com',
    latitude: initialData.siteSettings?.latitude || '24.7788',
    longitude: initialData.siteSettings?.longitude || '85.0084',
    googlePlaceId: initialData.siteSettings?.googlePlaceId || 'ChIJ4Q2k_3S88jkRPf3_x6z1',
    googleAnalyticsId: initialData.siteSettings?.googleAnalyticsId || '',
    searchConsoleTag: initialData.siteSettings?.searchConsoleTag || '',
    gtmContainerId: initialData.siteSettings?.gtmContainerId || '',
    clarityId: initialData.siteSettings?.clarityId || '',
    metaPixelId: initialData.siteSettings?.metaPixelId || '',
    aiwcrmWebhookUrl: initialData.siteSettings?.aiwcrmWebhookUrl || 'https://www.aiwcrm.com/api/v1/webhooks/lead',
    aiwcrmApiKey: initialData.siteSettings?.aiwcrmApiKey || '',
    smtpHost: initialData.siteSettings?.smtpHost || 'smtp.hostinger.com',
    smtpPort: initialData.siteSettings?.smtpPort || 465,
    smtpUser: initialData.siteSettings?.smtpUser || 'support@pinddaanwale.com',
    smtpPassword: initialData.siteSettings?.smtpPassword || '',
    smtpFromEmail: initialData.siteSettings?.smtpFromEmail || 'support@pinddaanwale.com',
    adminNotificationEmail: initialData.siteSettings?.adminNotificationEmail || 'support@pinddaanwale.com'
  });

  // Reload ERP Data
  const loadERPData = async () => {
    setLoading(true);
    const res = await getAdminERPData();
    if (res.success) {
      setPreBookings(res.preBookings || []);
      setLeads(res.leads || []);
      setCustomers(res.customers || []);
      setPackages(res.packages || []);
      setHotels(res.hotels || []);
      setArticles(res.articles || []);
      setSacredPlaces(res.sacredPlaces || []);
      setTestimonials(res.testimonials || []);
      setMediaItems(res.mediaItems || []);
      setHeroSlides(res.heroSlides || []);
      setSiteSettings(res.siteSettings || {});
      if (res.siteSettings) {
        setSettingsForm({
          companyName: res.siteSettings.companyName || 'PindDaanWale 2.0',
          logoUrl: res.siteSettings.logoUrl || '/images/pinddaanwale_logo.png',
          helpdeskPhone: res.siteSettings.helpdeskPhone || '+91 7463055338',
          email: res.siteSettings.email || 'support@pinddaanwale.com',
          address: res.siteSettings.address || 'Vishnupad Temple Compound, Gaya Ji, Bihar - 823001',
          bankName: res.siteSettings.bankName || 'State Bank of India',
          accountName: res.siteSettings.accountName || 'PindDaanWale Pilgrimage Services',
          accountNumber: res.siteSettings.accountNumber || '40982317822',
          ifscCode: res.siteSettings.ifscCode || 'SBIN0000078',
          upiId: res.siteSettings.upiId || '7463055338@sbi',
          footerBgImage: res.siteSettings.footerBgImage || '/images/gaya_vishnupad.jpg',
          upiQrImage: res.siteSettings.upiQrImage || '/images/gaya_vishnupad.jpg',
          metaTitle: res.siteSettings.metaTitle || 'PindDaanWale | Sacred & Authentic Gaya Ji Pind Daan',
          metaDescription: res.siteSettings.metaDescription || 'The definitive digital platform for sacred rites, Pind Daan, and Pitru Paksha at Vishnupad Temple, Gaya Ji.',
          canonicalUrl: res.siteSettings.canonicalUrl || 'https://www.pinddaanwale.com',
          latitude: res.siteSettings.latitude || '24.7788',
          longitude: res.siteSettings.longitude || '85.0084',
          googlePlaceId: res.siteSettings.googlePlaceId || 'ChIJ4Q2k_3S88jkRPf3_x6z1',
          googleAnalyticsId: res.siteSettings.googleAnalyticsId || '',
          searchConsoleTag: res.siteSettings.searchConsoleTag || '',
          gtmContainerId: res.siteSettings.gtmContainerId || '',
          clarityId: res.siteSettings.clarityId || '',
          metaPixelId: res.siteSettings.metaPixelId || '',
          aiwcrmWebhookUrl: res.siteSettings.aiwcrmWebhookUrl || 'https://www.aiwcrm.com/api/v1/webhooks/lead',
          aiwcrmApiKey: res.siteSettings.aiwcrmApiKey || '',
          smtpHost: res.siteSettings.smtpHost || 'smtp.hostinger.com',
          smtpPort: res.siteSettings.smtpPort || 465,
          smtpUser: res.siteSettings.smtpUser || 'support@pinddaanwale.com',
          smtpPassword: res.siteSettings.smtpPassword || '',
          smtpFromEmail: res.siteSettings.smtpFromEmail || 'support@pinddaanwale.com',
          adminNotificationEmail: res.siteSettings.adminNotificationEmail || 'support@pinddaanwale.com'
        });
      }
    }
    setLoading(false);
  };

  const triggerCopyToast = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyToast(`Copied ${label}: ${text}`);
    setTimeout(() => setCopyToast(''), 3000);
  };

  // Save Handlers
  const handleSaveHeroSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertHeroSlideAction(heroSlideForm);
    setIsModalOpen(false);
    loadERPData();
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertPackageAction(packageForm);
    setIsModalOpen(false);
    loadERPData();
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertArticleAction(articleForm);
    setIsModalOpen(false);
    loadERPData();
  };

  const handleSaveSacredPlace = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertSacredPlaceAction(placeForm);
    setIsModalOpen(false);
    loadERPData();
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertTestimonialAction(testimonialForm);
    setIsModalOpen(false);
    loadERPData();
  };

  const handleSaveMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertMediaItemAction(mediaForm);
    setIsModalOpen(false);
    loadERPData();
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteSettingsAction(settingsForm);
    triggerCopyToast('Updated', 'ERP Settings');
    loadERPData();
  };

  // Edit Handlers
  const handleEditHeroSlide = (slide: any) => {
    setHeroSlideForm({
      id: slide.id || '',
      badge: slide.badge || 'GAYA JI SACRED PILGRIMAGE',
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      mediaType: slide.mediaType || 'IMAGE',
      mediaUrl: slide.mediaUrl || '/images/hero_cinematic.jpg',
      ctaLabel: slide.ctaLabel || 'Begin Your Sacred Journey',
      ctaLink: slide.ctaLink || '/pre-booking',
      secondaryCtaLabel: slide.secondaryCtaLabel || 'Explore Gaya Ji Heritage',
      secondaryCtaLink: slide.secondaryCtaLink || '/gaya-ji',
      order: slide.order || 1,
      isActive: slide.isActive !== undefined ? slide.isActive : true
    });
    setModalType('heroslide');
    setIsModalOpen(true);
  };

  const handleEditPackage = (pkg: any) => {
    setPackageForm({
      id: pkg.id || '',
      slug: pkg.slug || '',
      title: pkg.title || '',
      hindiTitle: pkg.hindiTitle || '',
      duration: pkg.duration || '1 Day (1 Night Stay)',
      badge: pkg.badge || 'MOST POPULAR',
      priceINR: pkg.priceINR || 9449,
      priceUSD: pkg.priceUSD || 129,
      goldPriceINR: pkg.goldPriceINR || 14449,
      goldPriceUSD: pkg.goldPriceUSD || 199,
      shortDesc: pkg.shortDesc || '',
      scripturalSignificance: pkg.scripturalSignificance || '',
      inclusions: pkg.inclusions || '',
      goldInclusions: pkg.goldInclusions || '',
      exclusions: pkg.exclusions || '',
      vedisCovered: pkg.vedisCovered || 'Falgu River, Vishnupad Mandir, Akshayavat',
      panditType: pkg.panditType || 'Verified Gaya Teerth Panda',
      foodIncluded: pkg.foodIncluded || 'Pure Sattvic Meals Included',
      image: pkg.image || '/images/gaya_vishnupad.jpg'
    });
    setModalType('package');
    setIsModalOpen(true);
  };

  const handleEditArticle = (art: any) => {
    setArticleForm({
      id: art.id || '',
      title: art.title || '',
      slug: art.slug || '',
      category: art.category || 'Scriptural Knowledge',
      summary: art.summary || '',
      content: art.content || '',
      heroImage: art.heroImage || '/images/gaya_vishnupad.jpg',
      readTime: art.readTime || '5 min read'
    });
    setModalType('article');
    setIsModalOpen(true);
  };

  const handleEditPlace = (place: any) => {
    setPlaceForm({
      id: place.id || '',
      name: place.name || '',
      hindiName: place.hindiName || '',
      tagline: place.tagline || '',
      description: place.description || '',
      history: place.history || '',
      heroImage: place.heroImage || '/images/gaya_vishnupad.jpg'
    });
    setModalType('place');
    setIsModalOpen(true);
  };

  const handleEditTestimonial = (t: any) => {
    setTestimonialForm({
      id: t.id || '',
      author: t.author || '',
      city: t.city || '',
      country: t.country || 'India',
      ritual: t.ritual || 'Vedic Pind Daan',
      content: t.content || '',
      rating: t.rating || 5,
      avatarUrl: t.avatarUrl || '/images/gaya_vishnupad.jpg',
      videoUrl: t.videoUrl || '',
      poojaImage: t.poojaImage || '/images/pind_daan_vidhi.jpg',
      status: t.status || 'APPROVED'
    });
    setModalType('testimonial');
    setIsModalOpen(true);
  };

  const confirmedBookings = preBookings.filter(b => 
    ['BOOKING_CONFIRMED', 'HOTEL_RESERVED', 'ARRIVAL_CONFIRMED', 'RITUAL_IN_PROGRESS', 'RITUAL_COMPLETED'].includes(b.workflowStatus || b.status)
  );

  const pendingBookingRequests = preBookings.filter(b => 
    !['BOOKING_CONFIRMED', 'HOTEL_RESERVED', 'ARRIVAL_CONFIRMED', 'RITUAL_IN_PROGRESS', 'RITUAL_COMPLETED', 'CANCELLED'].includes(b.workflowStatus || b.status)
  );

  const totalRevenue = preBookings.reduce((sum, b) => sum + (b.estimatedCost || 0), 0);
  const confirmedCount = confirmedBookings.length;


  const navTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, count: null },
    { id: 'booking_requests', label: 'Booking Requests', icon: CalendarCheck, count: pendingBookingRequests.length, badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { id: 'confirmed_bookings', label: 'Confirmed Bookings', icon: CheckCircle2, count: confirmedCount, badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    { id: 'leads_crm', label: 'Lead Management', icon: UserCheck, count: leads.length, badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    { id: 'customers', label: 'Devotees Directory', icon: Users, count: customers.length, badgeColor: null },
    { id: 'packages', label: 'Packages & Pricing', icon: Package, count: packages.length, badgeColor: null },
    { id: 'sacred_places', label: 'Sacred Vedis (45+)', icon: MapPin, count: sacredPlaces.length, badgeColor: null },
    { id: 'hero_slides', label: 'Website CMS Slides', icon: Sparkles, count: heroSlides.length, badgeColor: null },
    { id: 'knowledge_centre', label: 'Knowledge Centre', icon: BookOpen, count: articles.length, badgeColor: null },
    { id: 'testimonials', label: 'Devotee Reviews & Video', icon: MessageSquare, count: testimonials.length, badgeColor: null },
    { id: 'media_library', label: 'Digital Assets', icon: ImageIcon, count: mediaItems.length, badgeColor: null },
    { id: 'seo_manager', label: 'SEO & AI Search', icon: Globe, count: null },
    { id: 'reports', label: 'Analytics & Revenue', icon: BarChart3, count: null },
    { id: 'settings', label: 'Platform Configuration', icon: Settings, count: null }
  ];

  return (
    <div className="h-screen h-[100dvh] w-full bg-[#0B0F19] text-slate-100 flex overflow-hidden font-sans antialiased">
      
      {/* COPY TOAST FEEDBACK */}
      {copyToast && (
        <div className="fixed top-5 right-5 z-50 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-2xl border border-amber-400/30 animate-bounce flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{copyToast}</span>
        </div>
      )}

      {/* MOBILE NAVIGATION DRAWER OVERLAY */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileNavOpen(false)} 
          />
          <aside className="relative w-72 max-w-[85vw] bg-[#0E1626] border-r border-slate-800 h-full flex flex-col justify-between p-5 overflow-y-auto shadow-2xl z-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8B2516] via-[#B45309] to-[#F59E0B] p-0.5 ring-1 ring-amber-500/30 flex items-center justify-center font-bold text-white text-xs shadow-md">
                    PD
                  </div>
                  <div>
                    <span className="font-bold text-sm text-white block leading-tight">PindDaanWale</span>
                    <span className="text-[9px] uppercase font-mono font-extrabold text-amber-400">Command Center</span>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="space-y-1 text-xs font-medium">
                {navTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as ModuleTab);
                        setMobileNavOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent text-amber-300 font-bold border-l-4 border-amber-500 shadow-sm'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                        <span className="truncate">{tab.label}</span>
                      </div>
                      {tab.count !== null && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                            : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-all text-xs font-bold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{loggingOut ? 'लॉगआउट हो रहे हैं...' : 'लॉगआउट / Sign Out'}</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* DESKTOP SIDEBAR NAVIGATION (PERMANENTLY STICKY FULL-HEIGHT) */}
      <aside className="w-64 h-screen h-[100dvh] bg-[#0E1626] border-r border-slate-800/80 flex flex-col justify-between shrink-0 hidden md:flex sticky top-0 z-30 overflow-y-auto no-scrollbar">
        <div className="p-5 space-y-6">
          
          {/* BRAND LOGO & SYSTEM STATUS */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8B2516] via-[#B45309] to-[#F59E0B] p-0.5 ring-1 ring-amber-500/30 flex items-center justify-center font-bold text-white shadow-lg text-sm">
              PD
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white leading-tight">PindDaanWale</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Online" />
              </div>
              <span className="text-[10px] uppercase font-mono font-extrabold text-amber-400 tracking-wider">Command Center 2.0</span>
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="space-y-1 text-xs font-medium">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ModuleTab)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent text-amber-300 font-bold border-l-[3px] border-amber-500 shadow-sm' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="truncate whitespace-nowrap">{tab.label}</span>
                  </div>
                  {tab.count !== null && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ml-1.5 shrink-0 ${
                      isActive 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                        : 'bg-slate-800/90 text-slate-400 border border-slate-700/50'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* BOTTOM USER PROFILE & ROLE */}
        <div className="p-4 border-t border-slate-800/80 bg-[#0B1120]/40 space-y-3">
          {session && (
            <div className="bg-slate-800/50 p-2.5 rounded-xl border border-slate-700/50 flex items-center justify-between">
              <div className="truncate pr-2">
                <div className="text-[11px] font-bold text-white truncate">{session.name || 'Super Admin'}</div>
                <div className="text-[9px] text-slate-400 font-mono truncate">{session.email}</div>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-bold border border-amber-500/25 shrink-0">
                {session.role || 'ADMIN'}
              </span>
            </div>
          )}

          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">RBAC Active Access:</div>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as Role)}
              className="w-full bg-slate-900 border border-slate-700/80 text-xs font-bold text-amber-300 rounded-xl p-2 focus:outline-none focus:border-amber-500"
            >
              <option value="SUPER_ADMIN">👑 Super Admin</option>
              <option value="ADMIN">🛡️ Admin</option>
              <option value="BOOKING_EXECUTIVE">📞 Booking Executive</option>
              <option value="CONTENT_MANAGER">📝 Content Manager</option>
              <option value="SEO_MANAGER">🔍 SEO Manager</option>
              <option value="ACCOUNTS">💳 Accounts</option>
            </select>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 border border-rose-500/20 transition-all text-xs font-bold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{loggingOut ? 'लॉगआउट हो रहे हैं...' : 'लॉगआउट / Sign Out'}</span>
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE CONTENT AREA (INDEPENDENT SCROLL CONTAINER) */}
      <main className="flex-1 flex flex-col min-w-0 h-screen h-[100dvh] overflow-y-auto bg-[#0B0F19] relative">
        
        {/* EXECUTIVE HEADER (PERMANENTLY STICKY AT TOP) */}
        <header className="h-16 border-b border-slate-800/80 bg-[#0E1626]/95 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shrink-0 shadow-sm">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="text-[10px] text-slate-400 font-mono hidden sm:block">Admin ERP /</div>
              <h1 className="font-bold text-base sm:text-lg text-white capitalize tracking-tight leading-none">
                {activeTab.replace(/_/g, ' ')}
              </h1>
            </div>

            {/* SEARCH INPUT WITH EXPLICIT PADDING TO PREVENT OVERLAP */}
            <div className="relative w-48 sm:w-64 md:w-72 hidden sm:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search Ref ID, Devotee, Mobile..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ backgroundColor: '#0B1120', color: '#FFFFFF', paddingLeft: '2.75rem', paddingRight: '2.25rem' }}
                className="w-full bg-[#0B1120] border border-slate-700/80 rounded-full !pl-11 !pr-8 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              title="View Public Website"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/60 transition-all"
            >
              <span>View Site</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={loadERPData}
              title="Refresh ERP Data"
              className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border border-slate-700/60 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh ERP</span>
            </button>

            {['hero_slides', 'packages', 'leads_crm', 'customers', 'knowledge_centre', 'sacred_places', 'testimonials', 'media_library'].includes(activeTab) && (
              <button
                onClick={() => {
                  setModalType(activeTab === 'hero_slides' ? 'heroslide' : activeTab === 'packages' ? 'package' : activeTab === 'leads_crm' ? 'lead' : activeTab === 'customers' ? 'customer' : activeTab === 'knowledge_centre' ? 'article' : activeTab === 'sacred_places' ? 'place' : activeTab === 'testimonials' ? 'testimonial' : 'media');
                  setIsModalOpen(true);
                }}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Record</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              title="लॉगआउट / Sign Out"
              className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border border-rose-500/25"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{loggingOut ? 'Signing out...' : 'Logout'}</span>
            </button>
          </div>
        </header>

        {/* MOBILE QUICK NAVIGATION HORIZONTAL CHIPS (STICKY DIRECTLY UNDER HEADER) */}
        <div className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-[#0E1626]/95 backdrop-blur-xl border-b border-slate-800/80 overflow-x-auto no-scrollbar shrink-0 sticky top-16 z-20 shadow-sm">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'booking_requests', label: `Requests (${pendingBookingRequests.length})` },
            { id: 'confirmed_bookings', label: `Confirmed (${confirmedCount})` },
            { id: 'leads_crm', label: `Leads (${leads.length})` },
            { id: 'packages', label: `Packages (${packages.length})` },
            { id: 'sacred_places', label: `Vedis (${sacredPlaces.length})` },
            { id: 'testimonials', label: `Reviews (${testimonials.length})` }
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveTab(chip.id as ModuleTab)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all ${
                activeTab === chip.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 border border-slate-700/60'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">

          {/* DASHBOARD MODULE */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 sm:space-y-8 animate-fadeIn">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { label: "Today's Requests", value: preBookings.length, color: 'text-amber-400', icon: CalendarCheck },
                  { label: 'Confirmed Bookings', value: confirmedCount, color: 'text-emerald-400', icon: CheckCircle2 },
                  { label: 'Total Volume', value: `₹${totalRevenue.toLocaleString('en-IN')}`, color: 'text-yellow-400', icon: DollarSign },
                  { label: 'Pending Calls', value: preBookings.filter(b => b.workflowStatus === 'NEW_REQUEST').length, color: 'text-rose-400', icon: Phone },
                  { label: 'Advance Awaiting', value: preBookings.filter(b => b.workflowStatus === 'ADVANCE_AWAITED').length, color: 'text-sky-400', icon: Clock },
                  { label: 'Advance Received', value: preBookings.filter(b => b.workflowStatus === 'ADVANCE_RECEIVED').length, color: 'text-teal-400', icon: CreditCard },
                  { label: 'Website CMS Slides', value: heroSlides.length, color: 'text-purple-400', icon: Sparkles },
                  { label: 'Active Packages', value: packages.length, color: 'text-indigo-400', icon: Package }
                ].map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div 
                      key={idx} 
                      className="bg-gradient-to-b from-[#141C2B] to-[#0D1424] p-4 sm:p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all space-y-2.5 shadow-lg"
                    >
                      <div className="flex justify-between items-center text-slate-400 text-xs font-semibold">
                        <span className="truncate pr-1">{kpi.label}</span>
                        <div className={`w-7 h-7 rounded-lg bg-slate-800/80 flex items-center justify-center shrink-0 ${kpi.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className={`text-xl sm:text-2xl font-bold font-mono tracking-tight ${kpi.color}`}>{kpi.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* BOOKING REQUESTS & CONFIRMED BOOKINGS MODULE */}
          {(activeTab === 'booking_requests' || activeTab === 'confirmed_bookings') && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-[#141C2B] to-[#0E1626] p-4 rounded-2xl border border-slate-800/80 shadow-md">
                <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
                  <span className="font-bold text-sm sm:text-base text-white">
                    {activeTab === 'confirmed_bookings' ? 'Confirmed Pilgrimages' : 'Pending Booking Requests'}
                  </span>
                  <span className="bg-amber-500/15 text-amber-300 text-xs px-3 py-1 rounded-full font-bold border border-amber-500/25 whitespace-nowrap shrink-0 inline-flex items-center">
                    {activeTab === 'confirmed_bookings' ? confirmedCount : pendingBookingRequests.length} Record{((activeTab === 'confirmed_bookings' ? confirmedCount : pendingBookingRequests.length) === 1 ? '' : 's')}
                  </span>
                </div>

                {/* MOBILE SEARCH BAR */}
                <div className="sm:hidden relative w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search name, phone, ref id..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ backgroundColor: '#0B1120', color: '#FFFFFF', paddingLeft: '2.75rem', paddingRight: '2.25rem' }}
                    className="w-full bg-[#0B1120] border border-slate-700/80 rounded-full !pl-11 !pr-8 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {((activeTab === 'confirmed_bookings' ? confirmedBookings : pendingBookingRequests).length === 0) ? (
                <div className="bg-gradient-to-b from-[#141C2B] to-[#0D1424] p-12 rounded-3xl border border-slate-800/80 text-center space-y-3 shadow-lg">
                  <CalendarCheck className="w-10 h-10 text-slate-500 mx-auto" />
                  <h4 className="font-bold text-base text-white">No Booking Records Found</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    New pre-bookings submitted by devotees will automatically appear here in real-time.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {(activeTab === 'confirmed_bookings' ? confirmedBookings : pendingBookingRequests)
                    .filter(b => {
                      if (!searchQuery.trim()) return true;
                      const q = searchQuery.toLowerCase();
                      return (
                        (b.devoteeName || '').toLowerCase().includes(q) ||
                        (b.phone || '').includes(q) ||
                        (b.bookingRef || b.id || '').toLowerCase().includes(q) ||
                        (b.packageName || '').toLowerCase().includes(q)
                      );
                    })
                    .map((booking) => (
                      <div 
                        key={booking.id} 
                        className="group relative rounded-2xl border border-slate-800/90 bg-gradient-to-b from-[#141C2B] to-[#0D1424] p-5 sm:p-6 shadow-xl hover:border-amber-500/40 transition-all duration-200 space-y-4"
                      >
                        {/* CARD TOP HEADER: REF ID, TIER, STATUS & DAKSHINA */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/70 pb-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              onClick={() => triggerCopyToast(booking.bookingRef || `PDW-${booking.id.slice(-6)}`, 'Booking Ref ID')}
                              title="Click to copy Reference ID"
                              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 px-2.5 py-1 rounded-lg transition-colors group/copy"
                            >
                              <span>{booking.bookingRef || `PDW-${booking.id.slice(-6)}`}</span>
                              <Copy className="w-3 h-3 text-amber-500/70 group-hover/copy:text-amber-300" />
                            </button>

                            <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg tracking-wider ${
                              booking.planTier === 'PLATINUM' 
                                ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-yellow-300 border border-yellow-500/40' 
                                : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            }`}>
                              {booking.planTier === 'PLATINUM' ? <Crown className="w-3 h-3 text-yellow-400" /> : <Star className="w-3 h-3 text-amber-400" />}
                              <span>{booking.planTier || 'GOLD'} VIP</span>
                            </span>

                            {/* WORKFLOW STATUS BADGE */}
                            <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg border ${
                              (booking.workflowStatus || booking.status) === 'BOOKING_CONFIRMED'
                                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                                : (booking.workflowStatus || booking.status) === 'ADVANCE_AWAITED'
                                ? 'bg-sky-500/15 text-sky-400 border-sky-500/30'
                                : (booking.workflowStatus || booking.status) === 'CANCELLED'
                                ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                                : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            }`}>
                              {(booking.workflowStatus || booking.status || 'NEW_REQUEST').replace(/_/g, ' ')}
                            </span>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3">
                            <div className="text-left sm:text-right">
                              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                                Estimated Dakshina
                              </span>
                              <span className="text-xl sm:text-2xl font-bold font-mono text-amber-300 tracking-tight">
                                ₹{(booking.estimatedCost || (booking.planTier === 'PLATINUM' ? 7500 : 4500)).toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* DEVOTEES & CONTACT BAR */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-lg text-white tracking-tight">
                                {booking.devoteeName}
                              </h4>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                              <a 
                                href={`tel:${booking.phone}`} 
                                className="inline-flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 px-2.5 py-1 rounded-lg text-slate-200 font-semibold transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5 text-amber-400" />
                                <span>{booking.phone}</span>
                              </a>
                              {booking.city && (
                                <span className="inline-flex items-center gap-1 text-slate-400">
                                  <MapPin className="w-3.5 h-3.5 text-amber-500/70" />
                                  <span>{booking.city}, {booking.country || 'India'}</span>
                                </span>
                              )}
                              {booking.email && (
                                <span className="inline-flex items-center gap-1 text-slate-400">
                                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                                  <span>{booking.email}</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* WHATSAPP DEVOTEE BUTTON (OFFICIAL WHATSAPP DESIGN) */}
                          <div className="shrink-0">
                            <a
                              href={`https://wa.me/${(booking.whatsappPhone || booking.phone).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Pranam ${booking.devoteeName} Ji, regarding your Gaya Ji Pind Daan Pre-Booking (Ref: ${booking.bookingRef || booking.id})...`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow-md shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                              <MessageCircle className="w-4 h-4 fill-slate-950 text-transparent" />
                              <span>WhatsApp Devotee</span>
                            </a>
                          </div>
                        </div>

                        {/* BOOKING DETAILS 3-COLUMN METRIC GRID */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-900/70 p-4 rounded-xl border border-slate-800/80">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                              <Package className="w-3 h-3 text-amber-400" />
                              Package & Ritual
                            </span>
                            <p className="text-xs font-semibold text-slate-100 leading-snug">
                              {booking.packageName || booking.purpose || 'Complete Gaya Ji Pind Daan'}
                            </p>
                          </div>
                          <div className="space-y-1 sm:border-l sm:border-slate-800/80 sm:pl-4">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                              <CalendarCheck className="w-3 h-3 text-amber-400" />
                              Preferred Travel Date
                            </span>
                            <p className="text-xs font-bold text-amber-300">
                              {booking.preferredDate || 'Flexible / Date TBD'}
                            </p>
                          </div>
                          <div className="space-y-1 sm:border-l sm:border-slate-800/80 sm:pl-4">
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                              <Users className="w-3 h-3 text-amber-400" />
                              Gotra & Pilgrims
                            </span>
                            <p className="text-xs font-semibold text-slate-100">
                              Gotra: <strong className="text-amber-200">{booking.gotra || 'Not Specified'}</strong> · {booking.devoteeCount || '2 Devotees'}
                            </p>
                          </div>
                        </div>

                        {/* WORKFLOW STATUS SELECTOR & TIMESTAMP */}
                        <div className="flex flex-wrap justify-between items-center gap-3 pt-1 border-t border-slate-800/60 text-xs">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xs text-slate-400 font-semibold">Change Status:</span>
                            <div className="relative inline-block">
                              <select
                                value={booking.workflowStatus || booking.status || 'NEW_REQUEST'}
                                onChange={(e) => {
                                  const newStatus = e.target.value;
                                  setPreBookings(prev => prev.map(b => b.id === booking.id ? { ...b, workflowStatus: newStatus, status: newStatus } : b));
                                  updateBookingWorkflowStatusAction({
                                    bookingId: booking.id,
                                    status: newStatus,
                                    user: currentRole
                                  }).then((res) => {
                                    if (res && res.success) {
                                      triggerCopyToast('Status Updated', newStatus.replace(/_/g, ' '));
                                    }
                                  });
                                }}
                                className="bg-slate-900 border border-slate-700/80 text-xs font-bold text-amber-300 rounded-xl px-3 py-1.5 pr-7 appearance-none focus:outline-none focus:border-amber-500 cursor-pointer shadow-sm hover:border-slate-600 transition-colors"
                              >
                                <option value="NEW_REQUEST">🆕 New Request</option>
                                <option value="PHONE_CONTACTED">📞 Phone Contacted</option>
                                <option value="ADVANCE_AWAITED">⏳ Advance Payment Awaited</option>
                                <option value="BOOKING_CONFIRMED">✅ Booking Confirmed</option>
                                <option value="HOTEL_RESERVED">🏨 Hotel Reserved</option>
                                <option value="ARRIVAL_CONFIRMED">🚩 Devotee Arrived Gaya</option>
                                <option value="RITUAL_COMPLETED">🌸 Ritual Completed</option>
                                <option value="CANCELLED">❌ Cancelled</option>
                              </select>
                              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[9px]">▼</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-slate-400">
                            <span className="flex items-center gap-1 text-[11px]">
                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                              <span>Requested: {new Date(booking.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                            </span>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete pre-booking for ${booking.devoteeName}?`)) {
                                  deleteBookingAction(booking.id).then(loadERPData);
                                }
                              }}
                              className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                              title="Delete Booking Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* LEADS CRM MODULE */}
          {activeTab === 'leads_crm' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center bg-gradient-to-r from-[#141C2B] to-[#0E1626] p-4 rounded-2xl border border-slate-800/80 shadow-md">
                <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
                  <span className="font-bold text-base text-white">Ad Leads & CRM Pipeline</span>
                  <span className="bg-amber-500/15 text-amber-300 text-xs px-3 py-1 rounded-full font-bold border border-amber-500/25 whitespace-nowrap shrink-0 inline-flex items-center">
                    {leads.length} Active Leads
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {leads.map(lead => (
                  <div key={lead.id} className="bg-gradient-to-b from-[#141C2B] to-[#0D1424] p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 space-y-3 shadow-lg transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-base text-white">{lead.name}</h4>
                        <a href={`tel:${lead.phone}`} className="text-xs text-amber-400 font-bold block hover:underline mt-0.5">
                          📱 {lead.phone}
                        </a>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60">
                        {lead.status || 'NEW'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
                      {lead.packageInterest || lead.notes || 'Inquired via Meta / Google Ads'}
                    </p>
                    <div className="pt-2 flex justify-between items-center text-xs border-t border-slate-800/60">
                      <a
                        href={`https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Pranam ${lead.name} Ji, regarding your Gaya Ji Pind Daan inquiry...`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#25D366] hover:underline font-bold flex items-center gap-1 text-[11px]"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Lead
                      </a>
                      <button 
                        onClick={() => {
                          if (confirm(`Delete lead for ${lead.name}?`)) {
                            deleteLeadAction(lead.id).then(loadERPData);
                          }
                        }}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DEVOTEES / CUSTOMERS MODULE */}
          {activeTab === 'customers' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center bg-gradient-to-r from-[#141C2B] to-[#0E1626] p-4 rounded-2xl border border-slate-800/80 shadow-md">
                <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
                  <span className="font-bold text-base text-white">Registered Devotees Directory</span>
                  <span className="bg-amber-500/15 text-amber-300 text-xs px-3 py-1 rounded-full font-bold border border-amber-500/25 whitespace-nowrap shrink-0 inline-flex items-center">
                    {customers.length} Devotees
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {customers.map(cust => (
                  <div key={cust.id} className="bg-gradient-to-b from-[#141C2B] to-[#0D1424] p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 space-y-3 shadow-lg transition-all">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {cust.customerCode || cust.id}
                      </span>
                      <h4 className="font-bold text-base text-white mt-2">{cust.name}</h4>
                      <div className="space-y-1 mt-2 text-xs text-slate-300">
                        <a href={`tel:${cust.phone}`} className="flex items-center gap-1.5 hover:text-amber-400">
                          <Phone className="w-3 h-3 text-amber-400" /> {cust.phone}
                        </a>
                        {cust.email && (
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Mail className="w-3 h-3 text-slate-500" /> {cust.email}
                          </div>
                        )}
                        {cust.city && (
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <MapPin className="w-3 h-3 text-amber-500/70" /> {cust.city}, {cust.country || 'India'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REPORTS & INSIGHTS MODULE */}
          {activeTab === 'reports' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-gradient-to-b from-[#141C2B] to-[#0D1424] p-6 rounded-3xl border border-slate-800/80 space-y-6 shadow-xl">
                <div>
                  <h3 className="font-bold text-xl text-white">Pilgrimage Analytics & Revenue Summary</h3>
                  <p className="text-xs text-slate-400 mt-1">Real-time financial metrics and pilgrimage rites conversion metrics.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80 space-y-1.5 shadow-inner">
                    <span className="text-xs text-slate-400 font-bold block">Total Pre-Booking Requests</span>
                    <span className="text-3xl font-bold font-mono text-amber-400">{preBookings.length}</span>
                  </div>
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80 space-y-1.5 shadow-inner">
                    <span className="text-xs text-slate-400 font-bold block">Confirmed Pilgrimages</span>
                    <span className="text-3xl font-bold font-mono text-emerald-400">{confirmedCount}</span>
                  </div>
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80 space-y-1.5 shadow-inner">
                    <span className="text-xs text-slate-400 font-bold block">Gross Estimated Volume</span>
                    <span className="text-3xl font-bold font-mono text-yellow-300">₹{totalRevenue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PACKAGES CMS MODULE */}
          {activeTab === 'packages' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {packages.map(pkg => (
                <div key={pkg.id} className="bg-gradient-to-b from-[#141C2B] to-[#0D1424] p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 space-y-4 flex flex-col justify-between shadow-xl transition-all">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {pkg.badge || 'MOST POPULAR'}
                        </span>
                        <h4 className="font-bold text-lg text-white mt-1.5 leading-snug">{pkg.title}</h4>
                        {pkg.hindiTitle && <span className="text-xs text-amber-400 font-semibold block">{pkg.hindiTitle}</span>}
                        <span className="text-xs text-slate-400 block mt-0.5">{pkg.duration}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-slate-400 block font-semibold uppercase">Gold Tier</span>
                        <span className="text-lg font-bold font-mono text-amber-400">₹{pkg.priceINR?.toLocaleString('en-IN')}</span>
                        {pkg.goldPriceINR && (
                          <div className="mt-1">
                            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Platinum VIP</span>
                            <span className="text-lg font-bold font-mono text-yellow-300">₹{pkg.goldPriceINR?.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">{pkg.shortDesc}</p>
                    
                    {/* Key inclusions snippet */}
                    <div className="text-[11px] text-slate-400 space-y-1 pt-1">
                      <span className="font-bold text-white block">Key Inclusions:</span>
                      <p className="line-clamp-2 text-slate-300">{pkg.inclusions}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-3 border-t border-slate-800/80">
                    <button onClick={() => handleEditPackage(pkg)} className="bg-slate-800/80 hover:bg-slate-700 text-amber-300 px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border border-slate-700/60 transition-colors">
                      <Edit className="w-3.5 h-3.5" /> Edit Package (17+ Fields)
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm(`Delete package "${pkg.title}"?`)) {
                          deletePackageAction(pkg.id).then(loadERPData);
                        }
                      }} 
                      className="text-slate-500 hover:text-rose-400 font-bold flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* HERO BANNER SLIDES CMS MODULE */}
          {activeTab === 'hero_slides' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
              {heroSlides.map(slide => (
                <div key={slide.id} className="bg-gradient-to-b from-[#141C2B] to-[#0D1424] p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 space-y-4 flex flex-col justify-between shadow-xl transition-all">
                  <div className="space-y-3">
                    <div className="h-44 bg-slate-900 rounded-xl overflow-hidden relative border border-slate-800">
                      <img src={slide.mediaUrl} alt={slide.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-amber-300 border border-amber-500/30">
                        Order #{slide.order || 1}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {slide.badge || 'GAYA JI SACRED PILGRIMAGE'}
                      </span>
                      <h4 className="font-bold text-lg text-white mt-1.5">{slide.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">{slide.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-3 border-t border-slate-800/80">
                    <button onClick={() => handleEditHeroSlide(slide)} className="bg-slate-800/80 hover:bg-slate-700 text-amber-300 px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border border-slate-700/60 transition-colors">
                      <Edit className="w-3.5 h-3.5" /> Edit Hero Slide
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm(`Delete slide "${slide.title}"?`)) {
                          deleteHeroSlideAction(slide.id).then(loadERPData);
                        }
                      }} 
                      className="text-slate-500 hover:text-rose-400 font-bold flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ARTICLES CMS MODULE */}
          {activeTab === 'knowledge_centre' && (
            <div className="bg-gradient-to-b from-[#141C2B] to-[#0D1424] rounded-2xl border border-slate-800/80 overflow-hidden shadow-xl animate-fadeIn">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0E1626] border-b border-slate-800/80 text-slate-400 uppercase font-semibold text-[10px]">
                  <tr>
                    <th className="p-4">Article Title</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Read Time</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {articles.map(art => (
                    <tr key={art.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 font-bold text-white">{art.title}</td>
                      <td className="p-4 text-slate-400">{art.category}</td>
                      <td className="p-4 text-slate-400">{art.readTime}</td>
                      <td className="p-4 text-right space-x-2">
                        <button onClick={() => handleEditArticle(art)} className="bg-slate-800/80 hover:bg-slate-700 text-amber-300 px-3 py-1 rounded-xl font-bold border border-slate-700/60">
                          Edit
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm(`Delete article "${art.title}"?`)) {
                              deleteArticleAction(art.id).then(loadERPData);
                            }
                          }} 
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* SACRED PLACES CMS MODULE */}
          {activeTab === 'sacred_places' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Top Controls: Search & Add Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#141C2B] to-[#0E1626] p-4 rounded-2xl border border-slate-800/80 shadow-md">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={sacredPlaceSearch}
                    onChange={e => setSacredPlaceSearch(e.target.value)}
                    placeholder="Search from 45+ Sacred Vedis..."
                    style={{ backgroundColor: '#0B1120', color: '#FFFFFF', paddingLeft: '2.75rem', paddingRight: '1rem' }}
                    className="w-full !pl-11 pr-3 py-2 bg-[#0B1120] border border-slate-700/80 rounded-xl text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500 shadow-inner"
                  />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs text-slate-400">
                    Total: <strong className="text-white">{sacredPlaces.length}</strong> Sacred Vedis
                  </span>
                  <button
                    onClick={() => {
                      setPlaceForm({ id: '', name: '', hindiName: '', tagline: '', description: '', history: '', heroImage: '/images/gaya_vishnupad.jpg' });
                      setModalType('place');
                      setIsModalOpen(true);
                    }}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Sacred Place
                  </button>
                </div>
              </div>

              {/* Cards Grid with Photo Thumbnails */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sacredPlaces
                  .filter(place => {
                    const q = sacredPlaceSearch.toLowerCase().trim();
                    if (!q) return true;
                    return (
                      place.name?.toLowerCase().includes(q) ||
                      place.hindiName?.includes(q) ||
                      place.description?.toLowerCase().includes(q)
                    );
                  })
                  .map(place => (
                    <div key={place.id} className="bg-gradient-to-b from-[#141C2B] to-[#0D1424] p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 space-y-4 flex flex-col justify-between shadow-xl transition-all">
                      <div className="flex gap-4 items-start">
                        <img
                          src={place.heroImage || '/images/gaya_vishnupad.jpg'}
                          alt={place.name}
                          className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-slate-700 bg-slate-900"
                        />
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-bold text-sm text-white truncate">{place.name}</h4>
                            <span className="text-xs text-amber-400 font-bold shrink-0">{place.hindiName}</span>
                          </div>
                          {place.tagline && (
                            <p className="text-[11px] text-amber-300 line-clamp-1">{place.tagline}</p>
                          )}
                          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">{place.description}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs pt-3 border-t border-slate-800/80">
                        <a
                          href={`/sacred-places/${place.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                        >
                          <span>View Public Page ↗</span>
                        </a>
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleEditPlace(place)} className="bg-slate-800/80 hover:bg-slate-700 text-amber-300 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 border border-slate-700/60 transition-colors">
                            <Edit className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button 
                            onClick={() => {
                              if (confirm(`Delete sacred place "${place.name}"?`)) {
                                deleteSacredPlaceAction(place.id).then(loadERPData);
                              }
                            }} 
                            className="text-slate-500 hover:text-rose-400 font-bold flex items-center gap-1 p-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TESTIMONIALS CMS MODULE */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#141C2B] to-[#0E1626] p-4 rounded-2xl border border-slate-800/80 shadow-md">
                <div>
                  <h3 className="font-bold text-sm text-white">Devotee Pooja Photos & Video Testimonials</h3>
                  <p className="text-xs text-slate-400">Manage authentic devotee recordings, pooja photos, and pilgrimage reviews.</p>
                </div>
                <button
                  onClick={() => {
                    setTestimonialForm({
                      id: '',
                      author: '',
                      city: '',
                      country: 'India',
                      ritual: 'Vishnupad & Falgu Pind Daan',
                      content: '',
                      rating: 5,
                      avatarUrl: '',
                      videoUrl: '',
                      poojaImage: '/images/pind_daan_vidhi.jpg',
                      status: 'APPROVED'
                    });
                    setModalType('testimonial');
                    setIsModalOpen(true);
                  }}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Devotee Review
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map(t => (
                  <div key={t.id} className="bg-gradient-to-b from-[#141C2B] to-[#0D1424] rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col justify-between shadow-xl">
                    {/* Pooja Image & Video Status */}
                    <div className="relative h-44 bg-slate-900">
                      <img
                        src={t.poojaImage || t.avatarUrl || '/images/pind_daan_vidhi.jpg'}
                        alt={t.author}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      {t.videoUrl ? (
                        <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full text-[10.5px] font-bold flex items-center gap-1 shadow">
                          ▶ Video Attached
                        </span>
                      ) : (
                        <span className="absolute top-3 right-3 bg-black/60 text-slate-300 px-2 py-0.5 rounded-full text-[10px]">
                          Photo Only
                        </span>
                      )}
                      <div className="absolute bottom-3 left-4 right-4">
                        <span className="text-[11px] text-amber-300 font-semibold">{t.ritual}</span>
                        <h4 className="font-bold text-sm text-white">{t.author}</h4>
                      </div>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-xs text-slate-400">{t.city}{t.country ? `, ${t.country}` : ''}</span>
                        <p className="text-xs text-slate-300 italic line-clamp-3 leading-relaxed">&quot;{t.content}&quot;</p>
                      </div>

                      <div className="flex justify-between items-center text-xs pt-3 border-t border-slate-800/80">
                        <button onClick={() => handleEditTestimonial(t)} className="bg-slate-800/80 hover:bg-slate-700 text-amber-300 px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1 border border-slate-700/60 transition-colors">
                          <Edit className="w-3.5 h-3.5" /> Edit Review
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm(`Delete review from "${t.author}"?`)) {
                              deleteTestimonialAction(t.id).then(loadERPData);
                            }
                          }} 
                          className="text-slate-500 hover:text-rose-400 font-bold p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MEDIA LIBRARY MODULE */}
          {activeTab === 'media_library' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fadeIn">
              {mediaItems.map(m => (
                <div key={m.id} className="bg-gradient-to-b from-[#141C2B] to-[#0D1424] p-4 rounded-2xl border border-slate-800/80 space-y-3 shadow-xl">
                  <div className="h-36 bg-slate-900 rounded-xl overflow-hidden relative border border-slate-800">
                    <img src={m.url} alt={m.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white truncate">{m.title}</h4>
                    <span className="text-[10px] text-slate-400">{m.folder}</span>
                  </div>
                  <div className="flex justify-between text-xs pt-2 border-t border-slate-800/80">
                    <button onClick={() => triggerCopyToast(m.url, 'Image URL')} className="text-amber-400 hover:underline font-bold">Copy URL</button>
                    <button 
                      onClick={() => {
                        if (confirm(`Delete media item "${m.title}"?`)) {
                          deleteMediaItemAction(m.id).then(loadERPData);
                        }
                      }} 
                      className="text-slate-500 hover:text-rose-400 font-bold transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SEO & AI SEARCH CONTROL CENTER MODULE */}
          {activeTab === 'seo_manager' && (
            <form onSubmit={handleSaveSettings} className="bg-gradient-to-b from-[#141C2B] to-[#0D1424] p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-6 text-xs animate-fadeIn max-w-5xl shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div>
                  <h3 className="font-bold text-lg sm:text-xl text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-amber-400" />
                    <span>SEO, Local GEO & AI Search Command Center</span>
                  </h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Optimize PindDaanWale for Google Search, ChatGPT, Perplexity, Gemini, Claude, and Local GEO Maps.
                  </p>
                </div>
                <button type="submit" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md shrink-0">
                  <Save className="w-4 h-4" /> Save Live Rules
                </button>
              </div>

              {/* QUICK INDEXING & LLM FILE ACCESS BUTTONS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <a href="/sitemap.xml" target="_blank" className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-[#F48D08] transition-all text-center group">
                  <div className="text-[10px] uppercase font-bold text-[#F48D08]">Modular Sitemap</div>
                  <div className="text-sm font-bold text-white mt-1 group-hover:underline">/sitemap.xml ↗</div>
                  <div className="text-[10px] text-slate-400 mt-1">44 Active Routes</div>
                </a>
                <a href="/robots.txt" target="_blank" className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-[#F48D08] transition-all text-center group">
                  <div className="text-[10px] uppercase font-bold text-[#F48D08]">Robots Rules</div>
                  <div className="text-sm font-bold text-white mt-1 group-hover:underline">/robots.txt ↗</div>
                  <div className="text-[10px] text-slate-400 mt-1">GPTBot & Search Crawlers</div>
                </a>
                <a href="/llms.txt" target="_blank" className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-[#F48D08] transition-all text-center group">
                  <div className="text-[10px] uppercase font-bold text-[#F48D08]">AI Knowledge Base</div>
                  <div className="text-sm font-bold text-white mt-1 group-hover:underline">/llms.txt ↗</div>
                  <div className="text-[10px] text-slate-400 mt-1">ChatGPT & Perplexity</div>
                </a>
                <a href="/llms-full.txt" target="_blank" className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-[#F48D08] transition-all text-center group">
                  <div className="text-[10px] uppercase font-bold text-[#F48D08]">Full AI Docs</div>
                  <div className="text-sm font-bold text-white mt-1 group-hover:underline">/llms-full.txt ↗</div>
                  <div className="text-[10px] text-slate-400 mt-1">Deep Ritual Knowledge</div>
                </a>
              </div>

              {/* CARD 1: GLOBAL META & OPENGRAPH */}
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#F48D08] border-b border-slate-800 pb-2">
                  <Globe className="w-4 h-4" />
                  <span>1. Global Meta Titles, Description & OpenGraph Social Cards</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Global Site Title Tag</label>
                    <input 
                      type="text" 
                      value={settingsForm.metaTitle || ''} 
                      onChange={e => setSettingsForm({ ...settingsForm, metaTitle: e.target.value })} 
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" 
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Global Meta Description (Search Snippet)</label>
                    <textarea 
                      value={settingsForm.metaDescription || ''} 
                      onChange={e => setSettingsForm({ ...settingsForm, metaDescription: e.target.value })} 
                      rows={3} 
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold resize-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Canonical Domain URL</label>
                    <input 
                      type="text" 
                      value={settingsForm.canonicalUrl || ''} 
                      onChange={e => setSettingsForm({ ...settingsForm, canonicalUrl: e.target.value })} 
                      placeholder="https://www.pinddaanwale.com" 
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" 
                    />
                  </div>
                </div>
              </div>

              {/* CARD 2: LOCAL GEO TARGETING */}
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#F48D08] border-b border-slate-800 pb-2">
                  <MapPin className="w-4 h-4" />
                  <span>2. Local GEO-Spatial Coordinates (Gaya Ji Vishnupad Sanctuary)</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">GEO Latitude</label>
                    <input 
                      type="text" 
                      value={settingsForm.latitude || ''} 
                      onChange={e => setSettingsForm({ ...settingsForm, latitude: e.target.value })} 
                      placeholder="24.7788" 
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">GEO Longitude</label>
                    <input 
                      type="text" 
                      value={settingsForm.longitude || ''} 
                      onChange={e => setSettingsForm({ ...settingsForm, longitude: e.target.value })} 
                      placeholder="85.0084" 
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Google Place ID</label>
                    <input 
                      type="text" 
                      value={settingsForm.googlePlaceId || ''} 
                      onChange={e => setSettingsForm({ ...settingsForm, googlePlaceId: e.target.value })} 
                      placeholder="ChIJ4Q2k_3S88jkRPf3_x6z1" 
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" 
                    />
                  </div>
                </div>
              </div>

              {/* CARD 3: ANALYTICS & SEARCH CONSOLE TAGS */}
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#F48D08] border-b border-slate-800 pb-2">
                  <BarChart3 className="w-4 h-4" />
                  <span>3. Search Console Verification & Analytics Tags</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Google Search Console Verification Tag</label>
                    <input 
                      type="text" 
                      value={settingsForm.searchConsoleTag || ''} 
                      onChange={e => setSettingsForm({ ...settingsForm, searchConsoleTag: e.target.value })} 
                      placeholder="google-site-verification=..." 
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-bold">Google Analytics 4 Measurement ID</label>
                    <input 
                      type="text" 
                      value={settingsForm.googleAnalyticsId || ''} 
                      onChange={e => setSettingsForm({ ...settingsForm, googleAnalyticsId: e.target.value })} 
                      placeholder="G-XXXXXXXXXX" 
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" 
                    />
                  </div>
                </div>
              </div>

              {/* CARD 4: AIWCRM & META/GOOGLE ADS WEBHOOK INTEGRATION */}
              <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#F48D08] border-b border-slate-800 pb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>4. AIWCRM (https://www.aiwcrm.com) WhatsApp Automation & Ads Webhooks</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-2xl space-y-2">
                    <div className="font-bold text-amber-400 text-xs">🔗 Inbound Webhook Endpoint (For Meta Ads & Google Ads Forms)</div>
                    <div className="flex items-center gap-2">
                      <input 
                        readOnly 
                        type="text" 
                        value="https://www.pinddaanwale.com/api/webhooks/lead" 
                        className="flex-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-[11px] text-amber-300"
                      />
                      <button 
                        type="button"
                        onClick={() => triggerCopyToast('https://www.pinddaanwale.com/api/webhooks/lead', 'Inbound Webhook URL')}
                        className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs px-3 py-2.5 rounded-xl shrink-0"
                      >
                        Copy URL
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Paste this Webhook URL inside your Meta Lead Ads, Google Ads Lead Form extension, or Zapier/AIWCRM to auto-capture ad leads directly into PindDaanWale ERP!
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">AIWCRM Outbound Webhook Target URL</label>
                      <input 
                        type="text" 
                        value={settingsForm.aiwcrmWebhookUrl || ''} 
                        onChange={e => setSettingsForm({ ...settingsForm, aiwcrmWebhookUrl: e.target.value })} 
                        placeholder="https://www.aiwcrm.com/api/v1/webhooks/lead" 
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" 
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">AIWCRM API Token / Bearer Key (Optional)</label>
                      <input 
                        type="password" 
                        value={settingsForm.aiwcrmApiKey || ''} 
                        onChange={e => setSettingsForm({ ...settingsForm, aiwcrmApiKey: e.target.value })} 
                        placeholder="aiw_live_secret_key..." 
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* ERP SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="bg-gradient-to-b from-[#141C2B] to-[#0D1424] p-6 sm:p-8 rounded-2xl border border-slate-800/80 space-y-6 text-xs animate-fadeIn max-w-3xl shadow-xl">
              <div className="border-b border-slate-800/80 pb-4">
                <h3 className="font-bold text-lg text-white">Official Brand Logo, Bank, Address & SMTP Settings</h3>
                <p className="text-xs text-slate-400 mt-0.5">Configure platform branding, receiving bank accounts, and transactional mail server.</p>
              </div>
              
              {/* SECTION 1: BRANDING & CONTACT */}
              <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80 space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm text-amber-400 border-b border-slate-800/80 pb-2">
                  <Globe className="w-4 h-4" />
                  <span>SECTION 1: Website Branding & Official Address</span>
                </div>

                <MediaUploaderInput 
                  label="Website Official Brand Logo Image / File or URL" 
                  value={settingsForm.logoUrl || ''} 
                  onChange={url => setSettingsForm({ ...settingsForm, logoUrl: url })} 
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Company Name</label>
                    <input type="text" value={settingsForm.companyName || ''} onChange={e => setSettingsForm({ ...settingsForm, companyName: e.target.value })} placeholder="PindDaanWale" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Helpdesk Phone Number</label>
                    <input type="text" value={settingsForm.helpdeskPhone || ''} onChange={e => setSettingsForm({ ...settingsForm, helpdeskPhone: e.target.value })} placeholder="+91 7463055338" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Official Helpdesk Email</label>
                    <input type="email" value={settingsForm.email || ''} onChange={e => setSettingsForm({ ...settingsForm, email: e.target.value })} placeholder="support@pinddaanwale.com" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Official Teerth Address</label>
                    <input type="text" value={settingsForm.address || ''} onChange={e => setSettingsForm({ ...settingsForm, address: e.target.value })} placeholder="Vishnupad Temple Compound, Gaya Ji, Bihar - 823001" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                </div>
              </div>

              {/* SECTION 2: BANK & PAYMENT CREDENTIALS */}
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#F48D08] border-b border-slate-800 pb-2">
                  <CreditCard className="w-4 h-4" />
                  <span>SECTION 2: Official Bank & UPI Payment Credentials</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Bank Name</label>
                    <input type="text" value={settingsForm.bankName || ''} onChange={e => setSettingsForm({ ...settingsForm, bankName: e.target.value })} placeholder="State Bank of India" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Account Holder / Beneficiary Name</label>
                    <input type="text" value={settingsForm.accountName || ''} onChange={e => setSettingsForm({ ...settingsForm, accountName: e.target.value })} placeholder="PindDaanWale Pilgrimage Services" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Bank Account Number</label>
                    <input type="text" value={settingsForm.accountNumber || ''} onChange={e => setSettingsForm({ ...settingsForm, accountNumber: e.target.value })} placeholder="40982317822" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">IFSC Code</label>
                    <input type="text" value={settingsForm.ifscCode || ''} onChange={e => setSettingsForm({ ...settingsForm, ifscCode: e.target.value })} placeholder="SBIN0000078" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Official UPI ID</label>
                    <input type="text" value={settingsForm.upiId || ''} onChange={e => setSettingsForm({ ...settingsForm, upiId: e.target.value })} placeholder="7463055338@sbi" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                </div>

                <MediaUploaderInput 
                  label="Official Bank UPI QR Image" 
                  value={settingsForm.upiQrImage || ''} 
                  onChange={url => setSettingsForm({ ...settingsForm, upiQrImage: url })} 
                />
              </div>

              {/* SECTION 3: AUTOMATED SMTP EMAIL SERVER */}
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#F48D08] border-b border-slate-800 pb-2">
                  <Globe className="w-4 h-4" />
                  <span>SECTION 3: 📧 Automated SMTP Email Server Credentials</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">SMTP Server Host</label>
                    <input type="text" value={settingsForm.smtpHost || ''} onChange={e => setSettingsForm({ ...settingsForm, smtpHost: e.target.value })} placeholder="smtp.hostinger.com" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">SMTP Port (465 / 587)</label>
                    <input type="number" value={settingsForm.smtpPort || 465} onChange={e => setSettingsForm({ ...settingsForm, smtpPort: Number(e.target.value) })} placeholder="465" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#F48D08] font-bold mb-1">SMTP Username / Email</label>
                    <input type="text" value={settingsForm.smtpUser || ''} onChange={e => setSettingsForm({ ...settingsForm, smtpUser: e.target.value })} placeholder="support@pinddaanwale.com" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                  <div>
                    <label className="block text-[#F48D08] font-bold mb-1">SMTP Password / App Secret</label>
                    <input type="password" value={settingsForm.smtpPassword || ''} onChange={e => setSettingsForm({ ...settingsForm, smtpPassword: e.target.value })} placeholder="••••••••••••" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">From Sender Address</label>
                    <input type="text" value={settingsForm.smtpFromEmail || ''} onChange={e => setSettingsForm({ ...settingsForm, smtpFromEmail: e.target.value })} placeholder="support@pinddaanwale.com" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Admin Alert Recipient Email</label>
                    <input type="text" value={settingsForm.adminNotificationEmail || ''} onChange={e => setSettingsForm({ ...settingsForm, adminNotificationEmail: e.target.value })} placeholder="support@pinddaanwale.com" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                </div>
              </div>

              {/* SECTION 4: FOOTER BACKGROUND */}
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#F48D08] border-b border-slate-800 pb-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>SECTION 4: Website Footer Background Image</span>
                </div>

                <MediaUploaderInput 
                  label="Footer Background Image" 
                  value={settingsForm.footerBgImage || ''} 
                  onChange={url => setSettingsForm({ ...settingsForm, footerBgImage: url })} 
                />
              </div>

              {/* SECTION 5: ENTERPRISE SEO, GEO & ANALYTICS */}
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#F48D08] border-b border-slate-800 pb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>SECTION 5: 🔍 Enterprise SEO, GEO & Analytics Settings</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Global Meta Title</label>
                    <input type="text" value={settingsForm.metaTitle || ''} onChange={e => setSettingsForm({ ...settingsForm, metaTitle: e.target.value })} placeholder="PindDaanWale | Sacred & Authentic Gaya Ji Pind Daan" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Global Meta Description</label>
                    <textarea value={settingsForm.metaDescription || ''} onChange={e => setSettingsForm({ ...settingsForm, metaDescription: e.target.value })} rows={2} placeholder="The definitive digital platform for sacred rites..." className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold resize-none" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Canonical Site Domain</label>
                    <input type="text" value={settingsForm.canonicalUrl || ''} onChange={e => setSettingsForm({ ...settingsForm, canonicalUrl: e.target.value })} placeholder="https://www.pinddaanwale.com" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">GEO Latitude (Gaya)</label>
                    <input type="text" value={settingsForm.latitude || ''} onChange={e => setSettingsForm({ ...settingsForm, latitude: e.target.value })} placeholder="24.7788" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">GEO Longitude (Gaya)</label>
                    <input type="text" value={settingsForm.longitude || ''} onChange={e => setSettingsForm({ ...settingsForm, longitude: e.target.value })} placeholder="85.0084" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Google Search Console Tag</label>
                    <input type="text" value={settingsForm.searchConsoleTag || ''} onChange={e => setSettingsForm({ ...settingsForm, searchConsoleTag: e.target.value })} placeholder="google-site-verification=..." className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Google Analytics 4 ID</label>
                    <input type="text" value={settingsForm.googleAnalyticsId || ''} onChange={e => setSettingsForm({ ...settingsForm, googleAnalyticsId: e.target.value })} placeholder="G-XXXXXXXXXX" className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-[#F48D08] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white py-4 rounded-2xl font-bold text-xs shadow-xl transition-all flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Save Live Settings, Bank, SEO & Analytics
              </button>
            </form>
          )}

        </div>

      </main>

      {/* ========================================================== */}
      {/* ENTERPRISE 17-FIELD PACKAGE & ALL CMS MODALS */}
      {/* ========================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gradient-to-b from-[#141C2B] to-[#0D1424] rounded-2xl max-w-2xl w-full border border-slate-700/80 text-white shadow-2xl my-8 overflow-hidden animate-fadeIn">
            
            {/* MODAL HEADER */}
            <div className="bg-[#0E1626]/95 px-6 py-5 border-b border-slate-800 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8B2516] via-[#B45309] to-[#F59E0B] flex items-center justify-center text-white shadow-md">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Add / Edit {modalType.toUpperCase()} Record</h3>
                  <p className="text-[11px] text-slate-400">Configure ritual fields, inclusions, pricing & media.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-slate-700/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto space-y-6">

              {/* 1. ENTERPRISE 17-FIELD PACKAGE CMS MODAL */}
              {modalType === 'package' && (
                <form onSubmit={handleSavePackage} className="space-y-6 text-xs">
                  
                  {/* SECTION 1: TITLES & DURATION */}
                  <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#F48D08] border-b border-slate-800 pb-2">
                      <Layers className="w-4 h-4" />
                      <span>SECTION 1: Package Titles & Duration</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1.5">Package Title (English) *</label>
                        <input 
                          type="text" 
                          value={packageForm.title} 
                          onChange={e => setPackageForm({ ...packageForm, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })} 
                          required 
                          placeholder="e.g. 1-Day Complete Service"
                          className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1.5">Hindi Title (हिंदी नाम)</label>
                        <input 
                          type="text" 
                          value={packageForm.hindiTitle} 
                          onChange={e => setPackageForm({ ...packageForm, hindiTitle: e.target.value })} 
                          placeholder="e.g. एक दिन, पूर्ण सेवा"
                          className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1.5">Duration (अवधि)</label>
                        <input 
                          type="text" 
                          value={packageForm.duration} 
                          onChange={e => setPackageForm({ ...packageForm, duration: e.target.value })} 
                          placeholder="1 Day (1 Night Stay)"
                          className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1.5">Badge Tag (बैज टैग)</label>
                        <input 
                          type="text" 
                          value={packageForm.badge} 
                          onChange={e => setPackageForm({ ...packageForm, badge: e.target.value })} 
                          placeholder="MOST POPULAR / 1 NIGHT STAY"
                          className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1.5">Short Description (संक्षिप्त विवरण)</label>
                      <textarea 
                        rows={2} 
                        value={packageForm.shortDesc} 
                        onChange={e => setPackageForm({ ...packageForm, shortDesc: e.target.value })} 
                        placeholder="एक दिन की यह पूर्ण व्यवस्था, जो देगा सुकून और शांति।"
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#F48D08]" 
                      />
                    </div>
                  </div>

                  {/* SECTION 2: DUAL-TIER GOLD & PLATINUM PRICING MATRIX */}
                  <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#F48D08] border-b border-slate-800 pb-2">
                      <DollarSign className="w-4 h-4" />
                      <span>SECTION 2: Dual-Tier Gold & Platinum Pricing Matrix (INR & USD)</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block font-semibold text-amber-400 mb-1.5">Gold Price (₹ INR) *</label>
                        <input 
                          type="number" 
                          value={packageForm.priceINR} 
                          onChange={e => setPackageForm({ ...packageForm, priceINR: Number(e.target.value) })} 
                          required 
                          placeholder="9449"
                          className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-amber-400 mb-1.5">Gold Price ($ USD)</label>
                        <input 
                          type="number" 
                          value={packageForm.priceUSD} 
                          onChange={e => setPackageForm({ ...packageForm, priceUSD: Number(e.target.value) })} 
                          placeholder="129"
                          className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-yellow-300 mb-1.5">Platinum Price (₹ INR)</label>
                        <input 
                          type="number" 
                          value={packageForm.goldPriceINR} 
                          onChange={e => setPackageForm({ ...packageForm, goldPriceINR: Number(e.target.value) })} 
                          placeholder="14449"
                          className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-yellow-300 mb-1.5">Platinum Price ($ USD)</label>
                        <input 
                          type="number" 
                          value={packageForm.goldPriceUSD} 
                          onChange={e => setPackageForm({ ...packageForm, goldPriceUSD: Number(e.target.value) })} 
                          placeholder="199"
                          className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: LINE-BY-LINE INCLUSIONS & EXCLUSIONS */}
                  <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#F48D08] border-b border-slate-800 pb-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>SECTION 3: Line-by-Line Gold & Platinum Inclusions</span>
                    </div>

                    <div>
                      <label className="block font-semibold text-amber-400 mb-1.5">Gold Plan Line-by-Line Inclusions (एक पंक्ति प्रति सुविधा)</label>
                      <textarea 
                        rows={4} 
                        value={packageForm.inclusions} 
                        onChange={e => setPackageForm({ ...packageForm, inclusions: e.target.value })} 
                        placeholder="पिंडदान एवं पूजा सामग्री&#10;ऑटो द्वारा पिकअप एवं ड्रॉप&#10;सात्विक भोजन&#10;आरामदायक 1 नाइट स्टे की व्यवस्था"
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#F48D08]" 
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-yellow-300 mb-1.5">Platinum VIP Line-by-Line Inclusions (एक पंक्ति प्रति सुविधा)</label>
                      <textarea 
                        rows={4} 
                        value={packageForm.goldInclusions} 
                        onChange={e => setPackageForm({ ...packageForm, goldInclusions: e.target.value })} 
                        placeholder="पिंडदान एवं पूजा सामग्री&#10;कैब द्वारा पिकअप एवं ड्रॉप (Private AC SUV / Innova)&#10;सात्विक भोजन (Pure Veg Gourmet)&#10;आरामदायक 1 नाइट 4-Star Resort स्टे की व्यवस्था"
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#F48D08]" 
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1.5">Exclusions / Notes (अपवाद एवं नियम)</label>
                      <input 
                        type="text" 
                        value={packageForm.exclusions} 
                        onChange={e => setPackageForm({ ...packageForm, exclusions: e.target.value })} 
                        placeholder="2 से अधिक होने पर अतिरिक्त शुल्क लगेगा"
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                      />
                    </div>
                  </div>

                  {/* SECTION 4: RITUAL SPECIFICATIONS */}
                  <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#F48D08] border-b border-slate-800 pb-2">
                      <Award className="w-4 h-4" />
                      <span>SECTION 4: Vedis Covered, Panda & Meals Details</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1.5">Vedis Covered (वेदी स्थल)</label>
                        <input 
                          type="text" 
                          value={packageForm.vedisCovered} 
                          onChange={e => setPackageForm({ ...packageForm, vedisCovered: e.target.value })} 
                          placeholder="Falgu River, Vishnupad Mandir, Akshayavat"
                          className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1.5">Panda / Purohit Type</label>
                        <input 
                          type="text" 
                          value={packageForm.panditType} 
                          onChange={e => setPackageForm({ ...packageForm, panditType: e.target.value })} 
                          placeholder="4th-Gen Hereditary Gaya Teerth Panda"
                          className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1.5">Food & Meals Details (भोजन व्यवस्था)</label>
                      <input 
                        type="text" 
                        value={packageForm.foodIncluded} 
                        onChange={e => setPackageForm({ ...packageForm, foodIncluded: e.target.value })} 
                        placeholder="Pure Sattvic Meals Included (सात्विक भोजन)"
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                      />
                    </div>
                  </div>

                  {/* SECTION 5: FEATURE POSTER IMAGE */}
                  <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#F48D08] border-b border-slate-800 pb-2">
                      <ImageIcon className="w-4 h-4" />
                      <span>SECTION 5: Package Feature Image / Video Poster</span>
                    </div>

                    <MediaUploaderInput 
                      label="Package Poster Image / Video File or URL" 
                      value={packageForm.image} 
                      onChange={url => setPackageForm({ ...packageForm, image: url })} 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#F48D08] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white py-4 rounded-2xl font-bold text-xs shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Enterprise Package to Live DB</span>
                  </button>
                </form>
              )}

              {/* 2. HERO SLIDE CMS MODAL */}
              {modalType === 'heroslide' && (
                <form onSubmit={handleSaveHeroSlide} className="space-y-6 text-xs">
                  
                  {/* SECTION 1: HEADER & CONTENT */}
                  <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#F48D08] border-b border-slate-800 pb-2">
                      <Layers className="w-4 h-4" />
                      <span>SECTION 1: Header Badge & Main Title</span>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1.5">Top Pill Badge Tag (e.g. GAYA JI SACRED PILGRIMAGE)</label>
                      <input 
                        type="text" 
                        value={heroSlideForm.badge} 
                        onChange={e => setHeroSlideForm({ ...heroSlideForm, badge: e.target.value })} 
                        required 
                        placeholder="GAYA JI SACRED PILGRIMAGE"
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1.5">Main Heading Title *</label>
                      <input 
                        type="text" 
                        value={heroSlideForm.title} 
                        onChange={e => setHeroSlideForm({ ...heroSlideForm, title: e.target.value })} 
                        required 
                        placeholder="Fulfill Your Eternal Duty to Your Ancestors"
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1.5">Subtitle / Description *</label>
                      <textarea 
                        rows={3} 
                        value={heroSlideForm.subtitle} 
                        onChange={e => setHeroSlideForm({ ...heroSlideForm, subtitle: e.target.value })} 
                        required 
                        placeholder="Experience complete peace of mind at holy Gaya Ji..."
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-[#F48D08]" 
                      />
                    </div>
                  </div>

                  {/* SECTION 2: ACTION CALL-TO-BUTTONS (CTAs) */}
                  <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#F48D08] border-b border-slate-800 pb-2">
                      <LinkIcon className="w-4 h-4" />
                      <span>SECTION 2: Call-To-Action (CTA) Buttons & Links</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1.5">Primary CTA Button Label</label>
                        <input 
                          type="text" 
                          value={heroSlideForm.ctaLabel} 
                          onChange={e => setHeroSlideForm({ ...heroSlideForm, ctaLabel: e.target.value })} 
                          placeholder="Begin Your Sacred Journey"
                          className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1.5">Primary CTA Target URL</label>
                        <input 
                          type="text" 
                          value={heroSlideForm.ctaLink} 
                          onChange={e => setHeroSlideForm({ ...heroSlideForm, ctaLink: e.target.value })} 
                          placeholder="/pre-booking"
                          className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1.5">Secondary CTA Button Label</label>
                        <input 
                          type="text" 
                          value={heroSlideForm.secondaryCtaLabel} 
                          onChange={e => setHeroSlideForm({ ...heroSlideForm, secondaryCtaLabel: e.target.value })} 
                          placeholder="Explore Gaya Ji Heritage"
                          className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1.5">Secondary CTA Target URL</label>
                        <input 
                          type="text" 
                          value={heroSlideForm.secondaryCtaLink} 
                          onChange={e => setHeroSlideForm({ ...heroSlideForm, secondaryCtaLink: e.target.value })} 
                          placeholder="/gaya-ji"
                          className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: MEDIA BACKGROUND & ORDER */}
                  <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#F48D08] border-b border-slate-800 pb-2">
                      <ImageIcon className="w-4 h-4" />
                      <span>SECTION 3: Background Media & Order Settings</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1.5">Media Type</label>
                        <select 
                          value={heroSlideForm.mediaType} 
                          onChange={e => setHeroSlideForm({ ...heroSlideForm, mediaType: e.target.value })} 
                          className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]"
                        >
                          <option value="IMAGE">🖼️ Image</option>
                          <option value="VIDEO">🎥 Video</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1.5">Slide Display Order #</label>
                        <input 
                          type="number" 
                          value={heroSlideForm.order} 
                          onChange={e => setHeroSlideForm({ ...heroSlideForm, order: Number(e.target.value) })} 
                          className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-[#F48D08]" 
                        />
                      </div>
                    </div>

                    <MediaUploaderInput 
                      label="Hero Background Image / Video File or URL *" 
                      value={heroSlideForm.mediaUrl} 
                      onChange={url => setHeroSlideForm({ ...heroSlideForm, mediaUrl: url, mediaType: url.match(/\.(mp4|webm|mov)$/i) ? 'VIDEO' : 'IMAGE' })} 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#F48D08] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white py-4 rounded-2xl font-bold text-xs shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Hero Slide to Live DB</span>
                  </button>
                </form>
              )}

              {/* 3. ARTICLES CMS MODAL */}
              {modalType === 'article' && (
                <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Article Title *</label>
                    <input type="text" value={articleForm.title} onChange={e => setArticleForm({ ...articleForm, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })} required className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                  
                  <MediaUploaderInput 
                    label="Article Banner Image / Video File or URL" 
                    value={articleForm.heroImage} 
                    onChange={url => setArticleForm({ ...articleForm, heroImage: url })} 
                  />

                  <div>
                    <label className="block font-semibold mb-1">Category *</label>
                    <input type="text" value={articleForm.category} onChange={e => setArticleForm({ ...articleForm, category: e.target.value })} required className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Summary *</label>
                    <textarea rows={3} value={articleForm.summary} onChange={e => setArticleForm({ ...articleForm, summary: e.target.value })} required className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" />
                  </div>
                  <button type="submit" className="w-full bg-[#F48D08] text-white py-3.5 rounded-xl font-bold">Save Article to Live DB</button>
                </form>
              )}

              {/* 4. SACRED PLACES CMS MODAL */}
              {modalType === 'place' && (
                <form onSubmit={handleSaveSacredPlace} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Sacred Place Name *</label>
                    <input type="text" value={placeForm.name} onChange={e => setPlaceForm({ ...placeForm, name: e.target.value })} required className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>

                  <MediaUploaderInput 
                    label="Sacred Shrine Hero Image / Video File or URL" 
                    value={placeForm.heroImage} 
                    onChange={url => setPlaceForm({ ...placeForm, heroImage: url })} 
                  />

                  <div>
                    <label className="block font-semibold mb-1">Hindi Name (हिंदी नाम)</label>
                    <input type="text" value={placeForm.hindiName} onChange={e => setPlaceForm({ ...placeForm, hindiName: e.target.value })} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Tagline / Key Spot</label>
                    <input type="text" value={placeForm.tagline || ''} onChange={e => setPlaceForm({ ...placeForm, tagline: e.target.value })} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Description *</label>
                    <textarea rows={3} value={placeForm.description} onChange={e => setPlaceForm({ ...placeForm, description: e.target.value })} required className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Historical & Scriptural Heritage</label>
                    <textarea rows={2} value={placeForm.history || ''} onChange={e => setPlaceForm({ ...placeForm, history: e.target.value })} className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" />
                  </div>
                  <button type="submit" className="w-full bg-[#F48D08] text-white py-3.5 rounded-xl font-bold">Save Sacred Place</button>
                </form>
              )}

              {/* 5. TESTIMONIALS CMS MODAL */}
              {modalType === 'testimonial' && (
                <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Devotee / Family Name *</label>
                      <input type="text" value={testimonialForm.author} onChange={e => setTestimonialForm({ ...testimonialForm, author: e.target.value })} required className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">City & State/Country *</label>
                      <input type="text" value={testimonialForm.city} onChange={e => setTestimonialForm({ ...testimonialForm, city: e.target.value })} required className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" placeholder="e.g. Bengaluru, Karnataka" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">Ritual Performed *</label>
                    <input type="text" value={testimonialForm.ritual} onChange={e => setTestimonialForm({ ...testimonialForm, ritual: e.target.value })} required className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-medium" placeholder="e.g. Vishnupad & Falgu River Pind Daan" />
                  </div>

                  {/* Devotee Pooja Image */}
                  <MediaUploaderInput 
                    label="Devotee Performing Pooja Photo (पूजा की तस्वीर - Upload or URL) *" 
                    value={testimonialForm.poojaImage || ''} 
                    onChange={url => setTestimonialForm({ ...testimonialForm, poojaImage: url })} 
                  />

                  {/* Recorded Video Testimonial File/URL */}
                  <MediaUploaderInput 
                    label="Recorded Video Testimonial (रिकॉर्ड किया गया वीडियो - Upload MP4 or Paste Video URL)" 
                    value={testimonialForm.videoUrl || ''} 
                    onChange={url => setTestimonialForm({ ...testimonialForm, videoUrl: url })} 
                  />

                  {/* Devotee Avatar Photo */}
                  <MediaUploaderInput 
                    label="Devotee Profile Photo / Avatar (Optional)" 
                    value={testimonialForm.avatarUrl || ''} 
                    onChange={url => setTestimonialForm({ ...testimonialForm, avatarUrl: url })} 
                  />

                  <div>
                    <label className="block font-semibold mb-1">Devotee Testimony / Review *</label>
                    <textarea rows={3} value={testimonialForm.content} onChange={e => setTestimonialForm({ ...testimonialForm, content: e.target.value })} required className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white" placeholder="Devotee experience and feedback..." />
                  </div>
                  <button type="submit" className="w-full bg-[#C6922E] hover:bg-[#A97718] text-white py-3.5 rounded-xl font-bold text-sm transition-colors">
                    Save Devotee Video & Review
                  </button>
                </form>
              )}

              {/* 6. MEDIA LIBRARY CMS MODAL */}
              {modalType === 'media' && (
                <form onSubmit={handleSaveMedia} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold mb-1">Media Title *</label>
                    <input type="text" value={mediaForm.title} onChange={e => setMediaForm({ ...mediaForm, title: e.target.value })} required className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold" />
                  </div>

                  <MediaUploaderInput 
                    label="Upload Image / Video File or Paste Direct Media URL *" 
                    value={mediaForm.url} 
                    onChange={url => setMediaForm({ ...mediaForm, url: url })} 
                  />

                  <button type="submit" className="w-full bg-[#F48D08] text-white py-3.5 rounded-xl font-bold">Save Media Item to Library</button>
                </form>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
