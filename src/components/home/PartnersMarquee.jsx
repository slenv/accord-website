import { Link } from "react-router-dom";

const brandElements = (
  <>
    <Link
      to="/catalog?search=DAHUA"
      className="brand-item"
      style={{ textDecoration: "none" }}
    >
      <span className="brand-name" style={{ letterSpacing: "0.02em" }}>
        DAHUA
      </span>
      <span className="brand-badge">Partner Oficial</span>
    </Link>
    <Link
      to="/catalog?search=HIKVISION"
      className="brand-item"
      style={{ textDecoration: "none" }}
    >
      <span
        className="brand-name"
        style={{
          fontWeight: "900",
          fontStyle: "italic",
          paddingRight: "0.1em",
        }}
      >
        HIKVISION
      </span>
      <span className="brand-badge">Partner Oficial</span>
    </Link>
    <Link
      to="/catalog?search=IMOU"
      className="brand-item"
      style={{ textDecoration: "none" }}
    >
      <span
        className="brand-name"
        style={{ textTransform: "lowercase", fontSize: "2.8rem" }}
      >
        imou
      </span>
    </Link>
    <Link
      to="/catalog?search=UBIQUITI"
      className="brand-item"
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span className="brand-name">UBIQUITI</span>
    </Link>
    <Link
      to="/catalog?search=ZKTECO"
      className="brand-item"
      style={{ textDecoration: "none" }}
    >
      <span className="brand-name">
        ZKT<span style={{ fontWeight: "300" }}>eco</span>
      </span>
    </Link>
    <Link
      to="/catalog?search=DIXON"
      className="brand-item"
      style={{ textDecoration: "none" }}
    >
      <span className="brand-name" style={{ letterSpacing: "0.05em" }}>
        DIXON
      </span>
    </Link>
    <Link
      to="/catalog?search=SATRA"
      className="brand-item"
      style={{ textDecoration: "none" }}
    >
      <span className="brand-name" style={{ letterSpacing: "0.05em" }}>
        SATRA
      </span>
    </Link>
    <Link
      to="/catalog?search=OPALUX"
      className="brand-item"
      style={{ textDecoration: "none" }}
    >
      <span
        className="brand-name"
        style={{ letterSpacing: "0.05em", fontStyle: "italic" }}
      >
        OPALUX
      </span>
    </Link>
  </>
);

const PartnersMarquee = () => {
  return (
    <section className="partners-section">
      <h3 className="partners-title">
        Socios Oficiales y Marcas Especializadas
      </h3>
      <div className="marquee-container">
        <div className="marquee-track">
          <div className="marquee-content">{brandElements}</div>
          <div className="marquee-content" aria-hidden="true">
            {brandElements}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersMarquee;
