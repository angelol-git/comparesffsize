import { useState, useRef, useCallback, useEffect } from "react";
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
import { Plus, Layers } from "lucide-react";
import Item from "./Item";
import ItemForm from "./ItemForm/ItemForm";
import useIsMobile from "../../hooks/useIsMobile";
import { COLORS } from "./ItemForm/constants";

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
  const lastColorIndexRef = useRef(-1);
  const hasInitializedRef = useRef(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    if (!hasInitializedRef.current && items.length > 0) {
      const lastItemColor = items[items.length - 1].color;
      const colorIndex = COLORS.indexOf(lastItemColor);
      if (colorIndex !== -1) {
        lastColorIndexRef.current = colorIndex;
      }
      hasInitializedRef.current = true;
    }
  }, [items]);

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      if (!over) return;
      if (active.id === over.id) return;
      if (active.id !== over.id) {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        handleReorderItems(arrayMove(items, oldIndex, newIndex));
      }
    },
    [items, handleReorderItems],
  );

  const handleAddItemWithColor = useCallback(
    (newItem) => {
      const nextColorIndex = (lastColorIndexRef.current + 1) % COLORS.length;
      lastColorIndexRef.current = nextColorIndex;
      const itemWithColor = { ...newItem, color: COLORS[nextColorIndex] };
      handleAddItem(itemWithColor);
    },
    [handleAddItem],
  );

  const nextColor = COLORS[(lastColorIndexRef.current + 1) % COLORS.length];

  return (
    <section
      id="sidebar-wrapper"
      className={`border-border flex max-h-full flex-1 flex-col overflow-y-auto border-l-1 ${
        isCanvasView && isMobile ? "hidden" : ""
      }`}
    >
      <div className="flex items-center justify-between border-b border-gray-300 p-4 lg:py-4">
        <div className="flex items-center gap-2">
          <Layers className="text-accent h-5 w-5" />
          <h2 className="text-xl font-bold">My Items</h2>
        </div>
        <button
          onClick={() => setActiveForm({ item: null, mode: "add" })}
          disabled={activeForm.mode === "add"}
          className={`flex cursor-pointer items-center justify-center gap-3 rounded-md px-3 py-2 text-white ${activeForm.mode === "add" ? "bg-accent hover:bg-accent" : "bg-accent-dark hover:bg-accent-hover"} `}
        >
          <Plus size={16} strokeWidth={2} />
          <span className="text-sm">Add New</span>
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        {items.length === 0 && activeForm.mode === null && (
          <div>No items selected yet</div>
        )}
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
                  {activeForm.mode === "edit" &&
                  activeForm.item.id === item.id ? (
                    <ItemForm
                      mode={activeForm.mode}
                      editItem={activeForm.item}
                      nextColor={nextColor}
                      handleAddItem={handleAddItemWithColor}
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
            nextColor={nextColor}
            handleAddItem={handleAddItemWithColor}
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
