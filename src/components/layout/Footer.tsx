import React from 'react';
import Container from './Container';
import { Map } from 'lucide-react';
import FooterBrand from '../ui/FooterBrand';
import FooterLinks from '../ui/FooterLinks';
import FooterContact from '../ui/FooterContact';

const Footer = () => {
  const quickLinks = [
    { href: '#', text: 'الصفحة الرئيسية' },
    { href: '#', text: 'استكشاف الحملات' },
    { href: '#', text: 'نبذة عنا' },
  ];
  return (
    <footer className="bg-white py-8 gap-5">
      <Container otherClassName="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-5 max-sm:text-center">
        <div className="max-sm:col-span-2">
          <FooterBrand />
        </div>

        <FooterLinks title="روابط سريعة" links={quickLinks} />

        <FooterLinks
          title="روابط سريعة"
          links={quickLinks}
        />

        <FooterContact
          title="تواصل معنا"
          contacts={[
            { Icon: Map, text: 'فلسطين- غزة' },
            { Icon: Map, text: 'فلسطين- غزة' },
            { Icon: Map, text: 'فلسطين- غزة' },
          ]}
        />
      </Container>
    </footer>
  );
};

export default Footer;
