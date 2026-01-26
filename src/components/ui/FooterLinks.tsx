import { FooterLinksProps } from '@/interfaces';

const FooterLinks = ({ title, links }: FooterLinksProps) => {
  return (
    <div>
      <h2 className="text-(--text-third) font-bold text-2xl mb-4">{title}</h2>
      <ul className="space-y-4">
        {links.map((link, i) => (
          <li key={i} className="text-(--slate-700) text-base">
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
