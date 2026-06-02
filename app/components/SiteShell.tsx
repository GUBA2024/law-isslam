"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { NAV_LINKS } from "@/app/lib/site-content";

function socialLinks() {
  return {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? "https://www.facebook.com/",
    linkedIn: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? "https://www.linkedin.com/",
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "https://www.instagram.com/",
  };
}

function FloatingWhatsApp() {
  const phoneRaw = process.env.NEXT_PUBLIC_PHONE ?? "+201000000000";
  const phone = phoneRaw.replace(/[^\d+]/g, "");
  const whatsappHref = `https://wa.me/${phone.replace("+", "")}`;

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="تواصل عبر واتساب"
      className="whatsapp-float"
    >
      واتساب
    </a>
  );
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const links = socialLinks();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <Link href="/" className="text-base font-extrabold text-gold sm:text-lg">
            المستشار إسلام الغرياني
          </Link>
          <nav className="hidden items-center gap-4 text-sm lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition hover:text-gold ${pathname === link.href ? "text-gold" : "text-slate-100/85"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
        <nav className="border-t border-white/10 px-4 py-2 lg:hidden">
          <div className="scrollbar-hide flex gap-3 overflow-x-auto whitespace-nowrap pb-1 text-sm">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full border px-3 py-1.5 ${pathname === link.href ? "border-gold/70 bg-gold/15 text-gold" : "border-white/20 text-slate-200"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="relative overflow-x-hidden">{children}</main>

      <footer className="border-t border-white/10 bg-black/55">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-3">
          <div>
            <h3 className="mb-3 font-bold text-gold">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-bold text-gold">وسائل التواصل الاجتماعي</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href={links.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                  Facebook
                </a>
              </li>
              <li>
                <a href={links.linkedIn} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={links.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-bold text-gold">مكتب المستشار إسلام الغرياني</h3>
            <p className="text-sm leading-7 text-slate-300">
              خدمات قانونية متخصصة في القضايا المدنية والجنائية والأسرية وصياغة العقود والتحكيم.
            </p>
          </div>
        </div>
        <p className="border-t border-white/10 px-6 py-4 text-center text-xs text-slate-400">
          © 2026 المستشار إسلام الغرياني - جميع الحقوق محفوظة
        </p>
      </footer>

      <FloatingWhatsApp />
    </>
  );
}
