import React from 'react';
import Container from './Container';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Container>
        <Header />
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default MainLayout;
