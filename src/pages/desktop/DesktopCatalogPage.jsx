import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Search, AlertCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import api from "@/api/api";
import { useCatalogStore } from "@/store/catalogStore";
import "../CatalogPage.css";

const DesktopCatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get("category");
  const urlBrand = searchParams.get("brand");
  const urlSearch = searchParams.get("search") || "";

  const {
    products,
    categories,
    brands,
    page,
    hasMore,
    totalProducts,
    searchTerm,
    selectedCategory,
    selectedBrand,
    isInitialized,
    setCategories,
    setBrands,
    setProductsData,
    setFilters,
  } = useCatalogStore();

  const [loading, setLoading] = useState(!isInitialized);
  const [loadingMore, setLoadingMore] = useState(false);
  const [localSearch, setLocalSearch] = useState(urlSearch);

  const searchTimeout = useRef(null);
  const abortControllerRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Drag Scroll State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const isInitialMount = useRef(true);
  useEffect(() => {
    import("@/utils/seo").then(({ setSEO }) => {
      setSEO(
        "Catálogo de Productos",
        "Explore nuestro amplio catálogo de cámaras de seguridad, accesorios y equipos tecnológicos de última generación. Envíos a nivel nacional.",
      );
    });
    setFilters(urlSearch, urlCategory, urlBrand);
    setLocalSearch(urlSearch);
  }, [urlSearch, urlCategory, urlBrand, setFilters]);

  // 2. Initial Category & Brand Fetching
  useEffect(() => {
    if (categories.length === 0) {
      api
        .get("/categories")
        .then((res) => setCategories(res.data))
        .catch(console.error);
    }
    if (brands.length === 0) {
      api
        .get("/brands")
        .then((res) => setBrands(res.data))
        .catch(console.error);
    }
  }, [categories.length, brands.length, setCategories, setBrands]);

  // 3. Main Data Fetching Logic
  useEffect(() => {
    if (!isInitialized) {
      loadInitialProducts();
    }
  }, [isInitialized, searchTerm, selectedCategory, selectedBrand]);

  // 4. Scroll Active Brand into view (for persistence on refresh)
  useEffect(() => {
    if (selectedBrand && scrollContainerRef.current) {
      const activeChip =
        scrollContainerRef.current.querySelector(".brand-chip.active");
      if (activeChip) {
        activeChip.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [brands, selectedBrand]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearch(value);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (value) params.set("search", value);
      else params.delete("search");
      setSearchParams(params, { replace: true });
    }, 600);
  };

  const handleCategorySelect = (id) => {
    const params = new URLSearchParams(searchParams);
    if (id) params.set("category", id);
    else params.delete("category");

    params.delete("search");
    window.scrollTo({ top: 0, behavior: "instant" });
    setSearchParams(params);
  };

  const handleBrandSelect = (id) => {
    const params = new URLSearchParams(searchParams);
    if (id) params.set("brand", id);
    else params.delete("brand");

    params.delete("search");
    window.scrollTo({ top: 0, behavior: "instant" });
    setSearchParams(params);
  };

  // --- Drag Scroll Logic ---
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const loadInitialProducts = async () => {
    setLoading(true);
    try {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();

      let url = `/products?page=1`;
      if (selectedCategory) url += `&category_id=${selectedCategory}`;
      if (selectedBrand) url += `&brand_id=${selectedBrand}`;
      if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;

      const { data } = await api.get(url, {
        signal: abortControllerRef.current.signal,
      });
      setProductsData(
        data.data,
        data.total,
        data.current_page < data.last_page,
        1,
        false,
      );
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    try {
      let url = `/products?page=${nextPage}`;
      if (selectedCategory) url += `&category_id=${selectedCategory}`;
      if (selectedBrand) url += `&brand_id=${selectedBrand}`;
      if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;

      const { data } = await api.get(url);
      setProductsData(
        data.data,
        data.total,
        data.current_page < data.last_page,
        nextPage,
        true,
      );
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="catalog-page container">
      <div className="catalog-layout">
        <aside className="filters-sidebar">
          <div
            className="catalog-sidebar-header"
            style={{ marginBottom: "2.5rem" }}
          >
            <h1
              className="page-title"
              style={{
                fontSize: "1.8rem",
                marginBottom: "1.5rem",
                lineHeight: "1.2",
              }}
            >
              Catálogo de <br />
              <span style={{ color: "var(--primary)" }}>Productos</span>
            </h1>
            <div
              className="search-bar"
              style={{ width: "100%", maxWidth: "100%", padding: "0 1rem" }}
            >
              <Search size={18} style={{ opacity: 0.6 }} />
              <input
                type="text"
                placeholder="Buscar producto..."
                value={localSearch || ""}
                onChange={handleSearchChange}
                style={{ padding: "0.8rem 1rem", fontSize: "0.9rem" }}
              />
            </div>
          </div>

          <div style={{ flexShrink: 0, marginBottom: "1.5rem" }}>
            <h3
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1.1rem",
                margin: 0,
              }}
            >
              <Filter size={18} /> Categorías
            </h3>
          </div>

          <div className="filter-group">
            <button
              className={`filter-item ${selectedCategory === null ? "active" : ""}`}
              onClick={() => handleCategorySelect(null)}
            >
              Todas las categorías
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-item ${selectedCategory === String(cat.id) ? "active" : ""}`}
                onClick={() => handleCategorySelect(cat.id)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>{cat.name}</span>
                <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <main
          className="catalog-main"
          style={{ minHeight: "400px", position: "relative" }}
        >
          <div className="brands-bar-wrapper">
            <div
              className="brands-horizontal-bar"
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              <button
                className={`brand-chip ${selectedBrand === null ? "active" : ""}`}
                onClick={() => !isDragging && handleBrandSelect(null)}
              >
                Todas las marcas
              </button>
              {brands.map((brand) => (
                <button
                  key={brand.id}
                  className={`brand-chip ${selectedBrand === String(brand.id) ? "active" : ""}`}
                  onClick={() => !isDragging && handleBrandSelect(brand.id)}
                >
                  {brand.name}{" "}
                  <span
                    style={{
                      marginLeft: "0.4rem",
                      opacity: 0.6,
                      fontSize: "0.75rem",
                    }}
                  >
                    ({brand.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1.5rem",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <p className="results-count text-muted">
              {totalProducts} producto{totalProducts !== 1 ? "s" : ""}{" "}
              encontrado{totalProducts !== 1 ? "s" : ""}
            </p>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {/* Filter badges removed as per user request (redundant with sidebar/horizontal bar) */}
            </div>
          </div>

          {loading ? (
            <div className="product-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="product-card shimmer"
                  style={{ height: "380px", borderRadius: "20px" }}
                ></div>
              ))}
            </div>
          ) : (
            <>
              <div className="product-grid">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onBrandClick={(brandName) => {
                        handleBrandSelect(
                          brands.find((b) => b.name === brandName)?.id,
                        );
                      }}
                    />
                  ))
                ) : (
                  <div
                    style={{
                      gridColumn: "1/-1",
                      textAlign: "center",
                      padding: "4rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    <AlertCircle
                      size={48}
                      style={{ opacity: 0.2, marginBottom: "1rem" }}
                    />
                    <p>No se encontraron productos con estos criterios.</p>
                  </div>
                )}
              </div>

              {hasMore && (
                <div style={{ textAlign: "center", marginTop: "4rem" }}>
                  <button
                    className="btn-secondary"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? "Cargando..." : "Cargar más productos"}
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DesktopCatalogPage;
