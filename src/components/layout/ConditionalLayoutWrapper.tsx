'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function ConditionalLayoutWrapper({
  navbar,
  footer,
  stickyMobileBar,
  aiAgentWidget,
  children
}: {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  stickyMobileBar: React.ReactNode;
  aiAgentWidget: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return (
      <div className="w-full min-h-screen bg-[#0F172A] flex flex-col antialiased">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col bg-temple-ivory relative">
      {navbar}
      <main className="flex-1">{children}</main>
      {footer}
      {stickyMobileBar}
      {aiAgentWidget}
    </div>
  );
}
