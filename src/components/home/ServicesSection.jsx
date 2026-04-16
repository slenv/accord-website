import { Shield, Zap, Wrench } from "lucide-react";

const ServicesSection = () => {
  return (
    <section
      className="services-section"
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        padding: "100px 0",
        borderTop: "1px solid var(--glass-border)",
      }}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Servicios de Ingeniería
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Apoyo técnico especializado para garantizar la continuidad de sus
            operaciones.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "3rem 2rem",
              background: "var(--bg-dark)",
              border: "1px solid var(--glass-border)",
              borderRadius: "32px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "rgba(170, 59, 255, 0.1)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <Shield size={32} color="var(--primary)" />
            </div>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>
              Seguridad CCTV
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.95rem",
                lineHeight: "1.7",
              }}
            >
              Implementación de sistemas inteligentes de videovigilancia con
              analítica avanzada y monitoreo centralizado.
            </p>
          </div>

          <div
            style={{
              textAlign: "center",
              padding: "3rem 2rem",
              background: "var(--bg-dark)",
              border: "1px solid var(--glass-border)",
              borderRadius: "32px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "rgba(170, 59, 255, 0.1)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <Zap size={32} color="var(--primary)" />
            </div>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>
              Networking
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.95rem",
                lineHeight: "1.7",
              }}
            >
              Diseño y tendido de redes de datos Gigabit, conectividad
              inalámbrica industrial y enlaces punto a punto.
            </p>
          </div>

          <div
            style={{
              textAlign: "center",
              padding: "3rem 2rem",
              background: "var(--bg-dark)",
              border: "1px solid var(--glass-border)",
              borderRadius: "32px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "rgba(170, 59, 255, 0.1)",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <Wrench size={32} color="var(--primary)" />
            </div>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.4rem" }}>
              Soporte Técnico
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.95rem",
                lineHeight: "1.7",
              }}
            >
              Mantenimiento preventivo y correctivo de servidores, workstations
              y periféricos de alta gama.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
