export const setSEO = (title, description, image = null) => {
  const defaultTitle = "Accord Technology - Soluciones Tecnológicas y Seguridad Electrónica";
  const newTitle = title ? `${title} | Accord Technology` : defaultTitle;
  
  // Update Title
  document.title = newTitle;
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', newTitle);
  document.querySelector('meta[property="twitter:title"]')?.setAttribute('content', newTitle);

  // Update Description
  if (description) {
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="twitter:description"]')?.setAttribute('content', description);
  }

  // Update Image (if provided)
  if (image) {
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', image);
    document.querySelector('meta[property="twitter:image"]')?.setAttribute('content', image);
  } else {
    // Reset to default
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', '/assets/logo-icon.webp');
    document.querySelector('meta[property="twitter:image"]')?.setAttribute('content', '/assets/logo-icon.webp');
  }
};
