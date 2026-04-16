import { lazy, Suspense } from "react";
import useDeviceDetect from "../hooks/useDeviceDetect";

const DesktopCatalogPage = lazy(() => import("./desktop/DesktopCatalogPage"));
const MobileCatalogPage = lazy(() => import("./mobile/MobileCatalogPage"));

const CatalogPage = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <Suspense fallback={null}>
      {isMobile ? <MobileCatalogPage /> : <DesktopCatalogPage />}
    </Suspense>
  );
};

export default CatalogPage;
