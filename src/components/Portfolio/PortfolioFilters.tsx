'use client';

import { FiFilter } from 'react-icons/fi';

type ProjectType = 'all' | 'mixing' | 'mastering' | 'production' | 'recording';

interface PortfolioFiltersProps {
  activeFilter: ProjectType;
  onFilterChange: (filter: ProjectType) => void;
  projectCounts: Record<ProjectType, number>;
}

const filterOptions: { id: ProjectType; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'mixing', label: 'Mixing' },
  { id: 'mastering', label: 'Mastering' },
  { id: 'production', label: 'Production' },
  { id: 'recording', label: 'Recording' },
];

export default function PortfolioFilters({
  activeFilter,
  onFilterChange,
  projectCounts,
}: PortfolioFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div className="flex items-center gap-2 text-gray-300">
        <FiFilter className="text-cyan-400" />
        <span className="text-sm font-medium">Filter by:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {filter.label}
            <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs bg-black/20">
              {projectCounts[filter.id]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
