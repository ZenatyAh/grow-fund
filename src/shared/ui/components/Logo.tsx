import Image from 'next/image';

const Logo = ({
  width = 40,
  height = 40,
  otherClassName,
  titleClassName,
}: {
  width?: number;
  height?: number;
  otherClassName?: string;
  titleClassName?: string;
}) => {
  return (
    <div className={`flex items-center gap-2 ${otherClassName}`}>
      <Image
        src="/images/logo.png"
        alt="Njomi Logo"
        width={width}
        height={height}
      />
      <h1
        className={`text-(--text-third) text-lg font-bold text-center ${titleClassName}`}
      >
        نجومي
      </h1>
    </div>
  );
};

export default Logo;
