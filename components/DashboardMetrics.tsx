import React, { useMemo } from 'react';
import { Project } from '../types';
import { formatCurrency } from '../utils';

interface DashboardMetricsProps {
  projects: Project[];
}

const MetricCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
  <div className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${color} flex items-center justify-between dashboard-card`}>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
    <div className="text-gray-300">{icon}</div>
  </div>
);

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ projects }) => {
  const metrics = useMemo(() => {
    const totalProjects = projects.length;
    const totalBudget = projects.reduce((acc, p) => acc + (p.Appro_Infra || 0) + (p.Appro_Med_Equip || 0) + (p.Appro_Motor_Vehicle || 0), 0);
    const completed = projects.filter(p => 
        p.Actual_Status === 'J. Completed Construction/Delivery' || 
        p.Actual_Status === 'K. Completed as Functional'
    ).length;
    const onGoing = projects.filter(p => p.Actual_Status === 'I. On-going Construction/Delivery').length;

    return { totalProjects, totalBudget, completed, onGoing };
  }, [projects]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 dashboard-grid">
      <MetricCard 
        title="Kabuuang Proyekto" 
        value={metrics.totalProjects} 
        color="border-blue-500" 
        icon={<FolderIcon />} 
      />
      <MetricCard 
        title="Kabuuang Badyet" 
        value={formatCurrency(metrics.totalBudget)} 
        color="border-green-500" 
        icon={<CashIcon />} 
      />
      <MetricCard 
        title="Mga Proyektong Isinasagawa" 
        value={metrics.onGoing} 
        color="border-yellow-500" 
        icon={<ClockIcon />} 
      />
      <MetricCard 
        title="Mga Proyektong Nakumpleto" 
        value={metrics.completed} 
        color="border-teal-500" 
        icon={<CheckCircleIcon />} 
      />
    </div>
  );
};

// Icons
const FolderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>;
const CashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


export default DashboardMetrics;