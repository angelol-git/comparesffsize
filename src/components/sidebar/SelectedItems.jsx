import "./SelectedItems.css";

function SelectedItems({ item }) {
  return (
    <li className="items-list-item">
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
