import { Canvas } from "@react-three/fiber";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AddItemForm from "./components/sidebar/AddItemForm";
import SelectedItems from "./components/sidebar/SelectedItems";
import "./App.css";
import "./reset.css";

const queryClient = new QueryClient();
function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <main className="main-wrapper">
        <h1 className="main-header">Compare Box Size</h1>
        <div className="main-container">
          <section id="canvas-wrapper" className="canvas-wrapper">
            <Canvas>
              <mesh>
                <boxGeometry args={[4, 2, 2]} />
                <meshStandardMaterial />
              </mesh>
              <ambientLight intensity={0.1} />
              <directionalLight position={[0, 0, 5]} color="red" />
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
                  selectedItems.map((item) => {
                    return (
                      <SelectedItems
                        key={`${item.brand}-${item.item.name}`}
                        item={item}
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
