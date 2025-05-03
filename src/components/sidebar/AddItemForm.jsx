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
  const dimensions = ["Length", "Width", "Height"];
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

  function handleChange(event) {
    const { name, value } = event.target;
    setSelectedItem((prevState) => ({
      ...prevState,
      measurements: {
        ...prevState.measurements,
        [name]: value,
      },
    }));
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
    <li>
      <form
        id="add-item-form"
        className="flex w-full flex-col gap-3 text-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <div className="font-semibold">Category</div>
          <div className="flex gap-2">
            {categories.map((categoryItem) => (
              <label
                key={categoryItem}
                htmlFor={categoryItem}
                className={`${
                  category === categoryItem && "bg-blue-700 text-white"
                } flex cursor-pointer items-center rounded-md border border-gray-400 px-3 py-2`}
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
                  <div className="font-semibold">Measurements</div>
                  <div className="grid grid-cols-3 gap-3">
                    {dimensions.map((item) => {
                      return (
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor={item}
                            className="self-start text-xs font-semibold"
                          >
                            {item}
                          </label>
                          <input
                            type="text"
                            name={item}
                            className="rounded-md border border-gray-400 px-2 py-2 text-right"
                            defaultValue={
                              selectedItem.measurements?.[item.toLowerCase()] ??
                              ""
                            }
                            onChange={handleChange}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="volume" className="font-semibold">
                      Volume (litres)
                    </label>
                    <input
                      type="text"
                      name="volume"
                      className="rounded-md border border-gray-400 px-2 py-2"
                      defaultValue={selectedItem.measurements?.volume ?? ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <div className="flex h-full items-center justify-end gap-[15px]">
                <button
                  type="submit"
                  className="flex h-[35px] w-[85px] cursor-pointer items-center justify-center gap-[7px] rounded-md border border-blue-700 bg-blue-700 text-sm text-white hover:border-blue-600 hover:bg-blue-600"
                >
                  <PlusSvg height={"12px"} width={"12px"} color={"white"} />
                  Add
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowAddItemForm(false);
                  }}
                  className="flex h-[35px] w-[85px] cursor-pointer items-center justify-center gap-[7px] rounded-md border border-gray-400 bg-white text-sm text-black hover:bg-gray-100"
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
