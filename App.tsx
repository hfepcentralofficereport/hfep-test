
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Project, ProjectStatus, StatusHistoryEntry, GAAFund } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectFormModal from './components/ProjectFormModal';
import ProjectHistoryModal from './components/ProjectHistoryModal';
import DashboardView from './components/DashboardView';
import MasterlistView from './components/MasterlistView';
import GAAFundsView from './components/GAAFundsView';
import GAAFundFormModal from './components/GAAFundFormModal';

const initialProjects: Project[] = [
    {
        "id": "proj-0",
        "Year_Funded": 2010,
        "gaaCode": "GAA-2010-IMPORTED",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.03436,
        "Longitude": 120.6848,
        "Project_Type": "New Construction",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "Construction of Three (3) Storey Building OR/Surgery Ward Complex (Phase 3)",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Regular GAA",
        "Actual_Status": "K. Completed as Functional",
        "Date_NOA": "11/25/2010",
        "Date_NTP": "9/22/2011",
        "Target_Start": "2010-11-25",
        "Target_End": "2011-09-22",
        "Actual_Start": "2010-11-25",
        "Actual_End": "2011-09-22",
        "Phys_Accomp_Rate": 100,
        "Appro_Infra": 15000000,
        "Allot_Infra": 15000000,
        "Oblig_Infra": 15000000,
        "Total_Disbursed": 15000000,
        "SAA_Number": "SAA# 10-08-1180",
        "OBR_No": "CO-10-11-01 CO-11-11-01",
        "Contractor_Name": "Lucky Star Construction and Trading",
        "Remarks": "Completed",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-1",
        "Year_Funded": 2013,
        "gaaCode": "GAA-2013-IMPORTED",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.03429,
        "Longitude": 120.6844,
        "Project_Type": "New Construction",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "Design and Build for six (6) Storey Ob-gyne/Pedia Building and Medical Ward Building and Construction of four (4) storey Ob-gyne and Pedia Building with Pile Driving, Fire Protection and Medical Gas Piping, Construction of Ramp, Connecting Corridor and and Construction of four (4) elevator shafts, Construction of deepwell including relocation of utilities and demolition of sub-structures and disposal",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Regular GAA",
        "Actual_Status": "K. Completed as Functional",
        "Date_NOA": "4/8/2014",
        "Date_NTP": "3/20/2016",
        "Target_Start": "2014-04-04",
        "Target_End": "2016-03-20",
        "Actual_Start": "2014-04-04",
        "Actual_End": "2016-03-20",
        "Phys_Accomp_Rate": 100,
        "Appro_Infra": 250000000,
        "Allot_Infra": 250000000,
        "Oblig_Infra": 250000000,
        "Total_Disbursed": 250000000,
        "SAA_Number": "SAA# 13-01-029",
        "OBR_No": "CO-13-08-01",
        "Contractor_Name": "R.R Encabo Constructors INC.",
        "Remarks": "Completed (Savings of 5,184,865.58 was utilized for Medical Ward Phase II please see CY-2016)",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-2",
        "Year_Funded": 2015,
        "gaaCode": "GAA-2015-IMPORTED",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.03477,
        "Longitude": 120.6844,
        "Project_Type": "New Construction",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "Construction of Medical Ward Building Phase I",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Direct to Hospital",
        "Actual_Status": "K. Completed as Functional",
        "Date_NOA": "5/1/2016",
        "Date_NTP": "6/5/2017",
        "Target_Start": "2016-05-01",
        "Target_End": "2018-01-15",
        "Actual_Start": "2016-05-01",
        "Actual_End": "2018-01-15",
        "Phys_Accomp_Rate": 100,
        "Appro_Infra": 100000000,
        "Allot_Infra": 100000000,
        "Oblig_Infra": 100000000,
        "Total_Disbursed": 100000000,
        "SAA_Number": "ROIII-15-0018046",
        "OBR_No": "(06-102101-2016-03-01 CY 2015 Cont. Regular) (CO-13-12-02 CY 2013 Sub-Allotment from DOH-CO (HFEP-Infrastructure)",
        "Contractor_Name": "R.R Encabo Constructors INC.",
        "Remarks": "Completed (Note: 5,184,865.58 Additional Allotment was from Savings in HFEP Approved Budget 2013",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-3",
        "Year_Funded": 2016,
        "gaaCode": "GAA-2016-IMPORTED",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.03449,
        "Longitude": 120.6842,
        "Project_Type": "Completion",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "1.)Completion of 5th & 6th Floor OB-Gyne/Pedia Building 2.)Completion of 5th & 6th Floor Medical Wards Building",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Direct to Hospital",
        "Actual_Status": "K. Completed as Functional",
        "Date_NOA": "11/14/2016",
        "Date_NTP": "7/1/2017",
        "Target_Start": "2016-11-14",
        "Target_End": "2017-06-22",
        "Actual_Start": "2016-11-14",
        "Actual_End": "2017-06-22",
        "Phys_Accomp_Rate": 100,
        "Appro_Infra": 64748000,
        "Allot_Infra": 64748000,
        "Oblig_Infra": 64748000,
        "Total_Disbursed": 64748000,
        "SAA_Number": "GAA CY-2016",
        "OBR_No": "06-101101-2016-10-01, 06-101101-2016-12-02",
        "Contractor_Name": "Lucky Star Construction and Trading",
        "Remarks": "Completed",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-4",
        "Year_Funded": 2016,
        "gaaCode": "GAA-2016-IMPORTED",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.03496,
        "Longitude": 120.6851,
        "Project_Type": "Upgrading",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "1.) REHABILITATION OF WATER & DRAINAGE SYSTEM 2.) REHABILITATION AND UPGRADING OF ELECTRICAL SYSTEM 3.) COMPLETION OF 4TH FLOOR SURGERY BLDG. WARD AND CONSTRUCTION OF CONNECTING BRIDGE FROM ER TO SURGERY AND SURGERY TO OB-GYNE/PEDIA BLDG. INCLUDING REHABILITATION OF CR'S FROM GROUND TO 3RD FLOOR AND REPAINTING OF WHOLE BUILDING 4.) CONSTRUCTION OF DIETARY BUILDING",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Direct to Hospital",
        "Actual_Status": "K. Completed as Functional",
        "Date_NOA": "11/25/2016",
        "Date_NTP": "1/24/2018",
        "Target_Start": "2016-11-25",
        "Target_End": "2018-01-24",
        "Actual_Start": "2016-11-25",
        "Actual_End": "2018-01-24",
        "Phys_Accomp_Rate": 100,
        "Appro_Infra": 110000000,
        "Allot_Infra": 110000000,
        "Oblig_Infra": 110000000,
        "Total_Disbursed": 109999973,
        "SAA_Number": "ROIII-16-0010071",
        "OBR_No": "(06-102101-2016-10-06) (06-102101-2016-10-02) (06-102101-2016-12-23",
        "Contractor_Name": "Lucky Star Construction and Trading",
        "Remarks": "Completed",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-5",
        "Year_Funded": 2017,
        "gaaCode": "GAA-2017-IMPORTED",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.0341,
        "Longitude": 120.6851,
        "Project_Type": "New Construction",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "DESIGN & BUILD FOR SEVEN (7) STOREY & CONSTRUCTION OF ONE (1) STOREY OPD & PUBLIC HEALTH UNIT BLDG. WITH 2ND FLR. SLAB & 1ST LIFT OF 2ND FLR. COLUMN INCLUDING ROUGHING-INS - PHASE 1 INCLUDING DEMOLITION & HAULING OF DEBRIS OF THE EXISTING TWO (2) STOREY OPD BLDG.",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Direct to Hospital",
        "Actual_Status": "K. Completed as Functional",
        "Date_NOA": "5/19/2017",
        "Date_NTP": "6/9/2018",
        "Target_Start": "2017-05-19",
        "Target_End": "2018-04-30",
        "Actual_Start": "2017-05-19",
        "Actual_End": "2018-04-30",
        "Phys_Accomp_Rate": 100,
        "Appro_Infra": 50000000,
        "Allot_Infra": 50000000,
        "Oblig_Infra": 50000000,
        "Total_Disbursed": 50000000,
        "SAA_Number": "GAA CY-2017",
        "OBR_No": "06-101101-2017-04-01",
        "Contractor_Name": "Lucky Star Construction and Trading",
        "Remarks": "Completed",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-6",
        "Year_Funded": 2018,
        "gaaCode": "GAA-2018-IMPORTED",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.0341,
        "Longitude": 120.6851,
        "Project_Type": "New Construction",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "Construction of Seven Storey OPD and Public Health Unit Building - Phase II",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Regular GAA",
        "Actual_Status": "K. Completed as Functional",
        "Date_NOA": "2/12/2018",
        "Date_NTP": "10/5/2019",
        "Target_Start": "2018-01-02",
        "Target_End": "2019-10-05",
        "Actual_Start": "2018-01-02",
        "Actual_End": "2019-10-05",
        "Phys_Accomp_Rate": 100,
        "Appro_Infra": 235000000,
        "Allot_Infra": 235000000,
        "Oblig_Infra": 235000000,
        "Disb_Year0": 230370500,
        "Disb_Year1": 4629500,
        "Total_Disbursed": 235000000,
        "SAA_Number": "GAA CY-2018",
        "OBR_No": "06-101101-2018-02-01, 06-101101-2018-11-09",
        "Contractor_Name": "Lucky Star Construction and Trading",
        "Remarks": "Completed",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-7",
        "Year_Funded": 2019,
        "gaaCode": "GAA-2019-IMPORTED",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.0341,
        "Longitude": 120.6851,
        "Project_Type": "Completion",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "Completion of Seven Storey OPD & Public Health Unit Building (Adjacent or Contiguous)",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Regular GAA",
        "Actual_Status": "K. Completed as Functional",
        "Date_Posting": "6/10/2019",
        "Date_NOA": "8/7/2019",
        "Date_NTP": "8/9/2019",
        "Target_Start": "2019-08-12",
        "Target_End": "2020-03-09",
        "Actual_Start": "2019-08-12",
        "Actual_End": "2020-06-15",
        "Phys_Accomp_Rate": 100,
        "Appro_Infra": 179000000,
        "Allot_Infra": 179000000,
        "Oblig_Infra": 179000000,
        "Disb_Year0": 133519933.66,
        "Disb_Year1": 45480066.34,
        "Total_Disbursed": 179000000,
        "SAA_Number": "SAA# 2019-08-1246",
        "OBR_No": "06-101101-2019-08-01, 06-101101-2019-12-03",
        "Contractor_Name": "Lucky Star Construction and Trading",
        "Remarks": "Completed",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-8",
        "Year_Funded": 2020,
        "gaaCode": "20202376",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.03436,
        "Longitude": 120.6848,
        "Project_Type": "Completion",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "COMPLETION OF SEVEN STOREY REPRODUCTIVE HEALTH & WOMEN'S WELLNESS CENTER BUILDING",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Regular GAA",
        "Actual_Status": "K. Completed as Functional",
        "Date_Posting": "6/1/2020",
        "Date_NOA": "6/10/2020",
        "Date_NTP": "6/11/2020",
        "Target_Start": "2020-06-18",
        "Target_End": "2021-02-13",
        "Actual_Start": "2020-06-18",
        "Actual_End": "2020-12-15",
        "Phys_Accomp_Rate": 100,
        "Appro_Infra": 50000000,
        "Allot_Infra": 50000000,
        "Oblig_Infra": 50000000,
        "Total_Disbursed": 50000000,
        "Savings_Unobligated": 0,
        "Negated_Funds": 0,
        "Reverted_Funds": 0,
        "SAA_Number": "SAA# 2020-03-398",
        "OBR_No": "06-101101-2020-06-01",
        "Contractor_Name": "Lucky Star Construction and Trading",
        "Remarks": "Completed",
        "Specialty": "Women's Reproductive Health",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-9",
        "Year_Funded": 2021,
        "gaaCode": "20211667",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.03436,
        "Longitude": 120.6848,
        "Project_Type": "Upgrading",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "Rehabilitation & Upgrading of 5-storey frontline building - phase 1",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Regular GAA",
        "Actual_Status": "K. Completed as Functional",
        "Date_Posting": "6/8/2021",
        "Date_NOA": "7/22/2021",
        "Date_NTP": "7/27/2021",
        "Target_Start": "2021-08-07",
        "Target_End": "2022-03-05",
        "Actual_Start": "2021-08-07",
        "Actual_End": "2022-04-17",
        "Phys_Accomp_Rate": 100,
        "Appro_Infra": 55000000,
        "Allot_Infra": 55000000,
        "Oblig_Infra": 55000000,
        "Total_Disbursed": 55000000,
        "Savings_Unobligated": 0,
        "Negated_Funds": 0,
        "Reverted_Funds": 0,
        "SAA_Number": "SAA# 2021-02-0353, GAA CY-2021",
        "OBR_No": "06-101101-2021-07-01",
        "Contractor_Name": "Lucky Star Construction and Trading",
        "Remarks": "Completed (HFEP SAA = 30M, GAA CO = 25M)",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-10",
        "Year_Funded": 2022,
        "gaaCode": "20221878",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.03436,
        "Longitude": 120.6848,
        "Project_Type": "Completion",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "Completion of Rehabilitation and Upgrading of Five-Storey Frontline Building",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Regular GAA",
        "Actual_Status": "K. Completed as Functional",
        "Date_Posting": "2/28/2022",
        "Date_NOA": "3/21/2022",
        "Date_NTP": "3/22/2022",
        "Target_Start": "2022-04-02",
        "Target_End": "2022-11-28",
        "Actual_Start": "2022-01-27",
        "Actual_End": "2023-06-26",
        "Phys_Accomp_Rate": 100,
        "Appro_Infra": 50000000,
        "Allot_Infra": 50000000,
        "Oblig_Infra": 50000000,
        "Disb_Year0": 42543129.63,
        "Disb_Year1": 7456870.37,
        "Total_Disbursed": 50000000,
        "Savings_Unobligated": 0,
        "Negated_Funds": 0,
        "Reverted_Funds": 0,
        "SAA_Number": "SAA# 2022-02-0474",
        "OBR_No": "06-101101-2022-03-01",
        "Contractor_Name": "Lucky Star Construction & Trading",
        "Remarks": "Completed",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-11",
        "Year_Funded": 2022,
        "gaaCode": "20221878",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.035075,
        "Longitude": 120.6846444,
        "Project_Type": "New Construction",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "Construction of Six-Storey Orthopedics Building and Four-Storey Trauma Building - Phase 1",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "MYOA (Direct to Hospital)",
        "Actual_Status": "K. Completed as Functional",
        "Date_Posting": "1/12/2022",
        "Date_NOA": "2/4/2022",
        "Date_NTP": "2/7/2022",
        "Target_Start": "2022-02-09",
        "Target_End": "2022-09-16",
        "Actual_Start": "2022-02-09",
        "Actual_End": "2023-01-16",
        "Phys_Accomp_Rate": 100,
        "Appro_Infra": 150000000,
        "Allot_Infra": 150000000,
        "Oblig_Infra": 150000000,
        "Disb_Year0": 148249169.36,
        "Disb_Year1": 1750830.64,
        "Total_Disbursed": 150000000,
        "Savings_Unobligated": 0,
        "Negated_Funds": 0,
        "Reverted_Funds": 0,
        "SAA_Number": "GAA CY-2022",
        "OBR_No": "06-101101-2022-02-01, 06-101101-2022-08-02",
        "Contractor_Name": "Lucky Star Construction & Trading",
        "Remarks": "Completed (MYCA)",
        "Specialty": "Orthopedic Care / Trauma Care",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-12",
        "Year_Funded": 2023,
        "gaaCode": "20232128",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.035075,
        "Longitude": 120.6846444,
        "Project_Type": "New Construction",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "Construction of Six-Storey Orthopedics Building and Four-Storey Trauma Building - Phase 2",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "MYOA (Direct to Hospital)",
        "Actual_Status": "K. Completed as Functional",
        "Date_Posting": "12/21/2022",
        "Date_NOA": "1/16/2023",
        "Date_NTP": "1/17/2023",
        "Target_Start": "2023-02-09",
        "Target_End": "2024-02-04",
        "Actual_Start": "2023-02-09",
        "Actual_End": "2024-02-24",
        "Phys_Accomp_Rate": 100,
        "Appro_Infra": 100000000,
        "Allot_Infra": 100000000,
        "Oblig_Infra": 100000000,
        "Disb_Year0": 77216084.4,
        "Disb_Year1": 22783915.6,
        "Total_Disbursed": 100000000,
        "Savings_Unobligated": 0,
        "Negated_Funds": 0,
        "Reverted_Funds": 0,
        "SAA_Number": "GAA CY-2023",
        "OBR_No": "06-101101-2023-02-01",
        "Contractor_Name": "Lucky Star Construction & Trading",
        "Remarks": "Completed (MYCA)",
        "Specialty": "Orthopedic Care / Trauma Care",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-13",
        "Year_Funded": 2023,
        "gaaCode": "20232128",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.2018,
        "Longitude": 120.514,
        "Project_Type": "New Construction",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "Construction of Renal Care Center Building Phase 1",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Direct to Hospital",
        "Actual_Status": "I. On-going Construction/Delivery",
        "Target_Start": "0",
        "Target_End": "0",
        "Phys_Accomp_Rate": 100,
        "Appro_Infra": 500000000,
        "Allot_Infra": 500000000,
        "Oblig_Infra": 500000000,
        "Disb_Year1": 500000000,
        "Total_Disbursed": 500000000,
        "Savings_Unobligated": 0,
        "Negated_Funds": 0,
        "Reverted_Funds": 0,
        "SAA_Number": "GAA CY-2023",
        "OBR_No": "06-101101-2023-12-02",
        "Contractor_Name": "Department of Public Works and Highways (DPWH)",
        "Remarks": "Fully Disbursed (c/o DPWH)",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "I. On-going Construction/Delivery", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-14",
        "Year_Funded": 2023,
        "gaaCode": "20232128",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.2018,
        "Longitude": 120.514,
        "Project_Type": "New Construction",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "Construction of Renal Care Center Building Phase 1",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Regular GAA",
        "Actual_Status": "I. On-going Construction/Delivery",
        "Target_Start": "0",
        "Target_End": "0",
        "Phys_Accomp_Rate": 100,
        "Appro_Infra": 500000000,
        "Allot_Infra": 500000000,
        "Oblig_Infra": 500000000,
        "Disb_Year1": 500000000,
        "Total_Disbursed": 500000000,
        "Savings_Unobligated": 0,
        "Negated_Funds": 0,
        "Reverted_Funds": 0,
        "SAA_Number": "SAA# 2023-12-1450",
        "OBR_No": "06-101101-2023-12-01",
        "Contractor_Name": "Department of Public Works and Highways (DPWH)",
        "Remarks": "Fully Disbursed (c/o DPWH)",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "I. On-going Construction/Delivery", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-15",
        "Year_Funded": 2024,
        "gaaCode": "20241431",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.035075,
        "Longitude": 120.6846444,
        "Project_Type": "New Construction",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "Completion of Six-Storey Orthopedics Building and Four-Storey Trauma Building",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "MYOA (Direct to Hospital)",
        "Actual_Status": "K. Completed as Functional",
        "Date_Posting": "1/10/2024",
        "Date_NOA": "1/31/2024",
        "Date_NTP": "2/13/2024",
        "Target_Start": "2024-02-23",
        "Target_End": "2025-02-17",
        "Revised_Target_End": "6/7/2025",
        "Actual_Start": "2024-02-23",
        "Actual_End": "2025-06-06",
        "Phys_Accomp_Rate": 100,
        "Appro_Infra": 70000000,
        "Allot_Infra": 70000000,
        "Oblig_Infra": 70000000,
        "Disb_Year0": 67195617.64,
        "Disb_Year1": 2804382.36,
        "Total_Disbursed": 70000000,
        "Savings_Unobligated": 0,
        "Negated_Funds": 0,
        "Reverted_Funds": 0,
        "SAA_Number": "GAA CY-2024",
        "OBR_No": "06-101101-2024-01-001",
        "Contractor_Name": "Lucky Star Construction & Trading",
        "Remarks": "Completed (MYCA)",
        "Specialty": "Orthopedic Care / Trauma Care",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-16",
        "Year_Funded": 2025,
        "gaaCode": "20251091",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 14.99629722,
        "Longitude": 120.7015667,
        "Project_Type": "New Construction",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "Expansion of JBLMGH Ambulatory Surgical and Multi-Specialty Center - Phase 1 (Provision of Radiation Oncology, Dialysis and Clinics Including Adaptation Works of Existing Building) / Engineering and Administrative Overhead (EAO) Expenses Funds for the Implementation of Infrastructure Projects",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Regular GAA",
        "Actual_Status": "I. On-going Construction/Delivery",
        "Date_Posting": "2/14/2025",
        "Date_NOA": "5/13/2025",
        "Date_NTP": "5/22/2025",
        "Target_Start": "2025-06-26",
        "Target_End": "2026-03-23",
        "Phys_Accomp_Rate": 28.16,
        "Appro_Infra": 99000000,
        "Allot_Infra": 99000000,
        "Oblig_Infra": 99000000,
        "Disb_Year0": 16179619.98,
        "Total_Disbursed": 16179619.98,
        "SAA_Number": "SAA# 2025-05-3037 / 2025-07-3433",
        "OBR_No": "06-101101-2025-05-01 / 06-101101-2025-09-02",
        "Contractor_Name": "Lucky Star Construction & Trading",
        "Remarks": "",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "I. On-going Construction/Delivery", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-17",
        "Year_Funded": 2013,
        "gaaCode": "GAA-2013-IMPORTED",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.03496,
        "Longitude": 120.6851,
        "Project_Type": "Equipping",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "1-unit Electro cautery machine",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Regular GAA",
        "Actual_Status": "K. Completed as Functional",
        "Target_Start": "0",
        "Target_End": "0",
        "Phys_Accomp_Rate": 100,
        "Appro_Med_Equip": 480000,
        "Allot_Med_Equip": 480000,
        "Oblig_Med_Equip": 479980,
        "Total_Disbursed": 479980,
        "SAA_Number": "SAA No. 13-12-1068",
        "OBR_No": "CO-13-12-01",
        "Contractor_Name": "Surgico Philippines Inc.",
        "Remarks": "Functional/ Utilized",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-18",
        "Year_Funded": 2013,
        "gaaCode": "GAA-2013-IMPORTED",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.03496,
        "Longitude": 120.6851,
        "Project_Type": "Equipping",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "20-units BP Apparatus",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Regular GAA",
        "Actual_Status": "K. Completed as Functional",
        "Target_Start": "0",
        "Target_End": "0",
        "Phys_Accomp_Rate": 100,
        "Appro_Med_Equip": 320000,
        "Allot_Med_Equip": 320000,
        "Oblig_Med_Equip": 320000,
        "Total_Disbursed": 320000,
        "SAA_Number": "SAA No. 13-12-1079",
        "OBR_No": "CO-13-12-02",
        "Contractor_Name": "Surgico Philippines Inc.",
        "Remarks": "Functional/ Utilized",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-19",
        "Year_Funded": 2014,
        "gaaCode": "GAA-2014-IMPORTED",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.03496,
        "Longitude": 120.6851,
        "Project_Type": "Equipping",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "2-units ECG Machine",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Regular GAA",
        "Actual_Status": "K. Completed as Functional",
        "Target_Start": "0",
        "Target_End": "0",
        "Phys_Accomp_Rate": 100,
        "Appro_Med_Equip": 96700,
        "Allot_Med_Equip": 96700,
        "Oblig_Med_Equip": 96700,
        "Total_Disbursed": 96700,
        "SAA_Number": "GAA CY-2014",
        "OBR_No": "CO-14-05-01",
        "Contractor_Name": "Medical Center Trading Corp.",
        "Remarks": "Functional/ Utilized",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-20",
        "Year_Funded": 2014,
        "gaaCode": "GAA-2014-IMPORTED",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.03496,
        "Longitude": 120.6851,
        "Project_Type": "Equipping",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "4-units Computer Set",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Regular GAA",
        "Actual_Status": "K. Completed as Functional",
        "Target_Start": "0",
        "Target_End": "0",
        "Phys_Accomp_Rate": 100,
        "Appro_Med_Equip": 134111.2,
        "Allot_Med_Equip": 134111.2,
        "Oblig_Med_Equip": 134111.2,
        "Total_Disbursed": 134111.2,
        "SAA_Number": "GAA CY-2014",
        "OBR_No": "CO-14-12-02",
        "Contractor_Name": "PRJ Computer Center",
        "Remarks": "Functional/ Utilized",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-21",
        "Year_Funded": 2014,
        "gaaCode": "GAA-2014-IMPORTED",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.03496,
        "Longitude": 120.6851,
        "Project_Type": "Equipping",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "1-unit Laptop",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Regular GAA",
        "Actual_Status": "K. Completed as Functional",
        "Target_Start": "0",
        "Target_End": "0",
        "Phys_Accomp_Rate": 100,
        "Appro_Med_Equip": 37312,
        "Allot_Med_Equip": 37312,
        "Oblig_Med_Equip": 37312,
        "Total_Disbursed": 37312,
        "SAA_Number": "GAA CY-2014",
        "OBR_No": "CO-14-12-02",
        "Contractor_Name": "PRJ Computer Center",
        "Remarks": "Functional/ Utilized",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-22",
        "Year_Funded": 2014,
        "gaaCode": "GAA-2014-IMPORTED",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.03496,
        "Longitude": 120.6851,
        "Project_Type": "Equipping",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "1-unit Computer Set with Printer",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Regular GAA",
        "Actual_Status": "K. Completed as Functional",
        "Target_Start": "0",
        "Target_End": "0",
        "Phys_Accomp_Rate": 100,
        "Appro_Med_Equip": 31876.8,
        "Allot_Med_Equip": 31876.8,
        "Oblig_Med_Equip": 31876.8,
        "Total_Disbursed": 31876.8,
        "SAA_Number": "GAA CY-2014",
        "OBR_No": "CO-14-12-03",
        "Contractor_Name": "PRJ Computer Center",
        "Remarks": "Functional/ Utilized",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    {
        "id": "proj-23",
        "Year_Funded": 2016,
        "gaaCode": "GAA-2016-IMPORTED",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.03496,
        "Longitude": 120.6851,
        "Project_Type": "Equipping",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "1-unit 2 HP Window type aircon",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Direct to Hospital",
        "Actual_Status": "K. Completed as Functional",
        "Target_Start": "0",
        "Target_End": "0",
        "Phys_Accomp_Rate": 100,
        "Appro_Med_Equip": 24000,
        "Allot_Med_Equip": 24000,
        "Oblig_Med_Equip": 24000,
        "Total_Disbursed": 24000,
        "SAA_Number": "ROIII-16-0010071",
        "OBR_No": "06-102101-2016-12-27",
        "Contractor_Name": "Savers Electronic World Inc",
        "Remarks": "Functional/ Utilized",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    },
    // FIX: The following project data was incomplete and has been reconstructed.
    {
        "id": "proj-24",
        "Year_Funded": 2016,
        "gaaCode": "GAA-2016-IMPORTED",
        "Region": "Region III",
        "Province_Name": "Pampanga",
        "Legislative_District": "Pampanga, 3rd District",
        "City_or_Municipality": "San Fernando City",
        "PSGC_Brgy": "305416010",
        "Barangay": "Dolores",
        "NHFR_Code": "271",
        "Facility_Name": "Jose B. Lingad Memorial Regional Hospital",
        "Latitude": 15.03496,
        "Longitude": 120.6851,
        "Project_Type": "Equipping",
        "Facility_Type": "DOH Hospital",
        "Simple_ProjDesc": "1-unit Plasma Sterilizer",
        "Implementing_Office": "DOH Hospital",
        "Fund_Source": "Direct to Hospital",
        "Actual_Status": "K. Completed as Functional",
        "Target_Start": "0",
        "Target_End": "0",
        "Phys_Accomp_Rate": 100,
        "Appro_Med_Equip": 2300000,
        "Allot_Med_Equip": 2300000,
        "Oblig_Med_Equip": 2300000,
        "Total_Disbursed": 2300000,
        "SAA_Number": "ROIII-16-0010071",
        "OBR_No": "06-102101-2016-12-28",
        "Contractor_Name": "Surgico Philippines Inc.",
        "Remarks": "Functional/ Utilized",
        "Specialty": "Not Applicabe",
        "statusHistory": [{"status": "K. Completed as Functional", "date": "2024-01-01T00:00:00.000Z"}]
    }
];

const initialGAAFunds: GAAFund[] = [
  { id: 'gaa-1', gaaCode: 'GAA-2010-IMPORTED', description: 'Imported GAA 2010', year: 2010, allocationInfra: 15000000 },
  { id: 'gaa-2', gaaCode: 'GAA-2013-IMPORTED', description: 'Imported GAA 2013', year: 2013, allocationInfra: 250000000, allocationMedEquip: 800000 },
  { id: 'gaa-3', gaaCode: 'GAA-2015-IMPORTED', description: 'Imported GAA 2015', year: 2015, allocationInfra: 100000000 },
  { id: 'gaa-4', gaaCode: 'GAA-2016-IMPORTED', description: 'Imported GAA 2016', year: 2016, allocationInfra: 174748000, allocationMedEquip: 2324000 },
  { id: 'gaa-5', gaaCode: 'GAA-2017-IMPORTED', description: 'Imported GAA 2017', year: 2017, allocationInfra: 50000000 },
  { id: 'gaa-6', gaaCode: 'GAA-2018-IMPORTED', description: 'Imported GAA 2018', year: 2018, allocationInfra: 235000000 },
  { id: 'gaa-7', gaaCode: 'GAA-2019-IMPORTED', description: 'Imported GAA 2019', year: 2019, allocationInfra: 179000000 },
  { id: 'gaa-8', gaaCode: '20202376', description: 'Regular GAA 2020', year: 2020, allocationInfra: 50000000 },
  { id: 'gaa-9', gaaCode: '20211667', description: 'Regular GAA 2021', year: 2021, allocationInfra: 55000000 },
  { id: 'gaa-10', gaaCode: '20221878', description: 'Regular GAA 2022', year: 2022, allocationInfra: 200000000 },
  { id: 'gaa-11', gaaCode: '20232128', description: 'Regular GAA 2023', year: 2023, allocationInfra: 1100000000 },
  { id: 'gaa-12', gaaCode: '20241431', description: 'Regular GAA 2024', year: 2024, allocationInfra: 70000000 },
  { id: 'gaa-13', gaaCode: '20251091', description: 'Regular GAA 2025', year: 2025, allocationInfra: 99000000 },
  { id: 'gaa-14', gaaCode: 'GAA-2014-IMPORTED', description: 'Imported GAA 2014', year: 2014, allocationMedEquip: 300000 },
];

// FIX: Export View type for use in other components like Header.
export type View = 'dashboard' | 'masterlist' | 'gaa';

const App: React.FC = () => {
  // Initialize state from LocalStorage if available, otherwise use default data
  const [projects, setProjects] = useState<Project[]>(() => {
      try {
          const savedProjects = localStorage.getItem('hfep_projects');
          return savedProjects ? JSON.parse(savedProjects) : initialProjects;
      } catch (e) {
          console.error("Failed to load projects from local storage", e);
          return initialProjects;
      }
  });

  const [gaaFunds, setGAAFunds] = useState<GAAFund[]>(() => {
      try {
          const savedFunds = localStorage.getItem('hfep_gaa_funds');
          return savedFunds ? JSON.parse(savedFunds) : initialGAAFunds;
      } catch (e) {
          console.error("Failed to load GAA funds from local storage", e);
          return initialGAAFunds;
      }
  });

  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [viewingHistoryFor, setViewingHistoryFor] = useState<Project | null>(null);
  const [isGAAFundFormOpen, setIsGAAFundFormOpen] = useState(false);
  const [editingGAAFund, setEditingGAAFund] = useState<GAAFund | null>(null);

  // Persist changes to LocalStorage whenever state updates
  useEffect(() => {
      localStorage.setItem('hfep_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
      localStorage.setItem('hfep_gaa_funds', JSON.stringify(gaaFunds));
  }, [gaaFunds]);

  const filteredProjects = useMemo(() => {
    if (!searchTerm) return projects;
    const lowercasedTerm = searchTerm.toLowerCase();
    return projects.filter(p =>
      p.Simple_ProjDesc.toLowerCase().includes(lowercasedTerm) ||
      p.Facility_Name.toLowerCase().includes(lowercasedTerm) ||
      p.City_or_Municipality.toLowerCase().includes(lowercasedTerm) ||
      p.Province_Name.toLowerCase().includes(lowercasedTerm) ||
      p.gaaCode.toLowerCase().includes(lowercasedTerm)
    );
  }, [projects, searchTerm]);

  const handleSaveProject = useCallback((projectData: Omit<Project, 'id'> | Project) => {
    if ('id' in projectData) { // Editing
      const oldProject = projects.find(p => p.id === projectData.id);
      const newHistory: StatusHistoryEntry[] = oldProject?.statusHistory ? [...oldProject.statusHistory] : [];
      if (!oldProject || oldProject.Actual_Status !== projectData.Actual_Status) {
        newHistory.push({ status: projectData.Actual_Status, date: new Date().toISOString() });
      }

      setProjects(prev => prev.map(p => p.id === projectData.id ? { ...p, ...projectData, statusHistory: newHistory } : p));
    } else { // Adding
      const newProject: Project = {
        ...projectData,
        id: `proj-${Date.now()}`,
        statusHistory: [{ status: projectData.Actual_Status, date: new Date().toISOString() }],
      };
      setProjects(prev => [...prev, newProject]);
    }
    setIsFormOpen(false);
    setEditingProject(null);
  }, [projects]);

  const handleBulkUploadProjects = useCallback((newlyParsedProjects: Omit<Project, 'id' | 'statusHistory'>[]) => {
    if (newlyParsedProjects.length === 0) {
        alert("No valid projects found in the file to upload.");
        return;
    }

    const projectsToAdd: Project[] = newlyParsedProjects.map((p, index) => ({
      ...p,
      id: `proj-bulk-${Date.now()}-${index}`,
      statusHistory: [{ status: p.Actual_Status, date: new Date().toISOString() }],
    }));

    setProjects(prev => [...prev, ...projectsToAdd]);

    alert(`${projectsToAdd.length} projects were successfully uploaded.`);
  }, []);


  const handleEditProject = useCallback((project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  }, []);

  const handleDeleteProject = useCallback((projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== projectId));
    }
  }, []);

  const handleViewHistory = useCallback((project: Project) => {
    setViewingHistoryFor(project);
    setIsHistoryOpen(true);
  }, []);
  
  const handleSaveGAAFund = useCallback((fundData: Omit<GAAFund, 'id'> | GAAFund) => {
    if ('id' in fundData) {
        setGAAFunds(prev => prev.map(f => f.id === fundData.id ? {...f, ...fundData} : f));
    } else {
        const newFund: GAAFund = { ...fundData, id: `gaa-${Date.now()}` };
        setGAAFunds(prev => [...prev, newFund]);
    }
    setIsGAAFundFormOpen(false);
    setEditingGAAFund(null);
  }, []);
  
  const handleEditGAAFund = useCallback((fund: GAAFund) => {
    setEditingGAAFund(fund);
    setIsGAAFundFormOpen(true);
  }, []);

  const handleDeleteGAAFund = useCallback((fundId: string) => {
    if(window.confirm('Are you sure you want to delete this GAA Fund? This might affect projects linked to it.')) {
        const fundToDelete = gaaFunds.find(f => f.id === fundId);
        if(fundToDelete && projects.some(p => p.gaaCode === fundToDelete.gaaCode)) {
            alert('Cannot delete this fund as it is still linked to one or more projects.');
            return;
        }
        setGAAFunds(prev => prev.filter(f => f.id !== fundId));
    }
  }, [gaaFunds, projects]);

  const handleResetData = () => {
      if (window.confirm("WARNING: This will erase all your changes and reset the app to the original sample data. Are you sure?")) {
          localStorage.removeItem('hfep_projects');
          localStorage.removeItem('hfep_gaa_funds');
          setProjects(initialProjects);
          setGAAFunds(initialGAAFunds);
          alert("Data reset to defaults.");
      }
  }


  return (
    <div className="bg-gray-100 min-h-screen font-sans flex flex-col">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="container mx-auto p-4 md:p-6 lg:p-8 flex-grow">
        {currentView === 'dashboard' && <DashboardView projects={projects} />}
        {currentView === 'masterlist' && (
          <MasterlistView 
            projects={filteredProjects}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onAddNew={() => {
              setEditingProject(null);
              setIsFormOpen(true);
            }}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onViewHistory={handleViewHistory}
            onBulkUpload={handleBulkUploadProjects}
            onResetData={handleResetData}
          />
        )}
        {currentView === 'gaa' && (
          <GAAFundsView 
            funds={gaaFunds}
            projects={projects}
            onAddNew={() => {
              setEditingGAAFund(null);
              setIsGAAFundFormOpen(true);
            }}
            onEdit={handleEditGAAFund}
            onDelete={handleDeleteGAAFund}
          />
        )}
      </main>
      
      <Footer />
      
      <ProjectFormModal 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProject}
        project={editingProject}
        gaaFunds={gaaFunds}
      />
      
      <GAAFundFormModal
        isOpen={isGAAFundFormOpen}
        onClose={() => setIsGAAFundFormOpen(false)}
        onSave={handleSaveGAAFund}
        fund={editingGAAFund}
      />

      <ProjectHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        project={viewingHistoryFor}
      />
    </div>
  );
};

// FIX: Add default export to make it available for import in index.tsx.
export default App;
