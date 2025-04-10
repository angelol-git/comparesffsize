import "./SelectedItems.css";

function SelectedItems({ item, index }) {
  const colors = ["red", "blue", "green", "orange", "purple"];
  function assignColor(index) {
    console.log(colors[index % colors.length]);
    return colors[index % colors.length];
  }
  return (
    <li
      className="items-list-selected-item"
      style={{ backgroundColor: assignColor(index) }}
    >
      {item.brand} - {item.item.name}
      <div>
        {`${item.item.measurements.length} ×
              ${item.item.measurements.width}  ×
              ${item.item.measurements.height}`}
      </div>
    </li>
  );
}

export default SelectedItems;
