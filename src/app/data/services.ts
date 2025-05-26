import { FaCompactDisc, FaHeadphones, FaCode, FaLaptopCode, FaTools } from 'react-icons/fa';
import { ReactNode } from 'react';

/**
 * Type definition for service icons
 * Can be either a ReactNode (JSX element) or a specific string identifier
 */
type ServiceIcon = ReactNode;

/**
 * Interface defining the structure of a service item
 * @property {ServiceIcon} icon - Visual representation of the service
 * @property {string} title - Name of the service
 * @property {string} shortDescription - Brief summary for listings
 * @property {string | ReactNode} description - Detailed service description
 * @property {string[]} includes - List of included features
 * @property {string} delivery - Expected turnaround time (e.g. "1-2 business days")
 * @property {boolean} [featured] - Optional flag for featured services
 * @property {boolean} [popular] - Optional flag for popular services
 */
export interface ServiceItem {
  icon: ServiceIcon;
  title: string;
  shortDescription: string;
  description: string | ReactNode;
  includes: string[];
  delivery: string;
  featured?: boolean;
  popular?: boolean;
}

export const services: ServiceItem[] = [
  {
    icon: <FaHeadphones className="w-8 h-8 text-indigo-600" aria-label="Mixing service" />,
    title: 'Mixing',
    shortDescription: 'Professional mixing services to bring clarity, depth, and balance to your tracks.',
    description: (
      <div className="space-y-4">
        <p>Transform your raw recordings into polished, radio-ready tracks with professional mixing services.</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Balancing levels and panning</li>
          <li>Precision EQ and compression</li>
          <li>Creative effects processing</li>
          <li>Stereo imaging and spatial enhancement</li>
        </ul>
        <p>I focus on bringing your musical vision to life with a professional, radio-ready sound.</p>
      </div>
    ),
    delivery: '3-5 business days',
    includes: [
      'Stem mixing',
      '2 rounds of revisions',
      'High-quality WAV file',
      'MP3 reference'
    ],
    popular: true
  },
  {
    icon: <FaCompactDisc className="w-8 h-8 text-indigo-600" aria-label="Mastering service" />,
    title: 'Mastering',
    shortDescription: 'Final polish and loudness optimization to make your music sound professional on all platforms.',
    description: (
      <div className="space-y-4">
        <p>Professional mastering ensures your music sounds its best across all playback systems and streaming platforms. My mastering service includes:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Loudness optimization for streaming platforms (-14 LUFS)</li>
          <li>Stereo enhancement and width control</li>
          <li>EQ balancing for translation across all systems</li>
          <li>Harmonic excitement and stereo imaging</li>
          <li>Format-specific optimization for CD, streaming, and vinyl</li>
        </ul>
        <p>I provide multiple format options and a detailed report of the processing applied.</p>
      </div>
    ),
    delivery: '1-2 business days',
    includes: ['Loudness optimized master', 'Format-specific versions', 'ISRC code assignment', 'Cover art optimization']
  },
  {
    icon: <FaHeadphones className="w-8 h-8 text-indigo-600" aria-label="Audio Production service" />,
    title: 'Audio Production',
    shortDescription: 'Full-service audio production from concept to final master.',
    description: (
      <div className="space-y-4">
        <p>Comprehensive audio production service that takes your project from initial concept to final master. Includes:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Custom composition and arrangement</li>
          <li>Professional sound design</li>
          <li>High-quality virtual instruments and samples</li>
          <li>Live instrument recording (guitar, bass, vocals, etc.)</li>
          <li>Full mixing and mastering</li>
        </ul>
        <p>I work closely with you to bring your musical vision to life with a professional, radio-ready sound.</p>
      </div>
    ),
    delivery: '7-14 business days',
    includes: ['Custom composition', 'Sound design', 'Mixing', 'Mastering', 'Unlimited revisions'],
    popular: true
  },
  {
    icon: <FaCode className="w-8 h-8 text-indigo-600" aria-label="Audio Programming service" />,
    title: 'Audio Programming',
    shortDescription: 'Custom audio plugins and DSP development for unique sound processing.',
    description: (
      <div className="space-y-4">
        <p>Custom audio plugin development and digital signal processing solutions tailored to your needs:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Custom VST/AU/AAX plugin development</li>
          <li>DSP algorithm implementation</li>
          <li>Audio plugin UI/UX design</li>
          <li>Legacy plugin updates and maintenance</li>
          <li>Cross-platform compatibility</li>
        </ul>
        <p>I can help you create unique audio tools that stand out in the market.</p>
      </div>
    ),
    delivery: 'Varies by project',
    includes: ['Custom development', 'Testing', 'Documentation', 'Support']
  },
  {
    icon: <FaLaptopCode className="w-8 h-8 text-indigo-600" aria-label="Web Audio Development service" />,
    title: 'Web Audio Development',
    shortDescription: 'Interactive audio experiences for the web using Web Audio API.',
    description: (
      <div className="space-y-4">
        <p>Create immersive audio experiences on the web with custom Web Audio API development:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Interactive audio applications</li>
          <li>Web-based audio editors</li>
          <li>Real-time audio processing</li>
          <li>Audio visualization</li>
          <li>Cross-browser compatibility</li>
        </ul>
        <p>I can help you build engaging audio experiences that work seamlessly across all modern browsers.</p>
      </div>
    ),
    delivery: 'Varies by project',
    includes: ['Web development', 'Audio integration', 'Testing', 'Deployment']
  },
  {
    icon: <FaTools className="w-8 h-8 text-indigo-600" aria-label="Custom Solutions service" />,
    title: 'Custom Solutions',
    shortDescription: 'Tailored audio solutions for specialized needs and workflows.',
    description: (
      <div className="space-y-4">
        <p>Custom audio solutions tailored to your specific needs and workflow:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Workflow automation</li>
          <li>Custom audio tools and utilities</li>
          <li>Scripting and macro creation</li>
          <li>Integration between different audio software</li>
          <li>Technical consultation and support</li>
        </ul>
        <p>Let me help you streamline your workflow and solve your unique audio challenges.</p>
      </div>
    ),
    delivery: 'Varies by project',
    includes: ['Custom development', 'Integration', 'Documentation', 'Support']
  }
];

export const serviceTitles = services.map(service => service.title);
