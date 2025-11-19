
import React, { useMemo } from 'react';
import { Project, ProjectStatus, ProjectStatuses } from '../types';
import { projectTypeMapping } from '../utils';

interface PhysicalStatusTableProps {
  projects: Project[];
}

const STATUS_COLUMNS: ProjectStatus[] = [
    'A. PPMP', 'B. PR', 'C. Pre-Bid', 'D. Opening of Bid', 'E. Bid Evaluation', 
    'F. Post Qualification', 'G. Notice of Award', 'H. Notice to Proceed', 
    'I. On-going Construction/Delivery', 'J. Completed Construction/Delivery', 
    'K. Completed as Functional', 'L. Re-Bid', 'M. Failed Bid', 'N. Suspended', 
    'O. Terminated', 'P. For Reversion', 'Q. Reverted', 'R. Modified/Realigned'
];

const PhysicalStatusTable: React.FC<PhysicalStatusTableProps> = ({ projects }) => {
    
    const physicalData = useMemo(() => {
        const categories = ['Infra', 'Equipment', 'Motor Vehicle', 'Land Outlay'];
        const initialCounts = STATUS_COLUMNS.reduce((acc, status) => ({...acc, [status]: 0}), {});

        const data = categories.reduce((acc, cat) => ({
            ...acc,
            [cat]: { total: 0, withStatus: 0, ...initialCounts }
        }), {} as Record<string, Record<string, number>>);

        projects.forEach(p => {
            const category = projectTypeMapping[p.Project_Type];
            if (category && data[category]) {
                data[category].total += 1;
                if (p.Actual_Status) {
                    data[category].withStatus += 1;
                    if(data[category][p.Actual_Status] !== undefined) {
                        data[category][p.Actual_Status] += 1;
                    }
                }
            }
        });
        
        const grandTotal: Record<string, number> = { total: 0, withStatus: 0, ...initialCounts };
        Object.values(data).forEach(d => {
            grandTotal.total += d.total;
            grandTotal.withStatus += d.withStatus;
            STATUS_COLUMNS.forEach(status => {
                grandTotal[status] += d[status];
            });
        });

        return { data: Object.entries(data), grandTotal };
    }, [projects]);
    
    const StatusRow: React.FC<{
        label: string;
        data: Record<string, number>;
        isTotal?: boolean;
    }> = ({ label, data, isTotal = false }) => (
        <tr className={isTotal ? "bg-gray-100 font-bold" : "border-b border-gray-200"}>
            <td className={`px-3 py-2 text-sm whitespace-nowrap ${isTotal ? 'text-gray-800' : 'text-gray-600'}`}>{label}</td>
            <td className="px-3 py-2 text-center text-sm font-medium text-gray-700">{data.total}</td>
            <td className="px-3 py-2 text-center text-sm font-medium text-gray-700">{data.withStatus}</td>
            {STATUS_COLUMNS.map(status => (
                 <td key={status} className="px-3 py-2 text-center text-sm text-gray-700">{data[status]}</td>
            ))}
        </tr>
    );

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-xs">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Project Type</th>
                        <th className="px-3 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">Total No. Projects</th>
                        <th className="px-3 py-2 text-center font-medium text-gray-500 uppercase tracking-wider">Total No. of Projects with Status</th>
                        {STATUS_COLUMNS.map(status => (
                            <th key={status} className="px-3 py-2 text-center font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">{status}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {physicalData.data.map(([label, data]) => (
                        <StatusRow key={label} label={label} data={data} />
                    ))}
                </tbody>
                 <tfoot>
                    <StatusRow label="Grand Total" data={physicalData.grandTotal} isTotal />
                </tfoot>
            </table>
        </div>
    );
};

export default PhysicalStatusTable;
