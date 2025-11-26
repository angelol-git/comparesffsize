import { Box, List } from "lucide-react";

function MobileNav({ isCanvasView, setIsCanvasView }) {
  return (
    <nav className="w-full bg-white py-2 lg:hidden">
      <div className="flex justify-between rounded-md bg-gray-200 p-1 text-sm">
        <button
          role="tab"
          className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm py-2 ${isCanvasView ? `bg-white text-black` : "bg-gray-200 text-gray-500"}`}
          onClick={() => {
            setIsCanvasView(true);
          }}
        >
          <Box size={20} />
          View
        </button>
        <button
          role="tab"
          className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm py-2 ${!isCanvasView ? `bg-white text-black` : "bg-gray-200 text-gray-500"}`}
          onClick={() => {
            setIsCanvasView(false);
          }}
        >
          <List size={20} />
          Items
        </button>
      </div>
    </nav>
  );
}

export default MobileNav;
