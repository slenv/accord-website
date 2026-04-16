import { useState } from "react";

const ImageWithLoader = ({
  src,
  alt,
  className = "",
  containerStyle = {},
  imageStyle = {},
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setLoaded(true);
    setError(true);
  };

  // Use the logo icon as fallback
  const finalSrc = error ? "/assets/logo-icon.webp" : src;

  return (
    <div
      className={`image-loader-container ${!loaded ? "shimmer" : ""} ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        ...containerStyle,
      }}
    >
      <img
        src={finalSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: loaded ? (error ? 0.4 : 1) : 0,
          transition: "opacity 0.5s ease-in-out",
          ...imageStyle,
        }}
      />
      {!loaded && (
        <div
          className="shimmer"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};

export default ImageWithLoader;
