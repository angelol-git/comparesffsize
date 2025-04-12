import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import SearchSelect from "./SearchSelect";
import "./AddItemForm.css";

async function fetchCases() {
  console.log("fetching case data");
  const response = await fetch("/cases.json");
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  return data;
}

function AddItemForm({
  setShowAddItemForm,
  selectedItems,
  setSelectedItems,
  itemCounter,
  setItemCounter,
}) {
  const [category, setCategory] = useState("case");
  const categories = ["case", "custom", "other"];
  const colors = [
    "#8B0000", // dark red
    "#00008B", // dark blue
    "#B8860B", // dark goldenrod (instead of bright yellow)
    "#006400", // dark green
    "#FF8C00", // dark orange
    "#8B008B", // dark magenta (deep pink-ish)
  ];
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

  function assignColor() {
    return colors[itemCounter % colors.length];
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (category === "case") {
      if (!isSelectedItemEmpty()) {
        selectedItem.id = uuidv4();
        selectedItem.hide = false;
        selectedItem.color = assignColor();
        setItemCounter((prevCount) => prevCount + 1);
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
                  <div className="measurement-input-row">
                    <label htmlFor="volume">Volume: </label>
                    <input
                      type="text"
                      name="volume"
                      className="measurement-input"
                      value={selectedItem.measurements?.volume ?? ""}
                      readOnly
                    />
                  </div>
                </div>
              )}
              <div className="add-item-form-buttons-row">
                <button
                  type="submit"
                  className="add-item-form-button
                   add-item-button"
                >
                  <PlusSvg height={"12px"} width={"12px"} color={"white"} />
                  Add
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowAddItemForm(false);
                  }}
                  className="add-item-form-button cancel-item-button"
                >
                  <XSvg height={"12px"} width={"12px"} color={"black"} />
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

function PlusSvg({ height, width, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={height}
      width={width}
      fill={color}
    >
      <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
    </svg>
  );
}

function XSvg({ height, width, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill={color}
    >
      <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
    </svg>
  );
}
