import { useState } from "react";
import { Trash2, Edit2, Sparkles } from "lucide-react";
import CaseForm from "./CaseForm";

function CaseItem({ caseItem, onEdit, onDelete, existingCaseNames = [], isNew = false }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCase, setEditedCase] = useState(caseItem);

  function handleSave() {
    onEdit({
      ...editedCase,
      measurements: {
        length: String(editedCase.measurements.length),
        width: String(editedCase.measurements.width),
        height: String(editedCase.measurements.height),
        volume: String(editedCase.measurements.volume),
      },
    });
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedCase(caseItem);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="p-4">
        <CaseForm
          caseData={editedCase}
          onChange={setEditedCase}
          onSubmit={handleSave}
          onCancel={handleCancel}
          mode="edit"
          existingCaseNames={existingCaseNames}
          currentCaseName={caseItem.name}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-between p-4 transition-colors duration-500 ${isNew ? 'bg-green-50 border-l-4 border-green-400' : ''}`}>
      <div className="flex items-center gap-2">
        {isNew && <Sparkles size={16} className="text-green-600 shrink-0" />}
        <div>
          <h4 className="font-medium text-gray-900">{caseItem.name}</h4>
          <p className="text-sm text-gray-700">
            {caseItem.type} • <span className="font-mono">{caseItem.measurements.length}</span> ×{" "}
            <span className="font-mono">{caseItem.measurements.width}</span> ×{" "}
            <span className="font-mono">{caseItem.measurements.height}</span> <span className="font-mono">mm</span> •{" "}
            <span className="font-mono">{caseItem.measurements.volume}</span> <span className="font-mono">L</span>
          </p>
        </div>
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => setIsEditing(true)}
          className="cursor-pointer rounded-md p-1.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={onDelete}
          className="rounded-md p-1.5 text-gray-700 hover:bg-red-100 hover:text-red-600 cursor-pointer"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default CaseItem;
