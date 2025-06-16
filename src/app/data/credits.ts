interface CreditItem {
  project: string;
  artist: string;
  role: string;
  year: string;
  label: string;
  image: string;
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

const credits: CreditItem[] = [
  {
    project: 'Big Dawgs',
    artist: 'Hanumankind x Kalmi',
    role: 'Assistant Engineer',
    year: '2024',
    label: 'Capital Records',
    image: formatImagePath('/assets/images/works/28.jpg'),
    streamingLinks: {
      appleMusic: 'https://music.apple.com/in/album/big-dawgs-single/1754946756',
      spotify: 'https://open.spotify.com/track/0OA00aPt3BV10qeMIs3meW'
    }
  },
  {
    project: 'Chehre',
    artist: 'Karun',
    role: 'Assistant Engineer', 
    year: '2025',
    label: 'Karun',
    image: formatImagePath('public/assets/images/works/47.jpg'),
    streamingLinks: {
      appleMusic: 'https://music.apple.com/in/album/chehre/1814830773',
      spotify: 'https://open.spotify.com/album/4BGBilCN63p0cNjkTn6Fxa?si=EsgBKKXkRNCwkFVLVv2TkA'
    }
  },
  {
    project: 'Mere Jaan Pehle Naach',
    artist: 'Yashraj',
    role: 'Assistant Engineer',
    year: '2024',
    label: 'Yashraj',
    image: formatImagePath('public/assets/images/works/29.jpg'),
    streamingLinks: {
      appleMusic: 'https://music.apple.com/in/album/meri-jaan-pehle-naach/1755519457',
      spotify: 'https://open.spotify.com/album/0EjqvUumscGjg4Y12yalkV?si=5pYfLdvUQ5aUcPtQHnrh4Q'
    }
  },
  {
    project: 'Torrie Wilson',
    artist: 'Paal Dabba x Sez on the beat',
    role: 'Assistant Engineer',
    year: '2024',
    label: 'RED BULL',
    image: formatImagePath('public/assets/images/works/39.jpg'),
    streamingLinks: {
      appleMusic: 'https://music.apple.com/in/album/torrie-wilson-red-bull-64-bars/1769602691?i=1769602696',
      spotify: 'https://open.spotify.com/track/7oPg72plmyflBLvGmahUrW?si=8f555a87b64546ba'
    }
  }
];

export const getCredits = () => credits;
export const getFeaturedCredits = (count?: number) => {
  if (count) {
    return credits.slice(0, count);
  }
  return credits;
};