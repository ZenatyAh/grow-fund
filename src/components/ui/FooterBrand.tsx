import { FooterSocial } from '@/shared/constants/FooterSocial';
import Logo from '@/shared/ui/components/Logo';
import Image from 'next/image';
import Link from 'next/link';

const FooterBrand = () => {
  return (
    <div className="space-y-5">
      <Logo otherClassName="max-sm:justify-center" />
      <p className="text-(--slate-700) text-base font-normal">
        نجوم منصة تهدف إلى تمكين حملات التبرع الموثوقة وربط المتبرعين بالأثر
        الحقيقي، بشفافية وسهولة.
      </p>
      <div className="flex items-center max-sm:justify-center gap-3">
        {FooterSocial.map((social) => (
          <Link
            key={social.id}
            href={social.href}
            className="rounded-full p-2 bg-(--bg-slate-100) flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer" // Opens link in new tab safely without giving the new page access to the opener
          >
            <Image src={social.src} alt={social.name} width={24} height={24} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterBrand;
