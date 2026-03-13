import { useState, useRef, useEffect } from "react";
import { Link, Unlink, Info, Calculator } from "lucide-react";
import useIsMobile from "../../../hooks/useIsMobile";

function MeasurementInputs({ selectedItem, setSelectedItem, category }) {
  const isMobile = useIsMobile();
  const toolTipTimeoutRef = useRef(null);
  const [volumeIsLinked, setVolumeIsLinked] = useState(true);
  const [toolTip, setTooltip] = useState({ type: null });

  function handleMeasurementChange(event) {
    const { name, value } = event.target;

    setSelectedItem((prevState) => {
      const updatedMeasurements = {
        ...prevState.measurements,
        [name]: value,
      };

      if (volumeIsLinked) {
        const { length, width, height } = updatedMeasurements;
        if (length && width && height) {
          updatedMeasurements.volume = (
            (length * width * height) /
            1_000_000
          ).toFixed(2);
        } else {
          updatedMeasurements.volume = "";
        }
      }

      return {
        ...prevState,
        measurements: updatedMeasurements,
      };
    });
  }

  function handleToolTipWithTimer(newType) {
    if (toolTipTimeoutRef.current) clearTimeout(toolTipTimeoutRef.current);
    setTooltip({ type: newType });
    toolTipTimeoutRef.current = setTimeout(
      () => setTooltip({ type: null }),
      2000,
    );
  }

  useEffect(() => {
    return () => {
      if (toolTipTimeoutRef.current) clearTimeout(toolTipTimeoutRef.current);
    };
  }, []);

  const measurements = selectedItem?.measurements || {};
  const isNameMissing = !selectedItem.name?.trim();
  const isEditable = category === "custom" || !isNameMissing;

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calculator size={14} className="text-accent" />
          <label className="text-xs font-semibold tracking-wider text-gray-700 uppercase">
            Measurements (mm)
          </label>

          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => !isMobile && setTooltip({ type: "info" })}
              onMouseLeave={() => !isMobile && setTooltip({ type: null })}
              onClick={() => isMobile && handleToolTipWithTimer("info")}
              className="cursor-pointer text-gray-700 transition-colors hover:text-gray-700"
            >
              <Info size={14} />
            </button>

            {toolTip.type === "info" && (
              <div className="absolute bottom-full left-0 z-50 mb-2 w-64 rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
                <p className="text-xs text-gray-700">
                  Dimensions reflect the case's largest supported configuration
                  as provided by the manufacturer.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              if (isMobile) handleToolTipWithTimer("link");
              setVolumeIsLinked((prev) => !prev);
            }}
            onMouseEnter={() => !isMobile && setTooltip({ type: "link" })}
            onMouseLeave={() => !isMobile && setTooltip({ type: null })}
            className={`cursor-pointer flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs font-medium transition-colors ${
              volumeIsLinked
                ? "border-accent/30 bg-accent/10 text-accent-dark"
                : "border-gray-200 bg-gray-50 text-gray-700"
            }`}
          >
            {volumeIsLinked ? <Link size={12} /> : <Unlink size={12} />}
            <span>Auto-calc</span>
          </button>

          {toolTip.type === "link" && (
            <div className="absolute right-0 bottom-full z-50 mb-2 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
              <p className="text-xs text-gray-700">
                {volumeIsLinked
                  ? "Volume auto-calculated from dimensions"
                  : "Volume can be edited manually"}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Object.entries(measurements).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-1">
            <label
              htmlFor={key}
              className="text-[10px] font-semibold tracking-wider text-gray-700 uppercase"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
              {key === "volume" && (
                <span className="ml-1 text-accent-dark">(L)</span>
              )}
            </label>
            <input
              type="number"
              id={key}
              name={key}
              value={value ?? ""}
              autoComplete="off"
              readOnly={!isEditable || (key === "volume" && volumeIsLinked)}
              onChange={isEditable ? handleMeasurementChange : undefined}
              className={`focus:border-accent focus:ring-accent/20 w-full rounded-lg border px-2 py-2 text-right font-mono text-sm transition-colors focus:ring-2 focus:outline-none ${
                !isEditable || (key === "volume" && volumeIsLinked)
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-700"
                  : "border-gray-200 text-gray-700"
              } ${key === "volume" ? "bg-accent/5 text-accent-dark font-semibold" : ""}`}
              placeholder="0"
            />
          </div>
        ))}

        {category !== "custom" && isNameMissing && (
          <div
            onClick={() => handleToolTipWithTimer("invalid")}
            className="absolute inset-0 cursor-not-allowed rounded-lg"
          />
        )}

        {toolTip.type === "invalid" && (
          <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-800 px-3 py-2 text-xs whitespace-nowrap text-white shadow-lg">
            Select a case first
          </div>
        )}
      </div>
    </div>
  );
}

export default MeasurementInputs;
