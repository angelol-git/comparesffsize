import { useState, useEffect, useRef } from "react";
import { X, ChevronDown, ChevronRight, Link } from "lucide-react";
function SearchSelect({
  data,
  selectedItem,
  setSelectedItem,
  isSelectedItemEmpty,
  clearSelectedItem,
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
      <div className="flex w-full flex-col" ref={SearchSelectRef}>
        <div className="relative flex flex-col items-center">
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
            className="w-full rounded-md border-1 border-black px-3 py-2"
          />
          {!isSelectedItemEmpty() ? (
            <button
              type="button"
              onClick={() => {
                clearSelectedItem();
                setSearchInput("");
              }}
              className="absolute top-[10px] right-[10px] z-10 cursor-pointer"
            >
              <X height="18" width="18" />
            </button>
          ) : null}

          <div className="my-1 h-[150px] w-full overflow-auto rounded-md border p-2">
            {searchInput.length > 1 &&
            Object.entries(filteredData).length === 0 ? (
              <p className="text-gray-200/50">No cases found</p>
            ) : (
              Object.entries(filteredData).map(([brand, items]) => {
                return searchInput.length === 0 ? (
                  <SelectOptions
                    brand={brand}
                    items={items}
                    open={false}
                    key={brand}
                    setSelectedItem={setSelectedItem}
                  />
                ) : (
                  <SelectOptions
                    brand={brand}
                    items={items}
                    open={true}
                    key={brand}
                    setSelectedItem={setSelectedItem}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectOptions({ brand, items, open, setSelectedItem }) {
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
      className="flex w-full cursor-pointer flex-col"
    >
      <div className="flex items-center gap-2">
        {!isOpen ? (
          <ChevronRight height="16" width="16" />
        ) : (
          <ChevronDown height="16" width="16" />
        )}
        <span className="font-semibold">{brand}</span>
      </div>
      {isOpen &&
        items.map((item) => (
          <button
            key={item.name}
            className="text-cream flex w-full cursor-pointer rounded-md pl-10"
            onClick={() => {
              setSelectedItem((prevState) => ({
                ...prevState,
                brand: brand,
                name: item.name,
                measurements: item.measurements,
              }));
            }}
          >
            {item.name}
          </button>
        ))}
    </div>
  );
}

export default SearchSelect;
