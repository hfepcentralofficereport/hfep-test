
import { Project, ProjectStatuses, ProjectTypes, ProjectStatus, ProjectType } from '../types';

// Helper to safely parse numbers, handling commas and empty values
const safeParseFloat = (val: string | undefined): number | undefined => {
    if (val === undefined || val === null) return undefined;
    const cleanedVal = val.replace(/,/g, '').trim();
    if (cleanedVal === '') return undefined;
    const num = parseFloat(cleanedVal);
    return isNaN(num) ? undefined : num;
};

// Helper to validate against a const array (enum pattern)
const isValidEnumValue = <T extends string>(value: string | undefined, validValues: readonly T[]): value is T => {
    if (value === undefined) return false;
    return (validValues as readonly string[]).includes(value);
};

// Maps canonical project keys to possible CSV header names (all lowercase)
const headerSynonyms: { [key: string]: string[] } = {
    Year_Funded: ['year_funded', 'year funded', 'fund year', 'year'],
    gaaCode: ['gaacode', 'gaa code', 'gaa_code', 'gaa fund'],
    Region: ['region'],
    Province_Name: ['province_name', 'province'],
    Legislative_District: ['legislative_district', 'district'],
    City_or_Municipality: ['city_or_municipality', 'city/municipality', 'municipality'],
    PSGC_Brgy: ['psgc_brgy'],
    Barangay: ['barangay'],
    NHFR_Code: ['nhfr_code', 'nhfr code'],
    Facility_Name: ['facility_name', 'facility name'],
    Latitude: ['latitude', 'lat'],
    Longitude: ['longitude', 'lon', 'lng'],
    Project_Type: ['project_type', 'project type', 'type'],
    Facility_Type: ['facility_type', 'facility type'],
    Simple_ProjDesc: ['simple_projdesc', 'project description', 'project name', 'description'],
    Detailed_ProjDesc: ['detailed_projdesc', 'detailed description'],
    Implementing_Office: ['implementing_office', 'implementing office'],
    Fund_Source: ['fund_source', 'fund source'],
    Actual_Status: ['actual_status', 'status', 'actual status'],
    Date_Posting: ['date_posting', 'date posting'],
    Date_NOA: ['date_noa', 'noa date'],
    Date_NTP: ['date_ntp', 'ntp date'],
    Target_Start: ['target_start', 'target start'],
    Target_End: ['target_end', 'target end'],
    Revised_Target_End: ['revised_target_end', 'revised target end'],
    Actual_Start: ['actual_start', 'actual start'],
    Actual_End: ['actual_end', 'actual end'],
    Phys_Accomp_Rate: ['phys_accomp_rate', 'physical accomplishment', 'phys accomp', 'accomplishment rate', 'phys_accomp_rate (%)', 'phys. accomp. (%)'],
    Appro_Infra: ['appro_infra', 'appropriation infra', 'infra appropriation'],
    Appro_Med_Equip: ['appro_med_equip', 'appropriation med equip', 'med equip appropriation'],
    Appro_Motor_Vehicle: ['appro_motor_vehicle', 'appropriation motor vehicle', 'motor vehicle appropriation'],
    Allot_Infra: ['allot_infra', 'allotment infra', 'infra allotment'],
    Allot_Med_Equip: ['allot_med_equip', 'allotment med equip', 'med equip allotment'],
    Allot_Motor_Vehicle: ['allot_motor_vehicle', 'allotment motor vehicle', 'motor vehicle allotment'],
    Oblig_Infra: ['oblig_infra', 'obligation infra', 'infra obligation'],
    Oblig_Med_Equip: ['oblig_med_equip', 'obligation med equip', 'med equip obligation'],
    Oblig_Motor_Vehicle: ['oblig_motor_vehicle', 'obligation motor vehicle', 'motor vehicle obligation'],
    Disb_Year0: ['disb_year0'],
    Disb_Year1: ['disb_year1'],
    Disb_Year2: ['disb_year2'],
    Disb_Year3: ['disb_year3'],
    Disb_Year4: ['disb_year4'],
    Total_Disbursed: ['total_disbursed', 'total disbursed'],
    Savings_Unobligated: ['savings_unobligated', 'savings'],
    Negated_Funds: ['negated_funds'],
    Reverted_Funds: ['reverted_funds'],
    SAA_Number: ['saa_number', 'saa no'],
    OBR_No: ['obr_no', 'obr number'],
    Contractor_Name: ['contractor_name', 'contractor'],
    Remarks: ['remarks'],
    Specialty: ['specialty'],
};


export const parseCSVToProjects = (csvText: string): Omit<Project, 'id' | 'statusHistory'>[] => {
    const lines = csvText.trim().replace(/\r\n/g, '\n').split('\n');
    if (lines.length < 2) {
        throw new Error("CSV file must have a header row and at least one data row.");
    }
    
    // Simple CSV parser that handles quoted fields containing commas
    const parseCsvLine = (line: string): string[] => {
        const result: string[] = [];
        let current = '';
        let inQuote = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"' && line[i-1] !== '"' && line[i+1] !== '"') { // Handle basic quotes, ignore escaped ones
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result.map(v => v.replace(/^"|"$/g, '')); // Remove surrounding quotes
    };

    const rawHeaders = parseCsvLine(lines[0]);
    const normalizedHeaders = rawHeaders.map(h => h.toLowerCase().trim());
    
    // Map from canonical key -> actual header from file
    const resolvedHeaders: { [key: string]: string } = {};
    
    // Find which header from the file corresponds to our canonical keys
    for (const canonicalKey in headerSynonyms) {
        for (const synonym of headerSynonyms[canonicalKey]) {
            const index = normalizedHeaders.indexOf(synonym);
            if (index !== -1) {
                resolvedHeaders[canonicalKey] = rawHeaders[index];
                break; // Found a match, move to next canonical key
            }
        }
    }

    const requiredKeys = ['Year_Funded', 'gaaCode', 'Simple_ProjDesc', 'Actual_Status', 'Project_Type', 'Phys_Accomp_Rate'];
    const missingKeys = requiredKeys.filter(key => !resolvedHeaders[key]);

    if (missingKeys.length > 0) {
        throw new Error(`CSV is missing required headers for: ${missingKeys.join(', ')}. Please check your file for columns with these or similar names.`);
    }
    
    const projects: Omit<Project, 'id' | 'statusHistory'>[] = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCsvLine(lines[i]);
        if (values.length !== rawHeaders.length) {
            console.warn(`Skipping malformed row ${i + 1}: expected ${rawHeaders.length} columns, found ${values.length}. Line: "${lines[i]}"`);
            continue;
        }

        const rowData = rawHeaders.reduce((obj, header, index) => {
            obj[header] = values[index];
            return obj;
        }, {} as { [key: string]: string });
        
        const getVal = (key: string): string | undefined => rowData[resolvedHeaders[key]];

        const projectType = getVal('Project_Type');
        if (!isValidEnumValue(projectType, ProjectTypes)) {
             console.warn(`Skipping row ${i + 1} due to invalid or missing Project_Type: "${projectType}"`);
             continue;
        }

        const actualStatus = getVal('Actual_Status');
        if (!isValidEnumValue(actualStatus, ProjectStatuses)) {
            console.warn(`Skipping row ${i + 1} due to invalid or missing Actual_Status: "${actualStatus}"`);
            continue;
        }

        // All required fields have been validated, now we can safely build the project object.
        const project: Omit<Project, 'id' | 'statusHistory'> = {
            Year_Funded: parseInt(getVal('Year_Funded') || '0', 10),
            gaaCode: getVal('gaaCode') || '',
            Region: getVal('Region') || '',
            Province_Name: getVal('Province_Name') || '',
            Legislative_District: getVal('Legislative_District') || '',
            City_or_Municipality: getVal('City_or_Municipality') || '',
            PSGC_Brgy: getVal('PSGC_Brgy'),
            Barangay: getVal('Barangay'),
            NHFR_Code: getVal('NHFR_Code') || '',
            Facility_Name: getVal('Facility_Name') || '',
            Latitude: safeParseFloat(getVal('Latitude')),
            Longitude: safeParseFloat(getVal('Longitude')),
            Project_Type: projectType,
            Facility_Type: getVal('Facility_Type') || '',
            Simple_ProjDesc: getVal('Simple_ProjDesc') || 'No Description Provided',
            Detailed_ProjDesc: getVal('Detailed_ProjDesc'),
            Implementing_Office: getVal('Implementing_Office') || '',
            Fund_Source: getVal('Fund_Source') || '',
            Actual_Status: actualStatus,
            Date_Posting: getVal('Date_Posting'),
            Date_NOA: getVal('Date_NOA'),
            Date_NTP: getVal('Date_NTP'),
            Target_Start: getVal('Target_Start') || '',
            Target_End: getVal('Target_End') || '',
            Revised_Target_End: getVal('Revised_Target_End'),
            Actual_Start: getVal('Actual_Start'),
            Actual_End: getVal('Actual_End'),
            Phys_Accomp_Rate: safeParseFloat(getVal('Phys_Accomp_Rate')) || 0,
            Appro_Infra: safeParseFloat(getVal('Appro_Infra')),
            Appro_Med_Equip: safeParseFloat(getVal('Appro_Med_Equip')),
            Appro_Motor_Vehicle: safeParseFloat(getVal('Appro_Motor_Vehicle')),
            Allot_Infra: safeParseFloat(getVal('Allot_Infra')),
            Allot_Med_Equip: safeParseFloat(getVal('Allot_Med_Equip')),
            Allot_Motor_Vehicle: safeParseFloat(getVal('Allot_Motor_Vehicle')),
            Oblig_Infra: safeParseFloat(getVal('Oblig_Infra')),
            Oblig_Med_Equip: safeParseFloat(getVal('Oblig_Med_Equip')),
            Oblig_Motor_Vehicle: safeParseFloat(getVal('Oblig_Motor_Vehicle')),
            Disb_Year0: safeParseFloat(getVal('Disb_Year0')),
            Disb_Year1: safeParseFloat(getVal('Disb_Year1')),
            Disb_Year2: safeParseFloat(getVal('Disb_Year2')),
            Disb_Year3: safeParseFloat(getVal('Disb_Year3')),
            Disb_Year4: safeParseFloat(getVal('Disb_Year4')),
            Total_Disbursed: safeParseFloat(getVal('Total_Disbursed')),
            Savings_Unobligated: safeParseFloat(getVal('Savings_Unobligated')),
            Negated_Funds: safeParseFloat(getVal('Negated_Funds')),
            Reverted_Funds: safeParseFloat(getVal('Reverted_Funds')),
            SAA_Number: getVal('SAA_Number'),
            OBR_No: getVal('OBR_No'),
            Contractor_Name: getVal('Contractor_Name'),
            Remarks: getVal('Remarks'),
            Specialty: getVal('Specialty'),
        };
        projects.push(project);
    }
    return projects;
};

export const projectsToCSV = (projects: any[]): string => {
    if (projects.length === 0) return '';

    // Define the headers we want to export (keys matching Project interface)
    const headers = [
        'Year_Funded', 'gaaCode', 'Region', 'Province_Name', 'Legislative_District',
        'City_or_Municipality', 'PSGC_Brgy', 'Barangay', 'NHFR_Code', 'Facility_Name',
        'Latitude', 'Longitude', 'Project_Type', 'Facility_Type', 'Simple_ProjDesc',
        'Detailed_ProjDesc', 'Implementing_Office', 'Fund_Source', 'Actual_Status',
        'Target_Start', 'Target_End', 'Revised_Target_End', 'Actual_Start', 'Actual_End',
        'Phys_Accomp_Rate', 'Appro_Infra', 'Appro_Med_Equip', 'Appro_Motor_Vehicle',
        'Allot_Infra', 'Allot_Med_Equip', 'Allot_Motor_Vehicle', 'Oblig_Infra',
        'Oblig_Med_Equip', 'Oblig_Motor_Vehicle', 'Total_Disbursed', 'Savings_Unobligated',
        'Negated_Funds', 'Reverted_Funds', 'SAA_Number', 'OBR_No', 'Contractor_Name',
        'Remarks', 'Specialty'
    ];

    // Helper to escape CSV values
    const escape = (val: any) => {
        if (val === undefined || val === null) return '';
        const str = String(val);
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
    };

    const headerRow = headers.join(',');
    const rows = projects.map(project => {
        return headers.map(header => escape(project[header])).join(',');
    });

    return [headerRow, ...rows].join('\n');
};
