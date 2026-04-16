import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Search, X, AlertCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import api from "@/api/api";
import { useCatalogStore } from "@/store/catalogStore";
import "../CatalogPage.css";

const MobileCatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get("category");
  const urlBrand = searchParams.get("brand");
  const urlSearch = searchParams.get("search") || "";
  const urlMinPrice = searchParams.get("min_price") || "";
  const urlMaxPrice = searchParams.get("max_price") || "";

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
    minPrice,
    maxPrice,
    isInitialized,
    setCategories,
    setBrands,
    setProductsData,
    setFilters,
  } = useCatalogStore();

  const [loading, setLoading] = useState(!isInitialized);
  const [loadingMore, setLoadingMore] = useState(false);
  const [localSearch, setLocalSearch] = useState(urlSearch);
  const [localMinPrice, setLocalMinPrice] = useState(urlMinPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(urlMaxPrice);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Drawer State

  const searchTimeout = useRef(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    import("@/utils/seo").then(({ setSEO }) => {
      setSEO("Catálogo Web", "Compra cámaras y accesorios");
    });
    setFilters(urlSearch, urlCategory, urlBrand, urlMinPrice, urlMaxPrice);
    setLocalSearch(urlSearch);
    setLocalMinPrice(urlMinPrice);
    setLocalMaxPrice(urlMaxPrice);
  }, [urlSearch, urlCategory, urlBrand, urlMinPrice, urlMaxPrice, setFilters]);

  useEffect(() => {
    if (categories.length === 0)
      api
        .get("/categories")
        .then((res) => setCategories(res.data))
        .catch(console.error);
    if (brands.length === 0)
      api
        .get("/brands")
        .then((res) => setBrands(res.data))
        .catch(console.error);
  }, [categories.length, brands.length, setCategories, setBrands]);

  useEffect(() => {
    if (!isInitialized) loadInitialProducts();
  }, [isInitialized, searchTerm, selectedCategory, selectedBrand, minPrice, maxPrice]);

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
    setSearchParams(params);
    setIsFilterOpen(false); // Close drawer on select
    window.scrollTo({ top: 0 });
  };

  const handleBrandSelect = (id) => {
    const params = new URLSearchParams(searchParams);
    if (id) params.set("brand", id);
    else params.delete("brand");
    params.delete("search");
    setSearchParams(params);
    setIsFilterOpen(false); // Close drawer on select
    window.scrollTo({ top: 0 });
  };

  const handlePriceApply = () => {
    const params = new URLSearchParams(searchParams);
    if (localMinPrice) params.set("min_price", localMinPrice);
    else params.delete("min_price");

    if (localMaxPrice) params.set("max_price", localMaxPrice);
    else params.delete("max_price");

    params.delete("search");
    setSearchParams(params);
    setIsFilterOpen(false);
    window.scrollTo({ top: 0 });
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
      if (minPrice) url += `&min_price=${minPrice}`;
      if (maxPrice) url += `&max_price=${maxPrice}`;

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
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      let url = `/products?page=${page + 1}`;
      if (selectedCategory) url += `&category_id=${selectedCategory}`;
      if (selectedBrand) url += `&brand_id=${selectedBrand}`;
      if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
      if (minPrice) url += `&min_price=${minPrice}`;
      if (maxPrice) url += `&max_price=${maxPrice}`;

      const { data } = await api.get(url);
      setProductsData(
        data.data,
        data.total,
        data.current_page < data.last_page,
        page + 1,
        true,
      );
    } catch (error) {
    } finally {
      setLoadingMore(false);
    }
  };

  // Find active filter names to display in header
  const getActiveFilterNames = () => {
    let names = [];
    if (selectedCategory) {
      const cat = (categories || []).find((c) => String(c.id) === selectedCategory);
      if (cat) names.push(cat.name);
    }
    if (selectedBrand) {
      const brand = (brands || []).find((b) => String(b.id) === selectedBrand);
      if (brand) names.push(brand.name);
    }
    return names.length > 0 ? names.join(" / ") : "Todos los productos";
  };

  return (
    <div
      style={{
        paddingTop: "65px",
        paddingBottom: "90px",
        background: "var(--bg-dark)",
        minHeight: "100vh",
      }}
    >
      {/* Mobile Sticky Toolbar (Search + Filter Toggle) */}
      <div
        style={{
          position: "sticky",
          top: "65px",
          zIndex: 90,
          background: "rgba(0,8,22,0.95)",
          backdropFilter: "blur(10px)",
          padding: "0.8rem 1rem",
          borderBottom: "1px solid var(--glass-border)",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <div
            style={{
              flex: 1,
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "12px",
                color: "var(--text-muted)",
              }}
            />
            <input
              type="text"
              placeholder="Buscar..."
              value={localSearch || ""}
              onChange={handleSearchChange}
              style={{
                width: "100%",
                padding: "0.8rem 1rem 0.8rem 2.5rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--glass-border)",
                borderRadius: "12px",
                color: "white",
                fontSize: "1rem",
              }}
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(true)}
            style={{
              background: "var(--primary)",
              border: "none",
              color: "white",
              padding: "0 1.2rem",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontWeight: "bold",
            }}
          >
            <Filter size={18} />
            <span style={{ fontSize: "0.9rem" }}>Filtros</span>
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "0.8rem",
            padding: "0 0.2rem",
          }}
        >
          <span
            style={{
              color: "var(--primary)",
              fontSize: "0.8rem",
              fontWeight: "bold",
            }}
          >
            {getActiveFilterNames()}
          </span>
          <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            {totalProducts} result.
          </span>
        </div>
      </div>

      {/* Product Grid - Using Desktop Card Class for Consistency */}
      <div style={{ padding: "0.5rem" }}>
        {loading ? (
          <div className="product-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="product-card shimmer"
                style={{ height: "320px", borderRadius: "16px" }}
              ></div>
            ))}
          </div>
        ) : Array.isArray(products) && products.length > 0 ? (
          <div className="product-grid">
            {Array.isArray(products) && products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBrandClick={(brandName) => {
                  const foundBrand = (brands || []).find((b) => b.name === brandName);
                  handleBrandSelect(foundBrand?.id);
                }}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "3rem 1rem",
            }}
          >
            <AlertCircle
              size={40}
              style={{
                opacity: 0.2,
                margin: "0 auto 1rem",
                display: "block",
                color: "white",
              }}
            />
            <p style={{ color: "var(--text-muted)" }}>
              No se encontraron resultados.
            </p>
          </div>
        )}
      </div>

      {hasMore && !loading && (
        <div style={{ textAlign: "center", padding: "1rem" }}>
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "white",
              border: "1px solid var(--glass-border)",
              padding: "0.8rem 2rem",
              borderRadius: "24px",
              fontSize: "0.9rem",
            }}
          >
            {loadingMore ? "Cargando..." : "Cargar más"}
          </button>
        </div>
      )}

      {/* Filter Drawer (Bottom Sheet) */}
      {isFilterOpen && (
        <div
          onClick={() => setIsFilterOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 999,
          }}
        />
      )}

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "var(--bg-dark)",
          borderTop: "1px solid var(--glass-border)",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          zIndex: 1000,
          transform: isFilterOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "1rem 1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Filter size={20} /> Filtros
          </h3>
          <button
            onClick={() => setIsFilterOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              padding: "0.5rem",
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div style={{ padding: "1rem 1.5rem", overflowY: "auto" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h4
              style={{
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                textTransform: "uppercase",
                marginBottom: "1rem",
                letterSpacing: "1px",
              }}
            >
              Categorías
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <button
                onClick={() => handleCategorySelect(null)}
                style={{
                  textAlign: "left",
                  padding: "1rem",
                  borderRadius: "12px",
                  background:
                    selectedCategory === null
                      ? "rgba(170, 59, 255, 0.1)"
                      : "rgba(255,255,255,0.02)",
                  border: `1px solid ${selectedCategory === null ? "var(--primary)" : "rgba(255,255,255,0.05)"}`,
                  color:
                    selectedCategory === null ? "white" : "var(--text-muted)",
                  fontWeight: selectedCategory === null ? "bold" : "normal",
                }}
              >
                Todas las categorías
              </button>
              {(categories || []).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "1rem",
                    borderRadius: "12px",
                    background:
                      selectedCategory === String(cat.id)
                        ? "rgba(170, 59, 255, 0.1)"
                        : "rgba(255,255,255,0.02)",
                    border: `1px solid ${selectedCategory === String(cat.id) ? "var(--primary)" : "rgba(255,255,255,0.05)"}`,
                    color:
                      selectedCategory === String(cat.id)
                        ? "white"
                        : "var(--text-muted)",
                  }}
                >
                  <span>{cat.name}</span>
                  <span style={{ fontSize: "0.8rem", opacity: 0.6 }}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h4
              style={{
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                textTransform: "uppercase",
                marginBottom: "1rem",
                letterSpacing: "1px",
              }}
            >
              Marcas
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              <button
                onClick={() => handleBrandSelect(null)}
                style={{
                  padding: "0.6rem 1rem",
                  borderRadius: "20px",
                  background:
                    selectedBrand === null
                      ? "var(--primary)"
                      : "rgba(255,255,255,0.05)",
                  border: "none",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: selectedBrand === null ? "bold" : "normal",
                }}
              >
                Todas
              </button>
              {(brands || []).map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => handleBrandSelect(brand.id)}
                  style={{
                    padding: "0.6rem 1rem",
                    borderRadius: "20px",
                    background:
                      selectedBrand === String(brand.id)
                        ? "var(--primary)"
                        : "rgba(255,255,255,0.05)",
                    border: "none",
                    color: "white",
                    fontSize: "0.9rem",
                  }}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h4
              style={{
                color: "var(--text-muted)",
                fontSize: "0.85rem",
                textTransform: "uppercase",
                marginBottom: "1rem",
                letterSpacing: "1px",
              }}
            >
              Rango de Precio
            </h4>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
              }}
            >
              <div style={{ position: "relative", flex: 1 }}>
                <span
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                  }}
                >
                  $
                </span>
                <input
                  type="number"
                  placeholder="Min"
                  value={localMinPrice}
                  onChange={(e) => setLocalMinPrice(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "8px",
                    padding: "0.6rem 0.6rem 0.6rem 1.8rem",
                    color: "white",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>
              <span style={{ color: "var(--text-muted)" }}>-</span>
              <div style={{ position: "relative", flex: 1 }}>
                <span
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                  }}
                >
                  $
                </span>
                <input
                  type="number"
                  placeholder="Max"
                  value={localMaxPrice}
                  onChange={(e) => setLocalMaxPrice(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid var(--glass-border)",
                    borderRadius: "8px",
                    padding: "0.6rem 0.6rem 0.6rem 1.8rem",
                    color: "white",
                    fontSize: "0.9rem",
                    outline: "none",
                  }}
                />
              </div>
            </div>
            <button
              onClick={handlePriceApply}
              style={{
                marginTop: "1.2rem",
                width: "100%",
                padding: "0.8rem",
                background: "var(--primary)",
                border: "none",
                color: "black",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "0.9rem",
              }}
            >
              Aplicar Precio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCatalogPage;
