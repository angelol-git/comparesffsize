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
import SelectedItem from "./SelectedItem";
import ItemForm from "./ItemForm/ItemForm";
import useIsMobile from "../../hooks/useIsMobile";
function ItemsSection({
  selectedItems,
  setSelectedItems,
  handleAddItem,
  handleDeleteItem,
  handleEditItem,
  handleHideItem,
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
      // className={`bg-off-white lg:border-border flex-col rounded-md p-4 lg:border-1 lg:py-4 ${
      //   isCanvasView && isMobile ? "hidden" : "flex"
      // } h-full max-h-full`}
      className={`bg-off-white lg:border-border max-h-screen flex-col rounded-md p-4 lg:border-1 lg:py-4 ${isCanvasView && isMobile ? "hidden" : "flex"} h-full`}
    >
      <div className="h-full overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">My Items</h2>
          <button
            onClick={() => setActiveForm({ item: null, mode: "add" })}
            disabled={activeForm?.mode === "add"}
            className={`flex cursor-pointer items-center justify-center gap-3 rounded-md px-3 py-2 text-white ${activeForm?.mode === "add" ? "bg-accent hover:bg-accent" : "bg-accent-dark hover:bg-accent-hover"} `}
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
                  {activeForm?.mode === "edit" &&
                  activeForm.item.id === item.id ? (
                    <ItemForm
                      mode={activeForm.mode}
                      editItem={activeForm.item}
                      selectedItems={selectedItems}
                      handleAddItem={handleAddItem}
                      handleEditItem={handleEditItem}
                      setActiveForm={setActiveForm}
                      itemFormRef={itemFormRef}
                    />
                  ) : (
                    <SelectedItem
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
            selectedItems={selectedItems}
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
