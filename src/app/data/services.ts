import { ReactNode } from 'react';
import { FaMusic, FaHeadphones, FaCode, FaLaptopCode, FaTools } from 'react-icons/fa';
import { IconType } from 'react-icons';

type ServiceIcon = IconType;

interface Service {
  id: string;
  icon: ServiceIcon;
  title: string;
  description: string;
  features: string[];
  deliveryTime: string;
  isFeatured?: boolean;
}

const services: Service[] = [
  {
    id: 'mixing',
    icon: FaHeadphones,
    title: 'Mixing',
    description: 'Professional mixing services to enhance your tracks with clarity and depth.',
    features: [
      'Stem mixing',
      'EQ and compression',
      'Effects processing',
      'Two revision rounds'
    ],
    deliveryTime: '3-5 days',
    isFeatured: true
  },
  {
    id: 'mastering',
    icon: FaMusic,
    title: 'Mastering',
    description: 'Industry-standard mastering to make your music shine on all platforms.',
    features: [
      'Loudness optimization',
      'Stereo enhancement',
      'Format-specific masters',
      'Quality assurance'
    ],
    deliveryTime: '2-3 days'
  },
  {
    id: 'production',
    icon: FaCode,
    title: 'Production',
    description: 'Full-service music production from concept to final master.',
    features: [
      'Arrangement',
      'Sound design',
      'Mixing',
      'Mastering'
    ],
    deliveryTime: '7-14 days',
    isFeatured: true
  },
  {
    id: 'development',
    icon: FaLaptopCode,
    title: 'Development',
    description: 'Custom audio software and plugin development solutions.',
    features: [
      'Plugin development',
      'Web audio apps',
      'DSP solutions',
      'Technical support'
    ],
    deliveryTime: 'Project-based'
  },
  {
    id: 'consulting',
    icon: FaTools,
    title: 'Consulting',
    description: 'Expert guidance for your audio projects and technical needs.',
    features: [
      'Workflow optimization',
      'Technical planning',
      'Project review',
      'Best practices'
    ],
    deliveryTime: 'Flexible'
  }
];

export const getServices = () => services;
export const getFeaturedServices = () => services.filter(service => service.isFeatured);
export const getServiceById = (id: string) => services.find(service => service.id === id);
