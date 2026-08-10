"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMenu, IconX } from "./Icons";

const ALL_NAV_ITEMS = [
  { label: "About", href: "/#about" },
  { label: "Books", href: "/books" },
  { label: "Awards", href: "/#awards" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar({ showAwards = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const NAV_ITEMS = showAwards
    ? ALL_NAV_ITEMS
    : ALL_NAV_ITEMS.filter((item) => item.label !== "Awards");

  const handleLogoClick = (e) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.replaceState(null, "", "/");
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
        <div className="navbar-inner">
          <Link href="/" className="navbar-logo" onClick={handleLogoClick}>
            <img src="/images/navbar.png" alt="Logo" style={{ height: "36px", width: "auto" }} />
            Siju Rajakkad
          </Link>
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <IconX size={20} /> : <IconMenu size={20} />}
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
