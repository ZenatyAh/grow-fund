import React from 'react';

type DonorWelcomeBannerProps = {
  donorName: string;
};

const DonorWelcomeBanner = ({ donorName }: DonorWelcomeBannerProps) => {
  return (
    <section className="relative overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_30%_20%,#14357f_0%,#0A1E55_55%,#08153E_100%)] px-6 py-10 text-center text-white">
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:42px_42px]" />
      <h1 className="relative text-[50px] font-bold">مرحباً بك {donorName}</h1>
      <p className="relative mt-2 text-[18px] text-blue-100">أنت نجم في سماء نجومي</p>
    </section>
  );
};

export default DonorWelcomeBanner;
