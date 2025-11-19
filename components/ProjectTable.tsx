
import React from 'react';
import { Project } from '../types';
import StatusBadge from './StatusBadge';
import { formatCurrency } from '../utils';

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onViewHistory: (project: Project) => void;
}

const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric'});
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onEdit, onDelete, onViewHistory }) => {
  if (projects.length === 0) {
    return <div className="text-center py-10 text-gray-500">Walang proyektong natagpuan.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Description</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appropriation</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Phys. Accomp. (%)</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
            <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => {
            const totalAppropriation = (project.Appro_Infra || 0) + (project.Appro_Med_Equip || 0) + (project.Appro_Motor_Vehicle || 0);
            return (
              <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">{project.Simple_ProjDesc}</div>
                  <div className="text-xs text-gray-500">{project.Facility_Name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{project.City_or_Municipality}</div>
                  <div className="text-xs text-gray-500">{project.Province_Name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 font-mono">{formatCurrency(totalAppropriation)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800 font-medium">{project.Phys_Accomp_Rate}%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={project.Actual_Status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {formatDate(project.Target_Start)} - {formatDate(project.Target_End)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => onViewHistory(project)} title="View History" className="text-gray-500 hover:text-blue-600 mr-3 p-1 rounded-full transition-colors">
                      <EyeIcon />
                  </button>
                  <button onClick={() => onEdit(project)} className="text-indigo-600 hover:text-indigo-900 mr-3 font-semibold">Update</button>
                  <button onClick={() => onDelete(project.id)} className="text-red-600 hover:text-red-900 font-semibold">Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="http://www.w3.org/2020/svg" fill="currentColor">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
    </svg>
);


export default ProjectTable;