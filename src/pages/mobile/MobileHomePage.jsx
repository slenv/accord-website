import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Wrench, ShieldCheck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import api from "@/api/api";
import { getWhatsappUrl } from "@/config/contacts";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import "@/pages/HomePage.css";
import "@/pages/CatalogPage.css";

const MobileHomePage = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("@/utils/seo").then(({ setSEO }) => {
      setSEO("Inicio", "Seguridad electrónica y soporte técnico");
    });
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    try {
      const { data } = await api.get("/products?limit=6");
      const withImages = data.data.filter(
        (p) => p.image && !p.image.includes("logo-icon.webp"),
      );
      setPopularProducts(withImages.slice(0, 6));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "65px", paddingBottom: "90px" }}>
      {/* Mobile Hero */}
      <section
        style={{
          padding: "3rem 1rem",
          textAlign: "center",
          background: "var(--bg-dark)",
        }}
      >
        <span
          style={{
            color: "var(--primary)",
            fontSize: "0.75rem",
            fontWeight: "bold",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "1rem",
            display: "block",
          }}
        >
          Tecnología & Seguridad
        </span>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            lineHeight: 1.2,
            marginBottom: "1rem",
          }}
        >
          Protege lo que <br />{" "}
          <span style={{ color: "var(--primary)" }}>Más Importa</span>
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "1rem",
            marginBottom: "2rem",
            padding: "0 1rem",
          }}
        >
          Equipos CCTV de alta gama y soporte corporativo garantizado.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "0 2rem",
          }}
        >
          <Link
            to="/catalog"
            className="btn-primary"
            style={{
              padding: "1rem",
              fontSize: "1.1rem",
              borderRadius: "12px",
            }}
          >
            Ver Catálogo
          </Link>
          <a
            href={getWhatsappUrl(1)}
            className="btn-secondary"
            style={{
              padding: "1rem",
              fontSize: "1.1rem",
              borderRadius: "12px",
            }}
          >
            Contáctanos
          </a>
        </div>
      </section>

      <section>
        <PartnersMarquee />
      </section>

      {/* Featured Products - Mobile Grid */}
      <section style={{ padding: "3rem 1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ fontSize: "1.6rem", margin: 0, lineHeight: 1 }}>
            Destacados
          </h2>
          <Link
            to="/catalog"
            style={{
              color: "var(--primary)",
              fontSize: "0.9rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            Ver más <ChevronRight size={16} />
          </Link>
        </div>

        <div className="product-grid" style={{ gap: "0.8rem" }}>
          {loading
            ? [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="product-card shimmer"
                  style={{ height: "320px", borderRadius: "16px" }}
                ></div>
              ))
            : popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </section>

      {/* Mobile Services */}
      <section
        style={{
          padding: "2rem 1.5rem",
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid var(--glass-border)",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Servicios
        </h2>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          <div
            style={{
              background: "var(--bg-dark)",
              padding: "1.5rem",
              borderRadius: "20px",
              border: "1px solid var(--glass-border)",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "0.8rem",
                background: "rgba(170, 59, 255, 0.1)",
                borderRadius: "14px",
                color: "var(--primary)",
              }}
            >
              <ShieldCheck size={28} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  margin: 0,
                  marginBottom: "0.2rem",
                }}
              >
                Seguridad CCTV
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  margin: 0,
                }}
              >
                Instalación y monitoreo avanzado.
              </p>
            </div>
          </div>
          <div
            style={{
              background: "var(--bg-dark)",
              padding: "1.5rem",
              borderRadius: "20px",
              border: "1px solid var(--glass-border)",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                padding: "0.8rem",
                background: "rgba(170, 59, 255, 0.1)",
                borderRadius: "14px",
                color: "var(--primary)",
              }}
            >
              <Wrench size={28} />
            </div>
            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  margin: 0,
                  marginBottom: "0.2rem",
                }}
              >
                Soporte Técnico
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  margin: 0,
                }}
              >
                Mantenimiento preventivo y correctivo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobileHomePage;
