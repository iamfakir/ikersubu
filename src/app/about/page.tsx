'use client';

import dynamic from 'next/dynamic';

// Dynamically import client-side only components
const ClientSideAbout = dynamic(() => import('../../components/ClientSideAbout'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gradient-to-br from-[#0B0E17] to-[#1A1F35]" />
});

const AboutPage = () => {
  return <ClientSideAbout />;
};

export default AboutPage;
