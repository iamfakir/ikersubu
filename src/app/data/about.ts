interface StatItem {
  value: string;
  label: string;
}

interface AboutContent {
  hero: {
    title: string;
    description: string;
    profileImage: string;
    name: string;
    role: string;
  };
  stats: StatItem[];
  cta: {
    title: string;
    description: string;
  };
}

const aboutContent: AboutContent = {
  hero: {
    title: 'Crafting Exceptional Sound',
    description: "Hi, I'm Iker Subu, a professional audio engineer and producer. I work with talented artists and help them achieve their sonic vision.",
    profileImage: '/assets/images/studiopic/studiop1.webp',
    name: 'Iker Subu',
    role: 'Audio Engineer & Producer'
  },
  stats: [
    { value: '2+', label: 'Years Experience' },
    { value: '100+', label: 'Projects Completed' },
    { value: '25+', label: 'Artists Worked With' },
  ],

  cta: {
    title: 'Ready to Elevate Your Sound?',
    description: "Let's work together to bring your music to life with professional mixing and mastering services tailored to your unique sound."
  }
};

export const getAboutContent = () => aboutContent;