function CanvasLegend({ selectedItems }) {
  return (
    <ul className="bg-dark-gray/60 pointer-events-none absolute right-0 bottom-0 flex flex-col gap-2 p-4">
      {selectedItems.map((item) => {
        return (
          <li
            key={item.id}
            className="flex items-center gap-2 text-xs text-white"
          >
            <div
              style={{ backgroundColor: item.color }}
              className="flex h-[16px] w-[16px] shrink-0 cursor-pointer items-center lg:h-[24px] lg:w-[24px]"
            />
            <div>
              {item.brand} - {item.name} ({item.measurements.volume} L)
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CanvasLegend;
