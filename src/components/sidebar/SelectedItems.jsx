import "./SelectedItems.css";
function SelectedItems({ items }) {
  return (
    <ul className="selected-items-list-container">
      {items.map((item) => {
        return (
          <li
            key={`${item.brand}-${item.item.name}`}
            className="selected-items-list-item"
          >
            {item.brand} - {item.item.name}
            <div>
              {`${item.item.measurements.length} ×
              ${item.item.measurements.width}  ×
              ${item.item.measurements.height}`}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default SelectedItems;
