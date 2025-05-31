import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OrbitControls } from "@react-three/drei";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  PointerSensor,
  useSensors,
} from "@dnd-kit/core";
import { useItems } from "./hooks/useItems";
import { useIsMobile } from "./hooks/useIsMobile";
import ItemForm from "./components/sidebar/ItemForm/ItemForm";
import SelectedItems from "./components/sidebar/SelectedItems";
import CanvasItems from "./components/canvas/CanvasItems";
import "./reset.css";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import MobileNav from "./components/home/mobileNav";

const queryClient = new QueryClient();
function App() {
  const [showItemForm, setShowItemForm] = useState(false);
  const [isCanvasView, setIsCanvasView] = useState(true);
  const isMobile = useIsMobile();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const itemFormRef = useRef(null);
  const {
    selectedItems,
    handleAddItem,
    handleDeleteItem,
    handleEditItem,
    handleHideItem,
    handleDragEnd,
    setSelectedItems,
  } = useItems();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid h-full min-h-0 grid-rows-[auto_1fr]">
        <div className="w-full border-b-1 border-gray-400/40">
          <h1 className="p-3 text-xl font-bold">Compare SFF Size</h1>
        </div>
        <main className="grid min-h-0 grid-cols-1 grid-rows-[1fr_auto] md:grid-cols-[1.5fr_1fr]">
          <section
            id="canvas-wrapper"
            className={`relative min-h-0 min-w-0 bg-black ${isMobile && !isCanvasView ? "hidden" : "grid"}`}
          >
            <Canvas camera={{ position: [10, 15, 20], fov: 75 }}>
              {selectedItems.length > 0 && (
                <CanvasItems selectedItems={selectedItems} />
              )}
              <directionalLight position={[10, 10, 1]} />
              <ambientLight intensity={2.5} />
              <OrbitControls />
            </Canvas>
          </section>
          <section
            id="sidebar-wrapper"
            className={`flex h-full min-h-0 flex-col bg-slate-100 p-4 ${isMobile && isCanvasView ? "hidden" : "flex"}`}
          >
            <div className="h-full overflow-y-auto rounded-md border-1 border-gray-300 bg-slate-100 p-4">
              <header className="flex items-center justify-between">
                <h2 className="text-xl font-bold">My Items</h2>
                <button
                  onClick={() => {
                    setShowItemForm(true);
                  }}
                  className="flex cursor-pointer items-center justify-center gap-3 rounded-md border border-gray-400/40 bg-white px-4 py-2 hover:bg-gray-100"
                >
                  <PlusSvg height={"10px"} width={"10px"} color="#636363" />
                  <span className="text-sm">Add New</span>
                </button>
              </header>
              <DndContext
                onDragEnd={(event) => {
                  handleDragEnd(event);
                }}
                sensors={sensors}
                collisionDetection={closestCorners}
              >
                <ul className="flex h-full flex-1 list-none flex-col gap-3 py-2">
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
            </div>
          </section>
          {isMobile ? (
            <MobileNav
              isCanvasView={isCanvasView}
              setIsCanvasView={setIsCanvasView}
            />
          ) : null}
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;

function PlusSvg({ height, width }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={height}
      width={width}
    >
      <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
    </svg>
  );
}
