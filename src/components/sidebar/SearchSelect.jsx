import { useState } from "react";
function SearchSelect({ data }) {
  const [textClicked, setTextClicked] = useState(false);
  return (
    <div>
      <input
        type="text"
        placeholder="Select..."
        id="name-select"
        onClick={() => {
          setTextClicked(!textClicked);
        }}
        className="name-select"
      />
      {textClicked && (
        <div>
          {Object.entries(data).map(([brand, cases]) => {
            return (
              <div key={brand} className="brand-name">
                <SelectOptions brand={brand} cases={cases} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SelectOptions({ brand, cases }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {brand}
      {isOpen &&
        cases.map((caseItem) => <div key={caseItem}>{caseItem.name}</div>)}
    </div>
  );
}

export default SearchSelect;
