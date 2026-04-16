const MobileFooter = () => {
  return (
    <footer
      style={{
        background: "#000816",
        borderTop: "1px solid var(--glass-border)",
        padding: "2rem 1rem 1rem",
        textAlign: "center",
      }}
    >
      <img
        src="/assets/logo-icon.webp"
        alt="Accord Technology"
        style={{ width: "40px", height: "auto", marginBottom: "1rem" }}
      />
      <div style={{ color: "white", fontWeight: "bold", marginBottom: "1rem" }}>
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
          borderTop: "1px solid rgba(255,255,255,0.1)",
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
