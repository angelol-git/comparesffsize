import { useState, useRef } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import SelectedItem from "./SelectedItem";
import { Plus } from "lucide-react";
import ItemForm from "./ItemForm/ItemForm";

function ItemsSection({
  selectedItems,
  setSelectedItems,
  handleAddItem,
  handleDeleteItem,
  handleEditItem,
  handleHideItem,
  isCanvasView,
  isMobile,
}) {
  const itemFormRef = useRef(null);
  const [activeForm, setActiveForm] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;
    if (active.id !== over.id) {
      setSelectedItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <section
      id="sidebar-wrapper"
      className={`h-full min-h-0 flex-col lg:px-4 ${isCanvasView && isMobile ? "hidden" : "flex"}`}
    >
      <div className="h-full overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">My Items</h2>
          <button
            onClick={() => setActiveForm({ mode: "add" })}
            className="bg-accent-dark flex cursor-pointer items-center justify-center gap-3 rounded-md px-3 py-2 text-white"
          >
            <Plus height="16" width="16" strokeWidth={2} />
            <span className="text-sm">Add New</span>
          </button>
        </div>

        {selectedItems.length === 0 && !activeForm && (
          <div>No items selected yet</div>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={selectedItems.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex flex-1 list-none flex-col gap-3 py-4">
              {selectedItems.map((item) => (
                <li key={item.id}>
                  <SelectedItem
                    item={item}
                    activeForm={activeForm}
                    handleAddItem={handleAddItem}
                    handleDeleteItem={handleDeleteItem}
                    handleEditItem={handleEditItem}
                    handleHideItem={handleHideItem}
                    isMobile={isMobile}
                    setActiveForm={setActiveForm}
                    selectedItemsLength={selectedItems.length}
                    itemFormRef={itemFormRef}
                  />
                </li>
              ))}
            </ul>
          </SortableContext>
        </DndContext>

        {activeForm && (
          <ItemForm
            mode={activeForm.mode}
            editItem={activeForm.item}
            handleAddItem={handleAddItem}
            handleEditItem={handleEditItem}
            setActiveForm={setActiveForm}
            selectedItemsLength={selectedItems.length}
            itemFormRef={itemFormRef}
          />
        )}
      </div>
    </section>
  );
}

export default ItemsSection;
