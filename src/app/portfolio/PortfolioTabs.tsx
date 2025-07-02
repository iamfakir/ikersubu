'use client';

import { useState } from 'react';
import CardCarousel from '../../components/CardCarousel/CardCarousel';

export default function PortfolioTabs() {
  const [activeTab, setActiveTab] = useState('assistedMixes');

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      {/* Removed the duplicate navigation buttons */}

      {/* Card Carousel */}
      <CardCarousel />
    </div>
  );
}