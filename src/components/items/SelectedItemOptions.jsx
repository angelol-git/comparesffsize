import { useRef, useEffect } from "react";
import { X, SquarePen, EyeOff, Eye, Ellipsis } from "lucide-react";
function SelectedItemsOptions({
  item,
  isMobile,
  setEditMode,
  handleHideItem,
  handleDeleteItem,
  editingCaseId,
  setEditingCaseId,
}) {
  const SelectedItemsOptionRef = useRef(null);

  useEffect(() => {
    if (!SelectedItemsOptionRef.current) return;
    function handleClickOutside(e) {
      if (
        SelectedItemsOptionRef.current &&
        !SelectedItemsOptionRef.current.contains(e.target)
      ) {
        setEditingCaseId(null);
      }
    }
    if (editingCaseId) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingCaseId, setEditingCaseId]);

  if (isMobile) {
    return (
      <div className="relative flex items-center">
        <button
          ref={SelectedItemsOptionRef}
          onClick={() => {
            setEditingCaseId((prev) => (prev === item.id ? null : item.id));
          }}
          type="button"
          className="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-gray-200/30"
        >
          <Ellipsis height="22" width="22" className="stroke-icon" />
        </button>

        {editingCaseId === item.id && (
          <div className="absolute right-[40px] rounded-md border-1 border-black bg-white p-2 shadow-lg">
            <SelectedItemsOptionRow
              item={item}
              setEditMode={setEditMode}
              handleHideItem={handleHideItem}
              handleDeleteItem={handleDeleteItem}
              setEditingCaseId={setEditingCaseId}
            />
          </div>
        )}
      </div>
    );
  }
  return (
    <SelectedItemsOptionRow
      item={item}
      setEditMode={setEditMode}
      handleHideItem={handleHideItem}
      handleDeleteItem={handleDeleteItem}
      setEditingCaseId={setEditingCaseId}
    />
  );
}

function SelectedItemsOptionRow({
  item,
  setEditMode,
  handleHideItem,
  handleDeleteItem,
  setEditingCaseId,
}) {
  return (
    <div className="flex gap-4">
      <button
        type="button"
        onMouseDown={() => {
          setEditMode(true);
          setEditingCaseId(null);
        }}
        className="flex cursor-pointer items-center justify-center rounded-md transition-colors duration-150 hover:bg-gray-200/30"
      >
        <SquarePen height="18" width="18" className="stroke-icon" />
      </button>
      <button
        onMouseDown={() => {
          handleHideItem(item.id);
        }}
        className="flex cursor-pointer items-center justify-center rounded-md transition-colors duration-150 hover:bg-gray-200/30"
      >
        {item.hide ? (
          <EyeOff height="22" width="22" className="stroke-icon" />
        ) : (
          <Eye height="22" width="22" className="stroke-icon" />
        )}
      </button>
      <button
        onMouseDown={() => {
          handleDeleteItem(item.id);
        }}
        className="flex cursor-pointer items-center justify-center rounded-md transition-colors duration-150 hover:bg-gray-200/30"
      >
        <X height="22" width="22" className="stroke-red-500" />
      </button>
    </div>
  );
}
export default SelectedItemsOptions;
