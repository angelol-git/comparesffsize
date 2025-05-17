function FormActions({ mode, setShowItemForm, setEditMode }) {
  return (
    <div className="flex h-full items-center justify-end gap-3">
      <button
        type="submit"
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-blue-700 bg-blue-700 py-2 text-sm text-white hover:border-blue-600 hover:bg-blue-600"
      >
        <PlusSvg height={"12px"} width={"12px"} color={"white"} />
        Save
      </button>

      <button
        type="button"
        onClick={() => {
          mode === "edit" ? setEditMode(false) : setShowItemForm(false);
        }}
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-gray-400/40 bg-white py-2 text-sm text-black hover:bg-gray-100"
      >
        Cancel
      </button>
    </div>
  );
}

export default FormActions;

function PlusSvg({ height, width, color }) {
  return (
    <svg
      fill={color}
      height={height}
      width={width}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 24 24"
      enableBackground="new 0 0 24 24"
      xmlSpace="preserve"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <g id="save">
          {" "}
          <path d="M22.083,24H1.917C0.86,24,0,23.14,0,22.083V1.917C0,0.86,0.86,0,1.917,0h16.914L24,5.169v16.914 C24,23.14,23.14,24,22.083,24z M20,22h2V5.998l-3-3V9c0,1.103-0.897,2-2,2H7c-1.103,0-2-0.897-2-2V2H2v20h2v-7c0-1.103,0.897-2,2-2 h12c1.103,0,2,0.897,2,2V22z M6,22h12v-7.001L6,15V22z M7,2v7h10V2H7z"></path>{" "}
          <path d="M15,8h-4V3h4V8z"></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}
