import React, { useState, useEffect, useMemo } from 'react';
import { Project } from '../types';
import DashboardMetrics from './DashboardMetrics';
import ProjectStatusChart from './ProjectStatusChart';
import FinancialStatusTable from './FinancialStatusTable';
import PhysicalStatusTable from './PhysicalStatusTable';
import SignatoriesModal, { Signatories } from './SignatoriesModal';
import PrintableSignatories from './PrintableSignatories';

interface DashboardViewProps {
  projects: Project[];
}

const PrintIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
    </svg>
);

const DashboardView: React.FC<DashboardViewProps> = ({ projects }) => {
  const [isSignatoryModalOpen, setIsSignatoryModalOpen] = useState(false);
  const [signatoriesForPrint, setSignatoriesForPrint] = useState<Signatories | null>(null);
  const [savedSignatories, setSavedSignatories] = useState<Signatories | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');

  const availableYears = useMemo(() => {
    const years = new Set(projects.map(p => p.Year_Funded));
    return Array.from(years).sort((a, b) => b - a); // Sort descending
  }, [projects]);
  
  const filteredProjects = useMemo(() => {
    if (selectedYear === 'all') {
        return projects;
    }
    return projects.filter(p => p.Year_Funded === selectedYear);
  }, [projects, selectedYear]);


  useEffect(() => {
    try {
        const storedSignatories = localStorage.getItem('hfep-signatories');
        if (storedSignatories) {
            setSavedSignatories(JSON.parse(storedSignatories));
        }
    } catch (error) {
        console.error("Failed to parse signatories from localStorage", error);
    }
  }, []);

  const handleOpenPrintModal = () => {
    setIsSignatoryModalOpen(true);
  };

  const handleClosePrintModal = () => {
    setIsSignatoryModalOpen(false);
  };

  const handleSaveAndPrint = (data: Signatories) => {
    setSignatoriesForPrint(data); // Set for the current print job
    setSavedSignatories(data); // Save for pre-filling next time
    localStorage.setItem('hfep-signatories', JSON.stringify(data));
    setIsSignatoryModalOpen(false);
    
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-end items-center mb-4 gap-4 no-print">
         <div className="flex items-center gap-2">
            <label htmlFor="yearFilter" className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by Year:</label>
            <select
                id="yearFilter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            >
                <option value="all">All Years</option>
                {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
        <button
            onClick={handleOpenPrintModal}
            className="flex items-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
        >
            <PrintIcon />
            Print Dashboard
        </button>
      </div>
      <DashboardMetrics projects={filteredProjects} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 dashboard-grid">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 dashboard-card">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Project Status Overview</h2>
            <ProjectStatusChart projects={filteredProjects} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 dashboard-card">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Financial Status of HFEP Projects</h2>
            <FinancialStatusTable projects={filteredProjects} />
        </div>
      </div>
      <div className="mt-6 bg-white p-6 rounded-xl shadow-md border border-gray-200 dashboard-card">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Physical Status of HFEP Projects</h2>
        <PhysicalStatusTable projects={filteredProjects} />
      </div>

      <PrintableSignatories signatories={signatoriesForPrint} />

      <SignatoriesModal
        isOpen={isSignatoryModalOpen}
        onClose={handleClosePrintModal}
        onSave={handleSaveAndPrint}
        initialData={savedSignatories}
      />
    </>
  );
};

export default DashboardView;