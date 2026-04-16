import { useRouteError, Link, isRouteErrorResponse } from "react-router-dom";
import { Home, RefreshCcw, AlertTriangle, Ghost } from "lucide-react";
import "./ErrorPage.css";

const ErrorPage = () => {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="error-page-container">
      <div className="error-content">
        <div className="error-icon-wrapper">
          {is404 ? (
            <Ghost size={80} className="error-icon ghost-animate" />
          ) : (
            <AlertTriangle size={80} className="error-icon alert-animate" />
          )}
        </div>

        <h1 className="error-title">
          {is404 ? "¡Página No Encontrada!" : "¡Algo salió mal!"}
        </h1>
        
        <p className="error-message">
          {is404 
            ? "Lo sentimos, la página que buscas no existe o ha sido movida." 
            : "Ha ocurrido un error inesperado. Nuestro equipo técnico ha sido notificado."}
        </p>

        {(!is404 && error?.message) && (
          <div className="error-details">
            <code>{error.message}</code>
          </div>
        )}

        <div className="error-actions">
          <Link to="/" className="btn-primary">
            <Home size={18} /> Volver al Inicio
          </Link>
          {!is404 && (
            <button 
              className="btn-secondary" 
              onClick={() => window.location.reload()}
            >
              <RefreshCcw size={18} /> Reintentar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
