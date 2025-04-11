import { Canvas } from "@react-three/fiber";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import AddItemForm from "./components/sidebar/AddItemForm";
import SelectedItems from "./components/sidebar/SelectedItems";
import CanvasItems from "./components/canvas/CanvasItems";
import "./App.css";
import "./reset.css";

const queryClient = new QueryClient();
function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const colors = [
    "#8B0000", // dark red
    "#00008B", // dark blue
    "#B8860B", // dark goldenrod (instead of bright yellow)
    "#006400", // dark green
    "#FF8C00", // dark orange
    "#8B008B", // dark magenta (deep pink-ish)
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <main className="main-wrapper">
        <h1 className="main-header">Compare Box Size</h1>
        <div className="main-container">
          <section id="canvas-wrapper" className="canvas-wrapper">
            <Canvas camera={{ position: [10, 15, 20], fov: 75 }}>
              {selectedItems.length > 0 && (
                <CanvasItems selectedItems={selectedItems} colors={colors} />
              )}
              <directionalLight position={[10, 10, 1]} />
              <ambientLight intensity={2.5} />
              <OrbitControls />
            </Canvas>
          </section>
          <section id="sidebar-wrapper" className="sidebar-wrapper">
            <div className="sidebar-container">
              <header className="sidebar-header">
                <h2>Items</h2>
                <button
                  onClick={() => {
                    setShowAddItemForm(true);
                  }}
                  className="sidebar-header-button"
                >
                  <PlusSvg height={"14px"} width={"14px"} color="#636363" />
                </button>
              </header>
              <ul className="items-list">
                {selectedItems.length > 0 &&
                  selectedItems.map((item, index) => {
                    return (
                      <SelectedItems
                        key={`${item.brand}-${item.name}`}
                        item={item}
                        index={index}
                        selectedItems={selectedItems}
                        setSelectedItems={setSelectedItems}
                        colors={colors}
                      />
                    );
                  })}
                {showAddItemForm === true && (
                  <AddItemForm
                    setShowAddItemForm={setShowAddItemForm}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
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
