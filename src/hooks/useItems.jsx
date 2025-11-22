import { useState, useEffect } from "react";
export function useItems() {
  const [selectedItems, setSelectedItems] = useState(() => {
    try {
      const stored = localStorage.getItem("compareSffSize");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.log("failed to parse local storage: ", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("compareSffSize", JSON.stringify(selectedItems));
  }, [selectedItems]);

  function handleAddItem(item) {
    setSelectedItems((prev) => [...prev, item]);
  }

  function handleDeleteItem(id) {
    const updatedItems = selectedItems.filter((data) => data.id !== id);
    setSelectedItems(updatedItems);
  }

  function handleEditItem(updatedItem) {
    const updatedItems = selectedItems.map((prevItem) =>
      prevItem.id === updatedItem.id ? updatedItem : prevItem,
    );
    setSelectedItems(updatedItems);
  }

  function handleHideItem(id) {
    const updatedItems = selectedItems.map((prevItem) =>
      prevItem.id === id ? { ...prevItem, hide: !prevItem.hide } : prevItem,
    );
    setSelectedItems(updatedItems);
  }

  return {
    selectedItems,
    handleAddItem,
    handleDeleteItem,
    handleEditItem,
    handleHideItem,
    setSelectedItems,
  };
}
