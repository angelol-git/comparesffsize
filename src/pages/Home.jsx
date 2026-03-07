import { useState } from "react";
import { useItems } from "../hooks/useItems";

import Header from "../components/home/Header";
import CanvasSection from "../components/canvas/CanvasSection";
import ItemsSection from "../components/items/ItemsSection";
import MobileNav from "../components/home/MobileNav";

function Home() {
  const [isCanvasView, setIsCanvasView] = useState(true);
  const {
    items,
    handleAddItem,
    handleDeleteItem,
    handleEditItem,
    handleHideItem,
    handleReorderItems,
  } = useItems();

  return (
    <div className="flex h-screen flex-col overflow-hidden py-3">
      <Header />
      <main className="flex flex-1 flex-col overflow-hidden lg:grid lg:grid-cols-[1.75fr_1fr]">
        <CanvasSection
          items={items}
          isCanvasView={isCanvasView}
          setIsCanvasView={setIsCanvasView}
        />
        <ItemsSection
          items={items}
          handleAddItem={handleAddItem}
          handleDeleteItem={handleDeleteItem}
          handleEditItem={handleEditItem}
          handleHideItem={handleHideItem}
          handleReorderItems={handleReorderItems}
          isCanvasView={isCanvasView}
        />
      </main>
      <MobileNav
        isCanvasView={isCanvasView}
        setIsCanvasView={setIsCanvasView}
      />
    </div>
  );
}

export default Home;
