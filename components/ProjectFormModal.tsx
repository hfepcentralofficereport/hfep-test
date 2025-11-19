
import React, { useState, useEffect } from 'react';
import { Project, ProjectStatus, ProjectStatuses, ProjectTypes, ProjectType, GAAFund } from '../types';
import { 
    YEARS_FUNDED, FACILITY_TYPES, IMPLEMENTING_OFFICES, FUND_SOURCES, 
    LEGISLATIVE_DISTRICTS, REGIONS, SPECIALTIES 
} from '../formOptions';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (projectData: Omit<Project, 'id'> | Project) => void;
  project: Project | null;
  gaaFunds: GAAFund[];
}

const initialFormData: Omit<Project, 'id' | 'statusHistory'> = {
    Year_Funded: new Date().getFullYear(),
    gaaCode: '',
    Region: REGIONS[0],
    Province_Name: '',
    Legislative_District: LEGISLATIVE_DISTRICTS[0],
    City_or_Municipality: '',
    NHFR_Code: '',
    Facility_Name: '',
    Project_Type: 'New Construction',
    Facility_Type: FACILITY_TYPES[0],
    Simple_ProjDesc: '',
    Implementing_Office: IMPLEMENTING_OFFICES[0],
    Fund_Source: FUND_SOURCES[0],
    Actual_Status: 'C. Pre-Bid',
    Target_Start: '',
    Target_End: '',
    Phys_Accomp_Rate: 0,
    PSGC_Brgy: '',
    Barangay: '',
    Latitude: 0,
    Longitude: 0,
    Detailed_ProjDesc: '',
    Date_Posting: '',
    Date_NOA: '',
    Date_NTP: '',
    Revised_Target_End: '',
    Actual_Start: '',
    Actual_End: '',
    Appro_Infra: 0,
    Appro_Med_Equip: 0,
    Appro_Motor_Vehicle: 0,
    Allot_Infra: 0,
    Allot_Med_Equip: 0,
    Allot_Motor_Vehicle: 0,
    Oblig_Infra: 0,
    Oblig_Med_Equip: 0,
    Oblig_Motor_Vehicle: 0,
    Total_Disbursed: 0,
    Savings_Unobligated: 0,
    Negated_Funds: 0,
    Reverted_Funds: 0,
    Contractor_Name: '',
    Remarks: '',
    Specialty: SPECIALTIES[0],
};

// Helper to handle optional project fields
const getProjectValue = <T,>(value: T | undefined, defaultValue: T): T => value ?? defaultValue;


const ProjectFormModal: React.FC<ProjectFormModalProps> = ({ isOpen, onClose, onSave, project, gaaFunds }) => {
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'statusHistory'>>(initialFormData);

  useEffect(() => {
    const defaultGaaCode = gaaFunds.length > 0 ? gaaFunds[0].gaaCode : '';

    if (project) {
        // Map all fields from project to form data, providing defaults for optional fields
        setFormData({
            Year_Funded: project.Year_Funded,
            gaaCode: project.gaaCode,
            Region: project.Region,
            Province_Name: project.Province_Name,
            Legislative_District: project.Legislative_District,
            City_or_Municipality: project.City_or_Municipality,
            PSGC_Brgy: getProjectValue(project.PSGC_Brgy, ''),
            Barangay: getProjectValue(project.Barangay, ''),
            NHFR_Code: project.NHFR_Code,
            Facility_Name: project.Facility_Name,
            Latitude: getProjectValue(project.Latitude, 0),
            Longitude: getProjectValue(project.Longitude, 0),
            Project_Type: project.Project_Type,
            Facility_Type: project.Facility_Type,
            Simple_ProjDesc: project.Simple_ProjDesc,
            Detailed_ProjDesc: getProjectValue(project.Detailed_ProjDesc, ''),
            Implementing_Office: project.Implementing_Office,
            Fund_Source: project.Fund_Source,
            Actual_Status: project.Actual_Status,
            Date_Posting: getProjectValue(project.Date_Posting, ''),
            Date_NOA: getProjectValue(project.Date_NOA, ''),
            Date_NTP: getProjectValue(project.Date_NTP, ''),
            Target_Start: project.Target_Start,
            Target_End: project.Target_End,
            Revised_Target_End: getProjectValue(project.Revised_Target_End, ''),
            Actual_Start: getProjectValue(project.Actual_Start, ''),
            Actual_End: getProjectValue(project.Actual_End, ''),
            Phys_Accomp_Rate: project.Phys_Accomp_Rate,
            Appro_Infra: getProjectValue(project.Appro_Infra, 0),
            Appro_Med_Equip: getProjectValue(project.Appro_Med_Equip, 0),
            Appro_Motor_Vehicle: getProjectValue(project.Appro_Motor_Vehicle, 0),
            Allot_Infra: getProjectValue(project.Allot_Infra, 0),
            Allot_Med_Equip: getProjectValue(project.Allot_Med_Equip, 0),
            Allot_Motor_Vehicle: getProjectValue(project.Allot_Motor_Vehicle, 0),
            Oblig_Infra: getProjectValue(project.Oblig_Infra, 0),
            Oblig_Med_Equip: getProjectValue(project.Oblig_Med_Equip, 0),
            Oblig_Motor_Vehicle: getProjectValue(project.Oblig_Motor_Vehicle, 0),
            Total_Disbursed: getProjectValue(project.Total_Disbursed, 0),
            Savings_Unobligated: getProjectValue(project.Savings_Unobligated, 0),
            Negated_Funds: getProjectValue(project.Negated_Funds, 0),
            Reverted_Funds: getProjectValue(project.Reverted_Funds, 0),
            Contractor_Name: getProjectValue(project.Contractor_Name, ''),
            Remarks: getProjectValue(project.Remarks, ''),
            Specialty: getProjectValue(project.Specialty, ''),
        });
    } else {
      setFormData({...initialFormData, gaaCode: defaultGaaCode });
    }
  }, [project, isOpen, gaaFunds]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Type assertion for select elements
    if (e.target.tagName === 'SELECT') {
        if (name === 'Project_Type') {
            setFormData(prev => ({ ...prev, [name]: value as ProjectType }));
            return;
        }
        if (name === 'Actual_Status') {
            setFormData(prev => ({ ...prev, [name]: value as ProjectStatus }));
            return;
        }
    }

    const isNumber = type === 'number';
    setFormData(prev => ({ ...prev, [name]: isNumber ? Number(value) : value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gaaCode) {
        alert("Please select a GAA Fund.");
        return;
    }
    if (project) {
        onSave({ ...project, ...formData });
    } else {
        onSave(formData);
    }
  };

  if (!isOpen) return null;
  
  const FormField: React.FC<{name: keyof typeof initialFormData, label: string, type?: string, required?: boolean, children?: React.ReactNode}> = ({ name, label, type = 'text', required = false, children }) => (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}{required && <span className="text-red-500">*</span>}</label>
        {children ? children : (
             <input type={type} id={name} name={name} value={String(formData[name] ?? '')} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required={required} />
        )}
      </div>
  );
  
  const FinancialInput: React.FC<{name: keyof typeof initialFormData}> = ({ name }) => (
    <input 
        type="number" 
        id={name} 
        name={name} 
        value={String(formData[name] ?? '0')} 
        onChange={handleChange} 
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] ">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{project ? 'Update Project Details' : 'Add New Project'}</h2>
            </div>
            <div className="p-6 border-t border-b border-gray-200 overflow-y-auto">
                <div className="space-y-8">
                     <fieldset>
                        <legend className="text-lg font-semibold text-gray-900 mb-4">Project Identification</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <FormField name="Simple_ProjDesc" label="Project Name" required />
                            <FormField name="gaaCode" label="GAA Fund Source" required>
                                <select id="gaaCode" name="gaaCode" value={formData.gaaCode} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                    <option value="" disabled>-- Select a Fund --</option>
                                    {gaaFunds.map(fund => <option key={fund.id} value={fund.gaaCode}>{fund.gaaCode} - {fund.description}</option>)}
                                </select>
                            </FormField>
                            <FormField name="Year_Funded" label="Year Funded" required>
                                <select id="Year_Funded" name="Year_Funded" value={formData.Year_Funded} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                    {YEARS_FUNDED.map(year => <option key={year} value={year}>{year}</option>)}
                                </select>
                            </FormField>
                            <FormField name="Project_Type" label="Project Type" required>
                                <select id="Project_Type" name="Project_Type" value={formData.Project_Type} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                    {ProjectTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </FormField>
                            <FormField name="Facility_Type" label="Facility Type" required>
                                 <select id="Facility_Type" name="Facility_Type" value={formData.Facility_Type} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                    {FACILITY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                                </select>
                            </FormField>
                            <FormField name="Implementing_Office" label="Implementing Office" required>
                                <select id="Implementing_Office" name="Implementing_Office" value={formData.Implementing_Office} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                    {IMPLEMENTING_OFFICES.map(office => <option key={office} value={office}>{office}</option>)}
                                </select>
                            </FormField>
                            <div className="md:col-span-2 lg:col-span-3">
                                <label htmlFor="Detailed_ProjDesc" className="block text-sm font-medium text-gray-700">Detailed Description</label>
                                <textarea id="Detailed_ProjDesc" name="Detailed_ProjDesc" value={String(formData.Detailed_ProjDesc)} onChange={handleChange} rows={2} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className="text-lg font-semibold text-gray-900 mb-4">Location Details</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                             <FormField name="Region" label="Region" required>
                                 <select id="Region" name="Region" value={formData.Region} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                     {REGIONS.map(region => <option key={region} value={region}>{region}</option>)}
                                 </select>
                             </FormField>
                             <FormField name="Legislative_District" label="Legislative District" required>
                                <select id="Legislative_District" name="Legislative_District" value={formData.Legislative_District} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                    {LEGISLATIVE_DISTRICTS.map(district => <option key={district} value={district}>{district}</option>)}
                                </select>
                             </FormField>
                             <FormField name="Province_Name" label="Province" required />
                             <FormField name="City_or_Municipality" label="City/Municipality" required />
                             <FormField name="Barangay" label="Barangay" />
                             <FormField name="Facility_Name" label="Health Facility Name" required />
                             <FormField name="NHFR_Code" label="NHFR Code" required />
                             <FormField name="Latitude" label="Latitude" type="number" />
                             <FormField name="Longitude" label="Longitude" type="number" />
                        </div>
                    </fieldset>
                    
                    <fieldset>
                        <legend className="text-lg font-semibold text-gray-900 mb-4">Timeline and Status</legend>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormField name="Actual_Status" label="Actual Status" required>
                                <select id="Actual_Status" name="Actual_Status" value={formData.Actual_Status} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                    {ProjectStatuses.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </FormField>
                             <FormField name="Phys_Accomp_Rate" label="Physical Accomplishment (%)" type="number" required />
                             <FormField name="Target_Start" label="Target Start Date" type="date" required />
                             <FormField name="Target_End" label="Target End Date" type="date" required />
                             <FormField name="Revised_Target_End" label="Revised Target End" type="date" />
                             <FormField name="Actual_Start" label="Actual Start Date" type="date" />
                             <FormField name="Actual_End" label="Actual End Date" type="date" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend className="text-lg font-semibold text-gray-900 mb-4">Financials</legend>
                        <div className="grid grid-cols-4 gap-x-4 gap-y-2 items-center">
                            {/* Header */}
                            <div></div>
                            <label className="text-sm font-medium text-gray-700 text-center">Infrastructure</label>
                            <label className="text-sm font-medium text-gray-700 text-center">Medical Equipment</label>
                            <label className="text-sm font-medium text-gray-700 text-center">Motor Vehicle</label>

                            {/* Appropriation Row */}
                            <label className="text-sm font-medium text-gray-700">Appropriation <span className="text-red-500">*</span></label>
                            <FinancialInput name="Appro_Infra" />
                            <FinancialInput name="Appro_Med_Equip" />
                            <FinancialInput name="Appro_Motor_Vehicle" />
                            
                             {/* Allotment Row */}
                            <label className="text-sm font-medium text-gray-700">Allotment</label>
                            <FinancialInput name="Allot_Infra" />
                            <FinancialInput name="Allot_Med_Equip" />
                            <FinancialInput name="Allot_Motor_Vehicle" />

                            {/* Obligation Row */}
                            <label className="text-sm font-medium text-gray-700">Obligation</label>
                            <FinancialInput name="Oblig_Infra" />
                            <FinancialInput name="Oblig_Med_Equip" />
                            <FinancialInput name="Oblig_Motor_Vehicle" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                             <FormField name="Fund_Source" label="Fund Source" required>
                                <select id="Fund_Source" name="Fund_Source" value={formData.Fund_Source} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                    {FUND_SOURCES.map(source => <option key={source} value={source}>{source}</option>)}
                                </select>
                            </FormField>
                            <div>
                                <label htmlFor="Total_Disbursed" className="block text-sm font-medium text-gray-700">Total Disbursed</label>
                                <FinancialInput name="Total_Disbursed" />
                            </div>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div>
                                <label htmlFor="Savings_Unobligated" className="block text-sm font-medium text-gray-700">Savings (Unobligated)</label>
                                <FinancialInput name="Savings_Unobligated" />
                            </div>
                            <div>
                                <label htmlFor="Negated_Funds" className="block text-sm font-medium text-gray-700">Negated Funds</label>
                                <FinancialInput name="Negated_Funds" />
                            </div>
                            <div>
                                <label htmlFor="Reverted_Funds" className="block text-sm font-medium text-gray-700">Reverted Funds</label>
                                <FinancialInput name="Reverted_Funds" />
                            </div>
                        </div>
                    </fieldset>
                    
                     <fieldset>
                        <legend className="text-lg font-semibold text-gray-900 mb-4">Other Information</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField name="Contractor_Name" label="Contractor" />
                             <FormField name="Specialty" label="Specialty">
                                 <select id="Specialty" name="Specialty" value={String(formData.Specialty)} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                     {SPECIALTIES.map(spec => <option key={spec} value={spec}>{spec}</option>)}
                                 </select>
                             </FormField>
                             <div className="md:col-span-2">
                                <label htmlFor="Remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                                <textarea id="Remarks" name="Remarks" value={String(formData.Remarks)} onChange={handleChange} rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"></textarea>
                             </div>
                        </div>
                    </fieldset>
                </div>
            </div>
            <div className="bg-gray-100 px-6 py-4 flex justify-end gap-3 mt-auto">
                <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                Save Project
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;
