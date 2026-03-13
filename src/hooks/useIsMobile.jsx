import { useState, useEffect } from "react";

function useIsMobile(setIsCanvasView) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width:1024px)").matches;
    }
    return false;
  });
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const mediaQuery = window.matchMedia("(max-width:1024px)");
    function handleChange(event) {
      setIsMobile(event.matches);
      if (setIsCanvasView) {
        setIsCanvasView(true);
      }
    }
    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}

export default useIsMobile;
