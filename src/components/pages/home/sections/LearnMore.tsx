import Image from 'next/image';
import { Star } from 'lucide-react';

const LearnMoreAboutImpact = () => {
  return (
    <section className="w-full bg-white py-24">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Section Title */}
        <h2 className="flex items-center justify-center gap-3 mb-16 text-3xl md:text-4xl font-bold text-[#0F172A]">
          <span>اعرف أكثر عن الأثر</span>
          <Star className="w-7 h-7 fill-[#0F172A] text-[#0F172A]" />
        </h2>

        {/* Top Row */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 mb-6">
          {/* Left Image */}
          <div className="relative w-full max-w-[360px] h-[166px] rounded-[24px] overflow-hidden">
            <Image
              src="/images/home/background.png"
              alt="Impact Left"
              fill
              className="object-cover"
            />
          </div>

          {/* Center Card */}
          <div
            className="
              w-full max-w-[732.5px]
              h-auto md:h-[166px]
              bg-[#E0EEFF]
              border border-[#CBD5E1]
              rounded-[24px]
              p-6
              opacity-100
              flex items-center gap-6
            "
          >
            {/* Content */}
            <div className="flex-1 flex items-center gap-6">
              <div className="relative w-[64px] h-[64px] rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="/images/home/background.png"
                  alt="Impact Icon"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Text */}
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-2">
                  كيف تساهم النجوم في تغيير الواقع؟
                </h3>
                <p className="text-[#334155] text-sm md:text-base leading-relaxed">
                  مساهمات صغيرة، تصنع فرقًا كبيرًا عندما تجتمع.
                </p>
              </div>

              {/* Image on the right */}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full max-w-[360px] h-[166px] rounded-[24px] overflow-hidden">
            <Image
              src="/images/home/background.png"
              alt="Impact Right"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6">
          {/* Bottom Left Card */}
          <div
            className="
              w-full max-w-[732.5px]
              h-auto md:h-[166px]
              bg-[#E0EEFF]
              border border-[#CBD5E1]
              rounded-[24px]
              p-6
              opacity-100
              flex items-center gap-6
            "
          >
            <div className="flex-1 flex items-center gap-6">
              <div className="relative w-[64px] h-[64px] rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="/images/home/background.png"
                  alt="Impact Icon"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-2">
                  كيف يستمر الأثر بعد التبرع
                </h3>
                <p className="text-[#334155] text-sm md:text-base leading-relaxed">
                  مساهمات صغيرة، تصنع فرقًا كبيرًا عندما تجتمع.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Right Card */}
          <div
            className="
              w-full max-w-[732.5px]
              h-auto md:h-[166px]
              bg-[#E0EEFF]
              border border-[#CBD5E1]
              rounded-[24px]
              p-6
              opacity-100
              flex items-center gap-6
            "
          >
            <div className="flex-1 flex items-center gap-6">
              <div className="relative w-[64px] h-[64px] rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="/images/home/background.png"
                  alt="Impact Icon"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-2">
                  كيف يمكن تتبع الأثر
                </h3>
                <p className="text-[#334155] text-sm md:text-base leading-relaxed">
                  مساهمات صغيرة، تصنع فرقًا كبيرًا عندما تجتمع.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMoreAboutImpact;
