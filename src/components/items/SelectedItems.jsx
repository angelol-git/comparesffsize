import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useHoldDownAnimation } from "../../hooks/useHoldDownAnimation";
import { GripVertical, Ellipsis } from "lucide-react";
import ItemForm from "./ItemForm/ItemForm";
import SelectedItemsOptions from "./SelectedItemOptions";
function SelectedItems({
  item,
  setShowItemForm,
  selectedItems,
  setSelectedItems,
  handleAddItem,
  handleEditItem,
  handleHideItem,
  handleDeleteItem,
  isMobile,
}) {
  const [editMode, setEditMode] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const { boxShadow, dragHandleRef } = useHoldDownAnimation();

  function assignColor() {
    return item.hide ? "#4B4B4B" : item.color;
  }

  const style = { transition, transform: CSS.Transform.toString(transform) };

  return editMode ? (
    <ItemForm
      mode={"edit"}
      setShowItemForm={setShowItemForm}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
      handleAddItem={handleAddItem}
      handleEditItem={handleEditItem}
      editItem={item}
      setEditMode={setEditMode}
    />
  ) : (
    <li
      style={{
        ...style,
        boxShadow: boxShadow,
      }}
      className={`ease @container flex w-full rounded-md border px-2 py-4 transition-colors duration-200`}
    >
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-3 lg:gap-4">
          <div
            ref={(el) => {
              setNodeRef(el);
              dragHandleRef.current = el;
            }}
            {...attributes}
            {...listeners}
            className="flex h-full cursor-grab touch-none items-center select-none"
          >
            <GripVertical height="22" width="22" className="stroke-icon" />
          </div>
          {/*COLOR SWATCH*/}
          <button
            type="button"
            style={{ backgroundColor: assignColor() }}
            className="flex h-[20px] w-[20px] shrink-0 cursor-pointer items-center lg:h-[24px] lg:w-[24px]"
          ></button>
          {/*CASE INFO*/}
          <div>
            <div className="font-bold">
              {item.brand} - {item.name}
            </div>
            <div className="text-secondary text-sm">
              {`${item.measurements.length} ×
            ${item.measurements.width} ×
            ${item.measurements.height} mm
            (${item.measurements.volume} L)`}
            </div>
          </div>
        </div>
        <SelectedItemsOptions
          item={item}
          isMobile={isMobile}
          setEditMode={setEditMode}
          handleHideItem={handleHideItem}
          handleDeleteItem={handleDeleteItem}
          showSettingsModal={showSettingsModal}
          setShowSettingsModal={setShowSettingsModal}
        />
      </div>
    </li>
  );
}

export default SelectedItems;
