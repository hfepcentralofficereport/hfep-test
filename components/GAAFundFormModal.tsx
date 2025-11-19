import React, { useState, useEffect } from 'react';
import { GAAFund } from '../types';
import { YEARS_FUNDED } from '../formOptions';
import { formatCurrency } from '../utils';

interface GAAFundFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (fundData: Omit<GAAFund, 'id'> | GAAFund) => void;
  fund: GAAFund | null;
}

const initialFormData: Omit<GAAFund, 'id'> = {
  gaaCode: '',
  description: '',
  year: new Date().getFullYear(),
  allocationInfra: 0,
  allocationMedEquip: 0,
  allocationMotorVehicle: 0,
};

const GAAFundFormModal: React.FC<GAAFundFormModalProps> = ({ isOpen, onClose, onSave, fund }) => {
  const [formData, setFormData] = useState<Omit<GAAFund, 'id'> & { id?: string }>(initialFormData);

  useEffect(() => {
    if (fund) {
      setFormData({
          ...initialFormData, // Ensure all fields are present
          ...fund
      });
    } else {
      setFormData(initialFormData);
    }
  }, [fund, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? undefined : Number(value)) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  const totalAllocation = (formData.allocationInfra || 0) + (formData.allocationMedEquip || 0) + (formData.allocationMotorVehicle || 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{fund ? 'Edit GAA Fund' : 'Add New GAA Fund'}</h2>
          </div>
          <div className="p-6 border-t border-gray-200 space-y-4">
            <div>
              <label htmlFor="gaaCode" className="block text-sm font-medium text-gray-700">GAA Code <span className="text-red-500">*</span></label>
              <input type="text" id="gaaCode" name="gaaCode" value={formData.gaaCode} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description <span className="text-red-500">*</span></label>
              <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year <span className="text-red-500">*</span></label>
              <select id="year" name="year" value={formData.year} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                {YEARS_FUNDED.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
             <fieldset className="border-t pt-4">
                <legend className="text-sm font-medium text-gray-700 mb-2">Allocation Breakdown <span className="text-red-500">*</span></legend>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="allocationInfra" className="block text-xs font-medium text-gray-600">Infrastructure</label>
                        <input type="number" id="allocationInfra" name="allocationInfra" value={formData.allocationInfra || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="0.00" />
                    </div>
                     <div>
                        <label htmlFor="allocationMedEquip" className="block text-xs font-medium text-gray-600">Medical Equipment</label>
                        <input type="number" id="allocationMedEquip" name="allocationMedEquip" value={formData.allocationMedEquip || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="0.00" />
                    </div>
                     <div>
                        <label htmlFor="allocationMotorVehicle" className="block text-xs font-medium text-gray-600">Motor Vehicle</label>
                        <input type="number" id="allocationMotorVehicle" name="allocationMotorVehicle" value={formData.allocationMotorVehicle || ''} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" placeholder="0.00" />
                    </div>
                </div>
                 <div className="mt-3 text-right">
                    <p className="text-sm font-medium text-gray-800">Total: <span className="font-bold text-blue-600">{formatCurrency(totalAllocation)}</span></p>
                </div>
            </fieldset>
          </div>
          <div className="bg-gray-100 px-6 py-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">Save Fund</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GAAFundFormModal;