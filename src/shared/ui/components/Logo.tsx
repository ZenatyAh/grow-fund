import Image from 'next/image';

const Logo = ({ otherClassName }: { otherClassName?: string }) => {
  return (
    <div className={`flex items-center gap-2 ${otherClassName}`}>
      <Image src="/images/logo.png" alt="Njomi Logo" width={40} height={40} />
      <h1 className="text-(--text-third) text-lg font-bold text-center">
        نجومي
      </h1>
    </div>
  );
};

export default Logo;
