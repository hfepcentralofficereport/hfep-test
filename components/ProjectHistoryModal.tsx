
import React from 'react';
import { Project } from '../types';
import StatusBadge from './StatusBadge';

interface ProjectHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'long', day: 'numeric', 
        hour: 'numeric', minute: '2-digit', hour12: true 
    });
}

const InfoField: React.FC<{ label: string; value: string | number | undefined }> = ({ label, value }) => (
    <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-sm text-gray-800">{value || 'N/A'}</p>
    </div>
);

const ProjectHistoryModal: React.FC<ProjectHistoryModalProps> = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  const sortedHistory = project.statusHistory ? [...project.statusHistory].reverse() : [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Status Movement for:</h2>
          <p className="text-lg text-blue-600 font-semibold">{project.Simple_ProjDesc}</p>
        </div>
        
        <div className="p-6 overflow-y-auto">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                 <h3 className="text-md font-semibold text-gray-700 mb-3">Project Summary</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoField label="Facility Name" value={project.Facility_Name} />
                    <InfoField label="Location" value={`${project.City_or_Municipality}, ${project.Province_Name}`} />
                    <InfoField label="GAA Code" value={project.gaaCode} />
                    <InfoField label="Project Type" value={project.Project_Type} />
                 </div>
            </div>

          <h3 className="text-md font-semibold text-gray-700 mb-4">Status Timeline</h3>
          {sortedHistory.length > 0 ? (
             <div className="relative pl-6">
                {/* Vertical line */}
                <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-200" style={{ transform: 'translateX(7px)' }}></div>

                <ul className="space-y-6">
                {sortedHistory.map((entry, index) => (
                    <li key={index} className="relative">
                        <div className="absolute left-0 top-1.5 h-4 w-4 bg-white border-2 border-blue-500 rounded-full"></div>
                        <div className="ml-2">
                           <StatusBadge status={entry.status} />
                           <p className="text-xs text-gray-500 mt-1.5">{formatDate(entry.date)}</p>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No status history available for this project.</p>
          )}
        </div>
        
        <div className="bg-gray-50 px-6 py-4 flex justify-end mt-auto border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectHistoryModal;
