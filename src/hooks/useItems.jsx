import { useState, useEffect } from "react";
export function useItems() {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem("compareSffSize");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.log("failed to parse local storage: ", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("compareSffSize", JSON.stringify(items));
  }, [items]);

  function handleAddItem(item) {
    setItems((prev) => [...prev, item]);
  }

  function handleDeleteItem(id) {
    const updatedItems = items.filter((data) => data.id !== id);
    setItems(updatedItems);
  }

  function handleEditItem(updatedItem) {
    const updatedItems = items.map((prevItem) =>
      prevItem.id === updatedItem.id ? updatedItem : prevItem,
    );
    setItems(updatedItems);
  }

  function handleHideItem(id) {
    const updatedItems = items.map((prevItem) =>
      prevItem.id === id ? { ...prevItem, hide: !prevItem.hide } : prevItem,
    );
    setItems(updatedItems);
  }

  function handleReorderItems(newOrder) {
    setItems(newOrder);
  }

  return {
    items,
    handleAddItem,
    handleDeleteItem,
    handleEditItem,
    handleHideItem,
    handleReorderItems,
  };
}
