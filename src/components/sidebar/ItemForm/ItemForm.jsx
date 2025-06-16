import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { CATEGORIES, COLORS, EMPTY_ITEM } from "./constants";
import fetchCases from "../../../queries/fetchCases";
import fetchOther from "../../../queries/fetchOther";
import MeasurementInputs from "./MeasurementInputs";
import SearchSelect from "./SearchSelect";

function ItemForm({
  mode = "add",
  setShowItemForm,
  selectedItems,
  handleAddItem,
  handleEditItem,
  editItem,
  setEditMode,
  itemFormRef,
}) {
  const [category, setCategory] = useState("case");
  const [selectedItem, setSelectedItem] = useState(
    mode === "edit" ? editItem : EMPTY_ITEM,
  );

  const casesQuery = useQuery({
    queryKey: ["cases"],
    queryFn: fetchCases,
    refetchOnMount: false,
  });

  const otherQuery = useQuery({
    queryKey: ["other"],
    queryFn: fetchOther,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (itemFormRef?.current) {
      itemFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [itemFormRef]);

  function isSelectedItemEmpty() {
    const { brand, name, measurements } = selectedItem;
    const { length, width, height, volume } = measurements || {};
    return !brand && !name && !length && !width && !height && !volume;
  }

  function handleAddSelectedItem(item, brand) {
    setSelectedItem((prevState) => ({
      ...prevState,
      brand: brand,
      name: item.name,
      measurements: item.measurements,
    }));
  }

  function clearSelectedItem() {
    setSelectedItem(EMPTY_ITEM);
  }

  function handleCategoryClick(event) {
    setCategory(event.target.value);
    clearSelectedItem();
  }

  function assignColor() {
    return COLORS[selectedItems.length % COLORS.length];
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (mode === "edit") {
      handleEditItem(selectedItem);
      setEditMode(false);
    } else {
      const newItem = {
        ...selectedItem,
        id: uuidv4(),
        hide: false,
        color: assignColor(),
      };
      handleAddItem(newItem);
    }
    clearSelectedItem();
    setShowItemForm(false);
  }

  return (
    <li className={`w-full`} ref={itemFormRef}>
      <form
        id="add-item-form"
        className="flex w-full flex-col gap-3 rounded-md border border-gray-400/40 bg-white p-4 text-sm"
        // style={mode === "edit" ? { borderColor: editItem.color } : {}}
        onSubmit={handleSubmit}
      >
        <CategorySelector
          category={category}
          handleCategoryClick={handleCategoryClick}
        />
        {casesQuery.isLoading && "Loading cases..."}
        {casesQuery.error && "Error fetching cases"}
        {casesQuery.data && category === "case" && (
          <div className="flex flex-col gap-3">
            <SearchSelect
              data={casesQuery.data}
              selectedItem={selectedItem}
              handleAddSelectedItem={handleAddSelectedItem}
              isSelectedItemEmpty={isSelectedItemEmpty}
              clearSelectedItem={clearSelectedItem}
              setShowItemForm={setShowItemForm}
            />
            {!isSelectedItemEmpty() && (
              <MeasurementInputs
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            )}
          </div>
        )}
        {category === "custom" && (
          <div className="flex flex-col gap-3">
            <label htmlFor="search-input" className="font-semibold">
              Name
            </label>
            <div className="flex w-full cursor-pointer flex-col">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Enter..."
                  id="search-input"
                  autoComplete="off"
                  required
                  onChange={(event) => {
                    setSelectedItem((prevState) => ({
                      ...prevState,
                      brand: "Custom",
                      name: event.target.value,
                    }));
                  }}
                  value={selectedItem.name ? selectedItem.name : ""}
                  className="w-full rounded-md border-1 border-solid border-gray-400/40 px-3 py-2 text-base"
                />
              </div>
            </div>
            <MeasurementInputs
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
          </div>
        )}
        {otherQuery.isLoading && "Loading other..."}
        {otherQuery.error && "Error loading other"}
        {otherQuery.data && category === "other" && (
          <div className="flex flex-col gap-3">
            <SearchSelect
              data={otherQuery.data}
              selectedItem={selectedItem}
              handleAddSelectedItem={handleAddSelectedItem}
              isSelectedItemEmpty={isSelectedItemEmpty}
              clearSelectedItem={clearSelectedItem}
            />
            {!isSelectedItemEmpty() && (
              <MeasurementInputs
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
              />
            )}
          </div>
        )}
        <div className="grid grid-cols-2 items-center justify-end gap-3">
          {!isSelectedItemEmpty() && (
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-blue-700 bg-blue-700 py-2 text-sm text-white hover:border-blue-600 hover:bg-blue-600"
            >
              <SaveSvg height={"12px"} width={"12px"} color={"white"} />
              Save
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              mode === "edit" ? setEditMode(false) : setShowItemForm(false);
            }}
            className="col-start-2 w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-gray-400/40 bg-white py-2 text-sm text-black hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </li>
  );
}
export default ItemForm;

function CategorySelector({ category, handleCategoryClick }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold">Category</h3>
      <div className="flex gap-2">
        {CATEGORIES.map((categoryItem) => (
          <label
            key={categoryItem}
            htmlFor={categoryItem}
            className={`${
              category === categoryItem &&
              "bg-blue-700 text-white hover:!bg-blue-600"
            } flex cursor-pointer items-center rounded-md border border-gray-400/40 px-3 py-2 hover:bg-gray-100`}
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
  );
}

function SaveSvg({ height, width, color }) {
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
