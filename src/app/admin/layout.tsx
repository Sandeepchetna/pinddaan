import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-erp-root font-body min-h-screen bg-[#F8F9FA] text-[#2B2118] antialiased" data-admin-panel="true">
      {children}
    </div>
  );
}
