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
    appleMusic: string;
    spotify: string;
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
    title: 'Velvet Dreams',
    artist: '[Artist Name]',
    genre: 'Contemporary',
    year: '2024',
    coverArt: formatImagePath('/assets/images/works/28.jpg'),
    credits: 'Mixed by Iker Subu | Produced by [Producer Name]',
    description: 'Silky smooth track featuring lush vocal harmonies and crisp percussion. This mix showcases the perfect balance between modern production and classic warmth.',
    highlights: ['Vocal layering and harmonies', 'Punchy percussion processing', 'Spatial reverb design'],
    link: '/portfolio/velvet-dreams',
    streamingLinks: {
      appleMusic: 'https://music.apple.com/us/album/velvet-dreams',
      spotify: 'https://open.spotify.com/album/velvetdreams'
    }
  },
  {
    id: 2,
    title: 'Street Symphony',
    artist: '[Artist Name]',
    genre: 'Urban',
    year: '2023',
    coverArt: formatImagePath('/assets/images/works/34.jpg'),
    credits: 'Mixed by Iker Subu | Produced by [Producer Name]',
    description: 'Hard-hitting track with aggressive drums and crystal-clear vocals. Demonstrates expertise in making vocals cut through dense instrumental arrangements.',
    highlights: ['Vocal clarity and presence', 'Punchy drum processing', 'Dynamic range control'],
    link: '/portfolio/street-symphony',
    streamingLinks: {
      appleMusic: 'https://music.apple.com/us/album/street-symphony',
      spotify: 'https://open.spotify.com/album/streetsymphony'
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