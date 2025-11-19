import React, { useMemo } from 'react';
import { GAAFund, Project } from '../types';
import { formatCurrency } from '../utils';

interface GAAFundsViewProps {
  funds: GAAFund[];
  projects: Project[];
  onAddNew: () => void;
  onEdit: (fund: GAAFund) => void;
  onDelete: (fundId: string) => void;
}

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);

const GAAFundsView: React.FC<GAAFundsViewProps> = ({ funds, projects, onAddNew, onEdit, onDelete }) => {
  const fundsWithCalculations = useMemo(() => {
    return funds.map(fund => {
      const relatedProjects = projects.filter(p => p.gaaCode === fund.gaaCode);
      
      const allotted = relatedProjects.reduce((acc, p) => {
          acc.infra += p.Allot_Infra || 0;
          acc.medEquip += p.Allot_Med_Equip || 0;
          acc.motorVehicle += p.Allot_Motor_Vehicle || 0;
          return acc;
      }, { infra: 0, medEquip: 0, motorVehicle: 0 });

      const allocation = {
        infra: fund.allocationInfra || 0,
        medEquip: fund.allocationMedEquip || 0,
        motorVehicle: fund.allocationMotorVehicle || 0
      };

      const balance = {
          infra: allocation.infra - allotted.infra,
          medEquip: allocation.medEquip - allotted.medEquip,
          motorVehicle: allocation.motorVehicle - allotted.motorVehicle,
      };

      const totalUnobligated = relatedProjects.reduce((acc, p) => {
        const totalAllotment = (p.Allot_Infra || 0) + (p.Allot_Med_Equip || 0) + (p.Allot_Motor_Vehicle || 0);
        const totalObligation = (p.Oblig_Infra || 0) + (p.Oblig_Med_Equip || 0) + (p.Oblig_Motor_Vehicle || 0);
        return acc + (totalAllotment - totalObligation);
      }, 0);

      return {
        ...fund,
        allocation,
        allotted,
        balance,
        totalUnobligated,
      };
    }).sort((a,b) => b.year - a.year || a.gaaCode.localeCompare(b.gaaCode));
  }, [funds, projects]);
  
  const SubHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <th className={`px-2 py-2 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-300 ${className}`}>{children}</th>
  );
  
  const DataCell: React.FC<{ value: number; isBalance?: boolean; className?: string }> = ({ value, isBalance = false, className = '' }) => {
    let textColor = 'text-gray-800';
    if (isBalance) {
      textColor = value < 0 ? 'text-red-600 font-bold' : 'text-green-600';
    }
    return (
        <td className={`px-2 py-3 whitespace-nowrap text-xs text-right font-mono ${textColor} ${className}`}>{formatCurrency(value)}</td>
    )
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-700">GAA Fund Management</h2>
        <button
            onClick={onAddNew}
            className="w-full sm:w-auto bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
            <PlusIcon />
            Add New GAA Fund
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
            <thead className="bg-gray-50 text-xs sticky top-0">
                <tr>
                    <th rowSpan={2} className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider align-bottom bg-gray-50">GAA Code</th>
                    <th rowSpan={2} className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider align-bottom max-w-xs bg-gray-50">Description</th>
                    <th colSpan={3} className="px-4 py-2 text-center font-medium text-gray-500 uppercase tracking-wider border-x border-b border-gray-300">Allocation</th>
                    <th colSpan={3} className="px-4 py-2 text-center font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Allotted</th>
                    <th rowSpan={2} className="px-4 py-3 text-center font-medium text-gray-500 uppercase tracking-wider align-bottom bg-gray-50 border-x border-gray-300">Unobligated Funds</th>
                    <th colSpan={3} className="px-4 py-2 text-center font-medium text-gray-500 uppercase tracking-wider border-b border-gray-300">Remaining Balance</th>
                    <th rowSpan={2} className="px-4 py-3 text-center font-medium text-gray-500 uppercase tracking-wider align-bottom bg-gray-50">Actions</th>
                </tr>
                <tr>
                    <SubHeader className="border-l">Infra</SubHeader>
                    <SubHeader>Med Equip</SubHeader>
                    <SubHeader className="border-r">Motor Veh.</SubHeader>
                    <SubHeader>Infra</SubHeader>
                    <SubHeader>Med Equip</SubHeader>
                    <SubHeader>Motor Veh.</SubHeader>
                    <SubHeader className="border-l">Infra</SubHeader>
                    <SubHeader>Med Equip</SubHeader>
                    <SubHeader>Motor Veh.</SubHeader>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {fundsWithCalculations.map(fund => (
                    <tr key={fund.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900">{fund.gaaCode}</div>
                            <div className="text-xs text-gray-500">Year: {fund.year}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate" title={fund.description}>{fund.description}</td>
                        
                        {/* Allocation */}
                        <DataCell value={fund.allocation.infra} className="border-l" />
                        <DataCell value={fund.allocation.medEquip} />
                        <DataCell value={fund.allocation.motorVehicle} className="border-r" />

                        {/* Allotted */}
                        <DataCell value={fund.allotted.infra} />
                        <DataCell value={fund.allotted.medEquip} />
                        <DataCell value={fund.allotted.motorVehicle} />

                        {/* Unobligated */}
                        <DataCell value={fund.totalUnobligated} className="border-x text-indigo-600" />

                        {/* Balance */}
                        <DataCell value={fund.balance.infra} isBalance />
                        <DataCell value={fund.balance.medEquip} isBalance />
                        <DataCell value={fund.balance.motorVehicle} isBalance />

                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium">
                            <button onClick={() => onEdit(fund)} className="text-indigo-600 hover:text-indigo-900 mr-3 font-semibold">Edit</button>
                            <button onClick={() => onDelete(fund.id)} className="text-red-600 hover:text-red-900 font-semibold">Delete</button>
                        </td>
                    </tr>
                ))}
                 {funds.length === 0 && (
                    <tr>
                        <td colSpan={13} className="text-center py-10 text-gray-500">No GAA Funds found. Click 'Add New GAA Fund' to start.</td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default GAAFundsView;