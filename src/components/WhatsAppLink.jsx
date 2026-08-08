"use client";

// wa.me is a Google-verified Android link: if WhatsApp Business is
// registered as its handler, tapping it opens Business directly with no
// app chooser. Force the personal WhatsApp app via its package name on
// Android; other platforms just follow the plain wa.me href as normal.
function toIntentURL(href) {
  const url = new URL(href);
  const phone = url.pathname.replace(/^\//, "");
  const text = url.searchParams.get("text") || "";
  return `intent://send?phone=${phone}&text=${encodeURIComponent(text)}#Intent;package=com.whatsapp;scheme=https;S.browser_fallback_url=${encodeURIComponent(href)};end`;
}

export default function WhatsAppLink({ href, children, ...props }) {
  const handleClick = (e) => {
    if (typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent)) {
      e.preventDefault();
      window.location.href = toIntentURL(href);
    }
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
