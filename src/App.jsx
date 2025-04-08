import { Canvas } from "@react-three/fiber";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
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
            <Canvas camera={{ position: [10, 10, 10], fov: 75 }}>
              {selectedItems.length > 0 &&
                selectedItems.map((item) => {
                  return (
                    <mesh>
                      <boxGeometry
                        args={[
                          item.item.measurements.width / 30,
                          item.item.measurements.height / 30,
                          item.item.measurements.length / 30,
                        ]}
                      />
                      <meshStandardMaterial color="red" />
                    </mesh>
                  );
                })}
              {/* <mesh>
                <boxGeometry args={[4, 4, 4]} />
                <meshStandardMaterial color="red" />
              </mesh>
              <mesh position={[5, 0, 0]}>
                <boxGeometry args={[4, 4, 4]} />
                <meshStandardMaterial color="red" />
              </mesh> */}
              <directionalLight position={[4, 4, 1]} />
              <ambientLight intensity={0.3} />
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
