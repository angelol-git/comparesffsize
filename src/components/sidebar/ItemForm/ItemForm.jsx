import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { CATEGORIES, COLORS, EMPTY_ITEM } from "./constants";
import fetchCases from "../../../queries/fetchCases";
import fetchOther from "../../../queries/fetchOther";
import MeasurementInputs from "./MeasurementInputs";
import SearchSelect from "./SearchSelect";
import FormActions from "./FormActions";

function ItemForm({
  mode = "add",
  setShowItemForm,
  selectedItems,
  handleAddItem,
  handleEditItem,
  editItem,
  setEditMode,
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
    <li className={`w-full`}>
      <form
        id="add-item-form"
        className="flex w-full flex-col gap-3 rounded-md border border-gray-400/40 bg-white p-4 text-sm"
        style={mode === "edit" ? { borderColor: editItem.color } : {}}
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
              <>
                <MeasurementInputs
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
                <FormActions
                  mode={mode}
                  setShowItemForm={setShowItemForm}
                  setEditMode={setEditMode}
                />
              </>
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
                  className="w-full rounded-md border-1 border-solid border-gray-400/40 px-3 py-2"
                />
              </div>
            </div>
            <MeasurementInputs
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />
            <FormActions
              mode={mode}
              setShowItemForm={setShowItemForm}
              setEditMode={setEditMode}
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
              <>
                <MeasurementInputs
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
                <FormActions
                  mode={mode}
                  setShowItemForm={setShowItemForm}
                  setEditMode={setEditMode}
                />
              </>
            )}
          </div>
        )}
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
