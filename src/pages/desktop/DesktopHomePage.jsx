import { useState, useEffect, Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import api from "@/api/api";
import { getWhatsappUrl } from "@/config/contacts";
import "../HomePage.css";

// Lazy Loading Secondary Home Components
const PartnersMarquee = lazy(() => import("@/components/home/PartnersMarquee"));
const ServicesSection = lazy(() => import("@/components/home/ServicesSection"));
const CtaArea = lazy(() => import("@/components/home/CtaArea"));

const DesktopHomePage = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("@/utils/seo").then(({ setSEO }) => {
      setSEO(
        "Inicio",
        "Líderes en soluciones tecnológicas, seguridad electrónica, videovigilancia y soporte técnico corporativo en Tarapoto, San Martín - Perú.",
      );
    });
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    try {
      const { data } = await api.get("/products?limit=8");
      const withImages = data.data.filter(
        (p) => p.image && !p.image.includes("logo-icon.webp"),
      );
      setPopularProducts(withImages.slice(0, 8));
    } catch (error) {
      console.error("Error fetching popular products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page" style={{ paddingTop: "70px" }}>
      {/* Hero Section */}
      <header
        className="hero"
        style={{
          padding: "120px 0 80px",
          textAlign: "center",
          background:
            "radial-gradient(circle at center, rgba(156, 203, 25, 0.08) 0%, transparent 70%)",
        }}
      >
        <div className="container">
          <span
            className="hero-tagline"
            style={{
              color: "var(--primary)",
              fontWeight: "600",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontSize: "0.85rem",
              marginBottom: "1rem",
              display: "block",
            }}
          >
            Tecnología · Ingeniería · Innovación
          </span>
          <h1
            style={{
              fontSize: "4rem",
              fontWeight: "800",
              lineHeight: "1.1",
              marginBottom: "1.5rem",
            }}
          >
            Especialistas en Cámaras de <br /> Seguridad
            <span style={{ color: "var(--text-main)", opacity: 0.7 }}>
              {" "}
              e Instalaciones
            </span>
          </h1>
          <p
            style={{
              maxWidth: "750px",
              margin: "0 auto 2.5rem",
              fontSize: "1.2rem",
              color: "var(--text-muted)",
            }}
          >
            Líderes en seguridad electrónica, videovigilancia y soporte técnico
            corporativo. Partners oficiales de Dahua y Hikvision, garantizando
            equipos de máxima calidad.
          </p>
          <div
            className="hero-actions"
            style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
          >
            <Link to="/catalog" className="btn-primary">
              Explorar Catálogo
            </Link>
            <a
              href={getWhatsappUrl(1)}
              className="btn-secondary"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Consultoría Técnica
            </a>
          </div>
        </div>
      </header>

      {/* Brands Marquee Section (Lazy) */}
      <Suspense fallback={<div style={{ height: "180px" }} />}>
        <PartnersMarquee />
      </Suspense>

      {/* Featured Products */}
      <section className="highlights container" style={{ padding: "80px 0" }}>
        <div
          className="section-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "3rem",
          }}
        >
          <div>
            <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
              Productos Destacados
            </h2>
            <p style={{ color: "var(--text-muted)" }}>
              Equipamiento profesional con disponibilidad inmediata.
            </p>
          </div>
          <Link
            to="/catalog"
            className="btn-secondary"
            style={{ padding: "0.6rem 1.2rem", fontSize: "0.9rem" }}
          >
            Ver todos <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
          </Link>
        </div>

        {loading ? (
          <div
            className="product-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem",
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="shimmer"
                style={{ height: "350px", borderRadius: "24px" }}
              ></div>
            ))}
          </div>
        ) : (
          <div
            className="product-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.5rem",
            }}
          >
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Services Section (Lazy) */}
      <Suspense fallback={<div style={{ height: "500px" }} />}>
        <ServicesSection />
      </Suspense>

      {/* Final CTA Area (Lazy) */}
      <Suspense fallback={<div style={{ height: "300px" }} />}>
        <CtaArea />
      </Suspense>
    </div>
  );
};

export default DesktopHomePage;
