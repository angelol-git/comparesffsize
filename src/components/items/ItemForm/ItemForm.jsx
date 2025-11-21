import { useState, useEffect } from "react";
import { v7 as uuidv7 } from "uuid";
import { Save } from "lucide-react";
import { CATEGORIES, COLORS, EMPTY_ITEM } from "./constants";
import { useCaseData } from "../../../hooks/useCaseData";
import MeasurementInputs from "./MeasurementInputs";
import SearchSelect from "./SearchSelect";

function ItemForm({
  mode,
  editItem,
  handleAddItem,
  handleEditItem,
  selectedItemsLength,
  setActiveForm,
  itemFormRef,
}) {
  const [selectedItem, setSelectedItem] = useState(
    mode === "edit" ? editItem : EMPTY_ITEM,
  );
  const [category, setCategory] = useState(
    mode === "edit" ? editItem.type : "case",
  );
  const { data, isLoading, isError } = useCaseData(category);

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

  function handleSubmit(event) {
    event.preventDefault();
    if (mode === "add") {
      const newItem = {
        ...selectedItem,
        id: uuidv7(),
        hide: false,
        type: category,
        color: COLORS[selectedItemsLength % COLORS.length],
      };
      handleAddItem(newItem);
    } else {
      handleEditItem(selectedItem);
    }
    setSelectedItem(EMPTY_ITEM);
    setActiveForm(null);
  }

  return (
    <form
      id="add-item-form"
      className="border-border flex w-full flex-col gap-4 rounded-md border-1 bg-white p-4 text-sm"
      // style={mode === "edit" ? { borderColor: editItem.color } : {}}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold">Category</h3>
        <div className="flex gap-2">
          {CATEGORIES.map((categoryItem) => (
            <label
              key={categoryItem}
              htmlFor={categoryItem}
              className={`${
                category === categoryItem && "bg-black text-white"
              } border-border flex cursor-pointer items-center rounded-md border-1 px-3 py-2`}
            >
              <input
                type="radio"
                id={categoryItem}
                name="category"
                value={categoryItem}
                checked={category === categoryItem}
                onChange={() => {
                  setCategory(event.target.value);
                  setSelectedItem(EMPTY_ITEM);
                }}
                className="sr-only"
              />
              {categoryItem.charAt(0).toUpperCase() + categoryItem.slice(1)}
            </label>
          ))}
        </div>
      </div>
      {isLoading && "Loading cases..."}
      {isError && "Error fetching cases"}
      {data && (category === "case" || category === "other") && (
        <div className="flex flex-col gap-3">
          <SearchSelect
            data={data}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            isSelectedItemEmpty={isSelectedItemEmpty}
            clearSelectedItem={() => {
              setSelectedItem(EMPTY_ITEM);
            }}
          />
        </div>
      )}
      {category === "custom" && (
        <div className="flex flex-col gap-3">
          <label htmlFor="search-input" className="font-semibold">
            Name
          </label>
          <div className="flex w-full cursor-pointer flex-col">
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
              className="border-border relative w-full rounded-md border-1 px-3 py-2 text-sm"
            />
          </div>
        </div>
      )}
      <MeasurementInputs
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <div className="grid grid-cols-2 items-center justify-end gap-3">
        {!isSelectedItemEmpty() && (
          <button
            type="submit"
            className="bg-blue bg-accent-dark flex w-full cursor-pointer items-center justify-center gap-3 rounded-md py-2 text-sm text-white"
          >
            <Save height="16" width="16" />
            Save
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            setActiveForm(null);
          }}
          className="bg-warm-white border-border col-start-2 w-full cursor-pointer items-center justify-center gap-3 rounded-md border-1 py-2 text-sm text-black"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
export default ItemForm;
