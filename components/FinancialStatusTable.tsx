
import React, { useMemo } from 'react';
import { Project } from '../types';
import { formatCurrency } from '../utils';

interface FinancialStatusTableProps {
  projects: Project[];
}

const FinancialStatusTable: React.FC<FinancialStatusTableProps> = ({ projects }) => {

    const financialData = useMemo(() => {
        const data: { [key: string]: { Appropriated: number; Allotted: number; Obligation: number; Disbursement: number } } = {
            'Infrastructure': { Appropriated: 0, Allotted: 0, Obligation: 0, Disbursement: 0 },
            'Medical Equipment': { Appropriated: 0, Allotted: 0, Obligation: 0, Disbursement: 0 },
            'Motor Vehicle': { Appropriated: 0, Allotted: 0, Obligation: 0, Disbursement: 0 },
        };

        projects.forEach(p => {
            // Aggregate financials based on their specific fields
            data['Infrastructure'].Appropriated += p.Appro_Infra || 0;
            data['Infrastructure'].Allotted += p.Allot_Infra || 0;
            data['Infrastructure'].Obligation += p.Oblig_Infra || 0;

            data['Medical Equipment'].Appropriated += p.Appro_Med_Equip || 0;
            data['Medical Equipment'].Allotted += p.Allot_Med_Equip || 0;
            data['Medical Equipment'].Obligation += p.Oblig_Med_Equip || 0;

            data['Motor Vehicle'].Appropriated += p.Appro_Motor_Vehicle || 0;
            data['Motor Vehicle'].Allotted += p.Allot_Motor_Vehicle || 0;
            data['Motor Vehicle'].Obligation += p.Oblig_Motor_Vehicle || 0;
            
            // Distribute the single 'Total_Disbursed' value proportionally based on obligation
            const totalObligation = (p.Oblig_Infra || 0) + (p.Oblig_Med_Equip || 0) + (p.Oblig_Motor_Vehicle || 0);
            const totalDisbursed = p.Total_Disbursed || 0;

            if (totalObligation > 0) {
                const infraRatio = (p.Oblig_Infra || 0) / totalObligation;
                const equipRatio = (p.Oblig_Med_Equip || 0) / totalObligation;
                const vehicleRatio = (p.Oblig_Motor_Vehicle || 0) / totalObligation;
                
                data['Infrastructure'].Disbursement += totalDisbursed * infraRatio;
                data['Medical Equipment'].Disbursement += totalDisbursed * equipRatio;
                data['Motor Vehicle'].Disbursement += totalDisbursed * vehicleRatio;
            } else if (totalDisbursed > 0) {
                // Fallback: If no obligation, distribute based on appropriation
                const totalAppropriation = (p.Appro_Infra || 0) + (p.Appro_Med_Equip || 0) + (p.Appro_Motor_Vehicle || 0);
                 if (totalAppropriation > 0) {
                    const infraRatio = (p.Appro_Infra || 0) / totalAppropriation;
                    const equipRatio = (p.Appro_Med_Equip || 0) / totalAppropriation;
                    const vehicleRatio = (p.Appro_Motor_Vehicle || 0) / totalAppropriation;
                    
                    data['Infrastructure'].Disbursement += totalDisbursed * infraRatio;
                    data['Medical Equipment'].Disbursement += totalDisbursed * equipRatio;
                    data['Motor Vehicle'].Disbursement += totalDisbursed * vehicleRatio;
                 }
            }
        });

        const grandTotal = { Appropriated: 0, Allotted: 0, Obligation: 0, Disbursement: 0 };
        Object.values(data).forEach(d => {
            grandTotal.Appropriated += d.Appropriated;
            grandTotal.Allotted += d.Allotted;
            grandTotal.Obligation += d.Obligation;
            grandTotal.Disbursement += d.Disbursement;
        });
        
        const filteredData = Object.entries(data).filter(([_, values]) => 
            values.Appropriated || values.Allotted || values.Obligation || values.Disbursement
        );

        return { data: filteredData, grandTotal };
    }, [projects]);

    const formatPercentage = (numerator: number, denominator: number) => {
        if (denominator === 0) return '0.00%';
        return `${((numerator / denominator) * 100).toFixed(2)}%`;
    };

    const FinancialRow: React.FC<{
        label: string;
        data: { Appropriated: number; Allotted: number; Obligation: number; Disbursement: number };
        isTotal?: boolean;
    }> = ({ label, data, isTotal = false }) => (
        <tr className={isTotal ? "bg-gray-100 font-bold" : "border-b border-gray-200"}>
            <td className={`px-4 py-2 text-sm ${isTotal ? 'text-gray-800' : 'text-gray-600'}`}>{label}</td>
            <td className="px-4 py-2 text-right text-sm font-mono text-gray-700">{formatCurrency(data.Appropriated)}</td>
            <td className="px-4 py-2 text-right text-sm font-mono text-gray-700">{formatCurrency(data.Allotted)}</td>
            <td className="px-4 py-2 text-right text-sm font-mono text-gray-700">{formatCurrency(data.Obligation)}</td>
            <td className="px-4 py-2 text-right text-sm font-mono text-blue-600">{formatPercentage(data.Obligation, data.Allotted)}</td>
            <td className="px-4 py-2 text-right text-sm font-mono text-gray-700">{formatCurrency(data.Disbursement)}</td>
            <td className="px-4 py-2 text-right text-sm font-mono text-green-600">{formatPercentage(data.Disbursement, data.Appropriated)}</td>
        </tr>
    );


    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Financial Category</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Appropriated</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Allotted</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Obligation</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Oblig %</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Disbursement</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Disb %</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {financialData.data.map(([label, data]) => (
                        <FinancialRow key={label} label={label} data={data} />
                    ))}
                </tbody>
                <tfoot>
                    <FinancialRow label="Grand Total" data={financialData.grandTotal} isTotal />
                </tfoot>
            </table>
        </div>
    );
};

export default FinancialStatusTable;
