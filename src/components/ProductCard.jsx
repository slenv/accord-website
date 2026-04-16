import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ImageWithLoader from "./ImageWithLoader";
import { getImageUrl } from "@/api/api";

const ProductCard = ({ product, onBrandClick }) => {
  const handleBrandClick = (e) => {
    if (onBrandClick) {
      e.preventDefault();
      onBrandClick(product.brand_name);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-container">
        <ImageWithLoader src={getImageUrl(product.image)} alt={product.name} />
      </div>
      <div className="product-info">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "0.4rem",
          }}
        >
          <span className="product-category">SKU: {product.sku}</span>
          {product.manage_stock && product.stock <= 0 ? (
            <span
              style={{
                fontSize: "0.7rem",
                color: "#ff4d4d",
                fontWeight: "800",
                textTransform: "uppercase",
                background: "rgba(255, 77, 77, 0.1)",
                padding: "0.2rem 0.6rem",
                borderRadius: "4px",
              }}
            >
              Agotado
            </span>
          ) : product.brand_name ? (
            <button
              onClick={handleBrandClick}
              className="brand-link-chip"
              style={{
                fontSize: "0.7rem",
                color: "var(--primary)",
                fontWeight: "700",
                textTransform: "uppercase",
                background: "none",
                border: "none",
                cursor: onBrandClick ? "pointer" : "default",
                padding: 0,
              }}
            >
              {product.brand_name}
            </button>
          ) : null}
        </div>
        <h3 className="product-name" title={product.name}>
          {product.name}
        </h3>
        <div className="product-footer">
          <span className="product-price">
            S/{" "}
            {product.main_price.value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            <small
              style={{
                fontSize: "0.7rem",
                color: "var(--text-muted)",
                marginLeft: "0.4rem",
                fontWeight: "normal",
              }}
            >
              / {product.main_price.unit}
            </small>
          </span>
          <ChevronRight size={18} color="var(--primary)" />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
