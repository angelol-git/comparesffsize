import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useItems } from "./hooks/useItems";

import Header from "./components/home/Header";
import CanvasSection from "./components/canvas/CanvasSection";
import ItemsSection from "./components/items/ItemsSection";
import MobileNav from "./components/home/MobileNav";
import "./reset.css";

const queryClient = new QueryClient();
function App() {
  const [isCanvasView, setIsCanvasView] = useState(true);
  const {
    selectedItems,
    setSelectedItems,
    handleAddItem,
    handleDeleteItem,
    handleEditItem,
    handleHideItem,
  } = useItems();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen flex-col overflow-hidden py-3">
        <Header />
        <main className="flex flex-1 flex-col overflow-hidden lg:grid lg:grid-cols-[1.75fr_1fr]">
          <CanvasSection
            selectedItems={selectedItems}
            isCanvasView={isCanvasView}
            setIsCanvasView={setIsCanvasView}
          />
          <ItemsSection
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            handleAddItem={handleAddItem}
            handleDeleteItem={handleDeleteItem}
            handleEditItem={handleEditItem}
            handleHideItem={handleHideItem}
            isCanvasView={isCanvasView}
          />
        </main>
        <MobileNav
          isCanvasView={isCanvasView}
          setIsCanvasView={setIsCanvasView}
        />
      </div>
    </QueryClientProvider>
  );
}

export default App;
