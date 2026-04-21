import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const DesktopNavbar = () => {
  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link
          to="/"
          className="logo"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src="/assets/logo-icon.webp"
            alt="Accord Technology"
            style={{ width: "32px", height: "auto", marginRight: "0.6rem" }}
          />
          <div>
            ACCORD <span>Technology</span>
          </div>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div className="nav-links">
            <Link to="/">Inicio</Link>
            <Link to="/catalog">Catálogo</Link>
            <a href="#about">Nosotros</a>
            <a href="#contact">Contacto</a>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavbar;
