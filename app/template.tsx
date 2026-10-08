'use client';

import React from 'react';

/**
 * Next.js App Router Template
 * Remounts on route change between pages, providing a seamless, hardware-accelerated
 * fade-in transition without triggering full-page layout jumps or re-mounting the layout/navbar/footer.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition-enter w-full">
      {children}
    </div>
  );
}
