import { useState, useEffect } from "react";
function SearchSelect({ data }) {
  const [inputClicked, setTextClicked] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const filteredData = Object.entries(data).reduce((acc, [brand, cases]) => {
    const matchedCases = cases.filter(
      (c) =>
        brand.toLowerCase().includes(searchInput.toLowerCase()) ||
        c.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (matchedCases.length) {
      acc[brand] = matchedCases;
    }
    return acc;
  }, {});

  return (
    <div>
      <input
        type="text"
        placeholder="Select..."
        id="name-select"
        onClick={() => {
          setTextClicked(!inputClicked);
        }}
        value={searchInput}
        onChange={(event) => {
          setSearchInput(event.target.value);
        }}
        className="name-select"
      />
      {inputClicked && (
        <div>
          {Object.entries(filteredData).map(([brand, cases]) => {
            return (
              <div key={brand} className="brand-name">
                {searchInput.length === 0 ? (
                  <SelectOptions brand={brand} cases={cases} open={false} />
                ) : (
                  <SelectOptions brand={brand} cases={cases} open={true} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SelectOptions({ brand, cases, open }) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <div
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {brand}
      {isOpen &&
        cases.map((caseItem) => <div key={caseItem.name}>{caseItem.name}</div>)}
    </div>
  );
}

export default SearchSelect;
