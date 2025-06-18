import dynamic from 'next/dynamic';

// Disable SSR for the entire page to prevent hydration issues
const ClientSideAbout = dynamic(
  () => import('../../components/ClientSideAbout'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-[#0B0E17] to-[#1A1F35]" />
    ),
  }
);

const AboutPage = () => {
  return <ClientSideAbout />;
};

export default AboutPage;
