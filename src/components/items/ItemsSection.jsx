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
import { Plus } from "lucide-react";
import Item from "./Item";
import ItemForm from "./ItemForm/ItemForm";
import useIsMobile from "../../hooks/useIsMobile";
function ItemsSection({
  items,
  handleAddItem,
  handleDeleteItem,
  handleEditItem,
  handleHideItem,
  handleReorderItems,
  isCanvasView,
}) {
  const isMobile = useIsMobile();
  const [activeForm, setActiveForm] = useState({ item: null, mode: null });
  const [activeOptionId, setActiveOptionId] = useState(null);
  const itemFormRef = useRef(null);
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
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      handleReorderItems(arrayMove(items, oldIndex, newIndex));
    }
  }

  return (
    <section
      id="sidebar-wrapper"
      className={`border-border flex max-h-full flex-1 flex-col overflow-y-auto border-l-1 p-4 lg:py-4 ${
        isCanvasView && isMobile ? "hidden" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">My Items</h2>
        <button
          onClick={() => setActiveForm({ item: null, mode: "add" })}
          disabled={activeForm?.mode === "add"}
          className={`flex cursor-pointer items-center justify-center gap-3 rounded-md px-3 py-2 text-white ${activeForm?.mode === "add" ? "bg-accent hover:bg-accent" : "bg-accent-dark hover:bg-accent-hover"} `}
        >
          <Plus size={16} strokeWidth={2} />
          <span className="text-sm">Add New</span>
        </button>
      </div>

      {items.length === 0 && activeForm?.mode === null && (
        <div>No items selected yet</div>
      )}
      <div className="flex flex-1 flex-col gap-3 rounded-md py-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={item.id}>
                  {activeForm?.mode === "edit" &&
                  activeForm.item.id === item.id ? (
                    <ItemForm
                      mode={activeForm.mode}
                      editItem={activeForm.item}
                      items={items}
                      handleAddItem={handleAddItem}
                      handleEditItem={handleEditItem}
                      setActiveForm={setActiveForm}
                      itemFormRef={itemFormRef}
                    />
                  ) : (
                    <Item
                      item={item}
                      handleHideItem={handleHideItem}
                      handleDeleteItem={handleDeleteItem}
                      activeOptionId={activeOptionId}
                      setActiveOptionId={setActiveOptionId}
                      setActiveForm={setActiveForm}
                    />
                  )}
                </li>
              ))}
            </ul>
          </SortableContext>
        </DndContext>

        {activeForm && activeForm.mode === "add" && (
          <ItemForm
            mode={activeForm.mode}
            editItem={activeForm.item}
            items={items}
            handleAddItem={handleAddItem}
            handleEditItem={handleEditItem}
            setActiveForm={setActiveForm}
            itemFormRef={itemFormRef}
          />
        )}
      </div>
    </section>
  );
}

export default ItemsSection;
