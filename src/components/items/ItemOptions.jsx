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
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeOptionId, setActiveOptionId]);

  if (isMobile) {
    return (
      <div className="relative flex items-center">
        <button
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation();
            setActiveOptionId((prev) => (prev === item.id ? null : item.id));
          }}
          type="button"
          aria-label="More options"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <Ellipsis size={20} />
        </button>

        {activeOptionId === item.id && (
          <div
            ref={OptionsModalRef}
            className="absolute right-0 top-full mt-2 z-50 w-40 rounded-xl border border-gray-200 bg-white p-2 shadow-xl"
          >
            <MobileItemOptionRow
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

function MobileItemOptionRow({
  item,
  handleHideItem,
  handleDeleteItem,
  setActiveForm,
  setActiveOptionId,
}) {
  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => {
          setActiveForm({ item: item, mode: "edit" });
          setActiveOptionId(null);
        }}
        aria-label="Edit item"
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
      >
        <SquarePen size={16} />
        <span>Edit</span>
      </button>

      <button
        onClick={() => {
          handleHideItem(item.id);
          setActiveOptionId(null);
        }}
        aria-label={item.hide ? "Show item" : "Hide item"}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100"
      >
        {item.hide ? <EyeOff size={16} /> : <Eye size={16} />}
        <span>{item.hide ? "Show" : "Hide"}</span>
      </button>

      <div className="my-1 h-px bg-gray-200" />

      <button
        onClick={() => {
          handleDeleteItem(item.id);
          setActiveOptionId(null);
        }}
        aria-label="Delete item"
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
      >
        <Trash2 size={16} />
        <span>Delete</span>
      </button>
    </div>
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
        aria-label="Edit item"
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
      >
        <SquarePen size={18} />
      </button>

      <button
        onClick={() => {
          handleHideItem(item.id);
        }}
        aria-label={item.hide ? "Show item" : "Hide item"}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
      >
        {item.hide ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}
      </button>

      <button
        onClick={() => {
          handleDeleteItem(item.id);
        }}
        aria-label="Delete item"
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export default ItemOptions;
