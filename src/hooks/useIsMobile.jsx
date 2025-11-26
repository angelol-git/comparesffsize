import { useState, useEffect } from "react";

function useIsMobile(setIsCanvasView) {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width:1024px)"),
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:1024px)");
    function handleChange(event) {
      setIsMobile(event.matches);
      if (setIsCanvasView) {
        setIsCanvasView(true);
      }
    }
    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);
    return () => window.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}

export default useIsMobile;
