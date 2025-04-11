import { useState, useEffect, useRef } from "react";
import "./SearchSelect.css";
function SearchSelect({
  data,
  selectedItem,
  setSelectedItem,
  isSelectedItemEmpty,
  clearCurrentItem,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const SearchSelectRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");

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

  const filteredData = Object.entries(data).reduce((acc, [brand, cases]) => {
    const matchedCases = cases.filter(
      (item) =>
        brand.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (matchedCases.length) {
      acc[brand] = matchedCases;
    }
    return acc;
  }, {});

  function handleKeyDown(event) {
    if (!isSelectedItemEmpty()) {
      if (event.key === "Backspace") {
        clearCurrentItem();
      }
    }
  }

  return (
    <div className="add-form-category-row search-select-wrapper">
      <label htmlFor="search-select" className="add-form-subheader">
        Name:{" "}
      </label>
      <div className="search-select-container" ref={SearchSelectRef}>
        <div className="search-select-row">
          <input
            type="text"
            placeholder="Select..."
            id="search-input"
            autoComplete="off"
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(true);
            }}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
            onKeyDown={handleKeyDown}
            value={
              isSelectedItemEmpty()
                ? searchInput
                : `${selectedItem.brand} - ${selectedItem.name}`
            }
            className="search-input"
          />
          {!isSelectedItemEmpty() ? (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                clearCurrentItem();
                setSearchInput("");
              }}
              className="search-input-button-container search-input-close-button"
            >
              <XSvg />
            </button>
          ) : null}
          {!isOpen ? (
            <button
              type="button"
              className="search-input-button-container"
              onClick={(event) => {
                event.stopPropagation();
                setIsOpen(true);
              }}
            >
              <DownArrowSvg height={"24px"} width={"24px"} />
            </button>
          ) : (
            <button
              type="button"
              className="search-input-button-container"
              onClick={(event) => {
                event.stopPropagation();
                setIsOpen(false);
              }}
            >
              <UpArrowSvg />
            </button>
          )}
          {isOpen && (
            <div className="select-options-wrapper">
              {searchInput.length > 1 &&
              Object.entries(filteredData).length === 0 ? (
                <p>No cases found</p>
              ) : (
                Object.entries(filteredData).map(([brand, cases]) => {
                  return (
                    <div key={brand} className="brand-name">
                      {searchInput.length === 0 ? (
                        <SelectOptions
                          brand={brand}
                          cases={cases}
                          open={false}
                          setSelectedItem={setSelectedItem}
                        />
                      ) : (
                        <SelectOptions
                          brand={brand}
                          cases={cases}
                          open={true}
                          setSelectedItem={setSelectedItem}
                        />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SelectOptions({ brand, cases, open, setSelectedItem }) {
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
          <RightArrowSvg />
        ) : (
          <DownArrowSvg height={"16px"} width={"16px"} />
        )}
        <span style={{ fontWeight: "bold" }}>{brand}</span>
      </div>
      <div>
        {isOpen &&
          cases.map((item) => (
            <div
              key={item.name}
              className="select-option"
              onClick={() => {
                setSelectedItem({
                  brand: brand,
                  name: item.name,
                  measurements: item.measurements,
                });
              }}
            >
              {item.name}
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchSelect;

function XSvg() {
  return (
    <svg
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height="18px"
      width="18px"
    >
      <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
    </svg>
  );
}

function DownArrowSvg({ height, width }) {
  return (
    <svg
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
    >
      <path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z" />
    </svg>
  );
}

function UpArrowSvg() {
  return (
    <svg
      clipRule="evenodd"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      width="24px"
    >
      <path d="m16.843 13.789c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291 1.002 1.299 3.044 3.945 4.243 5.498z" />
    </svg>
  );
}

function RightArrowSvg() {
  return (
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
  );
}
