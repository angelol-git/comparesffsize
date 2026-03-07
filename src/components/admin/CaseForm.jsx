import { useState } from "react";
import { Plus, Save, X, AlertCircle } from "lucide-react";
import { CASE_TYPES, calculateVolume } from "./constants";

function CaseForm({ 
  caseData, 
  onChange, 
  onSubmit, 
  onCancel, 
  mode = "add",
  existingCaseNames = [],
  currentCaseName = null
}) {
  const [error, setError] = useState("");

  function handleChange(field, value) {
    setError("");
    const updated = { ...caseData };
    
    if (field === "type") {
      updated.type = value;
    } else if (field === "name") {
      updated.name = value;
    } else {
      updated.measurements = {
        ...caseData.measurements,
        [field]: value,
      };
      
      // Auto-calculate volume when dimensions change
      if (["length", "width", "height"].includes(field)) {
        updated.measurements.volume = calculateVolume(
          updated.measurements.length,
          updated.measurements.width,
          updated.measurements.height
        );
      }
    }
    
    onChange(updated);
  }

  function validateCaseName(name) {
    if (!name.trim()) {
      return "Case name is required";
    }
    
    const normalizedName = name.trim().toLowerCase();
    const normalizedCurrent = currentCaseName?.toLowerCase();
    
    // Check if name already exists (case-insensitive), but allow if it's the same case being edited
    const duplicate = existingCaseNames.find(
      existing => existing.toLowerCase() === normalizedName && existing.toLowerCase() !== normalizedCurrent
    );
    
    if (duplicate) {
      return `A case named "${duplicate}" already exists for this manufacturer`;
    }
    
    return "";
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    
    const validationError = validateCaseName(caseData.name);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    onSubmit();
  }

  const hasError = error !== "";

  return (
    <form className="space-y-3" onSubmit={handleFormSubmit}>
      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Case name"
            value={caseData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`rounded-md border px-3 py-2 text-sm focus:outline-none w-full ${
              hasError
                ? "border-red-300 focus:border-red-400"
                : "border-gray-300 focus:border-accent-dark"
            }`}
            autoFocus
            required
          />
        </div>
        <select
          value={caseData.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent-dark focus:outline-none"
        >
          {CASE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      
      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
      
      <div className="grid grid-cols-4 gap-2">
        <div className="flex items-center gap-1">
          <input
            type="number"
            placeholder="Length"
            value={caseData.measurements.length}
            onChange={(e) => handleChange("length", e.target.value)}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-accent-dark focus:outline-none"
          />
          <span className="font-mono text-xs text-gray-700 shrink-0">mm</span>
        </div>
        <div className="flex items-center gap-1">
          <input
            type="number"
            placeholder="Width"
            value={caseData.measurements.width}
            onChange={(e) => handleChange("width", e.target.value)}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-accent-dark focus:outline-none"
          />
          <span className="font-mono text-xs text-gray-700 shrink-0">mm</span>
        </div>
        <div className="flex items-center gap-1">
          <input
            type="number"
            placeholder="Height"
            value={caseData.measurements.height}
            onChange={(e) => handleChange("height", e.target.value)}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 font-mono text-sm focus:border-accent-dark focus:outline-none"
          />
          <span className="font-mono text-xs text-gray-700 shrink-0">mm</span>
        </div>
        <div className="flex items-center gap-1">
          <input
            type="text"
            placeholder="Volume"
            value={caseData.measurements.volume}
            onChange={(e) => handleChange("volume", e.target.value)}
            className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-2 font-mono text-sm focus:border-accent-dark focus:outline-none"
            title="Auto-calculated from dimensions"
          />
          <span className="font-mono text-xs text-gray-700 shrink-0">L</span>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer rounded-md bg-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-300"
        >
          <X size={14} />
        </button>
        <button
          type="submit"
          className="flex cursor-pointer items-center gap-1 rounded-md bg-accent-dark px-3 py-1.5 text-sm text-white hover:bg-accent-hover"
        >
          {mode === "add" ? <Plus size={14} /> : <Save size={14} />}
          {mode === "add" ? "Add" : "Save"}
        </button>
      </div>
    </form>
  );
}

export default CaseForm;
