import { Link } from "react-router-dom";
import { CONTACTS } from "@/config/contacts";

const DesktopFooter = () => {
  return (
    <footer
      style={{
        background: "#000816",
        borderTop: "1px solid var(--glass-border)",
        padding: "80px 0 40px",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "4rem",
            marginBottom: "4rem",
          }}
        >
          <div id="about">
            <Link
              to="/"
              className="logo"
              style={{
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src="/assets/logo-icon.webp"
                alt="Accord Technology"
                style={{ width: "40px", height: "auto", marginRight: "0.8rem" }}
              />
              <div style={{ color: "white", fontWeight: "bold" }}>
                ACCORD{" "}
                <span style={{ color: "var(--primary)" }}>Technology</span>
              </div>
            </Link>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.95rem",
                lineHeight: "1.8",
              }}
            >
              Proveyendo soluciones tecnológicas de vanguardia para el sector
              empresarial. Especialistas en ingeniería de seguridad, redes y
              soporte técnico.
            </p>
          </div>

          <div id="contact">
            <h4
              style={{
                color: "white",
                marginBottom: "1.5rem",
                fontSize: "1.1rem",
              }}
            >
              Contactos
            </h4>
            <div
              style={{
                color: "var(--text-muted)",
                fontSize: "0.95rem",
                lineHeight: "2",
              }}
            >
              <p>Jr. Alfonso Ugarte N° 588</p>
              <p>Tarapoto, San Martín - Perú</p>
              <div
                style={{
                  marginTop: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                }}
              >
                {CONTACTS.map((c, i) => (
                  <div key={i}>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "0.78rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {c.name}
                    </p>
                    <a
                      href={`https://wa.me/${c.whatsapp}`}
                      style={{
                        color: "var(--primary)",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      {c.number}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4
              style={{
                color: "white",
                marginBottom: "1.5rem",
                fontSize: "1.1rem",
              }}
            >
              Enlaces
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.8rem" }}>
                <Link
                  to="/catalog"
                  style={{
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                >
                  Nuestros Productos
                </Link>
              </li>
              <li style={{ marginBottom: "0.8rem" }}>
                <Link
                  to="/"
                  style={{
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                >
                  Servicios de Ingeniería
                </Link>
              </li>
              <li style={{ marginBottom: "0.8rem" }}>
                <a
                  href="#hero"
                  style={{
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                >
                  Volver al Inicio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--glass-border)",
            paddingTop: "2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
            &copy; {new Date().getFullYear()} Accord Technology. Derechos
            reservados.
          </p>
          <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.85rem" }}>
            <span style={{ color: "var(--text-muted)" }}>
              Desarrollado por Accord Technology.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DesktopFooter;
