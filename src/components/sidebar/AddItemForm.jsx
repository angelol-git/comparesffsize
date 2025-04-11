import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchSelect from "./SearchSelect";
import "./AddItemForm.css";

async function fetchCases() {
  console.log("fetching case data");
  const response = await fetch("/cases.json");
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return data;
}

function AddItemForm({ setShowAddItemForm, selectedItems, setSelectedItems }) {
  const [category, setCategory] = useState("case");
  const categories = ["case", "custom", "other"];
  const { isLoading, error, data } = useQuery({
    queryKey: ["cases"],
    queryFn: fetchCases,
  });

  const [selectedItem, setSelectedItem] = useState({
    brand: null,
    name: null,
    measurements: null,
  });

  function isSelectedItemEmpty() {
    return (
      !selectedItem.brand && !selectedItem.name && !selectedItem.measurements
    );
  }

  function clearCurrentItem() {
    setSelectedItem({
      brand: null,
      name: null,
      measurements: null,
    });
  }

  function handleCategoryClick(event) {
    setCategory(event.target.value);
    clearCurrentItem();
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (category === "case") {
      if (!isSelectedItemEmpty()) {
        selectedItem.hide = false;
        setSelectedItems([...selectedItems, selectedItem]);
        clearCurrentItem();
        setShowAddItemForm(false);
      }
    }
  }

  return (
    <li className="items-list-item">
      <form
        id="add-item-form"
        className="add-item-form"
        onSubmit={handleSubmit}
      >
        <div className="add-item-form-row">
          <div className="add-item-form-subheader">Category:</div>
          <div>
            {categories.map((categoryItem) => (
              <label
                key={categoryItem}
                htmlFor={categoryItem}
                className={`${
                  category === categoryItem && "selected"
                } add-item-form-category-label`}
              >
                <input
                  type="radio"
                  id={categoryItem}
                  name="category"
                  value={categoryItem}
                  checked={category === categoryItem}
                  onChange={handleCategoryClick}
                  className={`add-item-form-category-radio`}
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
            <div className="add-item-form-data-container">
              <SearchSelect
                data={data}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                isSelectedItemEmpty={isSelectedItemEmpty}
                clearCurrentItem={clearCurrentItem}
                setShowAddItemForm={setShowAddItemForm}
              />
              {!isSelectedItemEmpty() && (
                <div className="add-item-form-row add-item-form-measurements">
                  <div className="add-item-form-subheader">Measurements: </div>
                  <div className="measurement-form">
                    <div className="measurement-input-row">
                      <label htmlFor="length">L: </label>
                      <input
                        type="text"
                        name="length"
                        className="measurement-input"
                        value={selectedItem.measurements?.length ?? ""}
                        readOnly
                      />
                    </div>
                    <div className="measurement-input-row">
                      <label htmlFor="width">W: </label>
                      <input
                        type="text"
                        name="width"
                        className="measurement-input"
                        value={selectedItem.measurements?.width ?? ""}
                        readOnly
                      />
                    </div>
                    <div className="measurement-input-row">
                      <label htmlFor="height">H: </label>
                      <input
                        type="text"
                        name="height"
                        className="measurement-input"
                        value={selectedItem.measurements?.height ?? ""}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="add-item-form-buttons-row">
                <input
                  type="submit"
                  value="Add"
                  className="add-item-form-button"
                />
                <button
                  type="button"
                  onClick={() => {
                    clearCurrentItem(true);
                  }}
                  className="add-item-form-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </li>
  );
}

export default AddItemForm;
