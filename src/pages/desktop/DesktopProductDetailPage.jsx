import { useState, useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Package,
  ShieldCheck,
  Truck,
  AlertCircle,
  FileText,
  Eye,
} from "lucide-react";
import ImageWithLoader from "@/components/ImageWithLoader";
import { getImageUrl, getTechFileUrl } from "@/api/api";
import { getWhatsappUrl } from "@/config/contacts";
import "../ProductDetailPage.css";

const DesktopProductDetailPage = () => {
  const { product: initialProduct } = useLoaderData();
  const navigate = useNavigate();

  const [product, setProduct] = useState(initialProduct);
  const [activeImage, setActiveImage] = useState(initialProduct?.image || null);

  // In case the loader data changes (navigation between products)
  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
      setActiveImage(initialProduct.image);

      // Set Dynamic SEO
      import("@/utils/seo").then(({ setSEO }) => {
        setSEO(
          initialProduct.name,
          initialProduct.description ||
            `Adquiere ${initialProduct.name} en Accord Technology. Soluciones tecnológicas y cobertura a nivel nacional.`,
          getImageUrl(initialProduct.image), // Dynamic image for Open Graph
        );
      });
    }
  }, [initialProduct]);

  if (!product)
    return (
      <div
        className="container"
        style={{
          marginTop: "150px",
          marginBottom: "150px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            padding: "5rem",
            borderRadius: "30px",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <AlertCircle
            size={64}
            color="var(--primary)"
            style={{ marginBottom: "2rem", opacity: 0.5 }}
          />
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
            Producto no encontrado
          </h1>
          <p
            className="text-muted"
            style={{
              marginBottom: "2.5rem",
              maxWidth: "400px",
              marginInline: "auto",
            }}
          >
            Lo sentimos, el producto que buscas no existe o ha sido retirado de
            nuestro catálogo actual.
          </p>
          <Link to="/catalog" className="btn-primary">
            <ChevronLeft size={20} /> Volver al Catálogo
          </Link>
        </div>
      </div>
    );

  const whatsappMessage = `Hola Accord Technology, estoy interesado en el producto: ${product.name} (SKU: ${product.sku})`;
  const whatsappUrl = getWhatsappUrl(0, whatsappMessage); // Canal Ventas

  return (
    <div
      className="product-detail-page container"
      style={{ marginTop: "100px", marginBottom: "80px" }}
    >
      <a
        href="/catalog"
        onClick={(e) => {
          e.preventDefault();
          if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
          } else {
            navigate("/catalog");
          }
        }}
        className="back-link"
        style={{
          marginBottom: "2rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--text-muted)",
          transition: "color 0.3s",
        }}
      >
        <ChevronLeft size={20} /> Volver al catálogo
      </a>

      <div className="product-detail-layout">
        <div className="product-visuals">
          <div
            className="main-image"
            style={{
              backgroundColor: "white",
              borderRadius: "24px",
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "500px",
              overflow: "hidden",
              border: "1px solid var(--glass-border)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            }}
          >
            <ImageWithLoader
              src={getImageUrl(activeImage)}
              alt={product.name}
              imageStyle={{
                maxWidth: "100%",
                maxHeight: "450px",
                objectFit: "contain",
                transition: "all 0.4s ease",
              }}
            />
          </div>

          {product.gallery && product.gallery.length > 1 && (
            <div
              className="gallery-thumbnails"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  style={{
                    padding: "0.4rem",
                    background: "white",
                    borderRadius: "12px",
                    border:
                      activeImage === img
                        ? "2px solid var(--primary)"
                        : "2px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80px",
                    overflow: "hidden",
                  }}
                  className="thumb-btn"
                >
                  <img
                    src={getImageUrl(img)}
                    alt={`Preview ${idx + 1}`}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-info-detail">
          <div className="detail-header" style={{ marginBottom: "2rem" }}>
            <span
              className="sku-tag"
              style={{
                backgroundColor: "rgba(170, 59, 255, 0.1)",
                color: "var(--primary)",
                padding: "0.4rem 1rem",
                borderRadius: "50px",
                fontSize: "0.8rem",
                fontWeight: "bold",
                display: "inline-block",
                marginBottom: "1rem",
              }}
            >
              SKU: {product.sku}{" "}
              {product.brand_name && (
                <>
                  {" "}
                  |{" "}
                  <Link
                    to={`/catalog?search=${encodeURIComponent(product.brand_name)}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {product.brand_name}
                  </Link>
                </>
              )}{" "}
              | {product.category_name || "General"}
            </span>
            <h1
              style={{
                fontSize: "2.5rem",
                lineHeight: "1.2",
                marginBottom: "1.5rem",
              }}
            >
              {product.name}
            </h1>

            <div
              className="prices-list"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {product.units.map((u, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.8rem",
                    padding: u.is_main ? "1rem 0" : "0.5rem 0",
                    borderBottom:
                      idx < product.units.length - 1
                        ? "1px solid rgba(255, 255, 255, 0.05)"
                        : "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: u.is_main ? "2.2rem" : "1.4rem",
                      fontWeight: "bold",
                      color: u.is_main ? "white" : "var(--text-muted)",
                    }}
                  >
                    S/{" "}
                    {u.price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span
                    style={{
                      fontSize: u.is_main ? "1.1rem" : "0.9rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    por {u.unit}
                  </span>
                  {u.is_main && (
                    <span
                      style={{
                        marginLeft: "auto",
                        backgroundColor: "var(--primary)",
                        color: "#000",
                        fontSize: "0.65rem",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      Presentación Principal
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div
            className="description-container"
            style={{ marginBottom: "2.5rem" }}
          >
            <p
              className="description"
              style={{
                fontSize: "1.05rem",
                lineHeight: "1.7",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              {product.description}
            </p>
          </div>

          <div
            className="trust-badges"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            <div
              className="badge"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "1rem",
                background: "rgba(255, 255, 255, 0.03)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <ShieldCheck size={20} color="var(--primary)" />
              <span style={{ fontSize: "0.9rem" }}>
                Garantía Accord Technology
              </span>
            </div>
            <div
              className="badge"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "1rem",
                background: "rgba(255, 255, 255, 0.03)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <Truck size={20} color="var(--primary)" />
              <span style={{ fontSize: "0.9rem" }}>
                Cobertura a Nivel Nacional
              </span>
            </div>

            {product.manage_stock && (
              <div
                className="badge"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.8rem",
                  padding: "1rem",
                  background:
                    product.stock <= 0
                      ? "rgba(255, 77, 77, 0.08)"
                      : "rgba(170, 59, 255, 0.05)",
                  borderRadius: "16px",
                  border:
                    product.stock <= 0
                      ? "1px solid rgba(255, 77, 77, 0.2)"
                      : "1px solid rgba(170, 59, 255, 0.2)",
                  gridColumn: "span 2",
                }}
              >
                <Package
                  size={20}
                  color={product.stock <= 0 ? "#ff4d4d" : "var(--primary)"}
                />
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: product.stock <= 0 ? "#ff4d4d" : "inherit",
                    fontWeight: product.stock <= 0 ? "800" : "normal",
                  }}
                >
                  {product.stock <= 0 ? (
                    "PRODUCTO AGOTADO"
                  ) : (
                    <>
                      Stock disponible:{" "}
                      <strong>
                        {Math.round(product.stock)} {product.main_unit}
                      </strong>
                    </>
                  )}
                </span>
              </div>
            )}
          </div>

          <div className="actions" style={{ marginBottom: "2.5rem" }}>
            <a
              href={whatsappUrl}
              className="btn-primary"
              target="_blank"
              rel="noreferrer"
              style={{
                width: "100%",
                padding: "1.2rem",
                fontSize: "1.1rem",
                justifyContent: "center",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ marginRight: "0.8rem" }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Consultar por WhatsApp
            </a>
          </div>

          <div
            className="installer-section"
            style={{
              padding: "2rem",
              background:
                "linear-gradient(135deg, rgba(170, 59, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
              borderRadius: "24px",
              border: "1px solid rgba(170, 59, 255, 0.1)",
              position: "relative",
            }}
          >
            {product.tech_sheet && (
              <div
                style={{
                  marginBottom: "2rem",
                  paddingBottom: "1.5rem",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "1rem",
                  }}
                >
                  <FileText size={20} color="var(--primary)" />
                  <span style={{ fontWeight: "600" }}>
                    Documentación Técnica
                  </span>
                </div>
                <a
                  href={getTechFileUrl(product.tech_sheet)}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    gap: "0.8rem",
                    padding: "1rem",
                  }}
                >
                  <Eye size={18} /> Ver Ficha Técnica (PDF)
                </a>
              </div>
            )}

            <p style={{ marginBottom: "1rem", fontWeight: "500" }}>
              ¿Eres instalador frecuente o cliente técnico?
            </p>
            <a
              href={whatsappUrl}
              className="btn-secondary"
              style={{
                padding: "0.8rem 1.5rem",
                width: "auto",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Solicitar precios de gremio
            </a>
            <p
              className="note"
              style={{
                marginTop: "1.2rem",
                fontSize: "0.8rem",
                color: "var(--text-muted)",
                fontStyle: "italic",
              }}
            >
              * Contamos con una escala de descuentos exclusivos para
              profesionales y empresas del rubro tecnológico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopProductDetailPage;
