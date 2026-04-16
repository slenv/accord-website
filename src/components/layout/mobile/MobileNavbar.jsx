import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ChevronRight } from "lucide-react";
import { CONTACTS } from "@/config/contacts";
import { getWhatsappUrl } from "@/config/contacts";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "65px",
          background: "rgba(0, 8, 22, 0.95)",
          backdropFilter: "blur(15px)",
          borderBottom: "1px solid var(--glass-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.2rem",
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={() => setIsMenuOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              padding: 0,
            }}
          >
            <Menu size={28} />
          </button>

          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
            className="logo"
          >
            <img
              src="/assets/logo-icon.webp"
              alt="Accord"
              style={{ width: "28px", height: "auto", marginRight: "0.4rem" }}
            />
            <div
              style={{
                color: "white",
                fontWeight: "800",
                fontSize: "1.1rem",
                letterSpacing: "0.5px",
              }}
            >
              ACCORD <span>Technology</span>
            </div>
          </Link>
        </div>

        <div>
          <Link to="/catalog" style={{ color: "white", display: "flex" }}>
            <Search size={24} />
          </Link>
        </div>
      </nav>

      {/* Drawer Overlay */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 1050,
          }}
        />
      )}

      {/* Side Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          width: "80%",
          maxWidth: "320px",
          background: "var(--bg-dark)",
          zIndex: 1100,
          transform: isMenuOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isMenuOpen ? "10px 0 30px rgba(0,0,0,0.5)" : "none",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            borderBottom: "1px solid var(--glass-border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <img
              src="/assets/logo-icon.webp"
              alt="Accord"
              style={{ width: "32px" }}
            />
            <span
              style={{ fontWeight: "bold", fontSize: "1.2rem", color: "white" }}
            >
              Menú
            </span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "none",
              color: "white",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 0" }}>
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem 1.5rem",
              color: "white",
              textDecoration: "none",
              fontSize: "1.1rem",
              borderBottom: "1px solid rgba(255,255,255,0.03)",
            }}
          >
            Inicio <ChevronRight size={20} style={{ opacity: 0.3 }} />
          </Link>
          <Link
            to="/catalog"
            onClick={() => setIsMenuOpen(false)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem 1.5rem",
              color: "var(--primary)",
              fontWeight: "bold",
              textDecoration: "none",
              fontSize: "1.1rem",
              borderBottom: "1px solid rgba(255,255,255,0.03)",
            }}
          >
            Catálogo Web <ChevronRight size={20} />
          </Link>

          <div style={{ padding: "2rem 1.5rem 1rem" }}>
            <p
              style={{
                fontSize: "0.8rem",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                letterSpacing: "1px",
                marginBottom: "1rem",
              }}
            >
              Soporte & Ventas
            </p>
            {CONTACTS.map((c, i) => (
              <a
                key={i}
                href={getWhatsappUrl(1)}
                style={{
                  display: "block",
                  background: "rgba(255,255,255,0.03)",
                  padding: "1rem",
                  borderRadius: "12px",
                  marginBottom: "0.8rem",
                  textDecoration: "none",
                  border: "1px solid var(--glass-border)",
                }}
              >
                <strong
                  style={{
                    display: "block",
                    color: "white",
                    marginBottom: "0.2rem",
                  }}
                >
                  {c.name}
                </strong>
                <span style={{ color: "var(--primary)", fontSize: "0.9rem" }}>
                  {c.number}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
