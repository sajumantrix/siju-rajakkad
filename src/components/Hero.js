"use client";
import Link from "next/link";
import { IconWhatsapp, IconBook } from "./Icons";
import { buildWhatsAppContactURL } from "@/lib/whatsapp";

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
            <a href={waURL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <IconWhatsapp size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="scroll-cue">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
        Scroll
      </div>
    </section>
  );
}
