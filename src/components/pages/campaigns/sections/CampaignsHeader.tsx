'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { CATEGORIES } from '../data/categories';

type CampaignsHeaderProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeCategoryId: string;
  onCategoryChange: (id: string) => void;
};

const CampaignsHeader = ({
  searchQuery,
  onSearchChange,
  activeCategoryId,
  onCategoryChange,
}: CampaignsHeaderProps) => {
  return (
    <section className="w-full py-12 bg-gray-50/50">
      <div className="container mx-auto px-4 text-center">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
          حملات تحتاج لدعمك
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
          كل تبرع يصنع فرقًا. تصفح المبادرات والحملات التي تلامس قلبك وابدأ
          بالمساهمة الآن.
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative flex items-center">
            {/* Input */}
            <Input
              type="text"
              placeholder="ابحث عن اسم الحملة أو صاحب الحملة"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              className="
        w-full
        h-[72px]
        pr-6
        pl-[140px]
        rounded-full
        border border-gray-200
        shadow-sm
        text-right
        text-lg
        focus:ring-2
        focus:ring-blue-500/30
      "
            />

            {/* Search Button */}
            <button
              type="button"
              className="
        absolute
        left-2
        h-[56px]
        px-8
        bg-blue-600
        hover:bg-blue-700
        text-white
        rounded-full
        flex
        items-center
        gap-3
        font-bold
      "
            >
              <Search className="w-5 h-5" />
              بحث
            </button>
          </div>
        </div>

        {/* Categories (Horizontal Scroll on Mobile) */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 pb-4">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isActive = category.id === activeCategoryId;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryChange(category.id)}
                className={`
          flex items-center justify-center gap-3
          px-4 py-4
          rounded-full
          text-base font-semibold
          whitespace-nowrap
          transition-all
          ${
            isActive
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }
        `}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive ? 'text-white' : 'text-gray-500'
                  }`}
                />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampaignsHeader;
