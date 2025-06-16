import { useState } from "react";
import ItemForm from "./ItemForm/ItemForm";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SelectedItemsOptions from "./SelectedItemOptions";
function SelectedItems({
  item,
  setShowItemForm,
  selectedItems,
  setSelectedItems,
  handleAddItem,
  handleEditItem,
  handleHideItem,
  handleDeleteItem,
}) {
  const [editMode, setEditMode] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  function assignColor() {
    return item.hide ? "#4B4B4B" : item.color;
  }

  const style = { transition, transform: CSS.Transform.toString(transform) };

  return editMode ? (
    <ItemForm
      mode={"edit"}
      setShowItemForm={setShowItemForm}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
      handleAddItem={handleAddItem}
      handleEditItem={handleEditItem}
      editItem={item}
      setEditMode={setEditMode}
    />
  ) : (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      // style={{ ...style, borderColor: assignColor() }}
      className={`ease selected-list-item @container flex w-full rounded-md border-1 border-gray-300 bg-white py-5 pr-2 pl-1 transition-colors duration-200`}
    >
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-4">
          <DragSvg height="22px" width="22px" color="gray" />
          <button
            type="button"
            style={{ backgroundColor: assignColor() }}
            className="h-[20px] w-[20px] cursor-pointer rounded-md"
          ></button>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 font-semibold">
              {item.brand} - {item.name}
            </div>
            <div className="text-sm text-gray-600">
              {`${item.measurements.length} ×
            ${item.measurements.width} ×
            ${item.measurements.height} mm
            (${item.measurements.volume} L)`}
            </div>
          </div>
        </div>
        <div className="hidden items-center @[440px]:flex">
          <SelectedItemsOptions
            item={item}
            setEditMode={setEditMode}
            handleHideItem={handleHideItem}
            handleDeleteItem={handleDeleteItem}
            setShowSettingsModal={setShowSettingsModal}
          />
        </div>
        <div className="relative flex items-center @[440px]:hidden">
          <button
            onMouseDown={() => {
              setShowSettingsModal((prev) => !prev);
            }}
            className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-md transition-colors duration-150 hover:bg-gray-200/30"
          >
            <OptionsSvg height="18px" width="18px" color="gray" />
          </button>
          {showSettingsModal && (
            <div className="bg-opacity-0 absolute right-[40px] rounded-md bg-white p-2 shadow-lg">
              <SelectedItemsOptions
                item={item}
                setEditMode={setEditMode}
                handleHideItem={handleHideItem}
                handleDeleteItem={handleDeleteItem}
                setShowSettingsModal={setShowSettingsModal}
              />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default SelectedItems;

function DragSvg({ height, width, color }) {
  return (
    <svg
      fill={color}
      height={height}
      width={width}
      viewBox="0 0 1920 1920"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-grab touch-none"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M686.211 137.143v-.137l68.572.137H686.21Zm0 1508.571c75.566 0 137.143 61.577 137.143 137.143S761.777 1920 686.211 1920c-75.702 0-137.142-61.577-137.142-137.143s61.44-137.143 137.142-137.143Zm548.572 0c75.566 0 137.143 61.577 137.143 137.143S1310.349 1920 1234.783 1920c-75.703 0-137.143-61.577-137.143-137.143s61.44-137.143 137.143-137.143ZM686.21 1097.143c75.566 0 137.143 61.577 137.143 137.143 0 75.565-61.577 137.143-137.143 137.143-75.702 0-137.142-61.578-137.142-137.143 0-75.566 61.44-137.143 137.142-137.143Zm548.572 0c75.566 0 137.143 61.577 137.143 137.143 0 75.565-61.577 137.143-137.143 137.143-75.703 0-137.143-61.578-137.143-137.143 0-75.566 61.44-137.143 137.143-137.143ZM686.21 548.57c75.566 0 137.143 61.578 137.143 137.143 0 75.566-61.577 137.143-137.143 137.143-75.702 0-137.142-61.577-137.142-137.143 0-75.565 61.44-137.143 137.142-137.143Zm548.572 0c75.566 0 137.143 61.578 137.143 137.143 0 75.566-61.577 137.143-137.143 137.143-75.703 0-137.143-61.577-137.143-137.143 0-75.565 61.44-137.143 137.143-137.143ZM686.21 0c75.566 0 137.143 61.577 137.143 137.143S761.776 274.286 686.21 274.286c-75.702 0-137.142-61.577-137.142-137.143S610.509 0 686.21 0Zm548.503 0c75.566 0 137.143 61.577 137.143 137.143s-61.577 137.143-137.143 137.143c-75.565 0-137.143-61.577-137.143-137.143S1159.15 0 1234.714 0Z"
          fillRule="evenodd"
        ></path>
      </g>
    </svg>
  );
}

function OptionsSvg({ height, width, color }) {
  return (
    <svg
      height={height}
      width={width}
      color={color}
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M28.106 19.944h-0.85c-0.069-0.019-0.131-0.050-0.2-0.063-1.788-0.275-3.2-1.762-3.319-3.506-0.137-1.95 0.975-3.6 2.787-4.137 0.238-0.069 0.488-0.119 0.731-0.181h0.85c0.056 0.019 0.106 0.050 0.169 0.056 1.65 0.269 2.906 1.456 3.262 3.081 0.025 0.125 0.063 0.25 0.094 0.375v0.85c-0.019 0.056-0.050 0.113-0.056 0.169-0.262 1.625-1.419 2.863-3.025 3.238-0.156 0.038-0.3 0.081-0.444 0.119zM4.081 12.056l0.85 0c0.069 0.019 0.131 0.050 0.2 0.056 1.8 0.281 3.206 1.775 3.319 3.537 0.125 1.944-1 3.588-2.819 4.119-0.231 0.069-0.469 0.119-0.7 0.175h-0.85c-0.056-0.019-0.106-0.050-0.162-0.063-1.625-0.3-2.688-1.244-3.194-2.819-0.069-0.206-0.106-0.425-0.162-0.637v-0.85c0.019-0.056 0.050-0.113 0.056-0.169 0.269-1.631 1.419-2.863 3.025-3.238 0.15-0.037 0.294-0.075 0.437-0.113zM15.669 12.056h0.85c0.069 0.019 0.131 0.050 0.2 0.063 1.794 0.281 3.238 1.831 3.313 3.581 0.087 1.969-1.1 3.637-2.931 4.106-0.194 0.050-0.387 0.094-0.581 0.137h-0.85c-0.069-0.019-0.131-0.050-0.2-0.063-1.794-0.275-3.238-1.831-3.319-3.581-0.094-1.969 1.1-3.637 2.931-4.106 0.2-0.050 0.394-0.094 0.588-0.137z"></path>{" "}
      </g>
    </svg>
  );
}
