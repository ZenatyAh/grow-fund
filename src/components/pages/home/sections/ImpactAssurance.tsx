import Image from 'next/image';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STEPS = [
  {
    id: 1,
    title: 'مراجعة كل حملة قبل نشرها',
    description:
      'نراجع جميع الحملات بدقة للتأكد من مصداقيتها، وضوح أهدافها، والتزامها بالمعايير المناسبة قبل إتاحتها للمتبرعين.',
  },
  {
    id: 2,
    title: 'متابعة التقدم والتحديثات',
    description:
      'نوفر متابعة مستمرة لتقدم كل حملة مع تحديثات دورية توضح مراحل التنفيذ وأثر التبرعات بشكل واضح.',
  },
  {
    id: 3,
    title: 'تقارير شفافة للمتبرعين',
    description:
      'نقدم تقارير مفصلة وموثوقة تبين كيفية استخدام التبرعات والنتائج التي تحققت، لتعزيز الثقة والشفافية.',
  },
];

const HowWeEnsureImpact = () => {
  return (
    <section className="w-full py-24">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="flex items-center justify-center gap-3 mt-14 mb-14 text-3xl md:text-4xl font-bold text-[#0F172A]">
          <Star className="w-8 h-8 fill-[#0F172A] text-[#0F172A]" />
          <span>كيف نضمن وصول الأثر</span>
        </h2>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-full h-[420px] rounded-3xl overflow-hidden">
            <Image
              src="/images/home/background.png"
              alt="Impact Assurance"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Left - Steps */}
          <div className="space-y-12">
            {STEPS.map((step) => (
              <div key={step.id} className="flex gap-6 items-start">
                {/* Number */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#E2E8F0] text-[#0F172A] flex items-center justify-center font-bold text-lg">
                  {step.id}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-[#0F172A] mb-4">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#94A3B8] leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Image */}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-20">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-10 py-6 rounded-xl">
            اضي نجمة الان
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowWeEnsureImpact;
