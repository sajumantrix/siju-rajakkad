export function buildWhatsAppURL(phoneNumber, bookTitle) {
  const message = `Hi Siju Sir,

I would like to purchase the book "${bookTitle}".

Please let me know the price and payment details.`;

  const encoded = encodeURIComponent(message);
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

export function buildWhatsAppEnquiryURL(phoneNumber, bookTitle) {
  const message = `Hi Siju Sir,

I would like to enquire about the book "${bookTitle}". Is it available or will it be reprinted?`;

  const encoded = encodeURIComponent(message);
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

export function buildWhatsAppAskURL(phoneNumber, bookTitle) {
  const message = `Hi Siju Sir,

I'm interested in the book "${bookTitle}". Could you share more details?`;

  const encoded = encodeURIComponent(message);
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

export function buildWhatsAppContactURL(phoneNumber) {
  const message = `Hi Siju Sir,

I would like to connect with you regarding your literary works.`;

  const encoded = encodeURIComponent(message);
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
