import { useState, useEffect } from "react";

const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  useEffect(() => {
    const handleResize = () => {
      // 768px is the standard breakpoint for tablets/mobile vs desktop
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile };
};

export default useDeviceDetect;
