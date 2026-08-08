"use client";
import Link from "next/link";
import { IconWhatsapp, IconBook } from "./Icons";
import { buildWhatsAppContactURL } from "@/lib/whatsapp";
import WhatsAppLink from "./WhatsAppLink";

export default function Hero({ author }) {
  const waURL = buildWhatsAppContactURL(author.whatsappNumber);

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-image-wrap">
          <img
            src={author.portrait}
            alt={`Portrait of ${author.name}`}
            className="hero-image"
          />
        </div>
        <div className="hero-text">
          <h1 className="hero-title">{author.name}</h1>
          <p className="hero-subtitle">{author.nameML}</p>
          <p className="hero-desc">
            Award-winning author from Rajakkad, Idukki. Writing stories that breathe life into the landscapes of Kerala and the people who call it home.
          </p>
          <div className="hero-actions">
            <Link href="/books" className="btn btn-primary">
              Explore Books
            </Link>
            <WhatsAppLink href={waURL} className="btn btn-wa-light">
              <IconWhatsapp size={16} />
              WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  );
}
