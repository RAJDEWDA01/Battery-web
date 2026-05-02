import {
  BatteryFull,
  Calendar,
  CheckCircle,
  ChevronRight,
  Headphones,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  Shield,
  Star,
  Zap,
} from 'lucide-react';
import BatteryModel from './BatteryModel';
import { motion } from 'framer-motion';
import './index.css';

const fadeInProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.7, ease: "easeOut" }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemProps = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const phoneNumber = '9100000000';
const displayPhone = '+91 00000000';

const createWhatsAppLink = (message) =>
  `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

const trackClick = async (productName) => {
  try {
    await fetch('http://localhost:5000/api/track-click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ product: productName }),
    });
  } catch (err) {
    console.error('Failed to track click', err);
  }
};

const brandCards = [
  {
    name: 'VK Power',
    theme: 'brand-vk',
    warranty: '12 months warranty',
    headline: 'Sealed AGM battery for daily riders',
    description:
      'A clean maintenance-free option for bikes and scooters with dependable starting power and spill-proof confidence.',
    image: '/vk_poster.png',
    ctaMessage: 'Hi, I want details for VK Power battery.',
    features: [
      'Sealed AGM technology',
      'Maintenance free design',
      'Reliable starting performance',
    ],
  },
  {
    name: 'MK Gold',
    theme: 'brand-mk',
    warranty: 'Up to 19 months warranty',
    headline: 'Long-life performance for two wheelers',
    description:
      'Built for stronger cranking, longer life, and a more premium battery story for customers who want lasting value.',
    image: '/battery_3.jpeg',
    ctaMessage: 'Hi, I want details for MK Gold battery.',
    features: [
      'Excellent cranking response',
      'Low maintenance construction',
      'Future-ready bike series positioning',
    ],
  },
];

const quickStats = [
  { value: '2', label: 'Trusted brands' },
  { value: '12-19', label: 'Months warranty' },
  { value: '100%', label: 'Two wheeler focus' },
];

const benefits = [
  {
    icon: Shield,
    title: '100% Maintenance Free',
    description: 'Install it and forget it. No distilled water top-ups required ever.',
  },
  {
    icon: Zap,
    title: 'Instant Start Power',
    description: 'High cranking power guarantees quick starts even on cold winter mornings.',
  },
  {
    icon: Calendar,
    title: 'Long-Lasting Warranty',
    description: 'Up to 19 months of hassle-free replacement warranty for peace of mind.',
  },
  {
    icon: Headphones,
    title: 'Quick Home Delivery',
    description: 'Message us on WhatsApp to get fast delivery and installation support.',
  },
];

const supportPoints = [
  'Advanced spill-proof technology designed specifically for bumpy Indian roads.',
  'Zero maintenance requirements save you money and time over the battery lifespan.',
  'Manufactured with premium lead alloys for a consistently longer service life.',
];

const proofTiles = [
  { image: '/vk_poster.png', label: 'VK Power visual' },
  { image: '/battery_3.jpeg', label: 'MK Gold visual' },
  { image: '/battery_1.jpeg', label: 'Ready stock proof' },
  { image: '/battery_label.png', label: 'Brand label detail' },
];

const reviewCards = [
  {
    name: 'Rohit Sharma',
    role: 'Daily commuter',
    quote:
      'Fast reply on WhatsApp and the battery performance has been solid from day one.',
    image: '/vk_poster.png',
  },
  {
    name: 'Pooja Mehta',
    role: 'Scooter owner',
    quote:
      'Maintenance free battery, clear warranty explanation, and the buying process felt easy.',
    image: '/battery_3.jpeg',
  },
  {
    name: 'Aman Verma',
    role: 'Delivery rider',
    quote:
      'Needed a quick replacement and they had ready stock available when I asked.',
    image: '/battery_1.jpeg',
  },
  {
    name: 'Neha Singh',
    role: 'City rider',
    quote:
      'Bike starts instantly now and I liked that they suggested the right option without confusion.',
    image: '/battery_label.png',
  },
];

const slidingReviews = [...reviewCards, ...reviewCards];

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container header-row">
          <a href="#top" className="logo-group">
            <div className="logo-stack" aria-hidden="true">
              <span className="logo-chip logo-chip-vk">VK</span>
              <span className="logo-chip logo-chip-mk">MK</span>
            </div>
            <div>
              <div className="logo-title">Two Wheeler Battery Hub</div>
              <div className="logo-subtitle">VK Power and MK Gold seller</div>
            </div>
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a href="#brands">Brands</a>
            <a href="#stock">Stock</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="header-actions">
            <a href={`tel:${phoneNumber}`} className="btn btn-ghost">
              <Phone size={18} />
              Call Now
            </a>
            <a
              href={createWhatsAppLink(
                'Hi, I want details for your two wheeler battery options.',
              )}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              onClick={() => trackClick('Header CTA')}
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="container hero-grid">
            <motion.div className="hero-copy" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <p className="eyebrow">Premium Two Wheeler Batteries</p>
              <h1>
                Power every ride with{' '}
                <span className="highlight-red">VK Power</span> and{' '}
                <span className="highlight-gold">MK Gold</span>.
              </h1>
              <p className="hero-lead">
                Upgrade your bike or scooter with India's most reliable, maintenance-free batteries. Built for extreme weather, quick starts, and unmatched longevity.
              </p>

              <div className="hero-brand-row">
                {brandCards.map((brand) => (
                  <div key={brand.name} className={`brand-pill ${brand.theme}`}>
                    <span className="brand-pill-name">{brand.name}</span>
                    <span className="brand-pill-copy">{brand.warranty}</span>
                  </div>
                ))}
              </div>

              <div className="hero-actions">
                <a href="#brands" className="btn btn-primary">
                  Explore Brands
                  <ChevronRight size={18} />
                </a>
                <a href="#reviews" className="btn btn-secondary">
                  See Reviews
                </a>
              </div>

              <div className="stat-strip">
                {quickStats.map((stat) => (
                  <div key={stat.label} className="stat-card">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
              <div className="hero-stage">
                <div className="stage-backdrop" aria-hidden="true">
                  <div className="stage-ring stage-ring-red" />
                  <div className="stage-ring stage-ring-gold" />
                  <div className="stage-floor" />
                </div>

               

                <div className="model-shell" style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BatteryModel />
                </div>

               
              </div>

              <div className="hero-proof-row">
                {brandCards.map((brand) => (
                  <article
                    key={brand.name}
                    className={`hero-proof-card ${brand.theme}`}
                  >
                    <img src={brand.image} alt={`${brand.name} product poster`} />
                    <div>
                      <strong>{brand.name}</strong>
                      <span>{brand.warranty}</span>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section" id="brands">
          <div className="container">
            <motion.div className="section-heading" {...fadeInProps}>
              <p className="section-tag">Our Premium Selection</p>
              <h2>
                Choose the perfect power source for your daily commute.
              </h2>
              <p className="section-lead">
                We exclusively stock VK Power and MK Gold because they deliver the lowest failure rate, highest cranking power, and best warranty support in the industry.
              </p>
            </motion.div>

            <motion.div className="brand-grid" variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
              {brandCards.map((brand) => (
                <motion.article variants={itemProps} key={brand.name} className={`brand-card ${brand.theme}`}>
                  <div className="brand-media">
                    <img src={brand.image} alt={`${brand.name} battery`} />
                    <span className="warranty-badge">{brand.warranty}</span>
                  </div>

                  <div className="brand-body">
                    <p className="brand-kicker">{brand.name}</p>
                    <h3>{brand.headline}</h3>
                    <p>{brand.description}</p>

                    <ul className="brand-features">
                      {brand.features.map((feature) => (
                        <li key={feature}>
                          <CheckCircle size={18} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={createWhatsAppLink(brand.ctaMessage)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-card"
                      onClick={() => trackClick(brand.name)}
                    >
                      Ask about {brand.name}
                      <MessageCircle size={18} />
                    </a>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section story-section" id="stock">
          <div className="container story-grid">
            <div className="story-photo-card">
              <img
                src="/battery_1.jpeg"
                alt="Ready stock of two wheeler batteries"
              />
              <div className="story-photo-overlay">
                <p className="section-tag section-tag-dark">Ready stock</p>
                <h3>Actual inventory visuals build trust faster than generic filler.</h3>
              </div>
            </div>

            <motion.div className="story-content" {...fadeInProps}>
              <p className="section-tag">Why Choose Us</p>
              <h2>
                100% Genuine batteries, ready in stock, and delivered with trust.
              </h2>
              <p className="section-lead">
                Don't get stranded with a dead battery. We ensure you get fresh, fully-charged, and authentic batteries that are optimized for local city traffic and extreme weather conditions.
              </p>

              <div className="benefit-grid">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <article key={benefit.title} className="benefit-card">
                      <div className="benefit-icon">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h3>{benefit.title}</h3>
                        <p>{benefit.description}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <ul className="support-list">
                {supportPoints.map((point) => (
                  <li key={point}>
                    <CheckCircle size={18} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="proof-grid">
                {proofTiles.map((tile) => (
                  <div key={tile.label} className="proof-tile">
                    <img src={tile.image} alt={tile.label} />
                    <span>{tile.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section reviews-section" id="reviews">
          <div className="container">
            <motion.div className="section-heading section-heading-light" {...fadeInProps}>
              <p className="section-tag">Customer ratings</p>
              <h2>Trusted by thousands of daily riders across the city.</h2>
              <p className="section-lead">
                Don't just take our word for it. See why delivery agents, commuters, and weekend riders rely on our battery recommendations.
              </p>
            </motion.div>

            <div className="review-marquee">
              <div className="review-track">
                {slidingReviews.map((review, index) => (
                  <article
                    key={`${review.name}-${index}`}
                    className="review-card"
                  >
                    <img
                      className="review-image"
                      src={review.image}
                      alt={`${review.name} review visual`}
                    />

                    <div className="review-body">
                      <div className="review-stars" aria-label="5 star review">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star key={starIndex} size={15} fill="currentColor" />
                        ))}
                      </div>

                      <p>{review.quote}</p>

                      <div className="review-author">
                        <div className="review-avatar" aria-hidden="true">
                          <img src={review.image} alt="" />
                        </div>
                        <div>
                          <strong>{review.name}</strong>
                          <span>{review.role}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container">
            <div className="contact-card">
              <motion.div className="contact-copy" {...fadeInProps}>
                <p className="section-tag">Ready to upgrade?</p>
                <h2>Get a fresh battery today. Connect instantly on WhatsApp.</h2>
                <p className="section-lead">
                  Skip the hassle. Tell us your bike or scooter model, and we'll instantly give you the best price for a brand new VK Power or MK Gold battery.
                </p>

                <div className="contact-actions">
                  <a
                    href={createWhatsAppLink(
                      'Hi, I am interested in purchasing a new two-wheeler battery (VK Power / MK Gold). Could you share the latest pricing?',
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-white"
                    onClick={() => trackClick('Footer CTA')}
                  >
                    <MessageCircle size={18} />
                    Chat on WhatsApp
                  </a>
                  <a href={`tel:${phoneNumber}`} className="btn btn-outline-light">
                    <Phone size={18} />
                    Call Now
                  </a>
                </div>
              </motion.div>

              <div className="contact-side">
                <div className="contact-detail">
                  <Phone size={18} />
                  <span>{displayPhone}</span>
                </div>
                <div className="contact-detail">
                  <MapPin size={18} />
                  <span>Delhi, India</span>
                </div>

                <div className="contact-panels">
                  <article className="contact-panel">
                    <BatteryFull size={20} />
                    <div>
                      <strong>VK Power</strong>
                      <span>Daily-use sealed AGM support</span>
                    </div>
                  </article>
                  <article className="contact-panel">
                    <Package size={20} />
                    <div>
                      <strong>MK Gold</strong>
                      <span>Premium longer-warranty positioning</span>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-row">
          <div>
            <div className="footer-brand">Two Wheeler Battery Hub</div>
            <p>
              Focused on VK Power and MK Gold batteries for bikes and scooters.
            </p>
          </div>

          <div className="footer-links">
            <a href="#brands">Brands</a>
            <a href="#stock">Stock</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-meta">
            <span>{displayPhone}</span>
            <span>© {currentYear}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
