import React, { useState, useEffect } from 'react';

export interface Signatory {
  name: string;
  position: string;
}

export interface Signatories {
  preparedBy: Signatory;
  checkedBy: Signatory;
  approvedBy: Signatory;
}

interface SignatoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signatories: Signatories) => void;
  initialData: Signatories | null;
}

const BLANK_SIGNATORIES: Signatories = {
    preparedBy: { name: '', position: '' },
    checkedBy: { name: '', position: '' },
    approvedBy: { name: '', position: '' },
};

const SignatoriesModal: React.FC<SignatoriesModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [signatories, setSignatories] = useState<Signatories>(BLANK_SIGNATORIES);
  
  useEffect(() => {
    if (isOpen) {
        setSignatories(initialData || BLANK_SIGNATORIES);
    }
  }, [isOpen, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: keyof Signatories, field: keyof Signatory) => {
    const { value } = e.target;
    setSignatories(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const handleSaveAndPrint = () => {
    onSave(signatories);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Encode Signatories for Printing</h2>
          <p className="text-sm text-gray-500">This information will be added to the bottom of the printed report.</p>
        </div>
        <div className="p-6 space-y-6">
          {/* Prepared by */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Prepared by:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="preparedName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="preparedName"
                  value={signatories.preparedBy.name}
                  onChange={(e) => handleChange(e, 'preparedBy', 'name')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="preparedPosition" className="block text-sm font-medium text-gray-700">Position / Title</label>
                <input
                  type="text"
                  id="preparedPosition"
                  value={signatories.preparedBy.position}
                  onChange={(e) => handleChange(e, 'preparedBy', 'position')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Checked by */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Checked by:</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="checkedName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="checkedName"
                  value={signatories.checkedBy.name}
                  onChange={(e) => handleChange(e, 'checkedBy', 'name')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="checkedPosition" className="block text-sm font-medium text-gray-700">Position / Title</label>
                <input
                  type="text"
                  id="checkedPosition"
                  value={signatories.checkedBy.position}
                  onChange={(e) => handleChange(e, 'checkedBy', 'position')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Approved by */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Approved by:</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="approvedName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="approvedName"
                  value={signatories.approvedBy.name}
                  onChange={(e) => handleChange(e, 'approvedBy', 'name')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="approvedPosition" className="block text-sm font-medium text-gray-700">Position / Title</label>
                <input
                  type="text"
                  id="approvedPosition"
                  value={signatories.approvedBy.position}
                  onChange={(e) => handleChange(e, 'approvedBy', 'position')}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 px-6 py-4 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm">Cancel</button>
          <button type="button" onClick={handleSaveAndPrint} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">Save & Print</button>
        </div>
      </div>
    </div>
  );
};

export default SignatoriesModal;