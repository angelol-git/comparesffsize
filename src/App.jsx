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
      <div className="container mx-auto flex h-screen flex-col py-4">
        <Header />
        {/* <main className="flex h-full flex-1 lg:grid lg:grid-cols-[1.5fr_1fr] lg:gap-6 lg:py-4"> */}
        <main className="grid h-full grid-cols-1 grid-rows-1 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
          <CanvasSection
            selectedItems={selectedItems}
            isCanvasView={isCanvasView}
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
          <MobileNav
            isCanvasView={isCanvasView}
            setIsCanvasView={setIsCanvasView}
          />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
