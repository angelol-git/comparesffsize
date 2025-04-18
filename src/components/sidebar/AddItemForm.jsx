import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import SearchSelect from "./SearchSelect";

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
    <li className="p-3">
      <form
        id="add-item-form"
        className="flex w-full flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <div className="flex">
          <div className="add-item-form-subheader w-[80px]">Category:</div>
          <div className="flex gap-2">
            {categories.map((categoryItem) => (
              <label
                key={categoryItem}
                htmlFor={categoryItem}
                className={`${
                  category === categoryItem && "bg-gray-500 text-white"
                } flex cursor-pointer items-center border border-black px-2 py-1 text-sm`}
              >
                <input
                  type="radio"
                  id={categoryItem}
                  name="category"
                  value={categoryItem}
                  checked={category === categoryItem}
                  onChange={handleCategoryClick}
                  className={`sr-only`}
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
            <div className="flex flex-col gap-3">
              <SearchSelect
                data={data}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                isSelectedItemEmpty={isSelectedItemEmpty}
                clearCurrentItem={clearCurrentItem}
                setShowAddItemForm={setShowAddItemForm}
              />
              {!isSelectedItemEmpty() && (
                <div className="flex flex-col gap-3">
                  <div className="flex">
                    <div className="w-[80px] text-base">Size: </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <label htmlFor="length">L:</label>
                        <input
                          type="text"
                          name="length"
                          className="w-[50px] border border-black px-2 py-1 text-right"
                          value={selectedItem.measurements?.length ?? ""}
                          readOnly
                        />
                      </div>
                      <div>×</div>
                      <div className="flex items-center gap-2">
                        <label htmlFor="width">W: </label>
                        <input
                          type="text"
                          name="width"
                          className="w-[50px] border border-black px-2 py-1 text-right"
                          value={selectedItem.measurements?.width ?? ""}
                          readOnly
                        />
                      </div>
                      <div>×</div>
                      <div className="flex items-center gap-2">
                        <label htmlFor="height">H: </label>
                        <input
                          type="text"
                          name="height"
                          className="w-[50px] border border-black px-2 py-1 text-right"
                          value={selectedItem.measurements?.height ?? ""}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <label htmlFor="volume" className="w-[80px]">
                      Volume:{" "}
                    </label>
                    <div className="flex items-center gap-2 text-sm">
                      <input
                        type="text"
                        name="volume"
                        className="w-[50px] border border-black px-2 py-1 pr-[5px] text-right"
                        value={selectedItem.measurements?.volume ?? ""}
                        readOnly
                      />
                      <div>litres</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex h-full items-center justify-end gap-[15px]">
                <button
                  type="submit"
                  className="flex h-[35px] w-[85px] cursor-pointer items-center justify-center gap-[7px] border border-blue-700 bg-blue-700 text-sm text-white hover:border-blue-600 hover:bg-blue-600"
                >
                  <PlusSvg height={"12px"} width={"12px"} color={"white"} />
                  Add
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowAddItemForm(false);
                  }}
                  className="flex h-[35px] w-[85px] cursor-pointer items-center justify-center gap-[7px] border border-black bg-white text-sm text-black hover:bg-gray-100"
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
