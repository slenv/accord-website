import { useLocation } from "react-router-dom";

const MobileFooter = () => {
  const location = useLocation();
  const isProductPage = location.pathname.includes("/product/");

  return (
    <footer
      style={{
        background: "var(--bg-page)",
        borderTop: "1px solid var(--border-main)",
        padding: "2rem 1rem",
        paddingBottom: isProductPage
          ? "calc(100px + env(safe-area-inset-bottom))"
          : "2rem",
        textAlign: "center",
      }}
    >
      <img
        src="/assets/logo-icon.webp"
        alt="Accord Technology"
        style={{ width: "40px", height: "auto", marginBottom: "1rem" }}
      />
      <div style={{ color: "var(--text-main)", fontWeight: "bold", marginBottom: "1rem" }}>
        ACCORD <span style={{ color: "var(--primary)" }}>Technology</span>
      </div>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "0.85rem",
          marginBottom: "2rem",
        }}
      >
        Proveyendo soluciones tecnológicas de vanguardia para el sector
        empresarial.
      </p>
      <div
        style={{
          color: "var(--text-muted)",
          fontSize: "0.75rem",
          borderTop: "1px solid rgba(0,0,0,0.05)",
          paddingTop: "1rem",
        }}
      >
        &copy; {new Date().getFullYear()} Accord Technology. Derechos
        reservados.
      </div>
    </footer>
  );
};

export default MobileFooter;
