
import { ProjectStatus, ProjectType } from "./types";

const STATUS_CATEGORIES: { [key in ProjectStatus]: string } = {
    'A. PPMP': 'Planning & Procurement',
    'B. PR': 'Planning & Procurement',
    'C. Pre-Bid': 'Planning & Procurement',
    'D. Opening of Bid': 'Planning & Procurement',
    'E. Bid Evaluation': 'Planning & Procurement',
    'F. Post Qualification': 'Planning & Procurement',
    'G. Notice of Award': 'Planning & Procurement',
    'H. Notice to Proceed': 'Planning & Procurement',
    'I. On-going Construction/Delivery': 'Implementation',
    'J. Completed Construction/Delivery': 'Completed',
    'K. Completed as Functional': 'Completed',
    'L. Re-Bid': 'Issues & Revisions',
    'M. Failed Bid': 'Issues & Revisions',
    'N. Suspended': 'Issues & Revisions',
    'O. Terminated': 'Issues & Revisions',
    'P. For Reversion': 'Issues & Revisions',
    'Q. Reverted': 'Issues & Revisions',
    'R. Modified/Realigned': 'Issues & Revisions',
};

export const getStatusCategory = (status: ProjectStatus): string => {
    return STATUS_CATEGORIES[status] || 'Unknown';
}

export const STATUS_CATEGORY_COLORS: Record<string, string> = {
    'Planning & Procurement': '#3b82f6', // Blue
    'Implementation': '#f59e0b',    // Amber
    'Completed': '#10b981',   // Emerald
    'Issues & Revisions': '#ef4444',     // Red
};

export const formatCurrency = (value: number | undefined) => {
    if (value === undefined || value === null) return '₱0.00';
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(value);
};

export const projectTypeMapping: { [key in ProjectType]: string } = {
    'New Construction': 'Infra',
    'Repair': 'Infra',
    'Renovation': 'Infra',
    'Relocation': 'Infra',
    'Upgrading': 'Infra',
    'Completion': 'Infra',
    'Equipping': 'Equipment',
    'Provision of Motor Vehicle': 'Motor Vehicle',
    'Provision of Land Outlay': 'Land Outlay',
};
