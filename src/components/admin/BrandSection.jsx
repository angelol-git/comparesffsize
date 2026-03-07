import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import CaseItem from "./CaseItem";
import CaseForm from "./CaseForm";
import { EMPTY_CASE } from "./constants";

function BrandSection({ 
  brand, 
  cases, 
  isExpanded, 
  onToggle, 
  onAddCase, 
  onEditCase, 
  onDeleteCase, 
  onDeleteBrand 
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCase, setNewCase] = useState(EMPTY_CASE);
  const [newlyAddedCaseName, setNewlyAddedCaseName] = useState(null);

  // Get all case names for this brand
  const caseNames = cases.map(c => c.name);

  // Check if this brand has a newly added case
  const hasNewCase = newlyAddedCaseName !== null;

  function handleAdd() {
    if (!newCase.name.trim()) return;
    
    const caseToAdd = {
      ...newCase,
      measurements: {
        length: String(newCase.measurements.length),
        width: String(newCase.measurements.width),
        height: String(newCase.measurements.height),
        volume: String(newCase.measurements.volume),
      },
    };
    
    // Store the name of the newly added case for highlighting
    setNewlyAddedCaseName(caseToAdd.name);
    
    onAddCase(caseToAdd);
    
    setNewCase(EMPTY_CASE);
    setIsAdding(false);
  }

  function handleCancel() {
    setNewCase(EMPTY_CASE);
    setIsAdding(false);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
        <button
          onClick={onToggle}
          className="flex cursor-pointer items-center gap-2 font-semibold text-gray-900"
        >
          {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          {brand}
          <span className="ml-2 text-sm font-normal text-gray-700">
            ({cases.length} cases)
          </span>
          {hasNewCase && (
            <span className="ml-1 flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              <Sparkles size={12} />
              New
            </span>
          )}
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { if (!isExpanded) onToggle(); setIsAdding(true); }}
            className="flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-200"
          >
            <Plus size={14} />
            Add Case
          </button>
          <button
            onClick={onDeleteBrand}
            className="cursor-pointer rounded-md p-1 text-gray-700 hover:bg-red-100 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="divide-y divide-gray-100">
          {cases.sort((a, b) => a.name.localeCompare(b.name)).map((caseItem, idx) => (
            <CaseItem
              key={idx}
              caseItem={caseItem}
              onEdit={(updated) => onEditCase(idx, updated)}
              onDelete={() => onDeleteCase(idx)}
              existingCaseNames={caseNames}
              isNew={caseItem.name === newlyAddedCaseName}
            />
          ))}

          {isAdding && (
            <div className="bg-blue-50 p-4">
              <CaseForm
                caseData={newCase}
                onChange={setNewCase}
                onSubmit={handleAdd}
                onCancel={handleCancel}
                mode="add"
                existingCaseNames={caseNames}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BrandSection;
