import { cn } from '@/lib/utils';
import { navbarLinks } from '@/shared/constants/NavbarLinks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavbarLinks = () => {
  const pathname = usePathname();

  return (
    <ul className="flex items-center justify-center gap-8">
      {navbarLinks.map((link) => (
        <li
          key={link.id}
          className="inline-block text-base md:text-lg font-bold cursor-pointer group"
        >
          <Link
            href={link.href}
            className={cn(
              'hover:text-(--bg-bold-blue) transition-all duration-300',
              pathname === link.href && 'text-(--bg-bold-blue)'
            )}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavbarLinks;
