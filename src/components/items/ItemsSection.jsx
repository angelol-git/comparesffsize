import { useState, useRef } from "react";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  useSensor,
  PointerSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import ItemForm from "./ItemForm/ItemForm";
import SelectedItems from "./SelectedItems";

function ItemsSection({
  handleAddItem,
  handleDeleteItem,
  handleEditItem,
  handleHideItem,
  handleDragEnd,
  selectedItems,
  setSelectedItems,
  isCanvasView,
  isMobile,
}) {
  const [showItemForm, setShowItemForm] = useState(false);
  function isTouchDevice() {
    if (
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    ) {
      return true;
    } else return false;
  }
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: isTouchDevice()
        ? {
            delay: 300,
            tolerance: 5,
          }
        : undefined,
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const itemFormRef = useRef(null);
  return (
    <section
      id="sidebar-wrapper"
      className={`h-full min-h-0 flex-col px-4 ${isCanvasView && isMobile ? "hidden" : "flex"}`}
    >
      <div className="h-full overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">My Items</h2>
          <button
            onClick={() => {
              setShowItemForm(true);
            }}
            className="bg-accent-dark flex cursor-pointer items-center justify-center gap-3 rounded-md px-4 py-2 text-white"
          >
            <Plus height="16" width="16" strokeWidth={2} />
            <span className="text-sm">Add New</span>
          </button>
        </div>
        {selectedItems.length > 0 || showItemForm ? (
          <DndContext
            onDragEnd={(event) => {
              handleDragEnd(event);
            }}
            sensors={sensors}
            collisionDetection={closestCorners}
          >
            <ul className="flex h-full flex-1 list-none flex-col gap-3 py-4">
              {selectedItems.length > 0 && (
                <SortableContext
                  items={selectedItems}
                  strategy={verticalListSortingStrategy}
                >
                  {selectedItems.map((item) => (
                    <SelectedItems
                      key={item.id}
                      item={item}
                      setShowItemForm={setShowItemForm}
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                      handleAddItem={handleAddItem}
                      handleDeleteItem={handleDeleteItem}
                      handleEditItem={handleEditItem}
                      handleHideItem={handleHideItem}
                    />
                  ))}
                </SortableContext>
              )}

              {showItemForm === true && (
                <ItemForm
                  setShowItemForm={setShowItemForm}
                  selectedItems={selectedItems}
                  handleAddItem={handleAddItem}
                  handleEditItem={handleEditItem}
                  itemFormRef={itemFormRef}
                />
              )}
            </ul>
          </DndContext>
        ) : (
          <div className="py-2">No items selected yet</div>
        )}
      </div>
    </section>
  );
}

export default ItemsSection;
