import { useRef, useEffect } from "react";
import { Trash2, SquarePen, EyeOff, Eye, Ellipsis } from "lucide-react";
import useIsMobile from "../../hooks/useIsMobile";
function ItemOptions({
  item,
  handleHideItem,
  handleDeleteItem,
  activeOptionId,
  setActiveOptionId,
  setActiveForm,
}) {
  const isMobile = useIsMobile();
  const OptionsModalRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    if (!OptionsModalRef.current) return;
    function handleClickOutside(e) {
      if (
        OptionsModalRef.current &&
        !OptionsModalRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setActiveOptionId(null);
      }
    }
    if (activeOptionId) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeOptionId, setActiveOptionId]);

  if (isMobile) {
    return (
      <div className="relative flex items-center">
        <button
          ref={buttonRef}
          onClick={() => {
            setActiveOptionId((prev) => (prev === item.id ? null : item.id));
          }}
          type="button"
          className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-gray-200/30"
        >
          <Ellipsis size={22} className="stroke-icon" />
        </button>

        {activeOptionId === item.id && (
          <div
            ref={OptionsModalRef}
            className="border-border absolute right-[40px] rounded-md border-1 bg-white p-2 shadow-lg"
          >
            <ItemOptionRow
              item={item}
              handleHideItem={handleHideItem}
              handleDeleteItem={handleDeleteItem}
              setActiveOptionId={setActiveOptionId}
              setActiveForm={setActiveForm}
            />
          </div>
        )}
      </div>
    );
  }
  return (
    <ItemOptionRow
      item={item}
      handleHideItem={handleHideItem}
      handleDeleteItem={handleDeleteItem}
      setActiveOptionId={setActiveOptionId}
      setActiveForm={setActiveForm}
    />
  );
}

function ItemOptionRow({
  item,
  handleHideItem,
  handleDeleteItem,
  setActiveForm,
  setActiveOptionId,
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => {
          setActiveForm({ item: item, mode: "edit" });
          setActiveOptionId(null);
        }}
        className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-md p-2 transition-all duration-150 ${!item.hide ? "hover:bg-white-hover" : "hover:bg-white"}`}
      >
        <SquarePen size={20} className="stroke-icon" />
      </button>

      <button
        onClick={() => {
          handleHideItem(item.id);
        }}
        className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-md p-2 transition-all duration-150 ${!item.hide ? "hover:bg-white-hover" : "hover:bg-white"}`}
      >
        {item.hide ? (
          <EyeOff size={20} className="stroke-icon" />
        ) : (
          <Eye size={20} className="stroke-icon" />
        )}
      </button>
      <button
        onClick={() => {
          handleDeleteItem(item.id);
        }}
        className={`group flex h-9 w-9 cursor-pointer items-center justify-center rounded-md p-2 transition-all duration-150 hover:stroke-red-400 ${!item.hide ? "hover:bg-red-400/10" : "hover:bg-white"}`}
      >
        <Trash2 size={20} className="stroke-icon group-hover:stroke-red-400" />
      </button>
    </div>
  );
}
export default ItemOptions;
