export const WHATSAPP_NUMBER = "59894202011";
export const WHATSAPP_DISPLAY = "+598 94 202 011";
export const CONTACT_EMAIL = "hola@propiadigital.com";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
