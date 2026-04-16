export const CONTACTS = [
  {
    name: "Ventas",
    number: "+51 945 256 814",
    whatsapp: "51945256814",
    description: "Cotizaciones y pedidos",
  },
  {
    name: "Consultoría Técnica",
    number: "+51 988 306 795",
    whatsapp: "51988306795",
    description: "Soporte y proyectos",
  },
];

/**
 * Retorna la URL de WhatsApp (primer contacto por defecto).
 * @param {string} message - Mensaje pre-cargado opcional.
 */
export const getWhatsappUrl = (contactIndex = 0, message = "") => {
  const contact = CONTACTS[contactIndex];
  const base = `https://wa.me/${contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};
