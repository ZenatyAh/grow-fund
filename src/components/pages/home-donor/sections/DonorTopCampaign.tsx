import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';

type DonorTopCampaignProps = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const DonorTopCampaign = ({ id, title, description, image }: DonorTopCampaignProps) => {
  return (
    <section id="about">
      <h2 className="text-center text-[44px] font-bold text-slate-900">أثر حملة تبرعت لها ✦</h2>

      <div className="mt-4 grid gap-6 rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] lg:grid-cols-2">
        <div className="order-2 text-right lg:order-1">
          <h3 className="text-[32px] font-bold text-slate-900">{title}</h3>
          <p className="mt-3 text-[16px] leading-8 text-slate-600">{description}</p>
          <Link
            href={`/campaigns/${id}`}
            className="mt-6 inline-flex items-center justify-center rounded-[10px] bg-blue-600 px-8 py-3 text-[16px] font-semibold text-white transition-colors hover:bg-blue-700"
          >
            مشاهدة التحديثات
          </Link>
        </div>

        <Link href={`/campaigns/${id}`} className="order-1 lg:order-2">
          <div className="relative h-[270px] overflow-hidden rounded-[16px]">
            <Image src={image} alt={title} fill className="object-cover" />
            <span className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg">
              <Play className="h-8 w-8" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default DonorTopCampaign;
