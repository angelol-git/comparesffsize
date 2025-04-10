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

  const colors = ["red", "blue", "yellow", "green", "orange", "pink"];
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
              <ambientLight intensity={0.9} />
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
                  +
                </button>
              </header>
              <ul className="items-list">
                {selectedItems.length > 0 &&
                  selectedItems.map((item, index) => {
                    return (
                      <SelectedItems
                        key={`${item.brand}-${item.item.name}`}
                        item={item}
                        index={index}
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
