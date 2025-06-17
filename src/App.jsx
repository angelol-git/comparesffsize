import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OrbitControls } from "@react-three/drei";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
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
import MobileNav from "./components/home/MobileNav";

const queryClient = new QueryClient();
function App() {
  const [showItemForm, setShowItemForm] = useState(false);
  const [isCanvasView, setIsCanvasView] = useState(true);
  const isMobile = useIsMobile();

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
          <h1 className="flex items-center gap-2 px-5 py-3 text-xl font-bold">
            <BoxSvg height="24px" width="24px" />
            Compare SFF Size
          </h1>
        </div>
        <main className="grid min-h-0 grid-cols-1 grid-rows-[1fr_auto] lg:grid-cols-[1.5fr_1fr]">
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
            className={`flex h-full min-h-0 flex-col bg-slate-100 md:p-4 ${isMobile && isCanvasView ? "hidden" : "flex"}`}
          >
            <div className="h-full overflow-y-auto rounded-md border-gray-300 bg-slate-100 p-4 md:border-1">
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

function BoxSvg({ height, width }) {
  return (
    <svg
      viewBox="0 0 24 24"
      height={height}
      width={width}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M20.2083 7.82141L12.5083 12.2814C12.1983 12.4614 11.8083 12.4614 11.4883 12.2814L3.78826 7.82141C3.23826 7.50141 3.09826 6.75141 3.51826 6.28141C3.80826 5.95141 4.13826 5.68141 4.48826 5.49141L9.90826 2.49141C11.0683 1.84141 12.9483 1.84141 14.1083 2.49141L19.5283 5.49141C19.8783 5.68141 20.2083 5.96141 20.4983 6.28141C20.8983 6.75141 20.7583 7.50141 20.2083 7.82141Z"
          fill="#292D32"
        ></path>{" "}
        <path
          d="M11.4305 14.1389V20.9589C11.4305 21.7189 10.6605 22.2189 9.98047 21.8889C7.92047 20.8789 4.45047 18.9889 4.45047 18.9889C3.23047 18.2989 2.23047 16.5589 2.23047 15.1289V9.9689C2.23047 9.1789 3.06047 8.6789 3.74047 9.0689L10.9305 13.2389C11.2305 13.4289 11.4305 13.7689 11.4305 14.1389Z"
          fill="#292D32"
        ></path>{" "}
        <path
          d="M12.5703 14.1389V20.9589C12.5703 21.7189 13.3403 22.2189 14.0203 21.8889C16.0803 20.8789 19.5503 18.9889 19.5503 18.9889C20.7703 18.2989 21.7703 16.5589 21.7703 15.1289V9.9689C21.7703 9.1789 20.9403 8.6789 20.2603 9.0689L13.0703 13.2389C12.7703 13.4289 12.5703 13.7689 12.5703 14.1389Z"
          fill="#292D32"
        ></path>{" "}
      </g>
    </svg>
  );
}
