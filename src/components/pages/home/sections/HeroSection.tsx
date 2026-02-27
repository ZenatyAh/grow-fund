import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-24 flex flex-col items-center text-center">
      {/* Heading Section */}
      <div className="max-w-3xl mb-20 space-y-12">
        <div className="flex justify-center" />

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black flex items-center justify-center gap-3">
          تبرّعك ينير السماء ✨
        </h1>

        <p className="text-[20px] font-medium leading-[150%] text-center text-[#334155] max-w-2xl mx-auto font-['var(--font-tajawal)']">
          كل نجمة تضيئها هنا، تعني أملًا جديدًا وحياة تتغيّر هناك.
          <br />
          ساهم اليوم، وكن جزءًا من قصة إنسانية حقيقية.
        </p>

        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold w-[212px] h-[56px] rounded-[8px]"
        >
          استكشف الحملات
        </Button>
      </div>
      {/* Images Grid (FIXED RTL & ORDER) */}
      <div
        dir="rtl"
        className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="flex flex-col gap-6">
          {/* Top Blue Card */}
          <div className="bg-blue-600 text-white rounded-2xl p-6 flex flex-col justify-center items-center h-[100px]">
            <p className="text-4xl font-bold">+20</p>
            <p className="text-sm text-center mt-2">حملات تحتاج دعمك الآن</p>
          </div>

          {/* Bottom Image */}
          <div className="relative h-[295px] rounded-2xl overflow-hidden">
            <Image
              src="/images/home/hero-water.png"
              alt="Classroom"
              fill
              className="object-cover"
            />
          </div>
        </div>
        {/* Image 1 */}
        <div className="relative h-[420px] rounded-2xl overflow-hidden">
          <Image
            src="/images/home/hero-classroom.png"
            alt="Education"
            fill
            className="object-cover"
          />
        </div>

        {/* Image 2 */}
        <div className="relative h-[420px] rounded-2xl overflow-hidden">
          <Image
            src="/images/home/hero-food.png"
            alt="Food"
            fill
            className="object-cover"
          />
        </div>

        {/* Image 3 */}
        <div className="flex flex-col gap-6">
          {/* Top Blue Card */}

          {/* Bottom Image */}
          <div className="relative h-[295px] rounded-2xl overflow-hidden">
            <Image
              src="/images/home/hero-water.png"
              alt="Classroom"
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-blue-600 text-white rounded-2xl p-6 flex flex-col justify-center items-center h-[100px]">
            <p className="text-4xl font-bold">+20</p>
            <p className="text-sm text-center mt-2">حملات تحتاج دعمك الآن</p>
          </div>
        </div>
        {/* Right Column */}
      </div>
    </section>
  );
};

export default HeroSection;
