import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import store from "@/assets/store.png";
import { LINKS } from "@/lib/social";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-rose-soft text-ink">

      {/* ── Desktop footer ── */}
      <div className="hidden sm:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center font-display">F</div>
              <div>
                <div className="font-display text-xl">FNO 🎀</div>
                <div className="text-[10px] tracking-[0.25em] text-muted-foreground">JARIPATKA</div>
              </div>
            </div>
            <p className="text-sm text-ink/70 leading-relaxed">
              Your go-to destination for trendy clothing and accessories in Jaripatka, Nagpur.
            </p>
            <div className="flex gap-3 mt-5">
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="h-9 w-9 rounded-full bg-white flex items-center justify-center hover:bg-rose hover:text-white transition">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href={LINKS.whatsappCommunity} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Community"
                className="h-9 w-9 rounded-full bg-white flex items-center justify-center hover:bg-[#25D366] hover:text-white transition">
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-ink/75">
              {([
                ["/", "Home"],
                ["/shop", "Shop"],
                ["/new-arrivals", "New Arrivals"],
                ["/collections", "Collections"],
                ["/about", "About Us"],
                ["/contact", "Contact Us"],
              ] as [string, string][]).map(([to, l]) => (
                <li key={to}><Link to={to} className="hover:text-rose">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-ink/75">
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <a href={LINKS.googleMaps} target="_blank" rel="noopener noreferrer" className="hover:text-rose">
                  {LINKS.address}
                </a>
              </li>
              <li className="flex gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  <a href={`tel:${LINKS.phone1}`} className="hover:text-rose">{LINKS.phone1}</a>
                  {" / "}
                  <a href={`tel:${LINKS.phone2}`} className="hover:text-rose">{LINKS.phone2}</a>
                </span>
              </li>
              <li className="flex gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <a href={`mailto:${LINKS.email}`} className="hover:text-rose">{LINKS.email}</a>
              </li>
              <li className="flex gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                {LINKS.hours}
              </li>
              <li className="flex gap-2 items-start">
                <span className="mt-0.5">🛍️</span>
                <span className="text-rose font-medium">Only In-Store Pickup Available — No Home Delivery</span>
              </li>
            </ul>
            <a
              href={LINKS.whatsappCommunity}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-[#25D366] text-white text-xs px-4 py-2 rounded-full hover:bg-[#22c55e] transition"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" /> Join our Community
            </a>
          </div>

          {/* Store image */}
          <div>
            <h4 className="font-display text-lg mb-4">Visit Our Store</h4>
            <a href={LINKS.googleMaps} target="_blank" rel="noopener noreferrer">
              <img
                src={store}
                alt="FNO Jaripatka storefront"
                loading="lazy"
                width={400}
                height={260}
                className="rounded-lg w-full h-40 object-cover hover:opacity-90 transition"
              />
              <p className="text-xs text-ink/50 mt-2 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> View on Google Maps →
              </p>
            </a>
          </div>
        </div>

        <div className="border-t border-rose/30">
          <p className="text-center text-xs text-ink/60 py-4">© 2025 FNO Jaripatka. All Rights Reserved.</p>
        </div>
      </div>

      {/* ── Mobile footer ── */}
      <div className="sm:hidden px-4 py-6 flex flex-col items-center gap-4 mb-16">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center font-display text-sm">F</div>
          <div className="font-display text-lg">FNO 🎀 <span className="text-[10px] tracking-widest text-muted-foreground">JARIPATKA</span></div>
        </div>
        <div className="flex gap-3">
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="h-9 w-9 rounded-full bg-white flex items-center justify-center hover:bg-rose hover:text-white transition">
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a href={LINKS.whatsappCommunity} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Community"
            className="h-9 w-9 rounded-full bg-white flex items-center justify-center hover:bg-[#25D366] hover:text-white transition">
            <WhatsAppIcon className="h-4 w-4" />
          </a>
        </div>
        <a
          href={LINKS.whatsappCommunity}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white text-xs px-5 py-2.5 rounded-full hover:bg-[#22c55e] transition"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" /> Join our WhatsApp Community
        </a>
        <p className="text-xs text-ink/50 text-center">© 2025 FNO Jaripatka. All Rights Reserved.</p>
      </div>

    </footer>
  );
}
