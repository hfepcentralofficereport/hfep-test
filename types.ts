export const ProjectStatuses = [
  'A. PPMP', 'B. PR', 'C. Pre-Bid', 'D. Opening of Bid', 'E. Bid Evaluation', 
  'F. Post Qualification', 'G. Notice of Award', 'H. Notice to Proceed', 
  'I. On-going Construction/Delivery', 'J. Completed Construction/Delivery', 
  'K. Completed as Functional', 'L. Re-Bid', 'M. Failed Bid', 'N. Suspended', 
  'O. Terminated', 'P. For Reversion', 'Q. Reverted', 'R. Modified/Realigned'
] as const;

export type ProjectStatus = typeof ProjectStatuses[number];

export const ProjectTypes = [
  'New Construction', 'Repair', 'Renovation', 'Relocation', 'Upgrading', 
  'Completion', 'Equipping', 'Provision of Motor Vehicle', 'Provision of Land Outlay'
] as const;

export type ProjectType = typeof ProjectTypes[number];

export interface StatusHistoryEntry {
  status: ProjectStatus;
  date: string; // ISO string format
}

export interface GAAFund {
  id: string;
  gaaCode: string; // e.g., "GAA-2023-REGULAR"
  description: string;
  year: number;
  allocationInfra?: number;
  allocationMedEquip?: number;
  allocationMotorVehicle?: number;
}

export interface Project {
  id: string; // Keep a unique ID for React
  Year_Funded: number;
  gaaCode: string; // Links to a GAAFund
  Region: string;
  Province_Name: string;
  Legislative_District: string;
  City_or_Municipality: string;
  PSGC_Brgy?: string;
  Barangay?: string;
  NHFR_Code: string;
  Facility_Name: string;
  Latitude?: number;
  Longitude?: number;
  Project_Type: ProjectType;
  Facility_Type: string;
  Simple_ProjDesc: string;
  Detailed_ProjDesc?: string;
  Implementing_Office: string;
  Fund_Source: string;
  Actual_Status: ProjectStatus; // Use the new detailed status type
  statusHistory?: StatusHistoryEntry[];
  Date_Posting?: string;
  Date_NOA?: string;
  Date_NTP?: string;
  Target_Start: string; // YYYY-MM-DD
  Target_End: string; // YYYY-MM-DD
  Revised_Target_End?: string; // YYYY-MM-DD
  Actual_Start?: string; // YYYY-MM-DD
  Actual_End?: string; // YYYY-MM-DD
  Phys_Accomp_Rate: number; // Percentage
  
  // Detailed financial breakdown
  Appro_Infra?: number;
  Appro_Med_Equip?: number;
  Appro_Motor_Vehicle?: number;
  Allot_Infra?: number;
  Allot_Med_Equip?: number;
  Allot_Motor_Vehicle?: number;
  Oblig_Infra?: number;
  Oblig_Med_Equip?: number;
  Oblig_Motor_Vehicle?: number;

  Disb_Year0?: number;
  Disb_Year1?: number;
  Disb_Year2?: number;
  Disb_Year3?: number;
  Disb_Year4?: number;
  Total_Disbursed?: number;
  Savings_Unobligated?: number;
  Negated_Funds?: number;
  Reverted_Funds?: number;
  SAA_Number?: string;
  OBR_No?: string;
  Contractor_Name?: string;
  Remarks?: string;
  Specialty?: string;
}