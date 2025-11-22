import { useRef, useEffect } from "react";
import { X, SquarePen, EyeOff, Eye, Ellipsis } from "lucide-react";
function SelectedItemsOptions({
  item,
  isMobile,
  handleHideItem,
  handleDeleteItem,
  activeOptionId,
  setActiveOptionId,
  setActiveForm,
}) {
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
          <Ellipsis height="22" width="22" className="stroke-icon" />
        </button>

        {activeOptionId === item.id && (
          <div
            ref={OptionsModalRef}
            className="border-border absolute right-[40px] rounded-md border-1 bg-white p-2 shadow-lg"
          >
            <SelectedItemsOptionRow
              item={item}
              handleHideItem={handleHideItem}
              handleDeleteItem={handleDeleteItem}
              setActiveOptionId={setActiveOptionId}
              setActiveForm={setActiveForm}
              d
            />
          </div>
        )}
      </div>
    );
  }
  return (
    <SelectedItemsOptionRow
      item={item}
      handleHideItem={handleHideItem}
      handleDeleteItem={handleDeleteItem}
      setActiveOptionId={setActiveOptionId}
      setActiveForm={setActiveForm}
    />
  );
}

function SelectedItemsOptionRow({
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
        className="hover:bg-white-hover flex h-9 w-9 cursor-pointer items-center justify-center rounded-md p-2 transition-all duration-150"
      >
        <SquarePen size={20} className="stroke-icon" />
      </button>

      <button
        onClick={() => {
          handleHideItem(item.id);
        }}
        className="hover:bg-white-hover flex h-9 w-9 cursor-pointer items-center justify-center rounded-md p-2 transition-all duration-150"
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
        className="hover:bg-white-hover flex h-9 w-9 cursor-pointer items-center justify-center rounded-md p-2 transition-all duration-150"
      >
        <div className="hover:bg-white-hover flex cursor-pointer items-center justify-center rounded-md p-2 transition-colors duration-150">
          <X size={20} className="stroke-red-500" />
        </div>
      </button>
    </div>
  );
}
export default SelectedItemsOptions;
