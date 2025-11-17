import { useState } from "react";
import { Link, Unlink, Info } from "lucide-react";
function MeasurementInputs({ selectedItem, setSelectedItem }) {
  const [volumeIsLinked, setVolumeIsLinked] = useState(true);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
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

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative flex w-full gap-2">
        <h3 className="font-semibold">Measurements (mm)</h3>
        <button
          className="cursor-pointer rounded-md p-1 hover:bg-gray-100"
          type="button"
          onClick={() => {
            setVolumeIsLinked(!volumeIsLinked);
          }}
          onMouseOver={() => {
            setIsLinkModalOpen(true);
          }}
          onMouseLeave={() => {
            setIsLinkModalOpen(false);
          }}
        >
          {volumeIsLinked ? (
            <Link height="18" width="18" />
          ) : (
            <Unlink height="18" width="18" />
          )}
        </button>
        <button
          type="button"
          onMouseOver={() => {
            setIsInfoModalOpen(true);
          }}
          onMouseLeave={() => {
            setIsInfoModalOpen(false);
          }}
          className="cursor-pointer"
        >
          <Info height="16" width="16" />
          {isInfoModalOpen && (
            <div className="absolute left-0 z-10 rounded-md bg-gray-700 p-2 text-left text-xs text-white opacity-90">
              The default measurements are provided by the manufacturer and
              reflect the case’s largest supported configuration.
            </div>
          )}
          {isLinkModalOpen && (
            <div className="absolute left-0 z-10 rounded-md bg-gray-700 p-2 text-left text-xs text-white opacity-90">
              Automatically calculate the item's volume based on the length,
              width and height.
            </div>
          )}
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {Object.entries(selectedItem?.measurements).map(([key, value]) => {
          return (
            <div className="relative flex flex-col" key={key}>
              <label htmlFor={key} className="self-start text-xs font-semibold">
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {key === "volume" ? " (L)" : ""}
              </label>
              <input
                type="number"
                id={key}
                name={key}
                className="rounded-md border px-2 py-2 text-right text-sm"
                value={value ? value : ""}
                required
                autoComplete="off"
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
