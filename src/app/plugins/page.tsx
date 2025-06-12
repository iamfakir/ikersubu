import { Metadata } from 'next';
import PluginsClient from './PluginsClient';

export const metadata: Metadata = {
  title: 'Plugins | IKER SUBU',
  description: 'Explore our collection of professional audio plugins for music production.',
};

const plugins = [
  {
    id: 'airfry',
    title: 'Airfry Audio Demo',
    description: 'Try the Airfry audio effect demo. Adjust presence and wet mix, then play the audio!',
    category: 'Web Demo',
    image: '/assets/images/Plugin/airfry/thumbnail.png', // Place your image here
    url: '/plugins/airfry',
    comingSoon: false,
    features: [
      'Presence and wet mix controls',
      'Interactive audio demo',
      'Modern UI',
      'SVG play/pause icons'
    ]
  },
  {
    id: 'dripper-web',
    title: 'Dripper Web - Interactive Demo',
    description: 'Try our saturation processor directly in your browser with real-time audio processing.',
    category: 'Web Demo',
    image: '/assets/images/Plugin/dripper/Silver.png',
    url: '/plugins/dripper-web',
    comingSoon: false,
    features: [
      'Real-time audio processing',
      'Interactive knob control',
      'Even/Odd harmonics modes',
      'Download processed audio',
      'No installation required'
    ]
  },
  {
    id: 'dripper-silver',
    title: 'Dripper - Silver Edition',
    description: 'A versatile audio effect plugin that adds warmth and character to your tracks.',
    category: 'Effect',
    image: '/assets/images/Plugin/dripper/Silver.png',
    url: '/plugins/dripper',
    comingSoon: false,
    features: [
      'Warm analog-style saturation',
      'Intuitive controls',
      'Low CPU usage',
      'Preset library'
    ]
  },
  {
    id: 'dripper-gold',
    title: 'Dripper - Gold Edition',
    description: 'Enhanced version with additional features and more character options.',
    category: 'Effect',
    image: '/assets/images/Plugin/dripper/Gold.png',
    url: '/plugins/dripper',
    comingSoon: false,
    features: [
      'All Silver Edition features',
      'Enhanced analog character',
      'Intelligent Mid/Side control',
      'Advanced harmonic enhancement'
    ]
  },
  {
    id: 'dripper-platinum',
    title: 'Dripper - Platinum Edition (Tripper Mode)',
    description: 'Smooth odd harmonics exciter in platinum tripper mode.',
    category: 'Effect',
    image: '/assets/images/Plugin/dripper/Platinum.png',
    url: '/plugins/dripper',
    comingSoon: false,
    features: [
      'Smooth odd harmonics exciter in tripper mode',
      'All Gold Edition features',
      'Blackbox HG Character Drive',
      'AI-powered tone matching',
      'Priority support & updates'
    ]
  },
];

export default function PluginsPage() {
  return <PluginsClient plugins={plugins} />;
}
