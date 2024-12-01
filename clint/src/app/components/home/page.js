'use client'
import React, { useRef } from 'react';
import RaiNavbar from '../navbar/page';
import RaiHero from '../hero/page';
import RaiFooter from '../footer/page';
import RaiNews from '../news/page';

import './Home.css'
import RaiService from '../servicecompo/page';


const RaiHome = () => {
  const heroRef = useRef(null);
  const newsRef = useRef(null);
  const footerRef = useRef(null);
  const serviceRef =useRef(null)


  const scrollToSection = (section) => {
    const refs = {
      hero: heroRef,
      news: newsRef,
      footer: footerRef,
      service:serviceRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='main-hero'>
      <RaiNavbar scrollToSection={scrollToSection} />
      <div ref={heroRef} className="section-height">
        <RaiHero />
      </div>
      <div ref={newsRef} className="section-height">
        <RaiNews />
      </div>
      <div ref={serviceRef} className="section-height">
        <RaiService />
      </div>
      <div ref={footerRef} className="h-[50vh] pt-[10vh]">
        <RaiFooter />
      </div>
    </div>
  );
};

export default RaiHome;
