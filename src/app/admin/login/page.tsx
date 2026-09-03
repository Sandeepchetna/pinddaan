import React from 'react';
import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminLoginForm from './AdminLoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  // If already authenticated, redirect to Admin ERP dashboard
  if (session) {
    redirect('/admin');
  }

  return <AdminLoginForm />;
}
