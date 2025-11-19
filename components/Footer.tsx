
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto no-print">
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <div className="mb-2 md:mb-0">
                    &copy; {new Date().getFullYear()} HFEP Monitoring System. All rights reserved.
                </div>
                <div className="flex gap-4">
                    <span>Department of Health</span>
                    <span>•</span>
                    <span>Health Facilities Enhancement Program</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
