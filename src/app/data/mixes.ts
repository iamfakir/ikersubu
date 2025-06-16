interface MixItem {
  id: number;
  title: string;
  artist: string;
  genre: string;
  year: string;
  coverArt: string;
  credits: string;
  description: string;
  highlights: string[];
  link: string;
  streamingLinks: {
    youtube: string;
    instagram: string;
  };
}

// Define a function to ensure image paths are correctly formatted
const formatImagePath = (path: string): string => {
  // If path already starts with a slash, return it as is
  if (path.startsWith('/')) {
    return path;
  }
  // If path includes 'public/', remove it as Next.js serves from public automatically
  if (path.startsWith('public/')) {
    return '/' + path.substring(7);
  }
  // Otherwise, assume it's a relative path and add a leading slash
  return '/' + path;
};

const mixes: MixItem[] = [
  {
    id: 1,
    title: 'Manadhil',
    artist: 'JBE',
    genre: 'R&B/Soul',
    year: '2025',
    coverArt: formatImagePath('public/assets/images/Mixes/mndhl.jpg'),
    credits: 'Mixed by Iker Subu | Produced by Akroniim',
    description: 'Silky smooth track featuring lush vocal harmonies and crisp percussion. This mix showcases the perfect balance between modern production and classic warmth.',
    highlights: ['Vocal layering and harmonies', 'Punchy Low-end processing', 'Spatial reverb design'],
    link: '/portfolio/velvet-dreams',
    streamingLinks: {
      youtube: 'https://www.youtube.com/watch?v=xvgSyBcq4l0&pp=ygUDSkJF',
      instagram: 'https://www.instagram.com/reel/DIlk4wNTonN/'
    }
  },
  {
    id: 2,
    title: 'Pesaadhe',
    artist: 'JBE',
    genre: 'R&B/Dance',
    year: '2025',
    coverArt: formatImagePath('public/assets/images/Mixes/pesadhe.jpg'),
    credits: 'Mixed by Iker Subu | Produced by Akroniim',
    description: 'Soulful electronic dance Song blending Haitian rhythms with house music, A groundbreaking fusion of styles.',
    highlights: ['Vocal clarity and presence', 'Punchy drum processing', 'Dynamic range control'],
    link: '/portfolio/street-symphony',
    streamingLinks: {
      youtube: 'https://www.youtube.com/watch?v=PIDJ4uAgHNg',
      instagram: 'https://www.instagram.com/jbexii/reel/DJ_tWygIp6l/'
    }
  }
];

export const getMixes = () => mixes;
export const getFeaturedMixes = (count?: number) => {
  if (count) {
    return mixes.slice(0, count);
  }
  return mixes;
};