import { useState, useEffect, useRef } from "react";
import { X, ChevronDown, ChevronRight, Link } from "lucide-react";
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
    <div className="flex flex-col gap-3">
      <label htmlFor="search-input" className="font-semibold">
        Name
      </label>
      <div className="flex w-full flex-col gap-1" ref={SearchSelectRef}>
        <div className="relative flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={(event) => {
              setColor(event.target.value);
            }}
            className="h-[30px] w-[28px] shrink-0"
          />
          <input
            type="text"
            placeholder="Select..."
            id="search-input"
            autoComplete="off"
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
            onKeyDown={handleKeyDown}
            value={
              isSelectedItemEmpty()
                ? searchInput
                : `${selectedItem.brand} - ${selectedItem.name}`
            }
            className="border-border w-full rounded-md border-1 px-3 py-2"
          />
          {!isSelectedItemEmpty() ? (
            <button
              type="button"
              onClick={() => {
                clearSelectedItem();
                setSearchInput("");
              }}
              className="absolute right-[10px] z-20 cursor-pointer"
            >
              <X size={18} />
            </button>
          ) : null}
        </div>
        <div className="border-border my-1 h-[150px] w-full overflow-auto rounded-md border p-2">
          {searchInput.length > 1 &&
          Object.entries(filteredData).length === 0 ? (
            <p>No cases found</p>
          ) : (
            Object.entries(filteredData).map(([brand, items]) => {
              return searchInput.length === 0 ? (
                <SelectOptions
                  brand={brand}
                  items={items}
                  open={false}
                  key={brand}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              ) : (
                <SelectOptions
                  brand={brand}
                  items={items}
                  open={true}
                  key={brand}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function SelectOptions({ brand, items, open, selectedItem, setSelectedItem }) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          setIsOpen(!isOpen);
        }
      }}
      className="flex w-full cursor-pointer flex-col"
    >
      <div
        className={`hover:bg-white-hover flex items-center gap-2 rounded-md ${selectedItem.brand === brand ? "bg-accent/50" : null}`}
      >
        {!isOpen ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
        <span className="font-semibold">{brand}</span>
      </div>
      {isOpen &&
        items.map((item) => (
          <button
            key={item.name}
            className={`hover:bg-white-hover text-cream flex w-full cursor-pointer rounded-md pl-10 ${selectedItem.name === item.name ? "bg-accent-light/50" : null}`}
            onClick={() => {
              setSelectedItem((prevState) => ({
                ...prevState,
                brand: brand,
                name: item.name,
                measurements: item.measurements,
              }));
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setSelectedItem((prevState) => ({
                  ...prevState,
                  brand: brand,
                  name: item.name,
                  measurements: item.measurements,
                }));
              }
            }}
          >
            {item.name}
          </button>
        ))}
    </div>
  );
}

export default SearchSelect;
