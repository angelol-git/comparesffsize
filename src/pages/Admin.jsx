import { useState, useEffect } from "react";
import AdminHeader from "../components/admin/AdminHeader";
import AddBrand from "../components/admin/AddBrand";
import BrandSection from "../components/admin/BrandSection";

function Admin() {
  const [cases, setCases] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedBrands, setExpandedBrands] = useState({});

  useEffect(() => {
    fetchCases();
  }, []);

  async function fetchCases() {
    try {
      const response = await fetch("/cases.json");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setCases(data);
      const expanded = {};
      Object.keys(data).forEach((brand) => {
        expanded[brand] = false;
      });
      setExpandedBrands(expanded);
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setLoading(false);
    }
  }

  function toggleBrand(brand) {
    setExpandedBrands((prev) => ({
      ...prev,
      [brand]: !prev[brand],
    }));
  }

  function addBrand(brandName) {
    setCases((prev) => ({
      ...prev,
      [brandName]: [],
    }));
    setExpandedBrands((prev) => ({
      ...prev,
      [brandName]: true,
    }));
  }

  function addCase(brand, caseData) {
    setCases((prev) => ({
      ...prev,
      [brand]: [...(prev[brand] || []), caseData],
    }));
  }

  function editCase(brand, caseIndex, updatedCase) {
    setCases((prev) => {
      const updatedBrand = [...prev[brand]];
      updatedBrand[caseIndex] = updatedCase;
      return {
        ...prev,
        [brand]: updatedBrand,
      };
    });
  }

  function deleteCase(brand, caseIndex) {
    if (!confirm("Are you sure you want to delete this case?")) return;
    setCases((prev) => {
      const updatedBrand = prev[brand].filter((_, idx) => idx !== caseIndex);
      return {
        ...prev,
        [brand]: updatedBrand,
      };
    });
  }

  function deleteBrand(brand) {
    if (!confirm(`Are you sure you want to delete all cases from ${brand}?`))
      return;
    setCases((prev) => {
      const updated = { ...prev };
      delete updated[brand];
      return updated;
    });
  }

  // Dev-only check - moved after all hooks
  if (!import.meta.env.DEV) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-400">404</h1>
          <p className="mt-2 text-gray-500">Page not found</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading cases...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <AdminHeader cases={cases} />

        <div className="mb-6">
          <AddBrand onAdd={addBrand} existingBrands={Object.keys(cases)} />
        </div>

        <div className="space-y-4">
          {Object.entries(cases)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([brand, brandCases]) => (
              <BrandSection
                key={brand}
                brand={brand}
                cases={brandCases}
                isExpanded={expandedBrands[brand]}
                onToggle={() => toggleBrand(brand)}
                onAddCase={(caseData) => addCase(brand, caseData)}
                onEditCase={(idx, data) => editCase(brand, idx, data)}
                onDeleteCase={(idx) => deleteCase(brand, idx)}
                onDeleteBrand={() => deleteBrand(brand)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
