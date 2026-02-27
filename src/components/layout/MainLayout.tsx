'use client';
import React, { useState } from 'react';
import Container from './Container';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  // Temporary to determine if the user is the campaign creator
  const [isCampaignCreator] = useState(false);
  const pathname = usePathname();

  const noHeaderFooter = pathname.startsWith('/campaigns/create');
  const isProfilePage = pathname.startsWith('/profile/');

  return (
    <div>
      {!isCampaignCreator && !noHeaderFooter && (
        <Container>
          <Header />
        </Container>
      )}

      <div className="flex flex-1">
        {isCampaignCreator && (
          <aside className="h-screen sticky top-0 z-50 w-90 pt-6 px-6">
            <Sidebar />
          </aside>
        )}

        <main
          className={`flex-1 min-w-0 overflow-y-auto p-4 md:p-6 ${
            isProfilePage ? 'pt-4 md:pt-4' : 'pt-16 md:pt-6'
          }`}
        >
          {!noHeaderFooter ? <Container>{children}</Container> : children}
        </main>
      </div>

      {!noHeaderFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
