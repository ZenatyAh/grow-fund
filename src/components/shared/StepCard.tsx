"use client";

import Image from "next/image";

type StepCardProps = {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
};

export default function StepCard({
  image,
  title,
  description,
  buttonText,
  onClick,
}: StepCardProps) {
  return (
    <div
      dir="rtl"
      className="flex flex-col items-center justify-between
                 rounded-3xl bg-[#F3F6F9] p-10
                 border border-slate-200"
    >
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        className="mb-8"
      />

      <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">
        {title}
      </h3>

      <p className="text-slate-600 text-lg mb-10 text-center">
        {description}
      </p>

      <button
        onClick={onClick}
        className="w-full rounded-full bg-[#F9AE2B]
                   py-4 text-xl font-semibold text-white"
      >
        {buttonText}
      </button>
    </div>
  );
}
