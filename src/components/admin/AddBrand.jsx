import { useState } from "react";
import { Plus, X, AlertCircle } from "lucide-react";

function AddBrand({ onAdd, existingBrands = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [error, setError] = useState("");

  function validateBrandName(name) {
    if (!name.trim()) {
      return "Manufacturer name is required";
    }
    
    const trimmedName = name.trim();
    const normalizedName = trimmedName.toLowerCase();
    
    // Check if brand already exists (case-insensitive)
    const existingBrand = existingBrands.find(
      (brand) => brand.toLowerCase() === normalizedName
    );
    
    if (existingBrand) {
      return `"${existingBrand}" already exists`;
    }
    
    return "";
  }

  function handleSubmit() {
    const trimmedName = brandName.trim();
    const validationError = validateBrandName(trimmedName);
    
    if (validationError) {
      setError(validationError);
      return;
    }
    
    onAdd(trimmedName);
    setBrandName("");
    setError("");
    setIsOpen(false);
  }

  function handleChange(e) {
    setBrandName(e.target.value);
    setError(""); // Clear error when user types
  }

  function handleCancel() {
    setIsOpen(false);
    setBrandName("");
    setError("");
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex cursor-pointer items-center gap-2 rounded-md border-2 border-dashed border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-gray-700"
      >
        <Plus size={16} />
        Add Manufacturer
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Manufacturer name..."
            value={brandName}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${
              error
                ? "border-red-300 focus:border-red-400"
                : "border-gray-300 focus:border-accent-dark"
            }`}
            autoFocus
          />
          {error && (
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle size={12} />
              <span>{error}</span>
            </div>
          )}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!brandName.trim()}
          className="cursor-pointer rounded-md bg-accent-dark px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Add
        </button>
        <button
          onClick={handleCancel}
          className="cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export default AddBrand;
