import "./SelectedItems.css";

function SelectedItems({ item, selectedItems, setSelectedItems }) {
  function assignColor() {
    if (item.hide) {
      return "grey";
    }
    return item.color;
  }

  function handleHideClick(id) {
    const newSelectedItemsData = selectedItems.map((prevItem) => {
      return prevItem.id === id
        ? { ...prevItem, hide: !prevItem.hide }
        : prevItem;
    });
    setSelectedItems(newSelectedItemsData);
  }

  function handleDeleteClick(id) {
    const newSelectedItemsData = selectedItems.filter((data) => data.id !== id);
    setSelectedItems(newSelectedItemsData);
  }

  return (
    <li
      className="items-list-selected-item"
      style={{ backgroundColor: assignColor() }}
    >
      <div className="selected-item-left">
        {item.brand} - {item.name}
        <div>
          {`${item.measurements.length} ×
              ${item.measurements.width}  ×
              ${item.measurements.height}`}
        </div>
      </div>
      <div className="selected-item-right">
        <button onClick={handleDeleteClick} className="selected-item-button">
          <EditSvg height={"20px"} width={"20px"} />
        </button>
        {
          <button
            onClick={() => {
              handleHideClick(item.id);
            }}
            className="selected-item-button"
          >
            {item.hide ? (
              <UnHideSvg height={"20px"} width={"20px"} color={"white"} />
            ) : (
              <HideSvg height={"20px"} width={"20px"} color={"white"} />
            )}
          </button>
        }
        <button
          onClick={() => {
            handleDeleteClick(item.id);
          }}
          className="selected-item-button"
        >
          <XSvg height={"14px"} width={"14px"} />
        </button>
      </div>
    </li>
  );
}

export default SelectedItems;

function EditSvg({ height, width }) {
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
      fill="white"
    >
      <path
        d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"
        fillRule="nonzero"
      />
    </svg>
  );
}

function HideSvg({ height, width, color }) {
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
      fill={color}
    >
      <path
        d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.318 1.83c.967.943 1.804 2.013 2.475 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.298 0-2.553-.313-3.73-.849l2.624-2.307c.352.102.724.156 1.108.156 2.208 0 4-1.792 4-4 0-.206-.016-.408-.046-.606zm-4.932.467c-.678-.528-1.53-.843-2.455-.843-2.208 0-4 1.792-4 4 0 .741.202 1.435.553 2.03l1.16-1.019c-.137-.31-.213-.651-.213-1.011 0-1.38 1.12-2.5 2.5-2.5.474 0 .918.132 1.296.362z"
        fillRule="nonzero"
      />
    </svg>
  );
}

function UnHideSvg({ height, width, color }) {
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
      fill={color}
    >
      <path
        d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm.002 3c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5z"
        fillRule="nonzero"
      />
    </svg>
  );
}

function XSvg({ height, width }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={height}
      width={width}
      fill="white"
    >
      <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
    </svg>
  );
}
