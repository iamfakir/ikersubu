export interface PortfolioItem {
  id: number;
  name: string;
  role: string;
  type: 'assisted' | 'mixed' | 'production' | 'recording';
  year: number;
  genre: string;
  client: string;
  description: string;
  techniques: string[];
  imageUrl: string;
  isFeatured?: boolean;
  order?: number; // Optional order property for custom sorting
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 101,
    name: "Manadhil",
    role: "Mix & Master",
    type: "mixed",
    year: 2025,
    genre: "R&B/Soul",
    client: "JBE",
    description: "Silky smooth track featuring lush vocal harmonies and crisp percussion. This mix showcases the perfect balance between modern production and classic warmth.",
    techniques: [
      "Vocal layering and harmonies",
      "Punchy Low-end processing",
      "Spatial reverb design"
    ],
    imageUrl: "/assets/images/Mixes/mndhl.jpg",
    isFeatured: true,
    order: 0
  },
  {
    id: 102,
    name: "Pesaadhe",
    role: "Mix & Master",
    type: "mixed",
    year: 2025,
    genre: "R&B/Dance",
    client: "JBE",
    description: "Soulful electronic dance Song blending Haitian rhythms with house music, A groundbreaking fusion of styles.",
    techniques: [
      "Vocal clarity and presence",
      "Punchy drum processing",
      "Dynamic range control"
    ],
    imageUrl: "/assets/images/Mixes/pesadhe.jpg",
    isFeatured: true,
    order: 1
  },
  {
    id: 1,
    name: "Bombay Dreams",
    role: "Assistant Mix",
    type: "assisted",
    year: 2024,
    genre: "HIP HOP",
    client: "MC ALTAF",
    description: "A vibrant electronic track featuring lush synths and dynamic percussion. Mixed for clarity and impact, with special attention to the low-end and vocal presence.",
    techniques: [
      "Parallel compression on drums",
      "Mid-side EQ for width",
      "Vocal doubling and effects"
    ],
    imageUrl: "/assets/images/works/34.jpg",
    isFeatured: true,
    order: 1
  },
  {
    id: 2,
    name: "Urban Pulse",
    role: "Full Mix",
    type: "assisted",
    year: 2024,
    genre: "Hip-Hop/Trap",
    client: "Independent Artist",
    description: "Modern trap production with heavy 808s and atmospheric melodies. Focus on maintaining punch while preserving the spacious mix environment.",
    techniques: [
      "808 processing",
      "Vocal chain optimization",
      "Spatial processing"
    ],
    imageUrl: "/assets/images/works/56.jpg",
    isFeatured: true,
    order: 2
  },
  {
    id: 3,
    name: "Neon Nights",
    role: "Production & Mix",
    type: "assisted",
    year: 2024,
    genre: "Electronic/Pop",
    client: "Rising Star Records",
    description: "Energetic electronic pop production with emphasis on modern sound design and vocal processing.",
    techniques: [
      "Sound design",
      "Vocal production",
      "Dynamic processing"
    ],
    imageUrl: "/assets/images/works/optimized/55.webp",
    isFeatured: true,
    order: 3
  },
  {
    id: 4,
    name: "Ethereal Dreams",
    role: "Mix Engineer",
    type: "assisted",
    year: 2023,
    genre: "Ambient",
    client: "Studio Sessions",
    description: "Atmospheric ambient production with layered textures and evolving soundscapes.",
    techniques: [
      "Reverb design",
      "Spatial processing",
      "Texture layering"
    ],
    imageUrl: "/assets/images/works/optimized/54.webp",
    isFeatured: true,
    order: 4
  },
  {
    id: 5,
    name: "Street Symphony",
    role: "Mix & Master",
    type: "assisted",
    year: 2023,
    genre: "Hip-Hop",
    client: "Underground Collective",
    description: "Raw and authentic hip-hop production focusing on hard-hitting drums and clear vocal delivery.",
    techniques: [
      "Drum processing",
      "Vocal clarity",
      "Mix balance"
    ],
    imageUrl: "/assets/images/works/optimized/53.webp",
    order: 5
  },
  {
    id: 6,
    name: "Digital Horizon",
    role: "Production",
    type: "assisted",
    year: 2023,
    genre: "Electronic",
    client: "Future Bass Records",
    description: "Forward-thinking electronic production with innovative sound design and arrangement.",
    techniques: [
      "Sound design",
      "Arrangement",
      "Mix balance"
    ],
    imageUrl: "/assets/images/works/optimized/51.webp",
    order: 6
  },
  {
    id: 7,
    name: "Soul Sessions",
    role: "Recording & Mix",
    type: "assisted",
    year: 2023,
    genre: "R&B/Soul",
    client: "Groove Productions",
    description: "Warm and organic R&B production with live instruments and soulful vocals.",
    techniques: [
      "Live recording",
      "Analog processing",
      "Vocal production"
    ],
    imageUrl: "/assets/images/works/optimized/50.webp",
    order: 7
  },
  {
    id: 8,
    name: "Metro Beats",
    role: "Mix Engineer",
    type: "assisted",
    year: 2023,
    genre: "Urban",
    client: "City Sounds",
    description: "Contemporary urban production with modern processing and arrangement techniques.",
    techniques: [
      "Modern processing",
      "Beat programming",
      "Vocal production"
    ],
    imageUrl: "/assets/images/works/optimized/49.webp",
    order: 8
  },
  {
    id: 9,
    name: "Acoustic Dreams",
    role: "Recording & Mix",
    type: "assisted",
    year: 2023,
    genre: "Folk/Acoustic",
    client: "Indie Label",
    description: "Intimate acoustic recordings with focus on natural sound and dynamics.",
    techniques: [
      "Acoustic recording",
      "Natural processing",
      "Dynamic control"
    ],
    imageUrl: "/assets/images/works/optimized/48.webp",
    order: 9
  },
  {
    id: 10,
    name: "Electric Pulse",
    role: "Production & Mix",
    type: "assisted",
    year: 2023,
    genre: "Electronic",
    client: "EDM Collective",
    description: "High-energy electronic production with modern sound design and arrangement.",
    techniques: [
      "Sound design",
      "Mix engineering",
      "Mastering"
    ],
    imageUrl: "/assets/images/works/optimized/47.webp",
    order: 10
  },
  {
    id: 11,
    name: "Jazz Fusion",
    role: "Recording Engineer",
    type: "assisted",
    year: 2023,
    genre: "Jazz/Fusion",
    client: "Jazz Ensemble",
    description: "Live jazz fusion recording with focus on capturing natural dynamics and interaction.",
    techniques: [
      "Live recording",
      "Room mic techniques",
      "Natural processing"
    ],
    imageUrl: "/assets/images/works/optimized/46.webp",
    order: 11
  },
  {
    id: 12,
    name: "Bass Culture",
    role: "Mix & Master",
    type: "assisted",
    year: 2023,
    genre: "Bass Music",
    client: "Bass Nation",
    description: "Heavy bass music production with focus on low-end control and impact.",
    techniques: [
      "Bass processing",
      "Sound design",
      "Mastering"
    ],
    imageUrl: "/assets/images/works/optimized/45.webp",
    order: 12
  },
  {
    id: 13,
    name: "Vocal Sessions",
    role: "Vocal Producer",
    type: "assisted",
    year: 2023,
    genre: "Pop",
    client: "Pop Artist",
    description: "Professional vocal production with modern processing and arrangement.",
    techniques: [
      "Vocal tuning",
      "Effect processing",
      "Arrangement"
    ],
    imageUrl: "/assets/images/works/optimized/44.webp",
    order: 13
  },
  {
    id: 14,
    name: "Rock Revival",
    role: "Recording & Mix",
    type: "assisted",
    year: 2023,
    genre: "Rock",
    client: "Rock Band",
    description: "Full band recording with focus on energy and natural sound.",
    techniques: [
      "Live recording",
      "Guitar processing",
      "Drum mixing"
    ],
    imageUrl: "/assets/images/works/optimized/43.webp",
    order: 14
  },
  {
    id: 15,
    name: "Synthwave Dreams",
    role: "Production",
    type: "assisted",
    year: 2023,
    genre: "Synthwave",
    client: "Retro Records",
    description: "Retro-inspired synthwave production with modern production techniques.",
    techniques: [
      "Synth programming",
      "Retro processing",
      "Mix engineering"
    ],
    imageUrl: "/assets/images/works/optimized/42.webp",
    order: 15
  },
  {
    id: 16,
    name: "Urban Tales",
    role: "Mix Engineer",
    type: "assisted",
    year: 2023,
    genre: "Hip-Hop",
    client: "Street Records",
    description: "Contemporary hip-hop production with focus on clarity and impact.",
    techniques: [
      "Vocal processing",
      "Beat mixing",
      "Mastering"
    ],
    imageUrl: "/assets/images/works/optimized/40.webp",
    order: 16
  },
  {
    id: 17,
    name: "Electronic Journey",
    role: "Producer",
    type: "assisted",
    year: 2023,
    genre: "Electronic",
    client: "EDM Artist",
    description: "Progressive electronic production with innovative sound design.",
    techniques: [
      "Sound design",
      "Arrangement",
      "Mix engineering"
    ],
    imageUrl: "/assets/images/works/optimized/39.webp",
    order: 17
  },
  {
    id: 18,
    name: "Soul Kitchen",
    role: "Recording & Mix",
    type: "assisted",
    year: 2023,
    genre: "Soul/R&B",
    client: "Soul Label",
    description: "Classic soul production with modern recording techniques.",
    techniques: [
      "Live recording",
      "Analog processing",
      "Mix engineering"
    ],
    imageUrl: "/assets/images/works/optimized/38.webp",
    order: 18
  },
  {
    id: 19,
    name: "Future Bass",
    role: "Producer & Mix",
    type: "assisted",
    year: 2023,
    genre: "Electronic",
    client: "Bass Music",
    description: "Modern bass music production with cutting-edge sound design.",
    techniques: [
      "Sound design",
      "Bass processing",
      "Mix engineering"
    ],
    imageUrl: "/assets/images/works/optimized/37.webp",
    order: 19
  },
  {
    id: 20,
    name: "Indie Rock",
    role: "Recording Engineer",
    type: "assisted",
    year: 2023,
    genre: "Rock",
    client: "Indie Band",
    description: "Full band recording with focus on capturing live energy.",
    techniques: [
      "Live recording",
      "Room mic placement",
      "Mix engineering"
    ],
    imageUrl: "/assets/images/works/optimized/36.webp",
    order: 20
  },
  {
    id: 21,
    name: "Vintage Vibes",
    role: "Mix & Master",
    type: "assisted",
    year: 2023,
    genre: "Lo-Fi/Hip-Hop",
    client: "Retro Beats",
    description: "Lo-fi hip-hop production with vintage sampling and analog processing techniques.",
    techniques: [
      "Vinyl sampling",
      "Analog processing",
      "Tape saturation"
    ],
    imageUrl: "/assets/images/works/optimized/35.webp",
    order: 21
  },
  {
    id: 22,
    name: "Classical Fusion",
    role: "Recording Engineer",
    type: "assisted",
    year: 2023,
    genre: "Classical/Electronic",
    client: "Symphony X",
    description: "Innovative fusion of classical orchestra with electronic elements.",
    techniques: [
      "Orchestra recording",
      "Electronic integration",
      "Spatial mixing"
    ],
    imageUrl: "/assets/images/works/optimized/32.webp",
    order: 22
  },
  {
    id: 23,
    name: "Urban Chronicles",
    role: "Producer & Mix",
    type: "assisted",
    year: 2023,
    genre: "Hip-Hop",
    client: "Street Culture",
    description: "Street-inspired hip-hop production with authentic urban sound.",
    techniques: [
      "Sample chopping",
      "Beat programming",
      "Mix engineering"
    ],
    imageUrl: "/assets/images/works/optimized/29.webp",
    order: 23
  },
  {
    id: 24,
    name: "Jazz Collective",
    role: "Recording & Mix",
    type: "assisted",
    year: 2023,
    genre: "Jazz",
    client: "Blue Note",
    description: "Live jazz ensemble recording with focus on room acoustics and natural dynamics.",
    techniques: [
      "Room miking",
      "Natural dynamics",
      "Analog warmth"
    ],
    imageUrl: "/assets/images/works/optimized/28.webp",
    order: 24
  },
  {
    id: 25,
    name: "Electronic Horizons",
    role: "Production",
    type: "assisted",
    year: 2023,
    genre: "Electronic",
    client: "Future Sound",
    description: "Experimental electronic music with innovative sound design.",
    techniques: [
      "Sound design",
      "Modular synthesis",
      "Digital processing"
    ],
    imageUrl: "/assets/images/works/optimized/26.webp",
    order: 25
  },
  {
    id: 26,
    name: "Soul Collective",
    role: "Mix Engineer",
    type: "assisted",
    year: 2023,
    genre: "Soul/R&B",
    client: "Groove Records",
    description: "Modern soul production with vintage flavor and contemporary processing.",
    techniques: [
      "Vocal production",
      "Analog processing",
      "Mix engineering"
    ],
    imageUrl: "/assets/images/works/optimized/24.webp",
    order: 26
  },
  {
    id: 27,
    name: "Hip-Hop Elements",
    role: "Producer",
    type: "assisted",
    year: 2023,
    genre: "Hip-Hop",
    client: "Urban Records",
    description: "Classic hip-hop production with modern twist and authentic sound.",
    techniques: [
      "Beat making",
      "Sample processing",
      "Mix engineering"
    ],
    imageUrl: "/assets/images/works/optimized/23.webp",
    order: 27
  },
  {
    id: 28,
    name: "Electronic Dreams",
    role: "Production & Mix",
    type: "assisted",
    year: 2023,
    genre: "Electronic",
    client: "Dream Factory",
    description: "Atmospheric electronic production with immersive soundscapes.",
    techniques: [
      "Sound design",
      "Spatial processing",
      "Mix engineering"
    ],
    imageUrl: "/assets/images/works/optimized/22.webp",
    order: 28
  },
  {
    id: 29,
    name: "Urban Beats",
    role: "Mix & Master",
    type: "assisted",
    year: 2023,
    genre: "Urban",
    client: "City Records",
    description: "Contemporary urban production with cutting-edge sound.",
    techniques: [
      "Beat programming",
      "Vocal production",
      "Mix engineering"
    ],
    imageUrl: "/assets/images/works/optimized/21.webp",
    order: 29
  },
  {
    id: 30,
    name: "Future Sound",
    role: "Producer",
    type: "assisted",
    year: 2023,
    genre: "Electronic",
    client: "Next Level",
    description: "Forward-thinking electronic production with innovative techniques.",
    techniques: [
      "Sound design",
      "Digital processing",
      "Mix engineering"
    ],
    imageUrl: "/assets/images/works/optimized/20.webp",
    order: 30
  },
  {
    id: 31,
    name: "Acoustic Sessions",
    role: "Recording Engineer",
    type: "assisted",
    year: 2023,
    genre: "Acoustic",
    client: "Indie Artist",
    description: "Intimate acoustic recordings with natural sound and dynamics.",
    techniques: [
      "Acoustic recording",
      "Natural processing",
      "Mix engineering"
    ],
    imageUrl: "/assets/images/works/optimized/15.webp",
    order: 31
  },
  {
    id: 32,
    name: "Electronic Fusion",
    role: "Producer & Mix",
    type: "assisted",
    year: 2023,
    genre: "Electronic/Fusion",
    client: "Fusion Labs",
    description: "Innovative fusion of electronic and acoustic elements.",
    techniques: [
      "Sound design",
      "Hybrid processing",
      "Mix engineering"
    ],
    imageUrl: "/assets/images/works/optimized/12.webp",
    order: 32
  },
  {
    id: 33,
    name: "Urban Soul",
    role: "Mix Engineer",
    type: "assisted",
    year: 2023,
    genre: "Urban/Soul",
    client: "Soul Factory",
    description: "Modern urban soul production with authentic feel.",
    techniques: [
      "Vocal production",
      "Beat programming",
      "Mix engineering"
    ],
    imageUrl: "/assets/images/works/optimized/11.webp",
    order: 33
  }
];

// Get all portfolio items
export const getPortfolioItems = () => portfolioItems;

// Get portfolio items by type
export const getPortfolioItemsByType = (type: PortfolioItem['type']) => {
  return portfolioItems.filter(item => item.type === type);
};

// Get featured portfolio items
export const getFeaturedPortfolioItems = () => {
  return portfolioItems.filter(item => item.isFeatured);
};

// Get portfolio items with custom ordering
export const getPortfolioItemsWithOrder = (customOrder?: Record<number, number>) => {
  if (!customOrder) {
    // If no custom order is provided, use the default order property
    return [...portfolioItems].sort((a, b) => {
      const orderA = a.order || Number.MAX_SAFE_INTEGER;
      const orderB = b.order || Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });
  }
  
  // Apply custom ordering
  return [...portfolioItems].sort((a, b) => {
    const orderA = customOrder[a.id] || a.order || Number.MAX_SAFE_INTEGER;
    const orderB = customOrder[b.id] || b.order || Number.MAX_SAFE_INTEGER;
    return orderA - orderB;
  });
};