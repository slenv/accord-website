import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to the top of the page on every route change.
 * The CatalogPage handles its own scroll restoration internally.
 */
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // If we're going to the catalog and we have state indicating a return,
    // let CatalogPage handle the scroll restoration itself.
    if (location.pathname === "/catalog" && location.state?.fromProduct) {
      return;
    }

    // Scroll to top on every other route change or same-route navigation
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname, location.key, location.state]);

  return null;
};

export default ScrollToTop;
