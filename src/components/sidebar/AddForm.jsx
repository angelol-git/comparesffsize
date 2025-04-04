import { useState } from "react";
import "./AddForm.css";
import { useQuery } from "@tanstack/react-query";
import SearchSelect from "./SearchSelect";

async function fetchCases() {
  console.log("fetching case data");
  const response = await fetch("/cases.json");
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return data;
}

function AddForm({ setShowAddForm, selectedItems, setSelectedItems }) {
  const [category, setCategory] = useState("case");
  const [selectedItem, setSelectedItem] = useState({
    brand: null,
    item: null,
  });
  const categories = ["case", "custom", "other"];
  const { isLoading, error, data } = useQuery({
    queryKey: ["cases"],
    queryFn: fetchCases,
  });

  function clearCurrentItem() {
    setSelectedItem({
      brand: null,
      item: null,
    });
    setShowAddForm(false);
  }
  function handleSubmit(event) {
    event.preventDefault();
    setSelectedItems([...selectedItems, selectedItem]);
    clearCurrentItem();
  }

  return (
    <form id="add-form" onSubmit={handleSubmit} className="add-form">
      <div className="add-form-category-row">
        <h3 className="add-form-subheader">Category:</h3>
        <div>
          {categories.map((categoryItem) => (
            <label
              key={categoryItem}
              htmlFor={categoryItem}
              className={`${
                category === categoryItem && "selected"
              } add-form-category-label`}
            >
              <input
                type="radio"
                id={categoryItem}
                name="category"
                value={categoryItem}
                checked={category === categoryItem}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
                className={`add-form-category-radio`}
              />
              {categoryItem.charAt(0).toUpperCase() + categoryItem.slice(1)}
            </label>
          ))}
        </div>
      </div>
      <div>
        {isLoading && "Loading cases..."}
        {error && "Error fetching cases"}
        {data && (
          <div className="add-form-data-container">
            <SearchSelect
              data={data}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
            {selectedItem.brand && selectedItem.item && (
              <div className="add-form-measurements">
                <h3 className="add-form-subheader">Measurements: </h3>
                <div className="measurement-form">
                  <div className="measurement-input-row">
                    <label htmlFor="length">L: </label>
                    <input
                      type="text"
                      name="length"
                      className="measurement-input"
                      value={selectedItem.item.measurements.length}
                      readOnly
                    />
                  </div>
                  <div className="measurement-input-row">
                    <label htmlFor="length">W: </label>
                    <input
                      type="text"
                      name="width"
                      className="measurement-input"
                      value={selectedItem.item.measurements.width}
                      readOnly
                    />
                  </div>
                  <div className="measurement-input-row">
                    <label htmlFor="length">H: </label>
                    <input
                      type="text"
                      name="height"
                      className="measurement-input"
                      value={selectedItem.item.measurements.height}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="add-form-buttons-row">
              <input type="submit" value="Add" className="add-form-button" />
              <button onClick={clearCurrentItem} className="add-form-button">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default AddForm;
