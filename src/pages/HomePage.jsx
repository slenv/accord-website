import { lazy, Suspense } from "react";
import useDeviceDetect from "../hooks/useDeviceDetect";

const DesktopHomePage = lazy(() => import("./desktop/DesktopHomePage"));
const MobileHomePage = lazy(() => import("./mobile/MobileHomePage"));

const HomePage = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <Suspense fallback={null}>
      {isMobile ? <MobileHomePage /> : <DesktopHomePage />}
    </Suspense>
  );
};

export default HomePage;
