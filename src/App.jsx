import { Canvas } from "@react-three/fiber";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { useIsMobile } from "./hooks/useIsMobile";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  PointerSensor,
  useSensors,
} from "@dnd-kit/core";
import ItemForm from "./components/sidebar/ItemForm/ItemForm";
import SelectedItems from "./components/sidebar/SelectedItems";
import CanvasItems from "./components/canvas/CanvasItems";
import "./reset.css";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

const queryClient = new QueryClient();
function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showItemForm, setShowItemForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("View");
  const isMobile = useIsMobile();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  function handleAddItem(item) {
    setSelectedItems([...selectedItems, item]);
  }

  function handleDeleteItem(id) {
    const updatedItems = selectedItems.filter((data) => data.id !== id);
    setSelectedItems(updatedItems);
  }

  function handleEditItem(updatedItem) {
    const updatedItems = selectedItems.map((prevItem) =>
      prevItem.id === updatedItem.id ? updatedItem : prevItem,
    );
    setSelectedItems(updatedItems);
  }

  function handleHideItem(id) {
    const updatedItems = selectedItems.map((prevItem) =>
      prevItem.id === id ? { ...prevItem, hide: !prevItem.hide } : prevItem,
    );
    setSelectedItems(updatedItems);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id === over.id) return;

    setSelectedItems((items) => {
      const originalPosition = getSelectedItemPosition(active.id);
      const newPosition = getSelectedItemPosition(over.id);
      return arrayMove(items, originalPosition, newPosition);
    });
  }

  function getSelectedItemPosition(id) {
    const position = selectedItems.findIndex((item) => {
      return item.id === id;
    });
    return position;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <main className="grid h-full min-h-0 grid-cols-1 grid-rows-[auto_1fr_auto]">
        <h1 className="p-3 text-xl font-bold">ComparePcSize</h1>
        <section
          id="canvas-wrapper"
          className={`grid h-full bg-black ${selectedTab === "View" ? "block" : "hidden"}`}
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
          className={`flex h-full flex-col overflow-y-auto bg-gray-100 p-4 ${selectedTab === "Items" ? "block" : "hidden"}`}
        >
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
            <ul className="flex list-none flex-col gap-3 px-0 py-2.5">
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
                />
              )}
            </ul>
          </DndContext>
        </section>
        {isMobile ? (
          <nav className="w-full bg-white p-4">
            <div className="flex justify-between rounded-md bg-gray-200 p-1 text-sm">
              <button
                role="tab"
                className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm py-2 ${selectedTab === "View" ? `bg-white text-black` : "bg-gray-200 text-gray-500"}`}
                onClick={() => {
                  setSelectedTab("View");
                }}
              >
                <BoxSvg
                  selectedTab={selectedTab}
                  height={"20px"}
                  width={"20px"}
                  color={"black"}
                />
                View
              </button>
              <button
                role="tab"
                className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm py-2 ${selectedTab === "Items" ? `bg-white text-black` : "bg-gray-200 text-gray-500"}`}
                onClick={() => {
                  setSelectedTab("Items");
                }}
              >
                <ListSvg
                  selectedTab={selectedTab}
                  height={"20px"}
                  width={"20px"}
                  color={"black"}
                />
                Items
              </button>
            </div>
          </nav>
        ) : null}
      </main>
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

function BoxSvg({ selectedTab, height, width }) {
  return (
    <svg
      height={height}
      width={width}
      stroke={selectedTab === "View" ? `black` : "white"}
      fill={selectedTab === "View" ? `white` : "#e5e7eb"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
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
          d="M4 15.8294V15.75V8C4 7.69114 4.16659 7.40629 4.43579 7.25487L4.45131 7.24614L11.6182 3.21475L11.6727 3.18411C11.8759 3.06979 12.1241 3.06979 12.3273 3.18411L19.6105 7.28092C19.8511 7.41625 20 7.67083 20 7.94687V8V15.75V15.8294C20 16.1119 19.8506 16.3733 19.6073 16.5167L12.379 20.7766C12.1451 20.9144 11.8549 20.9144 11.621 20.7766L4.39267 16.5167C4.14935 16.3733 4 16.1119 4 15.8294Z"
          stroke={selectedTab === "View" ? `black` : "#6a7282"}
          strokeWidth="2"
        ></path>{" "}
        <path
          d="M12 21V12"
          stroke={selectedTab === "View" ? `black` : "#6a7282"}
          strokeWidth="2"
        ></path>{" "}
        <path
          d="M12 12L4 7.5"
          stroke={selectedTab === "View" ? `black` : "#6a7282"}
          strokeWidth="2"
        ></path>{" "}
        <path
          d="M20 7.5L12 12"
          stroke={selectedTab === "View" ? `black` : "#6a7282"}
          strokeWidth="2"
        ></path>{" "}
      </g>
    </svg>
  );
}
function ListSvg({ selectedTab, height, width }) {
  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
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
          d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z"
          stroke={selectedTab === "Items" ? `black` : "#6a7282"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
}
