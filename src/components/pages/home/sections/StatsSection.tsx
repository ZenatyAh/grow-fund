import Image from 'next/image';

const StatsSection = () => {
  return (
    <section className="relative w-full text-white py-12 md:py-16 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/home/background.png"
        alt="Stats Background"
        fill
        priority
        className="object-cover"
      />

      {/* Blue Overlay */}
      <div className="absolute inset-0 bg-blue-600/85" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-blue-100">
          سماء من النجوم... صنعتها أيادي الخير
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold mb-2">+50,000</span>
            <span className="text-blue-200 text-sm md:text-base">مستفيد</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold mb-2">+1,200</span>
            <span className="text-blue-200 text-sm md:text-base">
              مشروع مكتمل
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold mb-2">+85</span>
            <span className="text-blue-200 text-sm md:text-base">
              شريك نجاح
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold mb-2">+500</span>
            <span className="text-blue-200 text-sm md:text-base">متطوع</span>
          </div>
        </div>

        <div className="mt-12 text-blue-100 text-sm md:text-base max-w-2xl mx-auto">
          <p>
            هذه الأرقام ليست مجرد إحصائيات، بل هي قصص نجاح وأمل صنعناها معاً.
            انضم إلينا لنصنع المزيد.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
