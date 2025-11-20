import { useState } from "react";
export function useItems() {
  const [selectedItems, setSelectedItems] = useState([]);
  function handleAddItem(item) {
    setSelectedItems([...selectedItems, item]);
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
