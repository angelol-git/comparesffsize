import { useState, useEffect, useRef } from "react";
function SearchSelect({
  data,
  selectedItem,
  handleAddSelectedItem,
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
            className="w-full rounded-md border-1 border-solid border-gray-400/40 px-3 py-2 text-base"
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
              <XSvg height={"18px"} width={"18px"} />
            </button>
          ) : null}

          <div className="my-1 h-[150px] w-full overflow-auto rounded-md border border-gray-400/40 bg-white p-2">
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
                    handleAddSelectedItem={handleAddSelectedItem}
                  />
                ) : (
                  <SelectOptions
                    brand={brand}
                    items={items}
                    open={true}
                    key={brand}
                    handleAddSelectedItem={handleAddSelectedItem}
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

function SelectOptions({ brand, items, open, handleAddSelectedItem }) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <button
      type="button"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      className="flex w-full cursor-pointer flex-col"
    >
      <div className="flex items-center gap-2">
        {!isOpen ? (
          <RightArrowSvg height={"16px"} width={"16px"} />
        ) : (
          <DownArrowSvg height={"16px"} width={"16px"} />
        )}
        <span className="font-semibold">{brand}</span>
      </div>
      {isOpen &&
        items.map((item) => (
          <button
            key={item.name}
            className="flex w-full cursor-pointer rounded-md pl-10 hover:bg-gray-100"
            onClick={() => {
              handleAddSelectedItem(item, brand);
            }}
          >
            {item.name}
          </button>
        ))}
    </button>
  );
}

export default SearchSelect;

function XSvg({ height, width }) {
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

function UpArrowSvg({ height, width }) {
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
      <path d="m16.843 13.789c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291 1.002 1.299 3.044 3.945 4.243 5.498z" />
    </svg>
  );
}

function RightArrowSvg({ height, width }) {
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
      <path d="m10.211 7.155c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591-1.299-1.002-3.945-3.044-5.498-4.243z" />
    </svg>
  );
}
