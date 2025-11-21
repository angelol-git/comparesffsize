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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [isCanvasView, setIsCanvasView] = useState(true);
  const {
    selectedItems,
    setSelectedItems,
    handleAddItem,
    handleDeleteItem,
    handleEditItem,
    handleHideItem,
  } = useItems();

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);

      if (mobile) {
        setIsCanvasView(true);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto flex h-full flex-col py-4">
        <Header />
        <main className="grid h-full grid-cols-1 grid-rows-1 lg:grid-cols-[1.5fr_1fr] lg:gap-6">
          <CanvasSection
            selectedItems={selectedItems}
            isCanvasView={isCanvasView}
            isMobile={isMobile}
          />
          <ItemsSection
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            handleAddItem={handleAddItem}
            handleDeleteItem={handleDeleteItem}
            handleEditItem={handleEditItem}
            handleHideItem={handleHideItem}
            isMobile={isMobile}
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
