import React from 'react';
import { Signatories } from './SignatoriesModal';

interface PrintableSignatoriesProps {
  signatories: Signatories | null;
}

const SignatoryBlock: React.FC<{ title: string; name: string; position: string }> = ({ title, name, position }) => (
    <div className="flex-1 text-center">
        <p className="text-xs mb-12">{title}:</p>
        <p className="font-bold uppercase tracking-wider">{name || '____________________'}</p>
        <p className="text-xs border-t border-black pt-1 mt-1">{position || 'Position / Title'}</p>
    </div>
);


const PrintableSignatories: React.FC<PrintableSignatoriesProps> = ({ signatories }) => {
  // We only render this component for printing, so signatories should be present.
  // If not, we render nothing to avoid breaking the print layout.
  if (!signatories) return null;

  return (
    <div className="print-only mt-16 pt-8">
        <div className="flex justify-around items-end gap-8" style={{ minHeight: '150px'}}>
            <SignatoryBlock 
                title="Prepared by" 
                name={signatories.preparedBy.name}
                position={signatories.preparedBy.position}
            />
            <SignatoryBlock 
                title="Checked by" 
                name={signatories.checkedBy.name}
                position={signatories.checkedBy.position}
            />
             <SignatoryBlock 
                title="Approved by" 
                name={signatories.approvedBy.name}
                position={signatories.approvedBy.position}
            />
        </div>
    </div>
  );
};

export default PrintableSignatories;