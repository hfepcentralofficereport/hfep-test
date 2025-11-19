
import React from 'react';
import { View } from '../App';

interface HeaderProps {
    currentView: View;
    setCurrentView: (view: View) => void;
}

const NavButton: React.FC<{
    label: string;
    viewName: View;
    currentView: View;
    onClick: (view: View) => void;
}> = ({ label, viewName, currentView, onClick }) => {
    const isActive = currentView === viewName;
    const activeClasses = 'bg-blue-100 text-blue-700 font-semibold';
    const inactiveClasses = 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 font-medium';
    return (
        <button
            onClick={() => onClick(viewName)}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${isActive ? activeClasses : inactiveClasses}`}
            aria-current={isActive ? 'page' : undefined}
        >
            {label}
        </button>
    );
};

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <div>
                <h1 className="text-2xl font-bold text-gray-800">HFEP Monitoring</h1>
                <p className="text-xs text-gray-500">Health Facilities Enhancement Program</p>
            </div>
        </div>
        <nav className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
           <NavButton label="Dashboard" viewName="dashboard" currentView={currentView} onClick={setCurrentView} />
           <NavButton label="Masterlist" viewName="masterlist" currentView={currentView} onClick={setCurrentView} />
           <NavButton label="GAA Funds" viewName="gaa" currentView={currentView} onClick={setCurrentView} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
