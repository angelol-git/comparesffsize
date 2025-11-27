import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ItemOptions from "./ItemOptions";
import { GripVertical } from "lucide-react";
function Item({
  item,
  handleHideItem,
  handleDeleteItem,
  activeOptionId,
  setActiveOptionId,
  setActiveForm,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
      }}
      className={`flex w-full justify-between rounded-lg border-1 px-2 py-4 ${!item.hide ? "border-accent bg-accent-light/10" : "border-gray-400 bg-gray-400/10"}`}
    >
      <div className="flex items-center gap-3 lg:gap-4">
        <div
          {...attributes}
          {...listeners}
          /* touch-none overrides any browser default touch events like scroll, zoom and etc*/
          className="cursor-grab touch-none"
        >
          <GripVertical size={22} className="stroke-icon" />
        </div>
        <div
          style={{ backgroundColor: item.hide ? "#4B4B4B" : item.color }}
          className="flex h-[20px] w-[20px] shrink-0 rounded-md lg:h-[24px] lg:w-[24px]"
        />
        <div className="flex flex-col">
          <div className="font-bold">{item.name}</div>
          <div className="text-secondary flex flex-col gap-1 text-sm">
            <div className="">{item.brand}</div>
            <div className="font-mono text-sm">
              {`${item.measurements.length} ×
            ${item.measurements.width} ×
            ${item.measurements.height} mm
            (${item.measurements.volume} L)`}
            </div>
          </div>
        </div>
      </div>
      <ItemOptions
        item={item}
        handleHideItem={handleHideItem}
        handleDeleteItem={handleDeleteItem}
        activeOptionId={activeOptionId}
        setActiveOptionId={setActiveOptionId}
        setActiveForm={setActiveForm}
      />
    </div>
  );
}

export default Item;
