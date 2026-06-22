import React, { useMemo, useState } from "react";

const imageFor = (query, width = 1400, height = 900) =>
  `https://source.unsplash.com/${width}x${height}/?${encodeURIComponent(query)}`;

const temples = [
  {
    name: "Yadadri Sri Lakshmi Narasimha Swamy Temple",
    shortName: "Yadadri",
    district: "Yadadri Bhuvanagiri",
    deity: "Sri Lakshmi Narasimha Swamy",
    type: "Vishnu Temple",
    rating: "4.9",
    reviews: "2.3K",
    distance: "65 km from Hyderabad",
    time: "5:00 AM - 9:00 PM",
    image: imageFor("Yadadri temple Telangana, Hindu temple, golden hour"),
    summary:
      "A hilltop Narasimha shrine rebuilt with grand stone corridors, glowing gopurams, and a powerful pilgrimage atmosphere.",
  },
  {
    name: "Bhadrachalam Sri Sita Ramachandra Swamy Temple",
    shortName: "Bhadrachalam",
    district: "Bhadradri Kothagudem",
    deity: "Sri Sita Ramachandra Swamy",
    type: "Rama Temple",
    rating: "4.8",
    reviews: "1.9K",
    distance: "310 km from Hyderabad",
    time: "4:30 AM - 9:30 PM",
    image: imageFor("Bhadrachalam temple Telangana, Rama temple"),
    summary:
      "A beloved Rama temple on the Godavari, famous for Sri Rama Navami and the devotion of Bhakta Ramadasu.",
  },
  {
    name: "Basara Gnana Saraswati Temple",
    shortName: "Basara",
    district: "Nirmal",
    deity: "Goddess Saraswati",
    type: "Saraswati Temple",
    rating: "4.7",
    reviews: "1.5K",
    distance: "205 km from Hyderabad",
    time: "5:00 AM - 8:00 PM",
    image: imageFor("Basara Saraswati temple Telangana, Indian temple"),
    summary:
      "One of India's major Saraswati shrines, treasured for Aksharabhyasam ceremonies and quiet riverbank devotion.",
  },
  {
    name: "Vemulawada Rajarajeshwara Swamy Temple",
    shortName: "Vemulawada",
    district: "Rajanna Sircilla",
    deity: "Lord Shiva",
    type: "Shiva Temple",
    rating: "4.8",
    reviews: "1.7K",
    distance: "150 km from Hyderabad",
    time: "5:00 AM - 9:30 PM",
    image: imageFor("Vemulawada temple Telangana, Shiva temple"),
    summary:
      "Known as Dakshina Kashi, this intimate Shiva shrine draws devotees for healing, vows, and Karthika rituals.",
  },
  {
    name: "Ramappa Temple",
    shortName: "Ramappa",
    district: "Mulugu",
    deity: "Sri Ramalingeswara Swamy",
    type: "UNESCO Heritage",
    rating: "4.9",
    reviews: "3.1K",
    distance: "215 km from Hyderabad",
    time: "6:00 AM - 6:00 PM",
    image: imageFor("Ramappa temple Telangana, Kakatiya architecture"),
    summary:
      "A UNESCO-listed Kakatiya masterpiece with carved pillars, a star platform, and centuries of sculptural detail.",
  },
  {
    name: "Thousand Pillar Temple",
    shortName: "Thousand Pillar",
    district: "Hanamkonda",
    deity: "Lord Shiva, Vishnu and Surya",
    type: "Heritage Temple",
    rating: "4.7",
    reviews: "2.8K",
    distance: "150 km from Hyderabad",
    time: "6:00 AM - 8:00 PM",
    image: imageFor("Thousand Pillar Temple Warangal Telangana"),
    summary:
      "A sculptural landmark of Kakatiya heritage, known for stone pillars, Nandi, and elegant mandapa geometry.",
  },
];

const festivals = [
  { name: "Bonalu", place: "Hyderabad", month: "Jul 2026", image: imageFor("Bonalu festival Telangana", 600, 760) },
  { name: "Bathukamma", place: "Telangana", month: "Oct 2026", image: imageFor("Bathukamma festival Telangana flowers", 600, 760) },
  { name: "Sri Rama Navami", place: "Bhadrachalam", month: "Mar 2027", image: imageFor("Sri Rama Navami temple festival India", 600, 760) },
];

const gallery = [
  imageFor("Hindu temple gopuram India sunset", 900, 1100),
  imageFor("South Indian temple aerial view", 1200, 700),
  imageFor("Indian temple night lights", 1200, 700),
  imageFor("Telangana temple lake dusk", 1200, 700),
  imageFor("ancient Indian temple stone architecture", 1200, 700),
];

const circuits = [
  ["North Telangana Circuit", "Basara, Dharmapuri, Kondagattu", "2 days"],
  ["Kakatiya Heritage Circuit", "Warangal, Ramappa, Thousand Pillar", "2 days"],
  ["Narasimha Circuit", "Yadadri, Dharmapuri, Keesaragutta", "1 day"],
  ["River Pilgrimage Circuit", "Bhadrachalam, Basara, Kaleshwaram", "3 days"],
];

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedTemple, setSelectedTemple] = useState(temples[0]);

  const filteredTemples = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return temples;
    return temples.filter((temple) =>
      [temple.name, temple.shortName, temple.district, temple.deity, temple.type]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  return (
    <div className="app-shell">
      <style>{styles}</style>

      <header className="hero" style={{ backgroundImage: `url("${selectedTemple.image}")` }}>
        <nav className="nav">
          <div className="brand">
            <span className="brand-mark">KS</span>
            <span>Kshetra</span>
          </div>
          <div className="nav-links">
            <a>Home</a>
            <a>Temples</a>
            <a>Festivals</a>
            <a>Plan Yatra</a>
            <a>Stories</a>
          </div>
          <button className="sign-in">Sign In</button>
        </nav>

        <div className="hero-content">
          <div className="hero-copy">
            <span className="eyebrow">Telangana spiritual tourism</span>
            <h1>Every Sacred Journey Begins Here</h1>
            <p>
              Explore real temple destinations, darshan timings, festival journeys, and pilgrimage
              circuits across Telangana.
            </p>
            <label className="search-box">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search temples, deities, places..."
              />
              <span>Search</span>
            </label>
          </div>

          <div className="hero-card">
            <img src={selectedTemple.image} alt={selectedTemple.name} />
            <div>
              <span>Featured Temple</span>
              <h2>{selectedTemple.shortName}</h2>
              <p>{selectedTemple.district}</p>
            </div>
          </div>
        </div>

        <div className="stats-row">
          <Stat number="200+" label="Temples" />
          <Stat number="20+" label="Destinations" />
          <Stat number="50+" label="Festivals" />
          <Stat number="100K+" label="Happy Devotees" />
        </div>
      </header>

      <main>
        <section className="section popular-section">
          <SectionTitle title="Popular Temples" action="View All Temples" />
          <div className="temple-grid">
            {filteredTemples.map((temple) => (
              <button
                className={`temple-card ${selectedTemple.name === temple.name ? "active" : ""}`}
                key={temple.name}
                onClick={() => setSelectedTemple(temple)}
              >
                <img src={temple.image} alt={temple.name} />
                <div className="temple-card-body">
                  <span>{temple.type}</span>
                  <h3>{temple.shortName}</h3>
                  <p>{temple.deity}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="map-band">
          <div>
            <span className="eyebrow">Sacred geography</span>
            <h2>Explore Telangana Spiritual Map</h2>
            <p>
              Discover temple clusters by district and plan a yatra that balances darshan, heritage,
              festivals, food, and travel time.
            </p>
            <button className="outline-button">Explore Map</button>
          </div>
          <div className="map-art" aria-label="Stylized Telangana temple map">
            {["Basara", "Yadadri", "Vemulawada", "Bhadrachalam", "Ramappa", "Alampur"].map((place, index) => (
              <span className={`map-pin pin-${index + 1}`} key={place}>
                {place}
              </span>
            ))}
          </div>
        </section>

        <section className="content-grid section">
          <div>
            <SectionTitle title="Upcoming Festivals" action="View All" />
            <div className="festival-row">
              {festivals.map((festival) => (
                <article className="festival-card" key={festival.name}>
                  <img src={festival.image} alt={festival.name} />
                  <h3>{festival.name}</h3>
                  <p>{festival.place}</p>
                  <span>{festival.month}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="circuits-panel">
            <SectionTitle title="Top Yatra Circuits" action="View All" compact />
            {circuits.map(([name, route, days]) => (
              <div className="circuit-item" key={name}>
                <div>
                  <h3>{name}</h3>
                  <p>{route}</p>
                </div>
                <span>{days}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="feature-layout section">
          <TempleDetail temple={selectedTemple} />
          <PlanCard temple={selectedTemple} />
        </section>

        <section className="section">
          <SectionTitle title="Divine Gallery" action="View 360 Tour" />
          <div className="gallery-grid">
            {gallery.map((src, index) => (
              <img key={src} src={src} alt={`Temple gallery ${index + 1}`} />
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-grid">
          <div>
            <div className="brand footer-brand">
              <span className="brand-mark">KS</span>
              <span>Kshetra</span>
            </div>
            <p>Every sacred journey begins here.</p>
          </div>
          <FooterColumn title="Explore" items={["Temples", "Destinations", "Festivals", "Stories"]} />
          <FooterColumn title="Plan" items={["Yatra Planner", "Booking", "Guides", "Darshan"]} />
          <FooterColumn title="Support" items={["Help Center", "FAQ", "Contact", "Privacy"]} />
        </div>
      </footer>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div className="stat">
      <strong>{number}</strong>
      <span>{label}</span>
    </div>
  );
}

function SectionTitle({ title, action, compact = false }) {
  return (
    <div className={`section-title ${compact ? "compact" : ""}`}>
      <h2>{title}</h2>
      <button>{action}</button>
    </div>
  );
}

function TempleDetail({ temple }) {
  return (
    <article className="detail-card">
      <img src={temple.image} alt={temple.name} />
      <div className="detail-body">
        <span className="tag">{temple.type}</span>
        <h2>{temple.name}</h2>
        <p className="muted">{temple.district}, Telangana</p>
        <p>{temple.summary}</p>
        <div className="quick-actions">
          <button>Directions</button>
          <button>Darshan</button>
          <button>Call</button>
          <button>Share</button>
        </div>
        <div className="info-list">
          <Info label="Deity" value={temple.deity} />
          <Info label="Timings" value={temple.time} />
          <Info label="Distance" value={temple.distance} />
          <Info label="Rating" value={`${temple.rating} (${temple.reviews} reviews)`} />
        </div>
      </div>
    </article>
  );
}

function PlanCard({ temple }) {
  return (
    <aside className="plan-card">
      <div className="plan-image" style={{ backgroundImage: `url("${temple.image}")` }}>
        <h2>Plan Your Yatra</h2>
        <p>AI assisted spiritual itinerary</p>
      </div>
      <div className="plan-form">
        <PlanRow label="Starting From" value="Hyderabad" />
        <PlanRow label="Duration" value="2 Days" />
        <PlanRow label="Travelers" value="Family (4 Members)" />
        <PlanRow label="Budget" value="Rs 5000" />
        <button>Generate Itinerary</button>
      </div>
    </aside>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function PlanRow({ label, value }) {
  return (
    <div className="plan-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h3>{title}</h3>
      {items.map((item) => (
        <a key={item}>{item}</a>
      ))}
    </div>
  );
}

const styles = `
  :root {
    --ink: #201914;
    --muted: #7a6758;
    --paper: #fffaf2;
    --cream: #f7efe4;
    --gold: #c5822c;
    --deep: #111815;
    --line: rgba(59, 39, 23, 0.13);
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: var(--paper);
    color: var(--ink);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  button,
  input {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  .app-shell {
    min-height: 100vh;
    background:
      radial-gradient(circle at 8% 18%, rgba(197, 130, 44, 0.13), transparent 24rem),
      linear-gradient(180deg, #fffaf2 0%, #f7efe4 100%);
  }

  .hero {
    min-height: 680px;
    color: #fff;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
    isolation: isolate;
    border-radius: 0 0 28px 28px;
  }

  .hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(12, 14, 12, 0.85) 0%, rgba(12, 14, 12, 0.55) 42%, rgba(12, 14, 12, 0.08) 100%),
      linear-gradient(0deg, rgba(10, 10, 8, 0.78), rgba(10, 10, 8, 0.1));
    z-index: -1;
  }

  .nav,
  .hero-content,
  .stats-row,
  main,
  footer {
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
  }

  .nav {
    height: 78px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 22px;
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: Georgia, serif;
    font-size: 22px;
    text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  .brand-mark {
    width: 34px;
    height: 34px;
    border: 1px solid rgba(255, 255, 255, 0.45);
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #ffd58e;
    font-size: 12px;
    font-family: Inter, sans-serif;
    font-weight: 800;
  }

  .nav-links {
    display: flex;
    gap: 28px;
    font-size: 14px;
    align-items: center;
  }

  .nav-links a {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
  }

  .sign-in,
  .outline-button {
    border: 1px solid rgba(255, 255, 255, 0.55);
    color: #fff;
    background: rgba(197, 130, 44, 0.45);
    border-radius: 8px;
    padding: 12px 18px;
  }

  .hero-content {
    min-height: 470px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 360px;
    align-items: center;
    gap: 38px;
    padding: 40px 0 20px;
  }

  .eyebrow {
    display: inline-block;
    color: #f3c16f;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .hero h1 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(48px, 7vw, 82px);
    line-height: 0.97;
    max-width: 720px;
    margin: 18px 0 0;
    letter-spacing: 0;
  }

  .hero-copy p {
    max-width: 540px;
    color: rgba(255, 255, 255, 0.88);
    font-size: 18px;
    line-height: 1.7;
    margin: 22px 0 0;
  }

  .search-box {
    display: flex;
    align-items: center;
    max-width: 520px;
    margin-top: 34px;
    background: #fff;
    border-radius: 999px;
    padding: 7px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.28);
  }

  .search-box input {
    flex: 1;
    border: 0;
    outline: 0;
    min-width: 0;
    padding: 0 18px;
    color: var(--ink);
  }

  .search-box span {
    background: #c56613;
    color: #fff;
    border-radius: 999px;
    padding: 14px 20px;
    font-size: 13px;
    font-weight: 800;
  }

  .hero-card {
    background: rgba(255, 255, 255, 0.13);
    border: 1px solid rgba(255, 255, 255, 0.24);
    backdrop-filter: blur(18px);
    border-radius: 18px;
    padding: 12px;
    box-shadow: 0 26px 80px rgba(0, 0, 0, 0.28);
  }

  .hero-card img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    border-radius: 12px;
    display: block;
  }

  .hero-card div {
    padding: 18px 10px 8px;
  }

  .hero-card span,
  .hero-card p {
    color: rgba(255, 255, 255, 0.72);
    margin: 0;
  }

  .hero-card h2 {
    font-family: Georgia, serif;
    font-size: 32px;
    margin: 6px 0;
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    padding-bottom: 34px;
  }

  .stat {
    padding: 18px 24px;
    background: rgba(10, 13, 11, 0.5);
    border-top: 1px solid rgba(255, 255, 255, 0.14);
  }

  .stat strong {
    display: block;
    font-size: 28px;
  }

  .stat span {
    color: rgba(255, 255, 255, 0.72);
    font-size: 13px;
  }

  main {
    padding: 46px 0 0;
  }

  .section {
    margin: 0 auto 56px;
  }

  .section-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 18px;
    margin-bottom: 22px;
  }

  .section-title h2 {
    font-family: Georgia, serif;
    margin: 0;
    font-size: clamp(30px, 4vw, 42px);
    line-height: 1.1;
  }

  .section-title.compact h2 {
    font-size: 26px;
  }

  .section-title button {
    border: 1px solid #c5822c;
    background: transparent;
    color: #9d5611;
    border-radius: 999px;
    padding: 11px 18px;
    white-space: nowrap;
  }

  .temple-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 18px;
  }

  .temple-card {
    min-height: 290px;
    border: 0;
    border-radius: 12px;
    padding: 0;
    overflow: hidden;
    position: relative;
    background: #111;
    text-align: left;
    box-shadow: 0 20px 50px rgba(53, 35, 20, 0.13);
  }

  .temple-card.active {
    outline: 3px solid rgba(197, 130, 44, 0.55);
  }

  .temple-card img {
    width: 100%;
    height: 100%;
    min-height: 290px;
    object-fit: cover;
    display: block;
    transition: transform 250ms ease;
  }

  .temple-card:hover img {
    transform: scale(1.05);
  }

  .temple-card::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 30%, rgba(0, 0, 0, 0.88) 100%);
  }

  .temple-card-body {
    position: absolute;
    z-index: 1;
    left: 18px;
    right: 18px;
    bottom: 18px;
    color: #fff;
  }

  .temple-card-body span {
    color: #f7be73;
    font-size: 12px;
    font-weight: 800;
  }

  .temple-card-body h3 {
    font-family: Georgia, serif;
    margin: 6px 0 4px;
    font-size: 24px;
  }

  .temple-card-body p {
    margin: 0;
    color: rgba(255, 255, 255, 0.75);
    font-size: 13px;
  }

  .map-band {
    min-height: 330px;
    border-radius: 0;
    color: #fff;
    background:
      linear-gradient(90deg, rgba(9, 13, 12, 0.95), rgba(9, 13, 12, 0.7)),
      url("https://source.unsplash.com/1600x900/?Indian-temple,night");
    background-size: cover;
    background-position: center;
    margin: 0 calc(50% - 50vw) 56px;
    padding: 56px max(32px, calc((100vw - 1180px) / 2));
    display: grid;
    grid-template-columns: 0.8fr 1fr;
    gap: 36px;
    align-items: center;
  }

  .map-band h2 {
    font-family: Georgia, serif;
    font-size: clamp(32px, 5vw, 48px);
    line-height: 1.05;
    margin: 14px 0;
  }

  .map-band p {
    color: rgba(255, 255, 255, 0.76);
    line-height: 1.7;
    max-width: 440px;
  }

  .outline-button {
    margin-top: 14px;
    background: transparent;
  }

  .map-art {
    min-height: 260px;
    border: 1px solid rgba(247, 190, 115, 0.35);
    border-radius: 18px;
    position: relative;
    background:
      linear-gradient(135deg, rgba(247, 190, 115, 0.14), transparent),
      rgba(255, 255, 255, 0.06);
    box-shadow: inset 0 0 60px rgba(247, 190, 115, 0.08);
  }

  .map-pin {
    position: absolute;
    transform: translate(-50%, -50%);
    color: #ffe3a9;
    border: 1px solid rgba(255, 227, 169, 0.35);
    background: rgba(16, 17, 14, 0.78);
    border-radius: 999px;
    padding: 9px 12px;
    font-size: 12px;
  }

  .pin-1 { left: 24%; top: 28%; }
  .pin-2 { left: 54%; top: 42%; }
  .pin-3 { left: 42%; top: 62%; }
  .pin-4 { left: 74%; top: 70%; }
  .pin-5 { left: 63%; top: 25%; }
  .pin-6 { left: 20%; top: 76%; }

  .content-grid,
  .feature-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 390px;
    gap: 32px;
    align-items: start;
  }

  .festival-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .festival-card {
    margin: 0;
  }

  .festival-card img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    border-radius: 10px;
    display: block;
  }

  .festival-card h3 {
    margin: 12px 0 3px;
    font-size: 16px;
  }

  .festival-card p,
  .festival-card span,
  .muted {
    color: var(--muted);
  }

  .festival-card p,
  .festival-card span {
    margin: 0;
    font-size: 13px;
  }

  .circuits-panel,
  .detail-card,
  .plan-card {
    background: rgba(255, 255, 255, 0.66);
    border: 1px solid var(--line);
    border-radius: 14px;
    box-shadow: 0 18px 50px rgba(70, 49, 30, 0.08);
  }

  .circuits-panel {
    padding: 24px;
  }

  .circuit-item {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 16px 0;
    border-bottom: 1px solid var(--line);
  }

  .circuit-item:last-child {
    border-bottom: 0;
  }

  .circuit-item h3 {
    font-size: 16px;
    margin: 0 0 5px;
  }

  .circuit-item p {
    color: var(--muted);
    margin: 0;
    font-size: 13px;
  }

  .circuit-item span {
    color: #9d5611;
    font-weight: 800;
    white-space: nowrap;
  }

  .detail-card {
    overflow: hidden;
  }

  .detail-card > img {
    width: 100%;
    height: 360px;
    object-fit: cover;
    display: block;
  }

  .detail-body {
    padding: 28px;
  }

  .tag {
    color: #9d5611;
    background: rgba(197, 130, 44, 0.12);
    border-radius: 999px;
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 800;
  }

  .detail-body h2 {
    font-family: Georgia, serif;
    font-size: clamp(30px, 4vw, 42px);
    line-height: 1.05;
    margin: 16px 0 8px;
  }

  .detail-body p {
    line-height: 1.7;
  }

  .quick-actions {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin: 24px 0;
  }

  .quick-actions button {
    border: 1px solid var(--line);
    background: #fffaf4;
    border-radius: 999px;
    padding: 12px 8px;
    color: #55331a;
    font-weight: 700;
    font-size: 13px;
  }

  .info-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-top: 1px solid var(--line);
  }

  .info-list div {
    padding: 18px 0;
    border-bottom: 1px solid var(--line);
  }

  .info-list span {
    color: var(--muted);
    display: block;
    margin-bottom: 5px;
    font-size: 12px;
  }

  .plan-card {
    overflow: hidden;
    position: sticky;
    top: 18px;
  }

  .plan-image {
    min-height: 260px;
    background-size: cover;
    background-position: center;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 26px;
    position: relative;
    isolation: isolate;
  }

  .plan-image::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 20%, rgba(0, 0, 0, 0.78));
    z-index: -1;
  }

  .plan-image h2 {
    font-family: Georgia, serif;
    margin: 0 0 8px;
    font-size: 34px;
  }

  .plan-image p {
    margin: 0;
    color: rgba(255, 255, 255, 0.8);
  }

  .plan-form {
    padding: 24px;
  }

  .plan-row {
    padding: 14px 0;
    border-bottom: 1px solid var(--line);
  }

  .plan-row span {
    display: block;
    color: var(--muted);
    font-size: 12px;
    margin-bottom: 4px;
  }

  .plan-form button {
    width: 100%;
    margin-top: 22px;
    border: 0;
    border-radius: 999px;
    background: #c56613;
    color: #fff;
    padding: 16px;
    font-weight: 900;
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: 1fr 1.25fr 1.25fr;
    grid-auto-rows: 170px;
    gap: 14px;
  }

  .gallery-grid img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    display: block;
  }

  .gallery-grid img:first-child {
    grid-row: span 2;
  }

  footer {
    background: var(--deep);
    color: #fff;
    width: 100%;
    margin-top: 30px;
    padding: 42px max(32px, calc((100vw - 1180px) / 2));
  }

  .footer-grid {
    width: min(1180px, 100%);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.4fr repeat(3, 1fr);
    gap: 34px;
  }

  .footer-brand .brand-mark {
    border-color: rgba(255, 255, 255, 0.22);
  }

  footer p,
  footer a {
    color: rgba(255, 255, 255, 0.66);
    text-decoration: none;
  }

  footer a {
    display: block;
    margin: 9px 0;
    font-size: 14px;
  }

  footer h3 {
    margin: 0 0 12px;
    color: #f4c26f;
    font-size: 15px;
  }

  @media (max-width: 920px) {
    .nav-links {
      display: none;
    }

    .hero {
      min-height: auto;
    }

    .hero-content,
    .map-band,
    .content-grid,
    .feature-layout,
    .footer-grid {
      grid-template-columns: 1fr;
    }

    .hero-card {
      display: none;
    }

    .stats-row,
    .temple-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .festival-row {
      grid-template-columns: repeat(3, minmax(170px, 1fr));
      overflow-x: auto;
      padding-bottom: 10px;
    }

    .plan-card {
      position: static;
    }
  }

  @media (max-width: 620px) {
    .nav,
    .hero-content,
    .stats-row,
    main {
      width: min(100% - 22px, 1180px);
    }

    .hero {
      border-radius: 0 0 20px 20px;
    }

    .nav {
      height: 66px;
    }

    .brand {
      font-size: 18px;
    }

    .sign-in {
      padding: 10px 12px;
    }

    .hero-content {
      padding: 46px 0 20px;
    }

    .hero h1 {
      font-size: 44px;
    }

    .search-box {
      border-radius: 18px;
      align-items: stretch;
    }

    .search-box span {
      display: grid;
      place-items: center;
      border-radius: 14px;
      padding: 0 14px;
    }

    .stats-row,
    .temple-grid,
    .info-list,
    .quick-actions,
    .gallery-grid {
      grid-template-columns: 1fr;
    }

    .gallery-grid {
      grid-auto-rows: 220px;
    }

    .gallery-grid img:first-child {
      grid-row: span 1;
    }

    .map-band {
      padding: 42px 18px;
    }
  }
`;
