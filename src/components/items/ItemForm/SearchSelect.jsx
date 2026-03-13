import { useState, useEffect, useRef } from "react";
import { X, ChevronDown, ChevronRight, Search } from "lucide-react";

function SearchSelect({
  data,
  color,
  setColor,
  selectedItem,
  setSelectedItem,
  isSelectedItemEmpty,
  clearSelectedItem,
  category,
}) {
  const SearchSelectRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");

  const filteredData = Object.entries(data).reduce((acc, [brand, items]) => {
    const matchedCases = items.filter(
      (item) =>
        brand.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.name.toLowerCase().includes(searchInput.toLowerCase()),
    );

    if (matchedCases.length) {
      acc[brand] = matchedCases;
    }
    return acc;
  }, {});

  useEffect(() => {
    setSearchInput("");
  }, [category]);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
    if (!isSelectedItemEmpty()) {
      if (event.key === "Backspace") {
        clearSelectedItem();
      }
    }
  }

  return (
    <div className="flex flex-col gap-2" ref={SearchSelectRef}>
      <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
        Select Case
      </label>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-700" />
        
        <input
          type="text"
          placeholder="Search cases..."
          autoComplete="off"
          onChange={(event) => setSearchInput(event.target.value)}
          onKeyDown={handleKeyDown}
          value={
            isSelectedItemEmpty()
              ? searchInput
              : `${selectedItem.brand} - ${selectedItem.name}`
          }
          className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-10 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:bg-gray-50"
          disabled={!isSelectedItemEmpty()}
        />
        
        {!isSelectedItemEmpty() && (
          <button
            type="button"
            aria-label="Clear selection"
            onClick={() => {
              clearSelectedItem();
              setSearchInput("");
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded p-1 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Results list */}
      {searchInput.length > 0 && Object.entries(filteredData).length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-center">
          <p className="text-sm text-gray-700">
            No cases found
          </p>
        </div>
      ) : (
        <div className="max-h-[180px] overflow-auto rounded-lg border border-gray-200 bg-white">
          {Object.entries(filteredData).map(([brand, items]) => (
            <SelectOptions
              key={brand}
              brand={brand}
              items={items}
              open={searchInput.length > 0}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SelectOptions({ brand, items, open, selectedItem, setSelectedItem }) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        {isOpen ? (
          <ChevronDown size={14} className="text-accent" />
        ) : (
          <ChevronRight size={14} className="text-gray-700" />
        )}
        <span>{brand}</span>
      </button>

      {isOpen && (
        <div className="bg-gray-50/50">
          {items.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => {
                setSelectedItem((prev) => ({
                  ...prev,
                  brand: brand,
                  name: item.name,
                  measurements: item.measurements,
                }));
              }}
              className={`flex w-full cursor-pointer items-center justify-between px-3 py-2 pl-8 text-sm transition-colors ${
                selectedItem.name === item.name
                  ? "bg-accent/10 text-accent-dark font-medium"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span>{item.name}</span>
              <span className="text-xs text-gray-700">
                {item.measurements.volume}L
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchSelect;
