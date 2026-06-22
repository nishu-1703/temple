import React, { useMemo, useState } from "react";

const fallbackTemple =
  "https://upload.wikimedia.org/wikipedia/commons/8/84/Ramappa_Temple_02.jpg";

const temples = [
  {
    name: "Yadadri Sri Lakshmi Narasimha Swamy Temple",
    shortName: "Yadadri",
    district: "Yadadri Bhuvanagiri",
    city: "Yadadri",
    deity: "Sri Lakshmi Narasimha Swamy",
    category: "Vishnu Temples",
    rating: "4.9",
    reviews: "2.3K",
    distance: "65 km",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/30/Yadadri_Temple_on_the_hilltop.jpg",
    badge: "Most Visited",
  },
  {
    name: "Bhadrachalam Sri Sita Ramachandra Swamy Temple",
    shortName: "Bhadrachalam",
    district: "Bhadradri Kothagudem",
    city: "Bhadrachalam",
    deity: "Sri Sita Ramachandra Swamy",
    category: "Vishnu Temples",
    rating: "4.8",
    reviews: "1.8K",
    distance: "310 km",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/93/Sri_sita_rama_temple_bhadrachalam_temple_view.jpg",
  },
  {
    name: "Basara Gnana Saraswati Temple",
    shortName: "Basara",
    district: "Nirmal",
    city: "Basara",
    deity: "Goddess Saraswati",
    category: "Devi Temples",
    rating: "4.8",
    reviews: "1.2K",
    distance: "205 km",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Basar_Temple_view_02.jpg",
  },
  {
    name: "Vemulawada Raja Rajeshwara Swamy Temple",
    shortName: "Vemulawada",
    district: "Rajanna Sircilla",
    city: "Vemulawada",
    deity: "Lord Shiva",
    category: "Shiva Temples",
    rating: "4.7",
    reviews: "980",
    distance: "150 km",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Sri_Raja_Rajeshwara_temple.jpg",
  },
  {
    name: "Kaleshwaram Mukteswara Swamy Temple",
    shortName: "Kaleshwaram",
    district: "Jayashankar Bhupalpally",
    city: "Kaleshwaram",
    deity: "Lord Shiva",
    category: "Jyotirlingas",
    rating: "4.7",
    reviews: "850",
    distance: "280 km",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/62/Kaleswaram.jpg",
  },
  {
    name: "Ramappa Temple",
    shortName: "Ramappa",
    district: "Mulugu",
    city: "Palampet",
    deity: "Sri Ramalingeswara Swamy",
    category: "UNESCO Sites",
    rating: "4.9",
    reviews: "3.1K",
    distance: "215 km",
    image: fallbackTemple,
  },
];

const categories = [
  ["All Temples", "⌂"],
  ["Shiva Temples", "☊"],
  ["Vishnu Temples", "♢"],
  ["Devi Temples", "✽"],
  ["Hanuman Temples", "♜"],
  ["Shakti Peethas", "◉"],
  ["Jyotirlingas", "▱"],
  ["Heritage Temples", "▥"],
  ["UNESCO Sites", "▦"],
];

const stories = [
  ["The Legend of Yadadri Narasimha", "History & Significance", temples[0].image],
  ["Yogini Temples of Telangana", "Mysteries & Heritage", temples[5].image],
  ["Ramayana Connection of Bhadrachalam", "Sacred Ramayana Sites", temples[1].image],
  ["Ancient Marvels of Ramappa Temple", "UNESCO World Heritage", temples[5].image],
];

const circuits = [
  ["North Telangana Circuit", "5 Temples - 2 Days", temples[2].image],
  ["Shiva Kshetra Circuit", "6 Temples - 3 Days", temples[3].image],
  ["Devi Shakti Peetha Circuit", "4 Temples - 2 Days", temples[2].image],
];

const bookings = [
  ["Yadadri Darshan", "Special Entry - 2 Adults", temples[0].image],
  ["Bhadrachalam Darshan", "General Entry - 4 Members", temples[1].image],
  ["Basara Temple Pooja", "Saraswati Pooja - 1 Person", temples[2].image],
];

const nearby = [
  ["Keesaragutta Temple", "Hyderabad", "12 km", temples[0].image],
  ["Chilkur Balaji Temple", "Hyderabad", "15 km", temples[1].image],
  ["Birla Mandir", "Hyderabad", "18 km", temples[5].image],
];

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Temples");
  const [heroIndex, setHeroIndex] = useState(0);
  const [saved, setSaved] = useState(() => new Set());
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [toast, setToast] = useState("");

  const filteredTemples = useMemo(() => {
    const query = search.trim().toLowerCase();
    return temples.filter((temple) => {
      const categoryMatch = activeCategory === "All Temples" || temple.category === activeCategory;
      const text = `${temple.name} ${temple.shortName} ${temple.district} ${temple.city} ${temple.deity} ${temple.category}`.toLowerCase();
      return categoryMatch && (!query || text.includes(query));
    });
  }, [activeCategory, search]);

  const heroTemple = filteredTemples[heroIndex % Math.max(filteredTemples.length, 1)] || temples[0];

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(""), 2200);
  };

  const chooseCategory = (category) => {
    setActiveCategory(category);
    setHeroIndex(0);
  };

  const changeHero = (direction) => {
    const count = filteredTemples.length || temples.length;
    setHeroIndex((current) => (current + direction + count) % count);
  };

  const toggleSaved = (templeName) => {
    setSaved((current) => {
      const next = new Set(current);
      next.has(templeName) ? next.delete(templeName) : next.add(templeName);
      return next;
    });
    showToast("Saved list updated");
  };

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All Temples");
    setHeroIndex(0);
  };

  return (
    <div className="app">
      <style>{styles}</style>
      {toast ? <div className="toast">{toast}</div> : null}

      <header className="hero" style={{ backgroundImage: `url("${heroTemple.image}")` }}>
        <nav className="topbar" aria-label="Primary navigation">
          <button className="brand" onClick={clearFilters} aria-label="Kshetra home">
            <span className="brand-mark">ॐ</span>
            <span>
              KSHETRA
              <small>Every sacred journey begins here</small>
            </span>
          </button>

          <label className="hero-search">
            <span aria-hidden="true">⌕</span>
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setHeroIndex(0);
              }}
              placeholder="Search temples, deities, places..."
            />
          </label>

          <div className="nav-actions">
            {[
              ["Alerts", "♧"],
              ["Saved", "♡"],
              ["Bookings", "▣"],
              ["Profile", "♙"],
            ].map(([item, icon]) => (
              <button key={item} onClick={() => showToast(`${item} opened`)}>
                <span>{icon}</span>
                {item}
              </button>
            ))}
          </div>
        </nav>

        <div className="hero-main">
          <button className="hero-arrow" onClick={() => changeHero(-1)} aria-label="Previous temple">
            ‹
          </button>
          <div className="hero-copy">
            <h1>Namaste, Devotee 🙏</h1>
            <p>Begin your divine journey to the sacred land of Telangana</p>
            <button onClick={() => document.getElementById("popular-temples")?.scrollIntoView({ behavior: "smooth" })}>
              Explore Temples
            </button>
          </div>

          <article className="festival-widget">
            <span>Next Festival</span>
            <h2>Sri Rama Navami</h2>
            <p>Bhadrachalam</p>
            <div className="countdown" aria-label="Festival countdown">
              <strong>25<small>Days</small></strong>
              <strong>18<small>Hours</small></strong>
              <strong>42<small>Mins</small></strong>
              <strong>10<small>Secs</small></strong>
            </div>
            <button onClick={() => showToast("Festival details opened")}>View Details →</button>
          </article>
          <button className="hero-arrow" onClick={() => changeHero(1)} aria-label="Next temple">
            ›
          </button>
        </div>

        <div className="hero-dots" aria-hidden="true">
          {temples.slice(0, 5).map((temple, index) => (
            <span className={index === heroIndex % 5 ? "active" : ""} key={temple.name} />
          ))}
        </div>
      </header>

      <main>
        <section className="category-tray" aria-label="Temple categories">
          {categories.map(([category, icon]) => (
            <button
              className={activeCategory === category ? "active" : ""}
              key={category}
              onClick={() => chooseCategory(category)}
            >
              <span>{icon}</span>
              {category}
            </button>
          ))}
        </section>

        <section className="section" id="popular-temples">
          <SectionTitle
            title={search ? `Search Results (${filteredTemples.length})` : "Popular Temples"}
            action="View All →"
            onAction={clearFilters}
          />
          {filteredTemples.length ? (
            <div className="temple-row">
              {filteredTemples.map((temple) => (
                <TempleCard
                  key={temple.name}
                  temple={temple}
                  saved={saved.has(temple.name)}
                  onOpen={() => setSelectedTemple(temple)}
                  onSave={() => toggleSaved(temple.name)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No temples found</h3>
              <p>Try searching for Yadadri, Shiva, Basara, Bhadrachalam, or UNESCO.</p>
              <button onClick={clearFilters}>Clear Search</button>
            </div>
          )}
        </section>

        <section className="promo-grid section">
          <article className="festival-banner">
            <h2>Bonalu Festival 2026</h2>
            <p>Celebrate the vibrant culture and devotion of Telangana</p>
            <button onClick={() => showToast("Bonalu details opened")}>View Details</button>
          </article>
          <MiniPromo title="Plan Your Yatra" text="AI powered itineraries personalized for you" action="Plan Now" onClick={() => showToast("Yatra planner opened")} />
          <MiniPromo title="Virtual Darshan" text="Experience temples from anywhere" action="Visit Now" dark onClick={() => showToast("Virtual darshan opened")} />
        </section>

        <section className="map-story-grid section">
          <article className="map-card">
            <h2>Explore Telangana Map</h2>
            <p>Discover temples and spiritual places across Telangana</p>
            <button onClick={() => showToast("Map opened")}>Open Map</button>
            {["Basara", "Yadadri", "Kaleshwaram", "Alampur", "Bhadrachalam", "Keesaragutta"].map((place, index) => (
              <span className={`pin pin-${index + 1}`} key={place}>
                <i />{place}
              </span>
            ))}
          </article>

          <div>
            <SectionTitle title="Spiritual Guides & Stories" action="View All →" onAction={() => showToast("Stories opened")} />
            <div className="story-grid">
              {stories.map(([title, text, image]) => (
                <article className="story-card" key={title}>
                  <SafeImage src={image} alt={title} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="dashboard-grid section">
          <InfoPanel title="Top Yatra Circuits" items={circuits} onAction={showToast} />
          <InfoPanel title="Recent Bookings" items={bookings} booking onAction={showToast} />
          <NearbyPanel onAction={showToast} />
        </section>

        <section className="benefit-strip section" aria-label="Service benefits">
          {[
            ["✥", "Easy Bookings", "Hassle free darshan and seva bookings"],
            ["◇", "Verified Information", "Authentic and trusted information"],
            ["⌖", "Best Travel Routes", "Optimized routes and navigation"],
            ["☏", "24/7 Support", "We are here to help anytime"],
          ].map(([icon, title, text]) => (
            <article key={title}>
              <span>{icon}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="bottom-nav">
        {[
          ["Home", "⌂"],
          ["Explore", "⌕"],
          ["Plan Yatra", "♜"],
          ["Saved", "♡"],
          ["More", "▦"],
        ].map(([item, icon]) => (
          <button
            className={item === "Plan Yatra" ? "primary" : item === "Home" ? "active" : ""}
            key={item}
            onClick={() => showToast(`${item} selected`)}
          >
            <span>{icon}</span>
            {item}
          </button>
        ))}
      </footer>

      {selectedTemple ? (
        <TempleDialog temple={selectedTemple} onClose={() => setSelectedTemple(null)} onAction={showToast} />
      ) : null}
    </div>
  );
}

function TempleCard({ temple, saved, onOpen, onSave }) {
  return (
    <article className="temple-card">
      <button className="card-image" onClick={onOpen}>
        <SafeImage src={temple.image} alt={temple.name} />
      </button>
      {temple.badge ? <span className="badge">{temple.badge}</span> : null}
      <button className={`save ${saved ? "saved" : ""}`} onClick={onSave} aria-label={`Save ${temple.shortName}`}>
        ♡
      </button>
      <button className="card-copy" onClick={onOpen}>
        <h3>{temple.name}</h3>
        <p>{temple.district}</p>
        <strong>★ {temple.rating} ({temple.reviews})</strong>
      </button>
    </article>
  );
}

function MiniPromo({ title, text, action, dark = false, onClick }) {
  return (
    <article className={`mini-promo ${dark ? "dark" : ""}`}>
      <h2>{title}</h2>
      <p>{text}</p>
      <button onClick={onClick}>{action}</button>
    </article>
  );
}

function InfoPanel({ title, items, booking = false, onAction }) {
  return (
    <article className="list-panel">
      <SectionTitle title={title} action="View All →" compact onAction={() => onAction(`${title} opened`)} />
      {items.map(([name, text, image]) => (
        <button className="list-row" key={name} onClick={() => onAction(`${name} selected`)}>
          <SafeImage src={image} alt={name} />
          <span>
            <strong>{name}</strong>
            <small>{text}</small>
          </span>
          <em>{booking ? "Confirmed" : "›"}</em>
        </button>
      ))}
    </article>
  );
}

function NearbyPanel({ onAction }) {
  return (
    <article className="list-panel">
      <SectionTitle title="Nearby You" action="View All →" compact onAction={() => onAction("Nearby temples opened")} />
      {nearby.map(([name, place, distance, image]) => (
        <button className="list-row" key={name} onClick={() => onAction(`${name} selected`)}>
          <SafeImage src={image} alt={name} />
          <span>
            <strong>{name}</strong>
            <small>{place}</small>
          </span>
          <em>{distance}</em>
        </button>
      ))}
    </article>
  );
}

function TempleDialog({ temple, onClose, onAction }) {
  return (
    <div className="dialog-backdrop" role="presentation" onClick={onClose}>
      <article className="temple-dialog" role="dialog" aria-modal="true" aria-label={temple.name} onClick={(event) => event.stopPropagation()}>
        <SafeImage src={temple.image} alt={temple.name} />
        <div>
          <button className="dialog-close" onClick={onClose} aria-label="Close details">×</button>
          <span>{temple.category}</span>
          <h2>{temple.name}</h2>
          <p>{temple.deity} in {temple.district}. Approximate distance from Hyderabad: {temple.distance}.</p>
          <div className="dialog-actions">
            {["Directions", "Book Darshan", "Share"].map((label) => (
              <button key={label} onClick={() => onAction(`${label} opened for ${temple.shortName}`)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

function SectionTitle({ title, action, compact = false, onAction }) {
  return (
    <div className={`section-title ${compact ? "compact" : ""}`}>
      <h2>{title}</h2>
      <button onClick={onAction}>{action}</button>
    </div>
  );
}

function SafeImage({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={(event) => {
        event.currentTarget.src = fallbackTemple;
      }}
    />
  );
}

const styles = `
  :root {
    --ink: #211810;
    --muted: #79695c;
    --line: #eaded1;
    --paper: #fffaf4;
    --card: #fffdf9;
    --gold: #c97819;
    --gold-dark: #9d520d;
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    color: var(--ink);
    background: var(--paper);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  button, input { font: inherit; }
  button { cursor: pointer; }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: #ead9c3;
  }

  .app {
    min-height: 100vh;
    padding-bottom: 34px;
    background: linear-gradient(180deg, #fffaf4, #f8efe4 72%, #fffaf4);
  }

  .toast {
    position: fixed;
    top: 18px;
    right: 18px;
    z-index: 40;
    color: white;
    background: #14110d;
    border-radius: 999px;
    padding: 12px 18px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.2);
  }

  .hero {
    min-height: 455px;
    color: white;
    background-size: cover;
    background-position: center;
    position: relative;
    isolation: isolate;
  }

  .hero::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background:
      linear-gradient(90deg, rgba(7,10,10,0.86), rgba(7,10,10,0.2) 54%, rgba(7,10,10,0.78)),
      linear-gradient(0deg, rgba(7,10,10,0.66), transparent 56%);
  }

  .topbar,
  .hero-main,
  main {
    width: min(1180px, calc(100% - 48px));
    margin: 0 auto;
  }

  .topbar {
    min-height: 92px;
    display: grid;
    grid-template-columns: 260px minmax(320px, 540px) 1fr;
    gap: 22px;
    align-items: center;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    border: 0;
    background: transparent;
    color: white;
    text-align: left;
    font-family: Georgia, serif;
    font-size: 29px;
    letter-spacing: 0.03em;
  }

  .brand small {
    display: block;
    margin-top: 1px;
    color: #ffe2a8;
    font-family: Inter, sans-serif;
    font-size: 10px;
    letter-spacing: 0;
  }

  .brand-mark {
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    color: #ffc45e;
    border: 1px solid rgba(255,202,104,0.68);
    border-radius: 50%;
    font-size: 27px;
  }

  .hero-search {
    height: 56px;
    border-radius: 18px;
    background: rgba(255,255,255,0.94);
    color: #2b2119;
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 0 21px;
    box-shadow: 0 18px 50px rgba(0,0,0,0.16);
  }

  .hero-search span {
    color: #1f1711;
    font-size: 25px;
    line-height: 1;
  }

  .hero-search input {
    min-width: 0;
    flex: 1;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--ink);
  }

  .nav-actions {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
  }

  .nav-actions button {
    border: 0;
    background: transparent;
    color: rgba(255,255,255,0.92);
    display: grid;
    justify-items: center;
    gap: 4px;
    font-size: 12px;
  }

  .nav-actions span {
    font-size: 22px;
    line-height: 1;
  }

  .hero-main {
    min-height: 330px;
    display: grid;
    grid-template-columns: 46px 1fr 292px 46px;
    align-items: center;
    gap: 26px;
  }

  .hero-arrow {
    width: 44px;
    height: 44px;
    border: 0;
    border-radius: 50%;
    color: white;
    background: rgba(0,0,0,0.42);
    font-size: 32px;
    line-height: 1;
  }

  .hero-copy h1 {
    margin: 0 0 12px;
    font-family: Georgia, serif;
    font-size: clamp(32px, 4vw, 43px);
    line-height: 1.05;
  }

  .hero-copy p {
    max-width: 400px;
    margin: 0 0 22px;
    font-size: 18px;
    line-height: 1.5;
  }

  .hero-copy button,
  .festival-widget button,
  .mini-promo button,
  .festival-banner button,
  .empty-state button,
  .map-card button {
    border: 0;
    border-radius: 999px;
    background: linear-gradient(135deg, #d89127, #b76412);
    color: white;
    padding: 13px 22px;
    font-weight: 800;
  }

  .festival-widget {
    border: 1px solid rgba(255,255,255,0.16);
    border-radius: 14px;
    padding: 22px;
    background: rgba(24,20,16,0.72);
    backdrop-filter: blur(16px);
    box-shadow: 0 24px 70px rgba(0,0,0,0.24);
  }

  .festival-widget span,
  .festival-widget p {
    color: rgba(255,255,255,0.76);
    margin: 0;
  }

  .festival-widget h2 {
    margin: 12px 0 4px;
    font-family: Georgia, serif;
    font-size: 23px;
  }

  .countdown {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin: 22px 0;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(255,255,255,0.18);
  }

  .countdown strong {
    display: grid;
    gap: 3px;
    font-size: 22px;
  }

  .countdown small {
    font-size: 10px;
    color: rgba(255,255,255,0.66);
  }

  .hero-dots {
    position: absolute;
    left: 50%;
    bottom: 52px;
    transform: translateX(-50%);
    display: flex;
    gap: 7px;
  }

  .hero-dots span {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: rgba(255,255,255,0.58);
  }

  .hero-dots .active {
    background: #e19426;
  }

  main {
    margin-top: -34px;
  }

  .category-tray {
    position: relative;
    z-index: 3;
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    gap: 12px;
    padding: 18px 22px;
    border: 1px solid var(--line);
    border-radius: 20px;
    background: rgba(255,253,249,0.98);
    box-shadow: 0 24px 80px rgba(69,45,24,0.13);
    overflow-x: auto;
  }

  .category-tray button {
    min-width: 104px;
    border: 0;
    background: transparent;
    color: var(--ink);
    display: grid;
    justify-items: center;
    gap: 9px;
    font-size: 12px;
  }

  .category-tray span {
    width: 58px;
    height: 58px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: #9a4e0b;
    border: 1px solid #ead7c5;
    background: #fffaf6;
    box-shadow: 0 10px 22px rgba(87,55,25,0.08);
    font-size: 25px;
    font-weight: 900;
  }

  .category-tray .active span {
    color: white;
    background: #b76412;
  }

  .section {
    margin-top: 32px;
  }

  .section-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 18px;
    margin-bottom: 18px;
  }

  .section-title h2 {
    margin: 0;
    font-family: Georgia, serif;
    font-size: 26px;
    line-height: 1.15;
  }

  .section-title.compact h2 {
    font-size: 20px;
  }

  .section-title button {
    border: 0;
    background: transparent;
    color: #a4540d;
    font-weight: 800;
  }

  .temple-row {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 16px;
  }

  .temple-card {
    position: relative;
    min-height: 250px;
    overflow: hidden;
    border-radius: 10px;
    background: #19110d;
    color: white;
    box-shadow: 0 18px 50px rgba(52,34,18,0.14);
  }

  .card-image,
  .card-copy {
    position: absolute;
    inset: 0;
    border: 0;
    padding: 0;
    background: transparent;
    color: inherit;
    text-align: left;
  }

  .temple-card::after,
  .festival-banner::after,
  .story-card::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(180deg, transparent 28%, rgba(0,0,0,0.88));
  }

  .card-copy {
    z-index: 1;
    top: auto;
    left: 16px;
    right: 16px;
    bottom: 16px;
    width: auto;
  }

  .card-copy h3 {
    margin: 0 0 7px;
    font-family: Georgia, serif;
    font-size: 17px;
    line-height: 1.15;
  }

  .card-copy p {
    color: rgba(255,255,255,0.78);
    margin: 0 0 8px;
    font-size: 12px;
  }

  .card-copy strong {
    color: #ffbd4a;
    font-size: 12px;
  }

  .badge,
  .save {
    position: absolute;
    z-index: 2;
  }

  .badge {
    top: 12px;
    left: 12px;
    padding: 6px 9px;
    border-radius: 999px;
    background: #d98b1f;
    color: white;
    font-size: 10px;
    font-weight: 900;
  }

  .save {
    top: 11px;
    right: 11px;
    width: 34px;
    height: 34px;
    border: 1px solid rgba(255,255,255,0.42);
    border-radius: 50%;
    color: white;
    background: rgba(0,0,0,0.34);
    font-size: 19px;
  }

  .save.saved {
    background: #c97819;
  }

  .empty-state {
    border: 1px solid var(--line);
    border-radius: 16px;
    background: var(--card);
    padding: 34px;
    text-align: center;
  }

  .promo-grid {
    display: grid;
    grid-template-columns: 1.8fr 1fr 1fr;
    gap: 18px;
  }

  .festival-banner,
  .mini-promo,
  .map-card,
  .list-panel,
  .benefit-strip article {
    border: 1px solid var(--line);
    border-radius: 12px;
    background: var(--card);
    box-shadow: 0 16px 44px rgba(72,46,21,0.07);
  }

  .festival-banner {
    min-height: 210px;
    position: relative;
    overflow: hidden;
    color: white;
    padding: 30px;
    background:
      linear-gradient(90deg, rgba(46,18,6,0.9), rgba(46,18,6,0.2)),
      url("https://upload.wikimedia.org/wikipedia/commons/6/62/Bonalu_festival_in_Hyderabad.jpg") center/cover,
      url("${temples[2].image}") center/cover;
  }

  .festival-banner > * {
    position: relative;
    z-index: 1;
  }

  .festival-banner h2 {
    margin: 0 0 10px;
    font-family: Georgia, serif;
    font-size: 31px;
  }

  .festival-banner p {
    max-width: 340px;
    line-height: 1.5;
  }

  .festival-banner button {
    margin-top: 16px;
    background: transparent;
    border: 1px solid #d89227;
  }

  .mini-promo {
    min-height: 210px;
    padding: 28px;
    background:
      radial-gradient(circle at 80% 74%, rgba(201,120,25,0.28), transparent 74px),
      linear-gradient(135deg, #fffaf3, #f3e0ca);
  }

  .mini-promo.dark {
    color: white;
    background:
      linear-gradient(90deg, rgba(38,24,14,0.92), rgba(38,24,14,0.45)),
      url("${temples[5].image}") center/cover;
  }

  .mini-promo h2 {
    margin: 0 0 12px;
    font-family: Georgia, serif;
    font-size: 25px;
  }

  .mini-promo p {
    line-height: 1.5;
    min-height: 48px;
  }

  .map-story-grid {
    display: grid;
    grid-template-columns: 1fr 1.38fr;
    gap: 32px;
  }

  .map-card {
    min-height: 270px;
    padding: 26px;
    color: white;
    position: relative;
    overflow: hidden;
    background:
      radial-gradient(circle at 60% 52%, rgba(237,167,56,0.14), transparent 150px),
      linear-gradient(135deg, rgba(8,45,42,0.97), rgba(13,39,37,0.88));
  }

  .map-card::after {
    content: "";
    position: absolute;
    right: 8%;
    top: 18%;
    width: 50%;
    height: 64%;
    border: 1px solid rgba(255,197,87,0.55);
    border-radius: 46% 54% 45% 55%;
  }

  .map-card h2 {
    font-family: Georgia, serif;
    margin: 0 0 10px;
  }

  .map-card p {
    max-width: 260px;
    color: rgba(255,255,255,0.82);
  }

  .pin {
    position: absolute;
    z-index: 1;
    color: #ffd26f;
    font-size: 12px;
    font-weight: 800;
    display: grid;
    gap: 3px;
    justify-items: center;
  }

  .pin i {
    width: 14px;
    height: 14px;
    border-radius: 50% 50% 50% 0;
    background: #d88b1e;
    transform: rotate(-45deg);
  }

  .pin-1 { left: 52%; top: 22%; }
  .pin-2 { left: 42%; top: 48%; }
  .pin-3 { left: 72%; top: 34%; }
  .pin-4 { left: 55%; top: 70%; }
  .pin-5 { left: 74%; top: 66%; }
  .pin-6 { left: 37%; top: 76%; }

  .story-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }

  .story-card {
    position: relative;
    min-height: 205px;
    overflow: hidden;
    border-radius: 10px;
    color: white;
  }

  .story-card h3,
  .story-card p {
    position: absolute;
    z-index: 1;
    left: 14px;
    right: 14px;
  }

  .story-card h3 {
    bottom: 42px;
    margin: 0;
    font-family: Georgia, serif;
    font-size: 15px;
  }

  .story-card p {
    bottom: 16px;
    margin: 0;
    color: rgba(255,255,255,0.78);
    font-size: 11px;
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .list-panel {
    padding: 20px;
  }

  .list-row {
    width: 100%;
    border: 0;
    background: transparent;
    display: grid;
    grid-template-columns: 54px 1fr auto;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    text-align: left;
    border-bottom: 1px solid var(--line);
  }

  .list-row:last-child {
    border-bottom: 0;
  }

  .list-row img {
    width: 54px;
    height: 54px;
    border-radius: 50%;
  }

  .list-row strong,
  .list-row small {
    display: block;
  }

  .list-row small {
    color: var(--muted);
    margin-top: 3px;
  }

  .list-row em {
    font-style: normal;
    color: #8b4b10;
    background: #f8ecdf;
    border-radius: 999px;
    padding: 5px 9px;
    font-size: 11px;
    white-space: nowrap;
  }

  .benefit-strip {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
  }

  .benefit-strip article {
    border-radius: 0;
    padding: 18px 20px;
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .benefit-strip article:first-child {
    border-radius: 12px 0 0 12px;
  }

  .benefit-strip article:last-child {
    border-radius: 0 12px 12px 0;
  }

  .benefit-strip span {
    width: 42px;
    height: 42px;
    flex: 0 0 42px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: #f8ecdf;
    color: #9d520d;
    font-weight: 900;
  }

  .benefit-strip h3,
  .benefit-strip p {
    margin: 0;
  }

  .benefit-strip h3 {
    font-size: 14px;
  }

  .benefit-strip p {
    color: var(--muted);
    font-size: 12px;
    margin-top: 2px;
  }

  .bottom-nav {
    display: none;
  }

  .dialog-backdrop {
    position: fixed;
    inset: 0;
    z-index: 30;
    display: grid;
    place-items: center;
    padding: 24px;
    background: rgba(15,10,6,0.54);
  }

  .temple-dialog {
    width: min(780px, 100%);
    display: grid;
    grid-template-columns: 42% 1fr;
    overflow: hidden;
    border-radius: 16px;
    background: var(--card);
    box-shadow: 0 32px 80px rgba(0,0,0,0.28);
  }

  .temple-dialog img {
    min-height: 360px;
  }

  .temple-dialog > div {
    position: relative;
    padding: 30px;
  }

  .dialog-close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 34px;
    height: 34px;
    border: 0;
    border-radius: 50%;
    background: #f7ecdf;
    color: #5d3416;
    font-size: 24px;
  }

  .temple-dialog span {
    color: var(--gold-dark);
    font-weight: 900;
    font-size: 12px;
  }

  .temple-dialog h2 {
    margin: 12px 0;
    font-family: Georgia, serif;
    font-size: 31px;
    line-height: 1.1;
  }

  .temple-dialog p {
    color: var(--muted);
    line-height: 1.65;
  }

  .dialog-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 22px;
  }

  .dialog-actions button {
    border: 1px solid var(--line);
    border-radius: 999px;
    background: #fff8ef;
    color: #6e390d;
    padding: 11px 15px;
    font-weight: 800;
  }

  @media (max-width: 1020px) {
    .topbar {
      grid-template-columns: 1fr;
      padding: 18px 0;
    }

    .nav-actions {
      justify-content: space-between;
    }

    .hero-main,
    .map-story-grid,
    .promo-grid,
    .dashboard-grid {
      grid-template-columns: 1fr;
    }

    .hero-arrow {
      display: none;
    }

    .category-tray,
    .temple-row {
      grid-template-columns: repeat(4, minmax(150px, 1fr));
    }

    .story-grid,
    .benefit-strip {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 720px) {
    .app {
      padding-bottom: 92px;
    }

    .topbar,
    .hero-main,
    main {
      width: min(100% - 22px, 1180px);
    }

    .brand {
      font-size: 22px;
    }

    .hero {
      min-height: 590px;
    }

    .hero-main {
      gap: 16px;
      padding-bottom: 48px;
    }

    .festival-widget {
      padding: 18px;
    }

    .category-tray {
      grid-template-columns: repeat(9, 108px);
      padding: 14px;
    }

    .temple-row,
    .story-grid,
    .benefit-strip {
      grid-template-columns: 1fr;
    }

    .promo-grid {
      gap: 14px;
    }

    .temple-dialog {
      grid-template-columns: 1fr;
    }

    .temple-dialog img {
      min-height: 230px;
      height: 230px;
    }

    .bottom-nav {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 20;
      height: 76px;
      background: rgba(255,250,244,0.97);
      border-top: 1px solid var(--line);
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      padding: 8px 6px;
      box-shadow: 0 -18px 55px rgba(65,38,18,0.12);
    }

    .bottom-nav button {
      border: 0;
      background: transparent;
      color: #5b4b3d;
      display: grid;
      justify-items: center;
      gap: 3px;
      font-size: 12px;
    }

    .bottom-nav span {
      width: 24px;
      height: 24px;
      display: grid;
      place-items: center;
      font-size: 20px;
    }

    .bottom-nav .active {
      color: #b76412;
      font-weight: 900;
    }

    .bottom-nav .primary {
      width: 82px;
      height: 82px;
      justify-self: center;
      align-self: start;
      margin-top: -34px;
      border-radius: 50%;
      background: linear-gradient(135deg, #d89127, #b76412);
      color: white;
      box-shadow: 0 16px 32px rgba(167,89,14,0.33);
    }
  }
`;
