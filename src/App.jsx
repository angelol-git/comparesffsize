import { Canvas } from "@react-three/fiber";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AddForm from "./components/sidebar/AddForm";
import "./App.css";
import "./reset.css";

const queryClient = new QueryClient();
function App() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <h1>Compare Box Size</h1>
        <main className="main-container">
          <section id="canvas-wrapper" className="main-column canvas-wrapper">
            {/* <Canvas>
            <mesh>
              <boxGeometry args={[4, 2, 2]} />
              <meshStandardMaterial />
            </mesh>
          </Canvas>
          <ambientLight intensity={0.1} />
          <directionalLight position={[0, 0, 5]} color="red" /> */}
          </section>
          <section id="sidebar-wrapper" className="main-column sidebar-wrapper">
            <div className="sidebar-container">
              <header className="sidebar-header">
                <h2>Items</h2>
                <button
                  onClick={() => {
                    setShowAddForm(true);
                  }}
                  className="sidebar-nav-list-item-button"
                >
                  Add Item +
                </button>
              </header>
              <div>{showAddForm === true && <AddForm />}</div>
            </div>
          </section>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
