function CanvasLegend({ filteredData }) {
  return (
    <ul className="border-border pointer-events-none absolute right-2 bottom-2 flex flex-col gap-2 rounded-md border-1 bg-white p-4 shadow-md">
      {filteredData.map((item) => {
        return (
          <li key={item.id} className="flex items-center gap-2 text-xs">
            <div
              style={{ backgroundColor: item.color }}
              className="flex h-[16px] w-[16px] shrink-0 cursor-pointer items-center lg:h-[24px] lg:w-[24px]"
            />
            <div>
              {item.name} ({item.measurements.volume} L)
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default CanvasLegend;
