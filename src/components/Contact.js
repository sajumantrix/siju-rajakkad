"use client";
import { IconPhone, IconEmail, IconWhatsapp, IconFacebook, IconInstagram } from "./Icons";
import { buildWhatsAppContactURL } from "@/lib/whatsapp";
import WhatsAppLink from "./WhatsAppLink";

export default function Contact({ author }) {
  const waURL = buildWhatsAppContactURL(author.whatsappNumber);

  const contacts = [
    { icon: IconPhone, label: "Phone", value: author.phone, href: `tel:${author.phone.replace(/\s/g, "")}`, isWA: false },
    { icon: IconEmail, label: "Email", value: author.email, href: `mailto:${author.email}`, isWA: false },
    { icon: IconWhatsapp, label: "WhatsApp", value: "Send a message", href: waURL, isWA: true },
    { icon: IconFacebook, label: "Facebook", value: "Follow on Facebook", href: author.facebook, isWA: false },
    { icon: IconInstagram, label: "Instagram", value: "Follow on Instagram", href: author.instagram, isWA: false },
  ];

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Contact</div>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-sub">Connect with Siju Rajakkad directly</p>
        </div>
        <div className="contact-grid">
          {contacts.map((c, i) => {
            const Icon = c.icon;
            const className = `contact-tile animate-on-scroll stagger-${(i % 4) + 1}${c.isWA ? " wa-tile" : ""}`;
            const inner = (
              <>
                <div className="contact-tile-icon"><Icon size={18} /></div>
                <div className="contact-tile-label">{c.label}</div>
                <div className="contact-tile-value">{c.value}</div>
              </>
            );
            if (c.isWA) {
              return (
                <WhatsAppLink key={i} href={c.href} className={className}>
                  {inner}
                </WhatsAppLink>
              );
            }
            return (
              <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className={className}>
                {inner}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
