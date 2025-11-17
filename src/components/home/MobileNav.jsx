function MobileNav({ isCanvasView, setIsCanvasView }) {
  return (
    <nav className="w-full bg-white py-4 lg:hidden">
      <div className="flex justify-between rounded-md bg-gray-200 p-1 text-sm">
        <button
          role="tab"
          className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm py-2 ${isCanvasView ? `bg-white text-black` : "bg-gray-200 text-gray-500"}`}
          onClick={() => {
            setIsCanvasView(true);
          }}
        >
          <BoxSvg
            isCanvasView={isCanvasView}
            height={"20px"}
            width={"20px"}
            color={"black"}
          />
          View
        </button>
        <button
          role="tab"
          className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm py-2 ${!isCanvasView ? `bg-white text-black` : "bg-gray-200 text-gray-500"}`}
          onClick={() => {
            setIsCanvasView(false);
          }}
        >
          <ListSvg
            isCanvasView={isCanvasView}
            height={"20px"}
            width={"20px"}
            color={"black"}
          />
          Items
        </button>
      </div>
    </nav>
  );
}

export default MobileNav;
function BoxSvg({ isCanvasView, height, width }) {
  return (
    <svg
      height={height}
      width={width}
      stroke={isCanvasView ? `black` : "white"}
      fill={isCanvasView ? `white` : "#e5e7eb"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
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
          d="M4 15.8294V15.75V8C4 7.69114 4.16659 7.40629 4.43579 7.25487L4.45131 7.24614L11.6182 3.21475L11.6727 3.18411C11.8759 3.06979 12.1241 3.06979 12.3273 3.18411L19.6105 7.28092C19.8511 7.41625 20 7.67083 20 7.94687V8V15.75V15.8294C20 16.1119 19.8506 16.3733 19.6073 16.5167L12.379 20.7766C12.1451 20.9144 11.8549 20.9144 11.621 20.7766L4.39267 16.5167C4.14935 16.3733 4 16.1119 4 15.8294Z"
          stroke={isCanvasView ? `black` : "#6a7282"}
          strokeWidth="2"
        ></path>{" "}
        <path
          d="M12 21V12"
          stroke={isCanvasView ? `black` : "#6a7282"}
          strokeWidth="2"
        ></path>{" "}
        <path
          d="M12 12L4 7.5"
          stroke={isCanvasView ? `black` : "#6a7282"}
          strokeWidth="2"
        ></path>{" "}
        <path
          d="M20 7.5L12 12"
          stroke={isCanvasView ? `black` : "#6a7282"}
          strokeWidth="2"
        ></path>{" "}
      </g>
    </svg>
  );
}
function ListSvg({ isCanvasView, height, width }) {
  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
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
          d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z"
          stroke={!isCanvasView ? `black` : "#6a7282"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
}
