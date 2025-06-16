import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
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

  function handleDragEnd(event) {
    event.preventDefault();
    const { active, over } = event;
    if (active.id === over.id) return;

    setSelectedItems((items) => {
      const originalPosition = getSelectedItemPosition(active.id);
      const newPosition = getSelectedItemPosition(over.id);
      return arrayMove(items, originalPosition, newPosition);
    });
  }

  function getSelectedItemPosition(id) {
    const position = selectedItems.findIndex((item) => {
      return item.id === id;
    });
    return position;
  }
  return {
    selectedItems,
    handleAddItem,
    handleDeleteItem,
    handleEditItem,
    handleHideItem,
    handleDragEnd,
    setSelectedItems,
  };
}
