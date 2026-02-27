import React from "react";
import Image from "next/image";

type SuccessHeroProps = {
  title: string;
  subtitle: string;
  imageSrc?: string;
};

const SuccessHero = ({ title, subtitle, imageSrc = "/images/donation.png" }: SuccessHeroProps) => {
  return (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center">
        <Image
          src={imageSrc}
          alt="نجاح عملية التبرع"
          width={126}
          height={126}
          priority
          className="h-[126px] w-[126px] object-contain"
        />
      </div>
      <h1 className="mt-3 text-[25px] font-bold leading-[1.1] text-slate-900 md:text-[39px]">
        {title}
      </h1>
      <p className="mt-3 text-[13px] font-normal text-slate-600 md:text-[24px]">
        {subtitle}
      </p>
    </div>
  );
};

export default SuccessHero;
