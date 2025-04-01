import { useState, useEffect, useRef } from "react";
import "./SearchSelect.css";
function SearchSelect({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const SearchSelectRef = useRef(null);
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

  useEffect(() => {
    function handleWindowClose(event) {
      if (isOpen && !SearchSelectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    window.addEventListener("click", handleWindowClose);

    return () => {
      window.removeEventListener("click", handleWindowClose);
    };
  }, [isOpen]);

  function handleSearchInputClick(event) {
    console.log(event.target.className);
    if (
      event.target.id === "search-input" ||
      event.target.className.baseVal === "search-input-arrow" ||
      event.target.className.baseVal === "search-input-container"
    ) {
      setIsOpen(true);
    }
  }
  return (
    <div className="search-select-wrapper">
      <label htmlFor="search-select" className="add-form-subheader">
        Name:{" "}
      </label>
      <div className="search-select-container" ref={SearchSelectRef}>
        <div className="search-select-row">
          <input
            type="text"
            placeholder="Select..."
            id="search-input"
            onClick={handleSearchInputClick}
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
            className="search-input"
          />
          {!isOpen ? (
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              width="30px"
              className="search-input-arrow-container"
            >
              <path
                className="search-input-arrow"
                onClick={handleSearchInputClick}
                d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"
              />
            </svg>
          ) : (
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              width="30px"
              onClick={handleSearchInputClick}
              className="search-input-arrow-container"
            >
              <path
                className="search-input-arrow"
                d="m16.843 13.789c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291 1.002 1.299 3.044 3.945 4.243 5.498z"
              />
            </svg>
          )}
          {isOpen && (
            <div className="select-options-wrapper">
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
      </div>
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
      className="select-option-container"
    >
      <div className="select-option-row">
        {!isOpen ? (
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            height="16px"
            width="16px"
          >
            <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z" />
          </svg>
        ) : (
          <svg
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            height="16px"
            width="16px"
          >
            <path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" />
          </svg>
        )}
        <span style={{ fontWeight: "bold" }}>{brand}</span>
      </div>
      <div>
        {isOpen &&
          cases.map((caseItem) => (
            <div key={caseItem.name} className="select-option">
              {caseItem.name}
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchSelect;
