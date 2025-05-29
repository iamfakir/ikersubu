import { Metadata } from 'next';
import PluginsClient from './PluginsClient';

export const metadata: Metadata = {
  title: 'Plugins | IKER SUBU',
  description: 'Explore our collection of professional audio plugins for music production.',
};

const plugins = [
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
