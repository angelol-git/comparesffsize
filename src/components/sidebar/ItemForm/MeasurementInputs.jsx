import { useState } from "react";
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
      <div className="relative flex w-full gap-3">
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
            <LinkSvg height={"18px"} width={"18px"} />
          ) : (
            <UnLinkSvg height={"18px"} width={"18px"} />
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
          <InfoSvg height={"16px"} width={"16px"} />
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
                className="rounded-md border border-gray-400/40 px-2 py-2 text-right text-base"
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

function LinkSvg({ height, width }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.756 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.488 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z" />
    </svg>
  );
}

function UnLinkSvg({ height, width }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path d="M8.82 20.829c-1.56 1.561-4.094 1.562-5.656 0-.801-.8-1.184-1.854-1.165-2.901.018-.999.403-1.994 1.165-2.756l3.856-3.903-.707-.707-3.856 3.903c-.957.957-1.439 2.207-1.457 3.463-.019 1.304.463 2.614 1.457 3.608.975.976 2.255 1.464 3.535 1.464 1.28 0 2.56-.488 3.535-1.464l3.856-3.903-.707-.707-3.856 3.903zm9.16-5.671l3.712.995.259-.967-3.712-.994-.259.966zm-1.767 1.768l2.717 2.717.707-.707-2.717-2.717-.707.707zm-2.027 1.319l.994 3.713.966-.259-.994-3.713-.966.259zm-8.227-9.451l-3.712-.995-.259.966 3.712.995.259-.966zm9.214-5.623c1.561-1.563 4.095-1.562 5.657 0 1.563 1.562 1.563 4.095 0 5.657l-3.91 3.855.707.707 3.909-3.855c.976-.976 1.464-2.256 1.464-3.536 0-1.28-.488-2.559-1.464-3.535-.974-.976-2.311-1.464-3.589-1.464-1.28 0-2.507.488-3.481 1.464l-3.911 3.855.707.707 3.911-3.855zm-7.446 3.855l-2.718-2.717-.707.707 2.718 2.717.707-.707zm1.061-1.06l-.995-3.713.966-.259.995 3.713-.966.259z" />
    </svg>
  );
}

function InfoSvg({ height, width }) {
  return (
    <svg
      viewBox="0 0 24 24"
      height={height}
      width={width}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="cursor-pointer"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M12 17V11"
          stroke="#1C274C"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>{" "}
        <circle
          cx="1"
          cy="1"
          r="1"
          transform="matrix(1 0 0 -1 11 9)"
          fill="#1C274C"
        ></circle>{" "}
        <path
          d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
          stroke="#1C274C"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>{" "}
      </g>
    </svg>
  );
}
