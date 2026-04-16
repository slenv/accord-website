import { useState, useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Package,
  ShieldCheck,
  Truck,
  AlertCircle,
  FileText,
  Info,
} from "lucide-react";
import ImageWithLoader from "@/components/ImageWithLoader";
import api, { getImageUrl, getTechFileUrl } from "@/api/api";
import { getWhatsappUrl } from "@/config/contacts";

// The productLoader is exported from the main wrapper file ideally, but handled at routing level.

const MobileProductDetailPage = () => {
  const { product: initialProduct } = useLoaderData();
  const navigate = useNavigate();

  const [product, setProduct] = useState(initialProduct);
  const [activeImage, setActiveImage] = useState(initialProduct?.image || null);

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
      setActiveImage(initialProduct.image);

      import("@/utils/seo").then(({ setSEO }) => {
        setSEO(
          initialProduct.name,
          initialProduct.description,
          getImageUrl(initialProduct.image),
        );
      });
    }
  }, [initialProduct]);

  if (!product)
    return (
      <div
        style={{
          paddingTop: "80px",
          paddingBottom: "150px",
          textAlign: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AlertCircle
          size={64}
          color="var(--primary)"
          style={{ opacity: 0.5, marginBottom: "1rem" }}
        />
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          Producto no encontrado
        </h1>
        <Link
          to="/catalog"
          className="btn-primary"
          style={{ marginTop: "2rem" }}
        >
          Volver al Catálogo
        </Link>
      </div>
    );

  const whatsappMessage = `Hola Accord Technology, estoy interesado en el producto: ${product.name} (SKU: ${product.sku})`;
  const whatsappUrl = getWhatsappUrl(0, whatsappMessage);

  return (
    <div
      style={{
        background: "var(--bg-dark)",
        minHeight: "100vh",
        paddingBottom: "90px",
      }}
    >
      {/* Top Mobile Header */}
      <div
        style={{
          position: "sticky",
          top: "65px",
          zIndex: 90,
          background: "rgba(0,8,22,0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--glass-border)",
          padding: "0.8rem 1rem",
        }}
      >
        <button
          onClick={(e) => {
            if (window.history.state && window.history.state.idx > 0)
              navigate(-1);
            else navigate("/catalog");
          }}
          style={{
            background: "none",
            border: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          <ChevronLeft size={22} /> Atrás
        </button>
      </div>

      {/* Main Image Viewer */}
      <div
        style={{
          width: "100%",
          background: "white",
          position: "relative",
          borderBottom: "1px solid var(--glass-border)",
        }}
      >
        <div
          style={{
            aspectRatio: "1",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <ImageWithLoader
            src={getImageUrl(activeImage)}
            alt={product.name}
            imageStyle={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        {product.gallery && product.gallery.length > 1 && (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              overflowX: "auto",
              padding: "1rem",
              background: "#f5f5f5",
            }}
          >
            {product.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                style={{
                  width: "60px",
                  height: "60px",
                  flexShrink: 0,
                  background: "white",
                  borderRadius: "8px",
                  border:
                    activeImage === img
                      ? "2px solid var(--primary)"
                      : "1px solid #ddd",
                  padding: "4px",
                }}
              >
                <img
                  src={getImageUrl(img)}
                  alt={`Thumb ${idx}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Content Block */}
      <div style={{ padding: "1.5rem 1rem" }}>
        {/* Badges */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{
              background: "rgba(170, 59, 255, 0.15)",
              color: "var(--primary)",
              padding: "4px 10px",
              borderRadius: "12px",
              fontSize: "0.75rem",
              fontWeight: "bold",
            }}
          >
            SKU: {product.sku}
          </span>
          {product.brand_name && (
            <span
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "white",
                padding: "4px 10px",
                borderRadius: "12px",
                fontSize: "0.75rem",
                fontWeight: "bold",
              }}
            >
              {product.brand_name}
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "1.6rem",
            lineHeight: "1.25",
            marginBottom: "1.5rem",
            fontWeight: "800",
          }}
        >
          {product.name}
        </h1>

        {/* Prices List */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: "16px",
            border: "1px solid var(--glass-border)",
            padding: "1rem",
            marginBottom: "2rem",
          }}
        >
          {product.units.map((u, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                padding: u.is_main ? "1.2rem 0" : "0.8rem 0",
                borderBottom:
                  idx < product.units.length - 1
                    ? "1px solid rgba(255, 255, 255, 0.05)"
                    : "none",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.4rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: u.is_main ? "2rem" : "1.4rem",
                      fontWeight: "bold",
                      color: u.is_main ? "white" : "var(--text-muted)",
                    }}
                  >
                    S/ {u.price.toLocaleString()}
                  </span>
                  <span
                    style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}
                  >
                    / {u.unit}
                  </span>
                </div>
                {u.is_main && (
                  <span
                    style={{
                      display: "inline-block",
                      background: "var(--primary)",
                      color: "#000",
                      fontSize: "0.65rem",
                      padding: "3px 6px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      marginTop: "0.4rem",
                    }}
                  >
                    Principal
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stock / Badges */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.8rem",
            marginBottom: "2rem",
          }}
        >
          {product.manage_stock && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "1rem",
                borderRadius: "12px",
                background:
                  product.stock <= 0
                    ? "rgba(255, 77, 77, 0.1)"
                    : "rgba(170, 59, 255, 0.1)",
                border:
                  product.stock <= 0
                    ? "1px solid rgba(255, 77, 77, 0.3)"
                    : "1px solid rgba(170, 59, 255, 0.3)",
              }}
            >
              <Package
                size={22}
                color={product.stock <= 0 ? "#ff4d4d" : "var(--primary)"}
              />
              <span
                style={{
                  fontSize: "0.95rem",
                  color: product.stock <= 0 ? "#ff4d4d" : "white",
                  fontWeight: product.stock <= 0 ? "bold" : "normal",
                }}
              >
                {product.stock <= 0
                  ? "Agotado Temporalmente"
                  : `Stock disponible: ${Math.round(product.stock)}`}
              </span>
            </div>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              padding: "1rem",
              background: "rgba(255, 255, 255, 0.02)",
              borderRadius: "12px",
              border: "1px solid var(--glass-border)",
            }}
          >
            <ShieldCheck size={20} color="var(--primary)" />
            <span style={{ fontSize: "0.9rem" }}>Garantía Oficial</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              padding: "1rem",
              background: "rgba(255, 255, 255, 0.02)",
              borderRadius: "12px",
              border: "1px solid var(--glass-border)",
            }}
          >
            <Truck size={20} color="var(--primary)" />
            <span style={{ fontSize: "0.9rem" }}>Envío a Nivel Nacional</span>
          </div>
        </div>

        {/* Specs / Description */}
        <div style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.2rem",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Info size={20} color="var(--primary)" /> Descripción
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: "1.7",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            {product.description}
          </p>
        </div>

        {/* Tech Sheet */}
        {product.tech_sheet && (
          <a
            href={getTechFileUrl(product.tech_sheet)}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.8rem",
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              border: "1px solid var(--glass-border)",
              padding: "1.2rem",
              borderRadius: "16px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            <FileText size={20} color="var(--primary)" /> Ver Ficha Técnica
            (PDF)
          </a>
        )}

        <p
          style={{
            marginTop: "3rem",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          * Descuentos especiales para gremio técnico por WhatsApp.
        </p>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "var(--bg-dark)",
          borderTop: "1px solid var(--glass-border)",
          padding: "1rem",
          zIndex: 100,
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          boxShadow: "0 -10px 20px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ flex: 1 }}>
          <span
            style={{
              display: "block",
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginBottom: "0.2rem",
            }}
          >
            Cotizar / Comprar
          </span>
          <span
            style={{
              display: "block",
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: "white",
            }}
          >
            S/{" "}
            {product.units.find((u) => u.is_main)?.price.toLocaleString() ||
              product.units[0]?.price.toLocaleString()}
          </span>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
          style={{
            padding: "1rem 1.5rem",
            borderRadius: "12px",
            flex: 1,
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          Consultar
        </a>
      </div>
    </div>
  );
};

export default MobileProductDetailPage;
