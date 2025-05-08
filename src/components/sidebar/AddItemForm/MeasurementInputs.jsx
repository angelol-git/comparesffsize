function MeasurementInputs({
  dimensions,
  selectedItem,
  handleMeasurementChange,
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="font-semibold">Measurements (mm)</div>
      <div className="grid grid-cols-3 gap-3">
        {dimensions.map((item) => {
          return (
            <div className="flex flex-col gap-1" key={item}>
              <label
                htmlFor={item}
                className="self-start text-xs font-semibold"
              >
                {item}
                {item === "Volume" ? " (litres)" : ""}
              </label>
              <input
                type="text"
                id={item}
                name={item}
                className="rounded-md border border-gray-400/40 px-2 py-2 text-right"
                defaultValue={
                  selectedItem.measurements?.[item.toLowerCase()] ?? ""
                }
                required
                onChange={handleMeasurementChange}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MeasurementInputs;
