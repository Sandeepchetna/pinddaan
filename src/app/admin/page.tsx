import React from 'react';
import { getAdminERPData } from './actions';
import { requireAdminSession } from '@/lib/auth';
import AdminERPClient from './AdminERPClient';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  // Server-side guard: Redirects to /admin/login if not authenticated
  const session = await requireAdminSession();

  const erpData = await getAdminERPData();

  const initialData = {
    preBookings: erpData.preBookings || [],
    leads: erpData.leads || [],
    customers: erpData.customers || [],
    packages: erpData.packages || [],
    hotels: erpData.hotels || [],
    articles: erpData.articles || [],
    sacredPlaces: erpData.sacredPlaces || [],
    testimonials: erpData.testimonials || [],
    mediaItems: erpData.mediaItems || [],
    heroSlides: erpData.heroSlides || [],
    siteSettings: erpData.siteSettings || {}
  };

  return <AdminERPClient initialData={initialData} session={session} />;
}
