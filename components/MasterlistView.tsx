
import React, { useRef } from 'react';
import { Project } from '../types';
import ProjectTable from './ProjectTable';
import { parseCSVToProjects, projectsToCSV } from '../utils/csvParser';

interface MasterlistViewProps {
  projects: Project[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddNew: () => void;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onViewHistory: (project: Project) => void;
  onBulkUpload: (projects: Omit<Project, 'id' | 'statusHistory'>[]) => void;
  onResetData?: () => void;
}

const MasterlistView: React.FC<MasterlistViewProps> = ({
  projects,
  searchTerm,
  setSearchTerm,
  onAddNew,
  onEdit,
  onDelete,
  onViewHistory,
  onBulkUpload,
  onResetData
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleExportClick = () => {
    if (projects.length === 0) {
        alert('No projects to export.');
        return;
    }
    const csvString = projectsToCSV(projects);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `hfep_projects_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const text = e.target?.result as string;
            const newProjects = parseCSVToProjects(text);
            onBulkUpload(newProjects);
        } catch (error: any) {
            console.error("Error parsing CSV:", error);
            alert(`Failed to parse CSV file. Please check the console for details.\n\nError: ${error.message}`);
        }
    };
    reader.onerror = () => {
        alert('Error reading file.');
    };
    reader.readAsText(file);

    // Reset file input to allow re-uploading the same file
    if (event.target) {
        event.target.value = '';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 masterlist-view">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-xl font-bold text-gray-700">Project Masterlist</h2>
        <div className="w-full sm:w-auto flex items-center gap-2 flex-wrap justify-end">
          <input
            type="text"
            placeholder="Maghanap ng proyekto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept=".csv" />
           
           <button
            onClick={handleExportClick}
            className="flex-shrink-0 bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors shadow-sm flex items-center gap-2"
            title="Export projects to CSV"
          >
            <DownloadIcon />
            Export CSV
          </button>

           <button
            onClick={handleUploadClick}
            className="flex-shrink-0 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2"
            title="Upload a CSV file"
          >
            <UploadIcon />
            Bulk Upload
          </button>
          <button
            onClick={onAddNew}
            className="flex-shrink-0 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <PlusIcon />
            Magdagdag
          </button>
          {onResetData && (
            <button
                onClick={onResetData}
                className="flex-shrink-0 bg-gray-200 text-gray-600 font-bold py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors shadow-sm text-sm"
                title="Reset data to defaults"
            >
                Reset
            </button>
          )}
        </div>
      </div>
      <ProjectTable projects={projects} onEdit={onEdit} onDelete={onDelete} onViewHistory={onViewHistory} />
    </div>
  );
};

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM8 11a1 1 0 011 1v.586l2.293-2.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586V12a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

export default MasterlistView;
