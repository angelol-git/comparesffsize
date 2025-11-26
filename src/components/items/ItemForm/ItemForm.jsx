import { useState, useEffect } from "react";
import { v7 as uuidv7 } from "uuid";
import { Save, CircleX } from "lucide-react";
import { CATEGORIES, COLORS, EMPTY_ITEM } from "./constants";
import { useCaseData } from "../../../hooks/useCaseData";
import MeasurementInputs from "./MeasurementInputs";
import SearchSelect from "./SearchSelect";

function ItemForm({
  mode,
  editItem,
  selectedItems,
  handleAddItem,
  handleEditItem,
  setActiveForm,
  itemFormRef,
}) {
  const [selectedItem, setSelectedItem] = useState(
    mode === "edit" ? editItem : EMPTY_ITEM,
  );
  const [category, setCategory] = useState(
    mode === "edit" ? editItem.type : "case",
  );
  const [color, setColor] = useState(() =>
    mode === "add" ? getColor() : selectedItem.color,
  );
  const { data, isLoading, isError } = useCaseData(category);

  //New color will be based off of the previous item color
  function getColor() {
    if (selectedItems.length === 0) {
      return COLORS[0];
    }
    const lastColor = selectedItems[selectedItems?.length - 1].color;
    const lastIndexColor = COLORS.indexOf(lastColor);

    //Last item used a custom color
    if (lastIndexColor === -1) {
      return COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    return COLORS[(lastIndexColor + 1) % COLORS.length];
  }

  useEffect(() => {
    if (itemFormRef?.current) {
      console.log("here");
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

  function handleCategoryChange(event) {
    const newCategory = event.target.value;
    setCategory(newCategory);
    if (mode === "edit") {
      if (newCategory === editItem.type) {
        setSelectedItem(editItem);
      } else {
        setSelectedItem(EMPTY_ITEM);
      }
    } else {
      setSelectedItem(EMPTY_ITEM);
    }
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (mode === "add") {
      const newItem = {
        ...selectedItem,
        id: uuidv7(),
        hide: false,
        type: category,
        color: color,
      };
      handleAddItem(newItem);
    } else {
      const newItem = {
        ...selectedItem,
        color: color,
      };
      handleEditItem(newItem);
    }
    setSelectedItem(EMPTY_ITEM);
    setActiveForm(null);
  }

  return (
    <form
      id="add-item-form"
      className="border-border flex w-full flex-col gap-4 rounded-md border-1 bg-white p-4 text-sm"
      onSubmit={handleSubmit}
      ref={itemFormRef}
    >
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold">Category</h3>
        <div className="flex gap-2">
          {CATEGORIES.map((categoryItem) => (
            <label
              key={categoryItem}
              htmlFor={categoryItem}
              className={`border-border flex cursor-pointer items-center rounded-md border-1 px-3 py-2 transition-all duration-150 ${category === categoryItem ? "hover:bg-black-hover bg-black text-white transition-all duration-150" : "hover:bg-white-hover"} `}
            >
              <input
                type="radio"
                id={categoryItem}
                name="category"
                value={categoryItem}
                checked={category === categoryItem}
                onChange={(event) => {
                  handleCategoryChange(event, category);
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
            mode={mode}
            data={data}
            color={color}
            setColor={setColor}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            isSelectedItemEmpty={isSelectedItemEmpty}
            clearSelectedItem={() => {
              setSelectedItem(EMPTY_ITEM);
            }}
            category={category}
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
        category={category}
      />

      <div className="grid grid-cols-2 justify-end gap-3">
        {!isSelectedItemEmpty() && (
          <button
            type="submit"
            className="hover:bg-accent-hover bg-blue bg-accent-dark flex w-full cursor-pointer items-center justify-center gap-2 rounded-md py-2 text-sm text-white transition-all duration-150"
          >
            <Save size={16} />
            Save
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            setActiveForm(null);
          }}
          className="border-border hover:bg-white-hover col-start-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-1 py-2 text-sm text-black transition-all duration-150"
        >
          <CircleX size={16} />
          Cancel
        </button>
      </div>
    </form>
  );
}
export default ItemForm;
