import { lazy, Suspense } from "react";
import useDeviceDetect from "@/hooks/useDeviceDetect";
import api from "@/api/api";

const DesktopProductDetailPage = lazy(() => import("./desktop/DesktopProductDetailPage"));
const MobileProductDetailPage = lazy(() => import("./mobile/MobileProductDetailPage"));

export const productLoader = async ({ params }) => {
  const { id } = params;
  try {
    const { data } = await api.get(`/products/${id}`);
    return { product: data };
  } catch (error) {
    console.error("Product loader error:", error);
    return { product: null };
  }
};

const ProductDetailPage = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <Suspense fallback={null}>
      {isMobile ? <MobileProductDetailPage /> : <DesktopProductDetailPage />}
    </Suspense>
  );
};

export default ProductDetailPage;
