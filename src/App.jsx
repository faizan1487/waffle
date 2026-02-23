import { useState, useEffect, useRef } from "react";

const menu = {
  "Signature Sandwiches": [
    { name: "Smash Beef Sandwich", price: 700, desc: "Premium smashed beef patty, aged cheddar, house sauce, brioche bun", tag: "bestseller" },
    { name: "Steak Sandwich", price: 750, desc: "Grilled steak slices, caramelized onions, mustard aioli", tag: "chef" },
    { name: "Katsu Burger", price: 700, desc: "Crispy chicken katsu, cabbage slaw, Japanese mayo" },
    { name: "Crispy Croissant Sandwich", price: 650, desc: "Buttery croissant, crispy chicken, signature dressing" },
  ],
  "Snacks": [
    { name: "Pizza Fries", price: 550, desc: "Loaded with marinara, mozzarella, herbs", tag: "popular" },
    { name: "Classic Sea Salt Fries", price: 350, desc: "Golden crispy fries with sea salt" },
    { name: "BLT Fries", price: 550, desc: "Bacon, lettuce, tomato loaded fries" },
  ],
  "Pastries & Desserts": [
    { name: "Tiramisu", price: 550, desc: "Classic Italian espresso-soaked indulgence", tag: "bestseller" },
    { name: "Swiss Rolls", price: 250, desc: "Light sponge with cream filling" },
    { name: "Black Forest", price: 350, desc: "Dark chocolate sponge, cherry compote" },
    { name: "Raffaéllo", price: 350, desc: "Coconut almond white chocolate truffle" },
    { name: "Black Forest Cake (Mini)", price: 400, desc: "Dark chocolate sponge, cherry compote" },
    { name: "Chocolate Fudge Square", price: 400, desc: "Dense Belgian chocolate, rich ganache", tag: "chef" },
    { name: "Crème Brûlée", price: 350, desc: "Vanilla custard, caramelized sugar crust" },
    { name: "Pistachio Crème Brûlée", price: 400, desc: "Roasted pistachio infusion" },
    { name: "Rose Crème Brûlée", price: 350, desc: "Subtle floral elegance" },
    { name: "Panna Cotta", price: 450, desc: "Silky Italian cream dessert" },
  ],
  "Artisan Waffles & Sweet Plates": [
    { name: "Classic Waffle", price: 350, desc: "Golden Belgian-style waffle" },
    { name: "Chocolate Waffle", price: 500, desc: "Rich chocolate drizzle waffle", tag: "popular" },
    { name: "Pistachio Waffle", price: 550, desc: "Pistachio cream topped waffle" },
    { name: "Mini Pancakes", price: 380, desc: "Fluffy silver dollar pancakes" },
    { name: "Lemon Loaf", price: 350, desc: "Tangy lemon glazed loaf" },
    { name: "Banana Bread", price: 380, desc: "Moist classic banana bread" },
    { name: "Mixed Berry Posset", price: 450, desc: "Creamy citrus posset with berries" },
  ],
};

const emojis = { "Signature Sandwiches": "🥩", "Snacks": "🍟", "Pastries & Desserts": "🍰", "Artisan Waffles & Sweet Plates": "🧇" };
const tagColors = { bestseller: "bg-amber-900/80 text-amber-100", chef: "bg-rose-900/80 text-rose-100", popular: "bg-emerald-900/80 text-emerald-100" };
const tagLabels = { bestseller: "★ Bestseller", chef: "Chef's Pick", popular: "Popular" };

function useInView(ref) {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    o.observe(ref.current);
    return () => o.disconnect();
  }, [ref]);
  return v;
}

function Card({ item, idx }) {
  const ref = useRef();
  const vis = useInView(ref);
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${idx * 0.08}s`,
        background: hov
          ? "linear-gradient(145deg, rgba(45,30,15,0.95), rgba(30,18,8,0.98))"
          : "linear-gradient(145deg, rgba(35,22,10,0.85), rgba(25,15,5,0.9))",
        border: hov ? "1px solid rgba(212,175,120,0.4)" : "1px solid rgba(212,175,120,0.12)",
        borderRadius: "16px",
        padding: "28px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        boxShadow: hov ? "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,120,0.15)" : "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Shimmer */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(212,175,120,0.3), transparent)",
        opacity: hov ? 1 : 0, transition: "opacity 0.5s"
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <div style={{ flex: 1, paddingRight: "16px" }}>
          <h3 style={{
            fontFamily: "'Georgia', serif", fontSize: "18px", fontWeight: 600,
            color: hov ? "#e8d5b5" : "#d4af78", transition: "color 0.3s", margin: 0, lineHeight: 1.3
          }}>
            {item.name}
          </h3>
        </div>
        <div style={{
          fontFamily: "'Georgia', serif", fontSize: "22px", fontWeight: 700,
          color: "#d4af78", whiteSpace: "nowrap", letterSpacing: "-0.5px"
        }}>
          ₨ {item.price}
        </div>
      </div>

      <p style={{
        fontFamily: "'Georgia', serif", fontSize: "13.5px", color: "rgba(200,180,155,0.7)",
        margin: "0 0 14px 0", lineHeight: 1.6, fontStyle: "italic"
      }}>
        {item.desc}
      </p>

      {item.tag && (
        <span style={{
          display: "inline-block", padding: "4px 12px", borderRadius: "20px", fontSize: "11px",
          fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase",
          background: item.tag === "bestseller" ? "rgba(180,130,50,0.2)" : item.tag === "chef" ? "rgba(180,80,80,0.2)" : "rgba(80,160,100,0.2)",
          color: item.tag === "bestseller" ? "#e0c080" : item.tag === "chef" ? "#e8a0a0" : "#a0d8a0",
          border: `1px solid ${item.tag === "bestseller" ? "rgba(180,130,50,0.3)" : item.tag === "chef" ? "rgba(180,80,80,0.3)" : "rgba(80,160,100,0.3)"}`
        }}>
          {tagLabels[item.tag]}
        </span>
      )}
    </div>
  );
}

function Section({ cat, items }) {
  const ref = useRef();
  const vis = useInView(ref);
  return (
    <div ref={ref} style={{ marginBottom: "80px" }}>
      <div style={{
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)", textAlign: "center", marginBottom: "48px"
      }}>
        <div style={{ fontSize: "36px", marginBottom: "12px" }}>{emojis[cat]}</div>
        <h2 style={{
          fontFamily: "'Georgia', serif", fontSize: "32px", fontWeight: 300,
          color: "#d4af78", margin: 0, letterSpacing: "3px", textTransform: "uppercase"
        }}>
          {cat}
        </h2>
        <div style={{
          width: "60px", height: "1px", margin: "18px auto 0",
          background: "linear-gradient(90deg, transparent, #d4af78, transparent)"
        }} />
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px"
      }}>
        {items.map((item, i) => <Card key={item.name + i} item={item} idx={i} />)}
      </div>
    </div>
  );
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState(null);
  const cats = Object.keys(menu);

  useEffect(() => {
    const h = () => setScrollY(window.scrollY || 0);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (cat) => {
    const el = document.getElementById(cat.replace(/\s|&/g, "-"));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveTab(cat);
  };

  const headerOpacity = Math.min(scrollY / 400, 0.95);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0d0805 0%, #1a0f08 30%, #0d0805 100%)",
      color: "#e8ddd0", fontFamily: "'Georgia', serif"
    }}>
      {/* Floating Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: `rgba(13,8,5,${Math.max(headerOpacity, 0.6)})`,
        backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(212,175,120,0.1)",
        transition: "background 0.3s"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "20px" }}>✦</span>
            <span style={{ fontFamily: "'Georgia', serif", fontSize: "18px", fontWeight: 600, color: "#d4af78", letterSpacing: "3px" }}>
              GLAZE & GRIND
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "2px" }}>
            {cats.map(c => (
              <button key={c} onClick={() => scrollTo(c)} style={{
                background: activeTab === c ? "rgba(212,175,120,0.15)" : "transparent",
                border: activeTab === c ? "1px solid rgba(212,175,120,0.3)" : "1px solid transparent",
                color: activeTab === c ? "#d4af78" : "rgba(200,180,155,0.6)",
                padding: "6px 14px", borderRadius: "20px", fontSize: "12px",
                cursor: "pointer", whiteSpace: "nowrap", letterSpacing: "0.5px",
                fontFamily: "'Georgia', serif", transition: "all 0.3s"
              }}>
                {emojis[c]} {c.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "120px 24px 80px", position: "relative", overflow: "hidden"
      }}>
        {/* Radial glow */}
        <div style={{
          position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
          width: "800px", height: "800px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,120,40,0.06) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <div style={{
          opacity: Math.max(1 - scrollY / 500, 0),
          transform: `translateY(${scrollY * 0.15}px)`,
          transition: "opacity 0.1s",
        }}>
          <div style={{
            fontSize: "14px", letterSpacing: "8px", color: "rgba(212,175,120,0.5)",
            marginBottom: "32px", textTransform: "uppercase"
          }}>
            ✦ Est. 2024 ✦
          </div>

          <h1 style={{
            fontFamily: "'Georgia', serif", fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 300, color: "#d4af78", margin: "0 0 8px",
            letterSpacing: "8px", lineHeight: 1.1
          }}>
            GLAZE
          </h1>
          <div style={{
            fontFamily: "'Georgia', serif", fontSize: "clamp(16px, 2.5vw, 24px)",
            color: "rgba(200,180,155,0.5)", letterSpacing: "12px", margin: "8px 0"
          }}>
            &
          </div>
          <h1 style={{
            fontFamily: "'Georgia', serif", fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 300, color: "#d4af78", margin: "0",
            letterSpacing: "8px", lineHeight: 1.1
          }}>
            GRIND
          </h1>

          <div style={{
            width: "120px", height: "1px", margin: "40px auto",
            background: "linear-gradient(90deg, transparent, #d4af78, transparent)"
          }} />

          <p style={{
            fontFamily: "'Georgia', serif", fontSize: "clamp(16px, 2vw, 22px)",
            color: "rgba(200,180,155,0.6)", fontStyle: "italic",
            fontWeight: 300, letterSpacing: "2px", maxWidth: "500px", margin: "0 auto 48px"
          }}>
            Fine Desserts & Artisan Bites
          </p>

          <button onClick={() => scrollTo(cats[0])} style={{
            background: "linear-gradient(135deg, rgba(180,130,50,0.2), rgba(180,130,50,0.05))",
            border: "1px solid rgba(212,175,120,0.3)", color: "#d4af78",
            padding: "16px 48px", borderRadius: "40px", fontSize: "14px",
            letterSpacing: "4px", cursor: "pointer", fontFamily: "'Georgia', serif",
            textTransform: "uppercase", transition: "all 0.4s",
          }}
          onMouseEnter={e => { e.target.style.background = "linear-gradient(135deg, rgba(180,130,50,0.35), rgba(180,130,50,0.1))"; e.target.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.target.style.background = "linear-gradient(135deg, rgba(180,130,50,0.2), rgba(180,130,50,0.05))"; e.target.style.transform = "translateY(0)"; }}
          >
            Explore Menu
          </button>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)",
          opacity: Math.max(1 - scrollY / 200, 0)
        }}>
          <div style={{
            width: "1px", height: "50px",
            background: "linear-gradient(180deg, rgba(212,175,120,0.4), transparent)",
            margin: "0 auto",
            animation: "pulse 2s ease-in-out infinite"
          }} />
        </div>
      </div>

      {/* Menu Sections */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 120px" }}>
        {cats.map(cat => (
          <div key={cat} id={cat.replace(/\s|&/g, "-")}>
            <Section cat={cat} items={menu[cat]} />
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(212,175,120,0.1)",
        padding: "60px 24px", textAlign: "center"
      }}>
        <div style={{ fontSize: "14px", letterSpacing: "6px", color: "#d4af78", marginBottom: "16px" }}>
          GLAZE & GRIND
        </div>
        <p style={{ fontSize: "13px", color: "rgba(200,180,155,0.4)", fontStyle: "italic", margin: "0 0 8px" }}>
          Fine Desserts & Artisan Bites
        </p>
        <p style={{ fontSize: "12px", color: "rgba(200,180,155,0.25)", margin: 0 }}>
          glazeandgrind.com
        </p>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d0805; }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,120,0.3); border-radius: 3px; }
      `}</style>
    </div>
  );
}
