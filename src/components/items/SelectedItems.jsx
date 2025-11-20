import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useHoldDownAnimation } from "../../hooks/useHoldDownAnimation";
import { GripVertical } from "lucide-react";
import ItemForm from "./ItemForm/ItemForm";
import SelectedItemsOptions from "./SelectedItemOptions";
function SelectedItems({
  item,
  activeForm,
  handleAddItem,
  handleEditItem,
  handleHideItem,
  handleDeleteItem,
  editingCaseId,
  setEditingCaseId,
  isMobile,
  setActiveForm,
  selectedItemsLength,
  itemFormRef,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const { boxShadow, dragHandleRef } = useHoldDownAnimation();

  const style = { transition, transform: CSS.Transform.toString(transform) };

  if (activeForm?.mode === "edit" && activeForm.item.id === item.id) {
    return (
      <ItemForm
        mode={activeForm.mode}
        editItem={activeForm.item}
        handleAddItem={handleAddItem}
        handleEditItem={handleEditItem}
        setActiveForm={setActiveForm}
        selectedItemsLength={selectedItemsLength}
        itemFormRef={itemFormRef}
      />
    );
  } else {
    return (
      <div
        style={{
          ...style,
          boxShadow: boxShadow,
        }}
        className="flex w-full justify-between"
      >
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
          <button
            type="button"
            style={{ backgroundColor: item.hide ? "#4B4B4B" : item.color }}
            className="flex h-[20px] w-[20px] shrink-0 cursor-pointer items-center lg:h-[24px] lg:w-[24px]"
          ></button>
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
        {/* <SelectedItemsOptions
            item={item}
            isMobile={isMobile}

            handleHideItem={handleHideItem}
            handleDeleteItem={handleDeleteItem}
            editingCaseId={editingCaseId}
            setEditingCaseId={setEditingCaseId}
          /> */}
      </div>
    );
  }
}

export default SelectedItems;
