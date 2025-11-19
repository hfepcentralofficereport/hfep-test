
import React from 'react';
import { ProjectStatus } from '../types';
import { getStatusCategory } from '../utils';

interface StatusBadgeProps {
  status: ProjectStatus;
}

const statusCategoryColorMap: Record<string, string> = {
  'Planning & Procurement': 'bg-blue-100 text-blue-800',
  'Implementation': 'bg-yellow-100 text-yellow-800',
  'Completed': 'bg-green-100 text-green-800',
  'Issues & Revisions': 'bg-red-100 text-red-800',
};


const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const category = getStatusCategory(status);
  const colorClass = statusCategoryColorMap[category] || 'bg-gray-200 text-gray-800';

  return (
    <span
      className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;