import "./SelectedItems.css";

function SelectedItems({ item, index, selectedItems, setSelectedItems }) {
  const colors = ["red", "blue", "green", "orange", "purple"];

  function assignColor(index) {
    return colors[index % colors.length];
  }

  function handleDeleteClick(item, index) {
    const newSelectedItemsData = selectedItems.filter(
      (data, dIndex) => index !== dIndex
    );
    setSelectedItems(newSelectedItemsData);
  }
  return (
    <li
      className="items-list-selected-item"
      style={{ backgroundColor: assignColor(index) }}
    >
      <div className="selected-item-left">
        {item.brand} - {item.item.name}
        <div>
          {`${item.item.measurements.length} ×
              ${item.item.measurements.width}  ×
              ${item.item.measurements.height}`}
        </div>
      </div>
      <div className="selected-item-right">
        <button onClick={handleDeleteClick} className="selected-item-button">
          <svg
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
          >
            <path
              d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"
              fillRule="nonzero"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            handleDeleteClick(item, index);
          }}
          className="selected-item-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
          </svg>
        </button>
      </div>
    </li>
  );
}

export default SelectedItems;
