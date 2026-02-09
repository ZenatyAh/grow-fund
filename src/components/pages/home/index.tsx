'use client';

import React from 'react';
import HeroSection from './sections/HeroSection';
import StatsSection from './sections/StatsSection';
import FeaturedCampaigns from './sections/FeaturedCampaigns';
import ImpactAssurance from './sections/ImpactAssurance';
import LearnMore from './sections/LearnMore';
import MediaGallery from './sections/MediaGallery';
import JoinSteps from './sections/JoinSteps';
import Newsletter from './sections/Newsletter';

const HomePage = () => {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <StatsSection />
      <FeaturedCampaigns />
      <ImpactAssurance />
      <LearnMore />
      <MediaGallery />
      <JoinSteps />
      <Newsletter />
    </main>
  );
};

export default HomePage;
