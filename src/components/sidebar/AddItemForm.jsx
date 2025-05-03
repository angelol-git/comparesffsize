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
  const dimensions = ["Length", "Width", "Height", "Volume"];
  const categories = ["case", "custom", "other"];
  const colors = [
    "#8B0000", // dark red
    "#00008B", // dark blue
    "#B8860B", // dark goldenrod (instead of bright yellow)
    "#006400", // dark green
    "#4B0082", // dark purple
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
        className="flex w-full flex-col gap-3 rounded-md border border-gray-400/40 bg-white p-4 text-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3">
          <div className="font-semibold">Category</div>
          <div className="flex gap-2">
            {categories.map((categoryItem) => (
              <label
                key={categoryItem}
                htmlFor={categoryItem}
                className={`${
                  category === categoryItem && "bg-blue-700 text-white"
                } flex cursor-pointer items-center rounded-md border border-gray-400/40 px-3 py-2`}
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
                <div className="font-semibold">Measurements (mm)</div>
                <div className="grid grid-cols-3 gap-3">
                  {dimensions.map((item) => {
                    return (
                      <div className="flex flex-col gap-1" key={item}>
                        <label
                          htmlFor={item}
                          className="self-start text-xs font-semibold"
                        >
                          {item}
                          {item === "Volume" ? " (litres)" : ""}
                        </label>
                        <input
                          type="text"
                          name={item}
                          className="rounded-md border border-gray-400/40 px-2 py-2 text-right"
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
                {/* <div className="flex flex-col gap-1">
                    <label htmlFor="volume" className="text-sm font-semibold">
                      Volume (litres)
                    </label>
                    <input
                      type="text"
                      name="volume"
                      className="rounded-md border border-gray-400/40 px-2 py-2"
                      defaultValue={selectedItem.measurements?.volume ?? ""}
                      onChange={handleChange}
                    />
                  </div> */}
              </div>
            )}
            {!isSelectedItemEmpty() && (
              <div className="flex h-full items-center justify-end gap-3">
                <button
                  type="submit"
                  className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-blue-700 bg-blue-700 py-2 text-sm text-white hover:border-blue-600 hover:bg-blue-600"
                >
                  <PlusSvg height={"12px"} width={"12px"} color={"white"} />
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowAddItemForm(false);
                  }}
                  className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-gray-400/40 bg-white py-2 text-sm text-black hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </form>
    </li>
  );
}

export default AddItemForm;

function PlusSvg({ height, width, color }) {
  return (
    <svg
      fill={color}
      height={height}
      width={width}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
      enableBackground="new 0 0 24 24"
      xmlSpace="preserve"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g id="save">
          {" "}
          <path d="M22.083,24H1.917C0.86,24,0,23.14,0,22.083V1.917C0,0.86,0.86,0,1.917,0h16.914L24,5.169v16.914 C24,23.14,23.14,24,22.083,24z M20,22h2V5.998l-3-3V9c0,1.103-0.897,2-2,2H7c-1.103,0-2-0.897-2-2V2H2v20h2v-7c0-1.103,0.897-2,2-2 h12c1.103,0,2,0.897,2,2V22z M6,22h12v-7.001L6,15V22z M7,2v7h10V2H7z"></path>{" "}
          <path d="M15,8h-4V3h4V8z"></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}
