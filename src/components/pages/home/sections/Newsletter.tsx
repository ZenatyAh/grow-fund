import Image from 'next/image';
import { Button } from '@/components/ui/button';

const NewsletterSection = () => {
  return (
    <section className="w-full py-20">
      <div className="container mx-auto px-4">
        <div
          className="
            w-full
            bg-[#DBEAFE]
            rounded-[32px]
            px-8 md:px-16
            py-12
            flex flex-col lg:flex-row
            items-center
            gap-10
          "
        >
          {/* Left Illustration */}

          {/* Content */}
          <div className="flex-1 text-right">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">
              اشترك في نشرتنا البريدية
            </h3>

            <p className="text-[#334155] text-sm md:text-base leading-relaxed max-w-2xl">
              اشترك في نشرتنا البريدية لتبقى على اطلاع دائم بالحملات الجديدة،
              وتتابع آخر التحديثات والنتائج التي تحققت بفضل التبرعات. نرسل لك
              محتوى مختار يوضح الأثر الحقيقي على أرض الواقع، ويمنحك فرصة لدعم
              الحملات التي تهمك في الوقت المناسب.
            </p>

            {/* Input + Button */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch gap-4 max-w-xl">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="
                  flex-1
                  h-[48px]
                  rounded-xl
                  border border-[#CBD5E1]
                  px-4
                  text-sm
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

              <Button className="h-[48px] px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl">
                اشترك
              </Button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Image
              src="/images/home/background.png"
              alt="Newsletter"
              width={180}
              height={180}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
