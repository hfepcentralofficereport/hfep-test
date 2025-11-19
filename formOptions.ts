export const YEARS_FUNDED = Array.from({ length: 2025 - 2008 + 1 }, (_, i) => 2025 - i);

export const FACILITY_TYPES = [
    'DOH Hospital', 
    'Blood Service Facility', 
    'Bucas', 
    'Subnational Laboratory'
];

export const IMPLEMENTING_OFFICES = [
    'LGU', 
    'DPWH', 
    'CHD', 
    'DOH Hospital'
];

export const FUND_SOURCES = [
    'Regular GAA', 
    'Savings', 
    'World Bank', 
    'ADB', 
    'Direct to Hospital', 
    'MYOA (Regular GAA)', 
    'MYOA (Direct to Hospital)', 
    'Bayanihan'
];

export const REGIONS = [
    'Region I', 'Region II', 'CAR', 'Region III', 'Region IV-A', 'Region IV-B', 
    'Region V', 'Region VI', 'Region VII', 'Region VIII', 'Region IX', 'Region X', 
    'Region XI', 'Region XII', 'Region XIII', 'BARMM', 'NCR'
];

export const SPECIALTIES = [
    'Not Applicabe', 'Brain and Spine Care', 'Burn Care', 'Cancer Care', 'Cardiovascular Care', 
    'Dermatology', 'ENT', 'Eye Care', 'Geriatric Care', 'Infectious Disease and Tropical Medicine', 
    'Lung Care', 'Mental Health', 'Neonatal Care', 'Orthopedic Care', 
    'Physical Rehabilitation Medicine', 'Renal Care and Transplant', 'Toxicology', 'Trauma Care', 'General'
];

export const LEGISLATIVE_DISTRICTS = [
    'Abra, Lone District', 'Agusan del Norte, 1st District', 'Agusan del Norte, 2nd District', 
    'Agusan del Sur, 1st District', 'Agusan del Sur, 2nd District', 'Aklan, 1st District', 
    'Aklan, 2nd District', 'Albay, 1st District', 'Albay, 2nd District', 'Albay, 3rd District', 
    'Antipolo City, 1st District', 'Antipolo City, 2nd District', 'Antique, Lone District', 
    'Apayao, Lone District', 'Aurora, Lone District', 'Bacolod City, Lone District', 
    'Baguio City, Lone District', 'Basilan, Lone District', 'Bataan, 1st District', 
    'Bataan, 2nd District', 'Bataan, 3rd District', 'Batanes, Lone District', 
    'Batangas, 1st District', 'Batangas, 2nd District', 'Batangas, 3rd District', 
    'Batangas, 4th District', 'Batangas, 5th District', 'Batangas, 6th District', 
    'Benguet, Lone District', 'Biliran, Lone District', 'Biñan City, Lone District', 
    'Bohol, 1st District', 'Bohol, 2nd District', 'Bohol, 3rd District', 
    'Bukidnon, 1st District', 'Bukidnon, 2nd District', 'Bukidnon, 3rd District', 
    'Bukidnon, 4th District', 'Bulacan, 1st District', 'Bulacan, 2nd District', 
    'Bulacan, 3rd District', 'Bulacan, 4th District', 'Bulacan, 5th District', 
    'Bulacan, 6th District', 'Cagayan de Oro City, 1st District', 'Cagayan de Oro City, 2nd District', 
    'Cagayan, 1st District', 'Cagayan, 2nd District', 'Cagayan, 3rd District', 
    'Calamba City, Lone District', 'Caloocan City, 1st District', 'Caloocan City, 2nd District', 
    'Caloocan City, 3rd District', 'Camarines Norte, 1st District', 'Camarines Norte, 2nd District', 
    'Camarines Sur, 1st District', 'Camarines Sur, 2nd District', 'Camarines Sur, 3rd District', 
    'Camarines Sur, 4th District', 'Camarines Sur, 5th District', 'Camiguin, Lone District', 
    'Capiz, 1st District', 'Capiz, 2nd District', 'Catanduanes, Lone District', 
    'Cavite, 1st District', 'Cavite, 2nd District', 'Cavite, 3rd District', 
    'Cavite, 4th District', 'Cavite, 5th District', 'Cavite, 6th District', 
    'Cavite, 7th District', 'Cavite, 8th District', 'Cebu City, 1st District', 
    'Cebu City, 2nd District', 'Cebu, 1st District', 'Cebu, 2nd District', 
    'Cebu, 3rd District', 'Cebu, 4th District', 'Cebu, 5th District', 'Cebu, 6th District', 
    'Cebu, 7th District', 'Davao City, 1st District', 'Davao City, 2nd District', 
    'Davao City, 3rd District', 'Davao de Oro, 1st District', 'Davao de Oro, 2nd District', 
    'Davao del Norte, 1st District', 'Davao del Norte, 2nd District', 'Davao del Sur, Lone District', 
    'Davao Occidental, Lone District', 'Davao Oriental, 1st District', 'Davao Oriental, 2nd District', 
    'Dinagat Islands, Lone District', 'Eastern Samar, Lone District', 'General Santos City, Lone District', 
    'Guimaras, Lone District', 'Ifugao, Lone District', 'Iligan City, Lone District', 
    'Ilocos Norte, 1st District', 'Ilocos Norte, 2nd District', 'Ilocos Sur, 1st District', 
    'Ilocos Sur, 2nd District', 'Iloilo City, Lone District', 'Iloilo, 1st District', 
    'Iloilo, 2nd District', 'Iloilo, 3rd District', 'Iloilo, 4th District', 
    'Iloilo, 5th District', 'Isabela, 1st District', 'Isabela, 2nd District', 
    'Isabela, 3rd District', 'Isabela, 4th District', 'Isabela, 5th District', 
    'Isabela, 6th District', 'Kalinga, Lone District', 'La Union, 1st District', 
    'La Union, 2nd District', 'Laguna, 1st District', 'Laguna, 2nd District', 
    'Laguna, 3rd District', 'Laguna, 4th District', 'Lanao del Norte, 1st District', 
    'Lanao del Norte, 2nd District', 'Lanao del Sur, 1st District', 'Lanao del Sur, 2nd District', 
    'Lapu-Lapu City, Lone District', 'Las Piñas City, Lone District', 'Leyte, 1st District', 
    'Leyte, 2nd District', 'Leyte, 3rd District', 'Leyte, 4th District', 'Leyte, 5th District', 
    'Maguindanao and Cotabato City, 1st District', 'Maguindanao and Cotabato City, 2nd District', 
    'Makati City, 1st District', 'Makati City, 2nd District', 'Malabon City, Lone District', 
    'Mandaluyong City, Lone District', 'Mandaue City, Lone District', 'Manila, 1st District', 
    'Manila, 2nd District', 'Manila, 3rd District', 'Manila, 4th District', 'Manila, 5th District', 
    'Manila, 6th District', 'Marikina City, 1st District', 'Marikina City, 2nd District', 
    'Marinduque, Lone District', 'Masbate, 1st District', 'Masbate, 2nd District', 
    'Masbate, 3rd District', 'Misamis Occidental, 1st District', 'Misamis Occidental, 2nd District', 
    'Misamis Oriental, 1st District', 'Misamis Oriental, 2nd District', 'Mountain Province, Lone District', 
    'Muntinlupa City, Lone District', 'Navotas City, Lone District', 'Negros Occidental, 1st District', 
    'Negros Occidental, 2nd District', 'Negros Occidental, 3rd District', 'Negros Occidental, 4th District', 
    'Negros Occidental, 5th District', 'Negros Occidental, 6th District', 'Negros Oriental, 1st District', 
    'Negros Oriental, 2nd District', 'Negros Oriental, 3rd District', 'North Cotabato, 1st District', 
    'North Cotabato, 2nd District', 'North Cotabato, 3rd District', 'Northern Samar, 1st District', 
    'Northern Samar, 2nd District', 'Nueva Ecija, 1st District', 'Nueva Ecija, 2nd District', 
    'Nueva Ecija, 3rd District', 'Nueva Ecija, 4th District', 'Nueva Vizcaya, Lone District', 
    'Occidental Mindoro, Lone District', 'Oriental Mindoro, 1st District', 'Oriental Mindoro, 2nd District', 
    'Palawan, 1st District', 'Palawan, 2nd District', 'Palawan, 3rd District', 
    'Pampanga, 1st District', 'Pampanga, 2nd District', 'Pampanga, 3rd District', 
    'Pampanga, 4th District', 'Pangasinan, 1st District', 'Pangasinan, 2nd District', 
    'Pangasinan, 3rd District', 'Pangasinan, 4th District', 'Pangasinan, 5th District', 
    'Pangasinan, 6th District', 'Parañaque City, 1st District', 'Parañaque City, 2nd District', 
    'Pasay City, Lone District', 'Pasig City, Lone District', 'Quezon City, 1st District', 
    'Quezon City, 2nd District', 'Quezon City, 3rd District', 'Quezon City, 4th District', 
    'Quezon City, 5th District', 'Quezon City, 6th District', 'Quezon, 1st District', 
    'Quezon, 2nd District', 'Quezon, 3rd District', 'Quezon, 4th District', 'Quirino, Lone District', 
    'Rizal, 1st District', 'Rizal, 2nd District', 'Rizal, 3rd District', 'Rizal, 4th District', 
    'Romblon, Lone District', 'Samar, 1st District', 'Samar, 2nd District', 
    'San Jose Del Monte City, Lone District', 'San Juan City, Lone District', 'Santa Rosa City, Lone District', 
    'Sarangani, Lone District', 'Siquijor, Lone District', 'Sorsogon, 1st District', 
    'Sorsogon, 2nd District', 'South Cotabato, 1st District', 'South Cotabato, 2nd District', 
    'Southern Leyte, 1st District', 'Southern Leyte, 2nd District', 'Sultan Kudarat, 1st District', 
    'Sultan Kudarat, 2nd District', 'Sulu, 1st District', 'Sulu, 2nd District', 
    'Surigao del Norte, 1st District', 'Surigao del Norte, 2nd District', 'Surigao del Sur, 1st District', 
    'Surigao del Sur, 2nd District', 'Taguig-Pateros, 1st District', 'Taguig, 2nd District', 
    'Tarlac, 1st District', 'Tarlac, 2nd District', 'Tarlac, 3rd District', 'Tawi-Tawi, Lone District', 
    'Valenzuela City, 1st District', 'Valenzuela City, 2nd District', 'Zambales, 1st District', 
    'Zambales, 2nd District', 'Zamboanga City, 1st District', 'Zamboanga City, 2nd District', 
    'Zamboanga del Norte, 1st District', 'Zamboanga del Norte, 2nd District', 'Zamboanga del Norte, 3rd District', 
    'Zamboanga del Sur, 1st District', 'Zamboanga del Sur, 2nd District', 'Zamboanga Sibugay, 1st District', 
    'Zamboanga Sibugay, 2nd District'
];