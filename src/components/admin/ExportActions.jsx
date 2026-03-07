import { useState } from "react";
import { Download } from "lucide-react";

function ExportActions({ cases }) {
  const [copySuccess, setCopySuccess] = useState(false);

  function getSortedCases() {
    const sortedKeys = Object.keys(cases).sort((a, b) => a.localeCompare(b));
    const sortedCases = {};
    sortedKeys.forEach((key) => {
      sortedCases[key] = cases[key];
    });
    return sortedCases;
  }

  function exportJSON() {
    const sortedCases = getSortedCases();
    const dataStr = JSON.stringify(sortedCases, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cases.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  async function copyToClipboard() {
    const sortedCases = getSortedCases();
    const dataStr = JSON.stringify(sortedCases, null, 2);
    try {
      await navigator.clipboard.writeText(dataStr);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={copyToClipboard}
        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${
          copySuccess
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {copySuccess ? "Copied!" : "Copy JSON"}
      </button>
      <button
        onClick={exportJSON}
        className="flex cursor-pointer items-center gap-2 rounded-md bg-accent-dark px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
      >
        <Download size={16} />
        Export JSON
      </button>
    </div>
  );
}

export default ExportActions;
