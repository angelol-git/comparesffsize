import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ItemOptions from "./ItemOptions";
import { GripVertical, EyeOff } from "lucide-react";

function Item({
  item,
  handleHideItem,
  handleDeleteItem,
  activeOptionId,
  setActiveOptionId,
  setActiveForm,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative flex w-full items-center gap-3 rounded-xl border bg-white p-3 shadow-sm ${
        isDragging
          ? "cursor-grabbing opacity-50"
          : "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      } ${
        !item.hide
          ? "hover:border-accent/30 border-gray-200"
          : "border-gray-300/60 bg-gray-100/80 opacity-75"
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder item"
        role="button"
        className={`flex h-8 w-8 shrink-0 touch-none items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <GripVertical size={18} strokeWidth={2} />
      </div>

      <div className="relative shrink-0">
        <div
          className="h-7 w-7 rounded-lg shadow-sm"
          style={{
            backgroundColor: item.hide ? "#9CA3AF" : item.color,
            boxShadow: item.hide
              ? "0 1px 3px rgba(0,0,0,0.1)"
              : `0 2px 8px ${item.color}30`,
          }}
        />
        {item.hide && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gray-500/30">
            <EyeOff size={14} className="text-white" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3
            className={`truncate text-base font-semibold ${!item.hide ? "text-gray-900" : "text-gray-600"}`}
          >
            {item.name}
          </h3>
          {item.hide && (
            <span className="shrink-0 rounded bg-gray-200 px-1.5 py-0.5 text-[10px] font-medium tracking-wider text-gray-600 uppercase">
              Hidden
            </span>
          )}
        </div>

        <p className="text-sm font-medium text-gray-700">{item.brand}</p>

        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-xs text-gray-600">
            {item.measurements.length}×{item.measurements.width}×
            {item.measurements.height} mm
          </span>
          <span className="bg-accent-light text-accent-dark rounded-full px-2 py-0.5 font-mono text-xs font-semibold">
            {item.measurements.volume} L
          </span>
        </div>
      </div>

      <div className="shrink-0">
        <ItemOptions
          item={item}
          handleHideItem={handleHideItem}
          handleDeleteItem={handleDeleteItem}
          activeOptionId={activeOptionId}
          setActiveOptionId={setActiveOptionId}
          setActiveForm={setActiveForm}
        />
      </div>
    </div>
  );
}

export default Item;
