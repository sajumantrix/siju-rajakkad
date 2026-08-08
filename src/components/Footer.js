"use client";
import Link from "next/link";
import { IconFacebook, IconInstagram, IconEmail } from "./Icons";

const NAV_ITEMS = [
  { label: "About", href: "/#about" },
  { label: "Books", href: "/books" },
  { label: "Awards", href: "/#awards" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer({ author }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">{author.name}</div>
            <div className="footer-brand-sub">{author.tagline}</div>
          </div>
          <nav className="footer-links-group">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="footer-social">
            <a href={author.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <IconFacebook size={16} />
            </a>
            <a href={author.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <IconInstagram size={16} />
            </a>
            <a href={`mailto:${author.email}`} aria-label="Email">
              <IconEmail size={16} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">&copy; {year} {author.name}. All rights reserved.</div>
          <div className="footer-credit">
            Powered by{" "}
            <a href="https://triada.in" target="_blank" rel="noopener noreferrer" className="footer-credit-brand">
              Triada
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
