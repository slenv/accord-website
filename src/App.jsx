import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import "./App.css";

import useDeviceDetect from "@/hooks/useDeviceDetect";

const DesktopNavbar = lazy(() => import("@/components/layout/desktop/DesktopNavbar"));
const DesktopFooter = lazy(() => import("@/components/layout/desktop/DesktopFooter"));
const MobileNavbar = lazy(() => import("@/components/layout/mobile/MobileNavbar"));
const MobileFooter = lazy(() => import("@/components/layout/mobile/MobileFooter"));

import HomePage from "./pages/HomePage";
import ErrorPage from "./components/ErrorPage";

// Lazy Loading Pages
const CatalogPage = lazy(() => import("./pages/CatalogPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));

// Loader for Product Details
import { productLoader } from "./pages/ProductDetailPage";

// Layout component to wrap all pages with Navbar and Footer
const RootLayout = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <div className="app">
      <Suspense fallback={null}>
        {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
      </Suspense>

      <ScrollRestoration />

      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        {isMobile ? <MobileFooter /> : <DesktopFooter />}
      </Suspense>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "catalog",
        element: <CatalogPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetailPage />,
        loader: productLoader,
      },
      // Note: createBrowserRouter automatically handles 404s via errorElement
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
