import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { CATEGORIES, COLORS } from "./constants";
import fetchCases from "../../../queries/fetchCases";
import fetchOther from "../../../queries/fetchOther";
import MeasurementInputs from "./MeasurementInputs";
import SearchSelect from "./SearchSelect";
import FormActions from "./FormActions";

function AddItemForm({ setShowAddItemForm, selectedItems, setSelectedItems }) {
  const [category, setCategory] = useState("case");
  const [selectedItem, setSelectedItem] = useState({
    brand: null,
    name: null,
    measurements: {
      length: null,
      width: null,
      height: null,
      volume: null,
    },
  });
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
    return (
      !selectedItem.brand &&
      !selectedItem.name &&
      !selectedItem.measurements.length &&
      !selectedItem.measurements.width &&
      !selectedItem.measurements.height &&
      !selectedItem.measurements.volume
    );
  }

  function clearCurrentItem() {
    setSelectedItem({
      brand: null,
      name: null,
      measurements: {
        length: null,
        width: null,
        height: null,
        volume: null,
      },
    });
  }

  function handleCategoryClick(event) {
    setCategory(event.target.value);
    clearCurrentItem();
  }

  function assignColor() {
    return COLORS[selectedItems.length % COLORS.length];
  }

  function handleSubmit(event) {
    event.preventDefault();
    selectedItem.id = uuidv4();
    selectedItem.hide = false;
    selectedItem.color = assignColor();
    setSelectedItems([...selectedItems, selectedItem]);
    clearCurrentItem();
    setShowAddItemForm(false);
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
        {casesQuery.isLoading && "Loading cases..."}
        {casesQuery.error && "Error fetching cases"}
        {casesQuery.data && category === "case" && (
          <div className="flex flex-col gap-3">
            <SearchSelect
              data={casesQuery.data}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isSelectedItemEmpty={isSelectedItemEmpty}
              clearCurrentItem={clearCurrentItem}
              setShowAddItemForm={setShowAddItemForm}
            />
            {!isSelectedItemEmpty() && (
              <>
                <MeasurementInputs
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
                <FormActions setShowAddItemForm={setShowAddItemForm} />
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
            <FormActions setShowAddItemForm={setShowAddItemForm} />
          </div>
        )}
        {otherQuery.isLoading && "Loading other..."}
        {otherQuery.error && "Error loading other"}
        {otherQuery.data && category === "other" && (
          <div className="flex flex-col gap-3">
            <SearchSelect
              data={otherQuery.data}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isSelectedItemEmpty={isSelectedItemEmpty}
              clearCurrentItem={clearCurrentItem}
              setShowAddItemForm={setShowAddItemForm}
            />
            {!isSelectedItemEmpty() && (
              <>
                <MeasurementInputs
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
                <FormActions setShowAddItemForm={setShowAddItemForm} />
              </>
            )}
          </div>
        )}
      </form>
    </li>
  );
}
export default AddItemForm;
