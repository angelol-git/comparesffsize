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
  const itemFormRef = useRef(null);
  const [editingCaseId, setEditingCaseId] = useState(null);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
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

  return (
    <section
      id="sidebar-wrapper"
      className={`h-full min-h-0 flex-col lg:px-4 ${isCanvasView && isMobile ? "hidden" : "flex"}`}
    >
      <div className="h-full overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">My Items</h2>
          <button
            onClick={() => {
              setShowAddItemForm(true);
            }}
            className="bg-accent-dark flex cursor-pointer items-center justify-center gap-3 rounded-md px-3 py-2 text-white"
          >
            <Plus height="16" width="16" strokeWidth={2} />
            <span className="text-sm">Add New</span>
          </button>
        </div>

        {selectedItems.length === 0 && !showAddItemForm && (
          <div>No items selected yet</div>
        )}

        <DndContext
          onDragEnd={(event) => {
            handleDragEnd(event);
          }}
          sensors={sensors}
          collisionDetection={closestCorners}
        >
          <SortableContext
            items={selectedItems}
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex flex-1 list-none flex-col gap-3 py-4">
              {selectedItems.map((item) => (
                <SelectedItems
                  key={item.id}
                  item={item}
                  setShowAddItemForm={setShowAddItemForm}
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  handleAddItem={handleAddItem}
                  handleDeleteItem={handleDeleteItem}
                  handleEditItem={handleEditItem}
                  handleHideItem={handleHideItem}
                  isMobile={isMobile}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>

        {showAddItemForm && (
          <ItemForm
            setShowAddItemForm={setShowAddItemForm}
            selectedItems={selectedItems}
            handleAddItem={handleAddItem}
            handleEditItem={handleEditItem}
            itemFormRef={itemFormRef}
          />
        )}
      </div>
    </section>
  );
}

export default ItemsSection;
