import { X, SquarePen, EyeOff, Eye, Ellipsis } from "lucide-react";
function SelectedItemsOptions({
  item,
  isMobile,
  setEditMode,
  handleHideItem,
  handleDeleteItem,
  showSettingsModal,
  setShowSettingsModal,
}) {
  if (isMobile) {
    return (
      <div className="relative flex items-center">
        <button
          onClick={() => setShowSettingsModal((prev) => !prev)}
          type="button"
          className="flex h-[32px] w-[32px] items-center justify-center rounded-md transition-colors hover:bg-gray-200/30"
        >
          <Ellipsis height="22" width="22" className="stroke-icon" />
        </button>

        {showSettingsModal && (
          <div className="absolute right-[40px] rounded-md bg-white p-2 shadow-lg">
            <SelectedItemsOptionRow
              item={item}
              setEditMode={setEditMode}
              setShowSettingsModal={setShowSettingsModal}
              handleHideItem={handleHideItem}
              handleDeleteItem={handleDeleteItem}
              closeMenu={() => setShowSettingsModal(false)}
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
      setShowSettingsModal={setShowSettingsModal}
      handleHideItem={handleHideItem}
      handleDeleteItem={handleDeleteItem}
      closeMenu={() => setShowSettingsModal(false)}
    />
  );
}

function SelectedItemsOptionRow({
  item,
  setEditMode,
  setShowSettingsModal,
  handleHideItem,
  handleDeleteItem,
}) {
  return (
    <div className="flex gap-4">
      <button
        onMouseDown={() => {
          setEditMode(true);
          setShowSettingsModal((prev) => !prev);
        }}
        className="flex cursor-pointer items-center justify-center rounded-md transition-colors duration-150 hover:bg-gray-200/30"
      >
        <SquarePen height="18" width="18" className="stroke-icon" />
      </button>
      <button
        onMouseDown={() => {
          handleHideItem(item.id);
          setShowSettingsModal((prev) => !prev);
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
          setShowSettingsModal((prev) => !prev);
        }}
        className="flex cursor-pointer items-center justify-center rounded-md transition-colors duration-150 hover:bg-gray-200/30"
      >
        <X height="22" width="22" className="stroke-red-500" />
      </button>
    </div>
  );
}
export default SelectedItemsOptions;
