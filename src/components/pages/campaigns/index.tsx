'use client';

import React, { useState } from 'react';
import CampaignsHeader from './sections/CampaignsHeader';
import CampaignsList from './sections/CampaignsList';
import CampaignsFiltersSidebar from './sections/CampaignsFiltersSidebar';
import { CATEGORY_LABEL_BY_ID, DEFAULT_CATEGORY_ID } from './data/categories';

export type CampaignsFilters = {
  executor?: string;
  scope?: string;
  popularity?: 'most_donated' | 'most_shared' | 'most_viewed';
  dateOrder?: 'newest' | 'oldest';
  progress?: 'lt_25' | '25_50' | '50_75' | 'gt_75';
  size?: 'small' | 'medium' | 'large';
  duration?: 'week' | 'month' | 'three_months' | 'over_three_months';
  status?: 'very_urgent' | 'urgent' | 'not_urgent';
};

const CampaignsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState(DEFAULT_CATEGORY_ID);
  const [filters, setFilters] = useState<CampaignsFilters>({});

  const activeCategoryLabel = CATEGORY_LABEL_BY_ID[activeCategoryId] ?? '';

  return (
    <main className="min-h-screen bg-white">
      <CampaignsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategoryId={activeCategoryId}
        onCategoryChange={setActiveCategoryId}
      />
      <div className="container mx-auto px-4 pb-16 max-w-[2000px]">
        <div className="flex flex-col-reverse gap-8 lg:flex-row-reverse lg:items-start lg:gap-10">
          <div className="flex-1">
            <CampaignsList
              searchQuery={searchQuery}
              activeCategoryLabel={activeCategoryLabel}
              filters={filters}
            />
          </div>
          <div className="lg:w-[300px] lg:sticky lg:top-16">
            <CampaignsFiltersSidebar
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CampaignsPage;
