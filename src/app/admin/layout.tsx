import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="admin-erp-root font-body h-screen h-[100dvh] w-full bg-[#0B0F19] text-slate-100 antialiased overflow-hidden" 
      data-admin-panel="true"
      style={{ colorScheme: 'dark' }}
    >
      {children}
    </div>
  );
}
