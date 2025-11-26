import { useState, useRef, useEffect } from "react";
import { Link, Unlink, Info } from "lucide-react";
import useIsMobile from "../../../hooks/useIsMobile";
function MeasurementInputs({ selectedItem, setSelectedItem, category }) {
  const isMobile = useIsMobile();
  const toolTipTimeoutRef = useRef(null);
  const [volumeIsLinked, setVolumeIsLinked] = useState(true);
  const [toolTip, setTooltip] = useState({
    type: null,
  });

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

    setTooltip({
      type: newType,
    });

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

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative flex w-full items-center justify-between gap-2">
        <div className="flex gap-2">
          <h3 className="font-semibold">Measurements (mm)</h3>
          <button
            type="button"
            aria-label="Info about measurements"
            aria-describedby="measurement-info-tooltip"
            onFocus={() => setTooltip({ type: "info" })}
            onBlur={() => setTooltip({ type: null })}
            onClick={() => {
              isMobile ? handleToolTipWithTimer("info") : undefined;
            }}
            onMouseOver={() => {
              !isMobile ? setTooltip({ type: "info" }) : undefined;
            }}
            onMouseLeave={() => {
              !isMobile ? setTooltip({ type: null }) : undefined;
            }}
            className="cursor-pointer"
          >
            <Info height="18" width="18" />
            {toolTip.type === "info" && (
              <div
                id="measurement-info-tooltip"
                role="tooltip"
                className="absolute left-0 z-10 w-[250px] rounded-md bg-gray-700 p-2 text-left text-xs text-white opacity-90"
              >
                The default measurements are provided by the manufacturer and
                reflect the case’s largest supported configuration.
              </div>
            )}
          </button>
        </div>
        <button
          type="button"
          aria-label={volumeIsLinked ? "Unlink volume" : "Link volume"}
          aria-describedby="volume-link-tooltip"
          onFocus={() => setTooltip({ type: "link" })}
          onBlur={() => setTooltip({ type: null })}
          onClick={() => {
            isMobile ? handleToolTipWithTimer("link") : undefined;
            setVolumeIsLinked((prev) => !prev);
          }}
          onMouseOver={() => {
            !isMobile ? setTooltip({ type: "link" }) : undefined;
          }}
          onMouseLeave={() => {
            !isMobile ? setTooltip({ type: null }) : undefined;
          }}
          className="relative cursor-pointer rounded-md p-1 hover:bg-gray-100"
        >
          {volumeIsLinked ? (
            <Link height="18" width="18" />
          ) : (
            <Unlink height="18" width="18" />
          )}

          {toolTip.type === "link" && (
            <div
              id="volume-link-tooltip"
              role="tooltip"
              className="absolute right-0 z-10 w-[200px] rounded-md bg-gray-700 p-2 text-xs text-white opacity-90"
            >
              Automatically calculate the item's volume based on the length,
              width and height.
            </div>
          )}
        </button>
      </div>
      <div className="relative grid grid-cols-4 gap-2">
        {Object.entries(selectedItem?.measurements).map(([key, value]) => {
          const isNameMissing = !selectedItem.name?.trim();
          const isEditable = category === "custom" || !isNameMissing;
          return (
            <div className="flex flex-col" key={key}>
              <label htmlFor={key} className="self-start text-xs font-semibold">
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {key === "volume" ? " (L)" : ""}
              </label>
              <input
                type="number"
                id={key}
                name={key}
                value={value ?? ""}
                autoComplete="off"
                readOnly={!isEditable}
                onChange={isEditable ? handleMeasurementChange : undefined}
                className={`border-border relative rounded-md border-1 px-2 py-2 text-right text-sm ${
                  !isEditable ? "cursor-not-allowed bg-gray-200 opacity-50" : ""
                }`}
              />
            </div>
          );
        })}
        {category !== "custom" && !selectedItem.name?.trim() && (
          <div
            onClick={() => {
              handleToolTipWithTimer("invalid_measurement");
            }}
            className="absolute inset-0 cursor-not-allowed"
          ></div>
        )}

        {toolTip.type === "invalid_measurement" && (
          <div className="absolute left-1/2 -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs text-white">
            Select an item first.
          </div>
        )}
      </div>
    </div>
  );
}

export default MeasurementInputs;
