import Image from 'next/image';
import { Star } from 'lucide-react';

// New Mock Data (for image grid)
const CAMPAIGNS = [
  { id: 1, title: 'معلم المستقبل', image: '/images/home/background.png' },
  {
    id: 2,
    title: 'قطرة ماء... تنقذ حياة',
    image: '/images/home/background.png',
  },
  {
    id: 3,
    title: 'علمهم.. تبني مستقبلهم',
    image: '/images/home/background.png',
  },
  { id: 4, title: 'لقمة عيش', image: '/images/home/background.png' },
  { id: 5, title: 'زاد الخير', image: '/images/home/background.png' },
  { id: 6, title: 'كل أنت عائلته', image: '/images/home/background.png' },
  { id: 7, title: 'أنقذهم عن السؤال', image: '/images/home/background.png' },
  { id: 8, title: 'مأوى دافئ', image: '/images/home/background.png' },
];

const FeaturedCampaigns = () => {
  return (
    <section className="w-full">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="flex items-center justify-center gap-3 mt-14 mb-14 text-3xl md:text-4xl font-bold text-[#0F172A]">
          <Star className="w-8 h-8 fill-[#0F172A] text-[#0F172A]" />
          <span>حملات مميزة</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAMPAIGNS.map((campaign) => (
            <div
              key={campaign.id}
              className="relative h-[260px] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={campaign.image}
                alt={campaign.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t to-transparent" />

              {/* Title */}
              <div className="absolute inset-0 flex items-end justify-center pb-8 text-center px-4">
                <p className="text-white text-base md:text-lg font-bold leading-snug">
                  {campaign.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
