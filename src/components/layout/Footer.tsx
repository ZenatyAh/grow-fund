import React from 'react';
import Container from './Container';
import { Map } from 'lucide-react';
import FooterBrand from '../ui/FooterBrand';
import FooterLinks from '../ui/FooterLinks';
import FooterContact from '../ui/FooterContact';

const Footer = () => {
  return (
    <footer className="bg-white py-8 gap-5">
      <Container otherClassName="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-5 max-sm:text-center">
        <div className="max-sm:col-span-2">
          <FooterBrand />
        </div>

        <FooterLinks
          title="روابط سريعة"
          links={['الصفحة الرئيسية', 'استكشاف الحملات', 'نبذة عنا']}
        />

        <FooterLinks
          title="روابط سريعة"
          links={['الصفحة الرئيسية', 'استكشاف الحملات', 'نبذة عنا']}
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
