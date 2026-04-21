export const setSEO = (title, description, image = null, type = "website") => {
  const defaultTitle = "Accord Technology - Soluciones Tecnológicas y Seguridad Electrónica";
  const newTitle = title ? `${title} | Accord Technology` : defaultTitle;
  const siteUrl = import.meta.env.VITE_APP_URL;
  
  // Update Title
  document.title = newTitle;
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', newTitle);
  document.querySelector('meta[property="twitter:title"]')?.setAttribute('content', newTitle);
  document.querySelector('meta[property="og:type"]')?.setAttribute('content', type);

  // Update Canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', window.location.href);

  // Update Description
  if (description) {
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="twitter:description"]')?.setAttribute('content', description);
  }

  // Update Image (if provided)
  if (image) {
    const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', fullImageUrl);
    document.querySelector('meta[property="twitter:image"]')?.setAttribute('content', fullImageUrl);
  } else {
    // Reset to default
    const defaultImage = `${siteUrl}/assets/logo-icon.webp`;
    document.querySelector('meta[property="og:image"]')?.setAttribute('content', defaultImage);
    document.querySelector('meta[property="twitter:image"]')?.setAttribute('content', defaultImage);
  }
};

/**
 * Injects Schema.org JSON-LD for Product
 */
export const setProductSchema = (product) => {
  if (!product) return;

  const scriptId = 'product-schema-jsonld';
  let script = document.getElementById(scriptId);
  
  if (!script) {
    script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const mainPrice = product.units?.find(u => u.is_main) || product.units?.[0];

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image ? [`${import.meta.env.VITE_IMAGE_BASE_URL}/${product.image}`] : [],
    "description": product.description,
    "sku": product.sku,
    "brand": {
      "@type": "Brand",
      "name": product.brand_name || "Accord Technology"
    },
    "offers": {
      "@type": "Offer",
      "url": window.location.href,
      "priceCurrency": "PEN",
      "price": mainPrice?.price || 0,
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };

  script.text = JSON.stringify(jsonLd);
};
