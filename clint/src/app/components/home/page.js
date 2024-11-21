'use client'
import React, { useRef } from 'react';
import RaiNavbar from '../navbar/page';
import RaiHero from '../hero/page';
import RaiFooter from '../footer/page';
import RaiNews from '../news/page';

const RaiHome = () => {
  const heroRef = useRef(null);
  const newsRef = useRef(null);
  const footerRef = useRef(null);

  const scrollToSection = (section) => {
    const refs = {
      hero: heroRef,
      news: newsRef,
      footer: footerRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <RaiNavbar scrollToSection={scrollToSection} />
      <RaiHero ref={heroRef} />
      <RaiNews ref={newsRef} />
      <RaiFooter ref={footerRef} />
    </div>
  );
};

export default RaiHome;
