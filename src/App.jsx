import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const tokens = {
  primary: "#1B3A5C",
  primaryDark: "#122840",
  accent: "#C9A84C",
  accentDark: "#B8933E",
  accentLight: "#F7F2E8",
  surface: "#F5F4F0",
  white: "#FFFFFF",
  dark: "#1a1a1a",
  mid: "#4a4a4a",
  border: "#DDD9D0",
  cardBg: "#FFFFFF",
};

// ─── INJECT FONTS ────────────────────────────────────────────────────────────
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@300;400;500;600;700&display=swap";
document.head.appendChild(fontLink);

// ─── PORTFOLIO STYLES ─────────────────────────────────────────────────────────
const portfolioStyles = [
  {
    id: "professional",
    label: "Professional Services",
    tier: "Tier 2",
    tierColor: "#4F6EF7",
    bestFor: "Law, Finance, Insurance",
    price: 599,
    accent: "#1B3A5C",
    accentLight: "#EEF2F8",
    description: "Authoritative, trust-forward design built for credibility.",
    preview: {
      bg: "#1B3A5C",
      text: "#FFFFFF",
      cardBg: "#FFFFFF",
      cardText: "#1B3A5C",
      accentColor: "#C9A84C",
      sectionBg: "#f5f5f0",
      font: "Playfair Display",
    },
    realSite: "Alexander Insurance Group",
    tag: "Real Client",
    screenshot: "screenshots/alexander-insurance.png",
  },
  {
    id: "warm",
    label: "Warm & Inviting",
    tier: "Tier 3",
    tierColor: "#10B981",
    bestFor: "Healthcare, Therapy, Education",
    price: 1499,
    accent: "#7A94CB",
    accentLight: "#EEF1FA",
    description: "Soft, welcoming design with booking & payment built in.",
    preview: {
      bg: "#7A94CB",
      text: "#FFFFFF",
      cardBg: "#FFFFFF",
      cardText: "#4A6399",
      accentColor: "#7A94CB",
      sectionBg: "#EEF1FA",
      font: "Lora",
    },
    realSite: "Toys for Talking",
    tag: "Real Client",
    screenshot: "screenshots/toys-for-talking.png",
  },
  {
    id: "personal",
    label: "Personal Brand",
    tier: "Tier 2",
    tierColor: "#4F6EF7",
    bestFor: "Coaches, Speakers, Freelancers",
    price: 599,
    accent: "#C75B3A",
    accentLight: "#FDF1EC",
    description: "Bold, personality-first single-page site. Your story, loud.",
    preview: {
      bg: "#111111",
      text: "#FFFFFF",
      cardBg: "#1A1A1A",
      cardText: "#FFFFFF",
      accentColor: "#C75B3A",
      sectionBg: "#f9f7f5",
      font: "Playfair Display",
    },
    realSite: "Lionheart & Soul",
    tag: "Real Client",
    screenshot: "screenshots/lionheart-soul.png",
  },
  {
    id: "storefront",
    label: "Local Business",
    tier: "Tier 1–2",
    tierColor: "#F59E0B",
    bestFor: "Bakeries, Salons, Boutiques, Gyms",
    price: 299,
    accent: "#8B5E3C",
    accentLight: "#FDF5EE",
    description: "Warm, neighborhood feel. Hours, location, menu — front and center.",
    preview: {
      bg: "#8B5E3C",
      text: "#FFFFFF",
      cardBg: "#FFFFFF",
      cardText: "#2a1f1a",
      accentColor: "#E8C99A",
      sectionBg: "#fdf8f3",
      font: "Playfair Display",
    },
    realSite: null,
    tag: "Mockup",
  },
  {
    id: "agency",
    label: "Creative Agency",
    tier: "Tier 2–3",
    tierColor: "#10B981",
    bestFor: "Photographers, Designers, Studios",
    price: 599,
    accent: "#E8F060",
    accentLight: "#FAFCE8",
    description: "Dark, editorial, portfolio-led. Work speaks first.",
    preview: {
      bg: "#0d0d0d",
      text: "#FFFFFF",
      cardBg: "#161616",
      cardText: "#FFFFFF",
      accentColor: "#E8F060",
      sectionBg: "#111111",
      font: "Inter",
    },
    realSite: null,
    tag: "Mockup",
  },
  {
    id: "saas",
    label: "SaaS / Platform",
    tier: "Tier 4",
    tierColor: "#EF4444",
    bestFor: "Courses, Communities, Memberships",
    price: 3499,
    accent: "#4F6EF7",
    accentLight: "#EEF1FE",
    description: "Pricing tables, auth, member dashboards — the full stack.",
    preview: {
      bg: "#4F6EF7",
      text: "#FFFFFF",
      cardBg: "#FFFFFF",
      cardText: "#0f172a",
      accentColor: "#4F6EF7",
      sectionBg: "#f8fafc",
      font: "Inter",
    },
    realSite: null,
    tag: "Mockup",
  },
];

// ─── PRICING TIERS ───────────────────────────────────────────────────────────
const tiers = [
  {
    id: 1, name: "Static", price: 299,
    description: "Clean, professional presence with no integrations.",
    features: ["Up to 6 sections", "Mobile responsive", "Domain + 1yr hosting", "SEO meta tags", "SVG favicon", "Netlify deployment"],
    notIncluded: ["Contact form", "Payment processing", "User accounts"],
    accent: "#F59E0B", popular: false,
  },
  {
    id: 2, name: "Contact", price: 599,
    description: "Everything in Static plus a working email contact form.",
    features: ["Everything in Static", "Email contact form", "Form validation", "Success/error states", "Auto-reply email setup", "EmailJS integration"],
    notIncluded: ["Payment processing", "User accounts"],
    accent: "#4F6EF7", popular: false,
  },
  {
    id: 3, name: "Commerce", price: 1499,
    description: "Accept payments, deposits, or bookings directly on your site.",
    features: ["Everything in Contact", "Stripe payment integration", "Service booking/deposits", "Product checkout", "Secure Netlify functions", "Payment confirmation emails"],
    notIncluded: ["User accounts"],
    accent: "#10B981", popular: true,
  },
  {
    id: 4, name: "Platform", price: 3499,
    description: "Full member portal with accounts, auth, and gated content.",
    features: ["Everything in Commerce", "User sign up + login", "Member dashboard", "Gated content / courses", "Subscription billing", "Stripe Customer Portal"],
    notIncluded: [],
    accent: "#EF4444", popular: false,
  },
];

// ─── MINI SITE PREVIEW ────────────────────────────────────────────────────────
function SitePreview({ style }) {
  const p = style.preview;
  const darkNav = style.id === "personal" || style.id === "agency";
  const btnTextColor = style.id === "agency" ? "#000" : "#fff";

  return (
    <div style={{ width: "100%", height: "100%", borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <div style={{
        background: darkNav ? p.bg : "#fff",
        borderBottom: `1px solid ${darkNav ? "rgba(255,255,255,0.08)" : "#e8e8e8"}`,
        padding: "5px 10px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 14, height: 14, borderRadius: 3, background: p.accentColor }} />
          <div style={{ width: 30, height: 4, borderRadius: 2, background: darkNav ? "rgba(255,255,255,0.65)" : p.bg, opacity: 0.75 }} />
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {[1, 2, 3].map(i => <div key={i} style={{ width: 16, height: 3, borderRadius: 1, background: darkNav ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.18)" }} />)}
          <div style={{ background: p.accentColor, borderRadius: 3, padding: "2px 6px" }}>
            <div style={{ width: 14, height: 3, borderRadius: 1, background: btnTextColor, opacity: 0.9 }} />
          </div>
        </div>
      </div>

      {/* Hero — dominant colour block */}
      <div style={{ background: p.bg, flex: "0 0 52%", padding: "10px 10px 8px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ width: "36%", height: 3, borderRadius: 1, background: p.accentColor, marginBottom: 5, opacity: 0.9 }} />
        <div style={{ width: "88%", height: 7, borderRadius: 2, background: p.text, marginBottom: 3, opacity: 0.95 }} />
        <div style={{ width: "65%", height: 7, borderRadius: 2, background: p.accentColor, marginBottom: 7, opacity: 0.85 }} />
        <div style={{ width: "72%", height: 3, borderRadius: 1, background: p.text, marginBottom: 2, opacity: 0.5 }} />
        <div style={{ width: "55%", height: 3, borderRadius: 1, background: p.text, marginBottom: 8, opacity: 0.4 }} />
        <div style={{ display: "flex", gap: 5 }}>
          <div style={{ background: p.accentColor, borderRadius: 3, padding: "3px 8px" }}>
            <div style={{ width: 20, height: 3, borderRadius: 1, background: btnTextColor, opacity: 0.9 }} />
          </div>
          <div style={{ border: "1px solid rgba(255,255,255,0.45)", borderRadius: 3, padding: "3px 8px" }}>
            <div style={{ width: 20, height: 3, borderRadius: 1, background: "#fff", opacity: 0.55 }} />
          </div>
        </div>
      </div>

      {/* Services strip */}
      <div style={{ flex: 1, background: p.sectionBg, padding: "7px 10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, height: "100%" }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ background: p.cardBg, border: `1px solid ${darkNav ? "#2a2a2a" : "#e5e5e5"}`, borderRadius: 4, padding: "5px 4px" }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: p.accentColor, marginBottom: 4, opacity: 0.8 }} />
              <div style={{ width: "80%", height: 3, borderRadius: 1, background: p.cardText, opacity: 0.75, marginBottom: 3 }} />
              <div style={{ width: "60%", height: 2, borderRadius: 1, background: p.cardText, opacity: 0.3 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ height: 13, background: p.bg, flexShrink: 0 }} />
    </div>
  );
}

// ─── PORTFOLIO CARD ───────────────────────────────────────────────────────────
function PortfolioCard({ style, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onSelect(style)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: tokens.white,
        borderRadius: 16,
        overflow: "hidden",
        border: selected ? `2px solid ${style.accent}` : `1px solid ${tokens.border}`,
        cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.10)" : selected ? `0 0 0 4px ${style.accent}22` : "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ height: 200, padding: 12, background: "#F0EDE8", position: "relative" }}>
        <div style={{ height: "100%", borderRadius: 8, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
          {style.screenshot ? (
            <img
              src={`${import.meta.env.BASE_URL}${style.screenshot}`}
              alt={style.label}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
            />
          ) : (
            <SitePreview style={style} />
          )}
        </div>
        <div style={{
          position: "absolute", top: 20, right: 20,
          background: style.tag === "Real Client" ? "#10B981" : "#6366F1",
          color: "#fff", fontSize: 9, fontWeight: 700,
          padding: "3px 8px", borderRadius: 50, letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}>
          {style.tag}
        </div>
      </div>

      <div style={{ padding: "16px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: tokens.primary, fontFamily: "'Playfair Display', Georgia, serif" }}>
            {style.label}
          </h3>
          <span style={{
            background: style.tierColor + "18", color: style.tierColor,
            fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 50,
            letterSpacing: "0.04em",
          }}>
            {style.tier}
          </span>
        </div>

        {style.realSite && (
          <p style={{ margin: "0 0 6px", fontSize: 11, color: "#10B981", fontWeight: 600 }}>
            ✦ Based on {style.realSite}
          </p>
        )}

        <p style={{ margin: "0 0 10px", fontSize: 12, color: tokens.mid, lineHeight: 1.5 }}>
          {style.description}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, color: tokens.mid }}>
            <span style={{ fontWeight: 600, color: "#5C5C7A" }}>Best for:</span> {style.bestFor}
          </span>
          <span style={{ fontSize: 15, fontWeight: 800, color: tokens.primary }}>
            ${style.price.toLocaleString()}
          </span>
        </div>

        <button style={{
          marginTop: 14, width: "100%",
          background: selected ? style.accent : "transparent",
          color: selected ? "#fff" : style.accent,
          border: `2px solid ${style.accent}`,
          borderRadius: 8, padding: "9px 0",
          fontSize: 13, fontWeight: 700, cursor: "pointer",
          transition: "all 0.2s ease",
        }}>
          {selected ? "✓ Selected" : "Choose This Style"}
        </button>
      </div>
    </div>
  );
}

// ─── PRICING CARD ─────────────────────────────────────────────────────────────
function PricingCard({ tier }) {
  return (
    <div style={{
      background: tier.popular ? tokens.primary : tokens.white,
      border: tier.popular ? "none" : `1px solid ${tokens.border}`,
      borderRadius: 16, padding: "28px 24px",
      position: "relative",
      boxShadow: tier.popular ? "0 20px 60px rgba(26,26,46,0.25)" : "0 2px 8px rgba(0,0,0,0.04)",
      transform: tier.popular ? "scale(1.03)" : "none",
    }}>
      {tier.popular && (
        <div style={{
          position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
          background: tokens.accent, color: "#1a0a00",
          fontSize: 10, fontWeight: 800, padding: "4px 14px",
          borderRadius: 50, letterSpacing: "0.08em", textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}>
          Most Popular
        </div>
      )}

      <div style={{
        display: "inline-block", background: tier.accent + "22",
        color: tier.accent, fontSize: 11, fontWeight: 700,
        padding: "3px 10px", borderRadius: 50, marginBottom: 12, letterSpacing: "0.04em",
      }}>
        Tier {tier.id} — {tier.name}
      </div>

      <div style={{ marginBottom: 12 }}>
        <span style={{ fontSize: 36, fontWeight: 900, color: tier.popular ? "#fff" : tokens.primary, fontFamily: "'Georgia', serif" }}>
          ${tier.price.toLocaleString()}
        </span>
        <span style={{ fontSize: 13, color: tier.popular ? "rgba(255,255,255,0.6)" : tokens.mid, marginLeft: 4 }}>
          one-time
        </span>
      </div>

      <p style={{ fontSize: 13, color: tier.popular ? "rgba(255,255,255,0.75)" : tokens.mid, marginBottom: 18, lineHeight: 1.5 }}>
        {tier.description}
      </p>

      <div style={{ marginBottom: 20 }}>
        {tier.features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
            <span style={{ color: tier.accent, fontSize: 14, marginTop: 1, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 12, color: tier.popular ? "rgba(255,255,255,0.85)" : tokens.dark, lineHeight: 1.4 }}>{f}</span>
          </div>
        ))}
        {tier.notIncluded.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
            <span style={{ color: "rgba(128,128,128,0.5)", fontSize: 14, marginTop: 1, flexShrink: 0 }}>–</span>
            <span style={{ fontSize: 12, color: "rgba(128,128,128,0.5)", lineHeight: 1.4 }}>{f}</span>
          </div>
        ))}
      </div>

      <button style={{
        width: "100%", padding: "12px 0",
        background: tier.popular ? tokens.accent : "transparent",
        color: tier.popular ? "#1a0a00" : tier.accent,
        border: `2px solid ${tier.popular ? tokens.accent : tier.accent}`,
        borderRadius: 10, fontSize: 14, fontWeight: 800, cursor: "pointer",
      }}>
        Get Started
      </button>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif", background: tokens.surface, color: tokens.dark, minHeight: "100vh" }}>

      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "#FFFFFF",
        borderBottom: `1px solid ${tokens.border}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        padding: "0 32px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: tokens.accent,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 900, fontFamily: "'Playfair Display', Georgia, serif" }}>J</span>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: tokens.primary, lineHeight: 1.1, fontFamily: "'Playfair Display', Georgia, serif" }}>Web Studio</div>
              <div style={{ fontSize: 10, color: tokens.mid, letterSpacing: "0.06em", fontFamily: "sans-serif", textTransform: "uppercase" }}>by Justin</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {[["Work", "portfolio"], ["Pricing", "pricing"], ["About", "about"], ["Contact", "contact"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 600,
                color: tokens.mid,
                fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "0.01em",
              }}>
                {label}
              </button>
            ))}
            <button onClick={() => scrollTo("portfolio")} style={{
              background: tokens.accent, border: "none", borderRadius: 8,
              padding: "9px 20px", fontSize: 13, fontWeight: 800,
              color: "#FFFFFF", cursor: "pointer", letterSpacing: "0.01em",
              fontFamily: "sans-serif",
            }}>
              Get Started →
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section id="hero" style={{
        minHeight: "60vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}>
        {/* Background photo */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url('${import.meta.env.BASE_URL}ChatGPT%20Image%20May%2021%2C%202026%2C%2009_10_03%20PM.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }} />

        {/* Gradient overlay: solid navy left → transparent right */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to right,
            rgba(18,40,64,0.93) 0%,
            rgba(18,40,64,0.88) 35%,
            rgba(27,58,92,0.55) 58%,
            rgba(18,40,64,0.08) 80%,
            transparent 100%)`,
        }} />

        {/* Subtle bottom vignette */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 160,
          background: "linear-gradient(to top, rgba(18,40,64,0.5) 0%, transparent 100%)",
        }} />

        {/* Content — left-aligned */}
        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 1200, margin: "0 auto",
          padding: "64px 32px 64px",
          width: "100%",
        }}>
          <div style={{ maxWidth: 580 }}>
            <h1 style={{
              fontSize: "clamp(2.6rem, 5vw, 4rem)", fontWeight: 800,
              color: "#FFFFFF", lineHeight: 1.1, marginBottom: 22,
              letterSpacing: "-0.02em", fontFamily: "'Playfair Display', Georgia, serif",
            }}>
              A website that works<br />
              as hard{" "}
              <span style={{ color: tokens.accent }}>as you do.</span>
            </h1>

            <p style={{
              fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.7,
              marginBottom: 40, fontFamily: "sans-serif", fontWeight: 400,
              maxWidth: 480,
            }}>
              Handcrafted websites with your brand, your domain, and your voice —
              delivered fast, priced honestly, no agency overhead.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("portfolio")} style={{
                background: tokens.accent, border: "none", borderRadius: 10,
                padding: "14px 32px", fontSize: 15, fontWeight: 800,
                color: "#1a0a00", cursor: "pointer", fontFamily: "sans-serif",
                boxShadow: "0 4px 20px rgba(201,168,76,0.35)",
              }}>
                Browse Styles →
              </button>
              <button onClick={() => scrollTo("pricing")} style={{
                background: "transparent", border: "2px solid rgba(255,255,255,0.35)",
                borderRadius: 10, padding: "14px 32px", fontSize: 15, fontWeight: 700,
                color: "rgba(255,255,255,0.88)", cursor: "pointer", fontFamily: "sans-serif",
              }}>
                See Pricing
              </button>
            </div>

            {/* Divider */}
            <div style={{ width: 48, height: 1, background: "rgba(201,168,76,0.4)", margin: "44px 0 36px" }} />

            {/* Stats row */}
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              {[["6", "Site Styles"], ["48hr", "Avg Turnaround"], ["100%", "Custom Code"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: tokens.accent, fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "sans-serif", letterSpacing: "0.07em", marginTop: 4, textTransform: "uppercase" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 32px", background: tokens.white }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: tokens.accent, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 10 }}>
              THE PROCESS
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: tokens.primary, margin: 0 }}>
              From idea to live site in days
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            {[
              { n: "01", title: "Pick a Style", desc: "Browse real client sites and mockup styles. Choose the look that fits your brand." },
              { n: "02", title: "Create Account", desc: "Sign up, choose your pricing tier, and pay securely through Stripe." },
              { n: "03", title: "Share Your Vision", desc: "Fill out the intake form, upload your logo and photos, describe your goals." },
              { n: "04", title: "Go Live", desc: "Get a preview mockup, then receive your custom site on your own domain." },
            ].map((step) => (
              <div key={step.n} style={{ padding: "28px 24px", borderRadius: 14, background: "#FFFFFF", border: `1px solid ${tokens.border}` }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: tokens.accent, lineHeight: 1, marginBottom: 14, fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {step.n}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: tokens.primary, marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 13, color: tokens.mid, lineHeight: 1.55, margin: 0, fontFamily: "sans-serif" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ────────────────────────────────────────────────────── */}
      <section id="portfolio" style={{ padding: "80px 32px", background: "#F8F9FA" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: tokens.accent, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 10 }}>
              PORTFOLIO
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: tokens.primary, margin: "0 0 12px" }}>
              Choose your style
            </h2>
            <p style={{ fontSize: 14, color: tokens.mid, margin: 0, fontFamily: "sans-serif" }}>
              3 real client sites + 3 curated mockup styles. Starting prices shown.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {portfolioStyles.map(style => (
              <PortfolioCard
                key={style.id}
                style={style}
                selected={selectedStyle?.id === style.id}
                onSelect={setSelectedStyle}
              />
            ))}
          </div>

          {selectedStyle && (
            <div style={{
              marginTop: 32, padding: "20px 28px",
              background: tokens.primary, borderRadius: 14,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: 16,
            }}>
              <div>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "sans-serif" }}>Selected style:</p>
                <p style={{ margin: "2px 0 0", color: "#fff", fontSize: 17, fontWeight: 700 }}>{selectedStyle.label} — starting at ${selectedStyle.price.toLocaleString()}</p>
              </div>
              <button onClick={() => scrollTo("contact")} style={{
                background: tokens.accent, border: "none", borderRadius: 10,
                padding: "12px 28px", fontSize: 14, fontWeight: 800,
                color: "#1a0a00", cursor: "pointer", fontFamily: "sans-serif",
                whiteSpace: "nowrap",
              }}>
                Get Started with This Style →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section id="pricing" style={{ padding: "80px 32px", background: tokens.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: tokens.accent, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 10 }}>
              PRICING
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: tokens.primary, margin: "0 0 12px" }}>
              Transparent, complexity-based pricing
            </h2>
            <p style={{ fontSize: 14, color: tokens.mid, margin: "0 auto", maxWidth: 500, fontFamily: "sans-serif", lineHeight: 1.6 }}>
              Pay for what you need. Every tier includes domain registration, one year of hosting, and a handcrafted custom site — no templates.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, alignItems: "start" }}>
            {tiers.map(tier => <PricingCard key={tier.id} tier={tier} />)}
          </div>

          <div style={{
            marginTop: 32, padding: "24px 32px",
            background: tokens.accentLight,
            border: `1px solid ${tokens.border}`, borderRadius: 14,
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
          }}>
            <div>
              <h3 style={{ margin: "0 0 6px", fontSize: 17, fontWeight: 700, color: tokens.primary }}>
                Ongoing Maintenance — $49/mo
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: tokens.mid, fontFamily: "sans-serif", lineHeight: 1.5 }}>
                Hosting management · 1–2 content edits per month · Priority support · Works with any tier
              </p>
            </div>
            <button onClick={() => scrollTo("contact")} style={{
              background: "transparent", border: `2px solid ${tokens.primary}`,
              borderRadius: 10, padding: "10px 24px", fontSize: 13, fontWeight: 700,
              color: tokens.primary, cursor: "pointer", fontFamily: "sans-serif", whiteSpace: "nowrap",
            }}>
              Add to My Project
            </button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: "80px 32px", background: "#F8F9FA" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: tokens.accent, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 14 }}>
              ABOUT
            </p>
            <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.4rem)", fontWeight: 800, color: tokens.primary, margin: "0 0 20px", lineHeight: 1.15 }}>
              Built by a PM who obsesses over product quality.
            </h2>
            <p style={{ fontSize: 14, color: tokens.mid, lineHeight: 1.7, marginBottom: 16, fontFamily: "sans-serif" }}>
              I'm a Senior Product Manager by day with a serious side passion: building clean, fast, handcrafted websites for small businesses who deserve more than a drag-and-drop template.
            </p>
            <p style={{ fontSize: 14, color: tokens.mid, lineHeight: 1.7, marginBottom: 28, fontFamily: "sans-serif" }}>
              Every site is written in clean HTML, CSS, and JavaScript — no WordPress, no bloat, no subscription traps. Fast by default. Yours forever.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                ["Custom code", "No templates or page builders"],
                ["Domain included", "I handle registration for you"],
                ["Fast delivery", "Most sites live in under a week"],
                ["No agency fees", "Direct, personal service"],
              ].map(([title, desc]) => (
                <div key={title}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: tokens.primary, marginBottom: 3 }}>✦ {title}</div>
                  <div style={{ fontSize: 12, color: tokens.mid, fontFamily: "sans-serif", lineHeight: 1.4 }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{
              width: "100%", aspectRatio: "4/5", borderRadius: 20,
              background: `linear-gradient(160deg, ${tokens.primary}, ${tokens.primaryDark})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden",
            }}>
              <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)" }}>
                <div style={{ fontSize: 64, marginBottom: 12, fontFamily: "sans-serif" }}>📸</div>
                <div style={{ fontSize: 12, letterSpacing: "0.06em", fontFamily: "sans-serif" }}>YOUR PHOTO HERE</div>
              </div>
            </div>
            <div style={{
              position: "absolute", bottom: 24, right: -16,
              background: tokens.accent, borderRadius: 12,
              padding: "14px 20px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#1a0a00", fontFamily: "sans-serif", lineHeight: 1 }}>3+</div>
              <div style={{ fontSize: 10, color: "#5a3d00", fontFamily: "sans-serif", letterSpacing: "0.05em" }}>SITES LAUNCHED</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ──────────────────────────────────────────────────── */}
      <section id="contact" style={{
        padding: "80px 32px",
        background: `linear-gradient(160deg, ${tokens.primaryDark} 0%, ${tokens.primary} 100%)`,
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: tokens.accent, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 16 }}>
            READY TO START?
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", margin: "0 0 16px", lineHeight: 1.1 }}>
            Let's build something great.
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: 36, fontFamily: "sans-serif" }}>
            Create an account, pick your style, and share your vision. I'll take it from there.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              background: tokens.accent, border: "none", borderRadius: 10,
              padding: "14px 36px", fontSize: 15, fontWeight: 800,
              color: "#1a0a00", cursor: "pointer", fontFamily: "sans-serif",
            }}>
              Create Account →
            </button>
            <button style={{
              background: "transparent", border: "2px solid rgba(255,255,255,0.3)",
              borderRadius: 10, padding: "14px 28px", fontSize: 15, fontWeight: 700,
              color: "rgba(255,255,255,0.8)", cursor: "pointer", fontFamily: "sans-serif",
            }}>
              Browse Styles First
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ background: tokens.dark, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: tokens.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#1a0a00", fontSize: 14, fontWeight: 900, fontFamily: "sans-serif" }}>J</span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontFamily: "sans-serif" }}>© 2026 Web Studio by Justin</span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {["Work", "Pricing", "About", "Contact"].map(l => (
            <span key={l} style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", cursor: "pointer", fontFamily: "sans-serif" }}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
