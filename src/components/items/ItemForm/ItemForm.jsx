import { useState, useEffect } from "react";
import { v7 as uuidv7 } from "uuid";
import { Save, CircleX, Folder, PenTool, Layers } from "lucide-react";
import { CATEGORIES, EMPTY_ITEM } from "./constants";
import { useCaseData } from "../../../hooks/useCaseData";
import MeasurementInputs from "./MeasurementInputs";
import SearchSelect from "./SearchSelect";

function ItemForm({
  mode,
  editItem,
  nextColor,
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
    mode === "add" ? nextColor : selectedItem.color,
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
    setActiveForm({ item: null, mode: null });
  }

  const categoryIcons = {
    case: Folder,
    custom: PenTool,
    other: Layers,
  };

  return (
    <form
      id="add-item-form"
      className="flex w-full flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
      onSubmit={handleSubmit}
      ref={itemFormRef}
    >
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold tracking-wider text-gray-600 uppercase">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((categoryItem) => {
            const Icon = categoryIcons[categoryItem];
            const isSelected = category === categoryItem;

            return (
              <label
                key={categoryItem}
                htmlFor={categoryItem}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                  isSelected
                    ? "border-accent-dark bg-accent-dark text-white"
                    : "border-gray-200 bg-gray-50 text-gray-800 hover:border-gray-300 hover:bg-gray-100"
                }`}
              >
                <input
                  type="radio"
                  id={categoryItem}
                  name="category"
                  value={categoryItem}
                  checked={isSelected}
                  onChange={handleCategoryChange}
                  className="sr-only"
                />
                <Icon size={14} />
                <span className="capitalize">{categoryItem}</span>
              </label>
            );
          })}
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 py-2 text-sm text-gray-600">
          <div className="border-t-accent h-4 w-4 animate-spin rounded-full border-2 border-gray-300" />
          Loading cases...
        </div>
      )}

      {isError && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600">
          Error fetching cases. Please try again.
        </div>
      )}

      {data && (category === "case" || category === "other") && (
        <SearchSelect
          mode={mode}
          data={data}
          color={color}
          setColor={setColor}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          isSelectedItemEmpty={isSelectedItemEmpty}
          clearSelectedItem={() => setSelectedItem(EMPTY_ITEM)}
          category={category}
        />
      )}

      {category === "custom" && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="custom-name"
            className="text-xs font-semibold tracking-wider text-gray-600 uppercase"
          >
            Custom Name
          </label>
          <input
            type="text"
            id="custom-name"
            placeholder="Enter custom case name..."
            autoComplete="off"
            required
            onChange={(event) => {
              setSelectedItem((prev) => ({
                ...prev,
                brand: "Custom",
                name: event.target.value,
              }));
            }}
            value={selectedItem.name || ""}
            className="focus:border-accent focus:ring-accent/20 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors focus:ring-2 focus:outline-none"
          />
        </div>
      )}

      <MeasurementInputs
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        category={category}
      />

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold tracking-wider text-gray-600 uppercase">
          Display Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            aria-label="Select color"
            className="h-8 w-8 cursor-pointer rounded border-0 p-0"
          />
          <span className="font-mono text-xs text-gray-600 uppercase">
            {color}
          </span>
        </div>
      </div>

      <div className="mt-2 flex gap-2">
        {!isSelectedItemEmpty() && (
          <button
            type="submit"
            className="bg-accent-dark hover:bg-accent-hover flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-white transition-colors"
          >
            <Save size={16} />
            {mode === "add" ? "Add Case" : "Save Changes"}
          </button>
        )}

        <button
          type="button"
          onClick={() => setActiveForm({ item: null, mode: null })}
          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
        >
          <CircleX size={16} />
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ItemForm;
