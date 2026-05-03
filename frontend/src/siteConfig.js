function normalizePhoneNumber(rawValue) {
  if (typeof rawValue !== 'string') {
    return '';
  }

  return rawValue.replace(/\D/g, '');
}

function normalizeBaseUrl(rawValue) {
  if (typeof rawValue !== 'string') {
    return '';
  }

  const trimmedValue = rawValue.trim().replace(/\/+$/, '');

  if (!trimmedValue) {
    return '';
  }

  return trimmedValue.endsWith('/api') ? trimmedValue.slice(0, -4) : trimmedValue;
}

const whatsappNumber = normalizePhoneNumber(import.meta.env.VITE_WHATSAPP_NUMBER);
const callNumber =
  normalizePhoneNumber(import.meta.env.VITE_CALL_NUMBER) || whatsappNumber;

export const siteConfig = {
  businessName: (import.meta.env.VITE_BUSINESS_NAME || 'VK Power & MK Gold').trim(),
  displayPhone:
    (import.meta.env.VITE_DISPLAY_PHONE || 'Call or WhatsApp for availability').trim(),
  businessLocation:
    (import.meta.env.VITE_BUSINESS_LOCATION || 'Local store and delivery support').trim(),
  whatsappNumber,
  callNumber,
  apiBaseUrl: normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL),
};

export function createApiUrl(path) {
  return siteConfig.apiBaseUrl ? `${siteConfig.apiBaseUrl}${path}` : path;
}

export function createWhatsAppLink(message) {
  if (!siteConfig.whatsappNumber) {
    return '#contact';
  }

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function createPhoneLink() {
  if (!siteConfig.callNumber) {
    return '#contact';
  }

  return `tel:+${siteConfig.callNumber}`;
}
