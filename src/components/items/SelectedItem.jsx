import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SelectedItemsOptions from "./SelectedItemOptions";
import { GripVertical } from "lucide-react";
function SelectedItem({
  item,
  handleHideItem,
  handleDeleteItem,
  activeOptionId,
  setActiveOptionId,
  setActiveForm,
  isMobile,
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
      className="flex w-full justify-between rounded-md border px-2 py-4"
    >
      <div className="flex items-center gap-3 lg:gap-4">
        <div
          {...attributes}
          {...listeners}
          /* touch-none overrides any browser default touch events like scroll, zoom and etc*/
          className="cursor-grab touch-none"
        >
          <GripVertical height="22" width="22" className="stroke-icon" />
        </div>
        <div
          style={{ backgroundColor: item.hide ? "#4B4B4B" : item.color }}
          className="flex h-[20px] w-[20px] shrink-0 lg:h-[24px] lg:w-[24px]"
        ></div>
        <div>
          <div className="font-bold">
            {item.brand} - {item.name}
          </div>
          <div className="text-secondary text-sm">
            {`${item.measurements.length} ×
            ${item.measurements.width} ×
            ${item.measurements.height} mm
            (${item.measurements.volume} L)`}
          </div>
        </div>
      </div>
      <SelectedItemsOptions
        item={item}
        handleHideItem={handleHideItem}
        handleDeleteItem={handleDeleteItem}
        activeOptionId={activeOptionId}
        setActiveOptionId={setActiveOptionId}
        setActiveForm={setActiveForm}
        isMobile={isMobile}
      />
    </div>
  );
}

export default SelectedItem;
