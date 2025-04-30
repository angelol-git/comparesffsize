import { Canvas } from "@react-three/fiber";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import AddItemForm from "./components/sidebar/AddItemForm";
import SelectedItems from "./components/sidebar/SelectedItems";
import CanvasItems from "./components/canvas/CanvasItems";
// import "./reset.css";

const queryClient = new QueryClient();
function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [itemCounter, setItemCounter] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="grid h-full grid-rows-[auto_1fr]">
        <h1 className="text-2xl font-bold">ComparePcSize</h1>
        <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.5fr)_1fr]">
          <section id="canvas-wrapper" className="h-fill bg-black">
            <Canvas camera={{ position: [10, 15, 20], fov: 75 }}>
              {selectedItems.length > 0 && (
                <CanvasItems selectedItems={selectedItems} />
              )}
              <directionalLight position={[10, 10, 1]} />
              <ambientLight intensity={2.5} />
              <OrbitControls />
            </Canvas>
          </section>
          <section id="sidebar-wrapper" className="h-fill bg-white">
            <div className="flex h-full flex-col overflow-y-auto p-5">
              <header className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Items</h2>
                <button
                  onClick={() => {
                    setShowAddItemForm(true);
                  }}
                  className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center border-none bg-transparent hover:bg-gray-100"
                >
                  <PlusSvg height={"14px"} width={"14px"} color="#636363" />
                </button>
              </header>
              <ul className="flex h-full list-none flex-col gap-3 px-0 py-2.5">
                {selectedItems.length > 0 &&
                  selectedItems.map((item) => {
                    return (
                      <SelectedItems
                        item={item}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        key={item.id}
                      />
                    );
                  })}
                {showAddItemForm === true && (
                  <AddItemForm
                    setShowAddItemForm={setShowAddItemForm}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    itemCounter={itemCounter}
                    setItemCounter={setItemCounter}
                  />
                )}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </QueryClientProvider>
  );
}

export default App;

function PlusSvg({ height, width, color }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={height}
      width={width}
      fill={color}
    >
      <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
    </svg>
  );
}
