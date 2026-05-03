import {
  ArrowRight,
  BatteryCharging,
  Calendar,
  CheckCircle,
  ChevronDown,
  Headphones,
  MapPin,
  MessageCircle,
  Menu,
  Package,
  Phone,
  Shield,
  ShieldCheck,
  Star,
  Store,
  Wrench,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import './index.css';
import {
  createApiUrl,
  createPhoneLink,
  createWhatsAppLink,
  siteConfig,
} from './siteConfig';

const fadeInProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemProps = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const trackClick = async (productName) => {
  try {
    await fetch(createApiUrl('/api/track-click'), {
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

const navItems = [
  { label: 'Home', href: '#top', current: true },
  { label: 'Batteries', href: '#brands', hasCaret: true },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

const heroFeatures = [
  { icon: Wrench, title: 'Maintenance', detail: 'Free' },
  { icon: BatteryCharging, title: 'Sealed', detail: 'AGM' },
  { icon: Zap, title: 'Long', detail: 'Life' },
  { icon: ShieldCheck, title: 'Warranty', detail: 'Support' },
];

const brandCards = [
  {
    name: 'VK Power',
    theme: 'brand-vk',
    warranty: '12 months warranty',
    headline: 'Sealed AGM battery for daily riders',
    description:
      'A clean maintenance-free option for bikes and scooters with dependable starting power and spill-proof confidence.',
    image: '/battery_2.jpeg',
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

const benefits = [
  {
    icon: Shield,
    title: '100% Maintenance Free',
    description:
      'Install it and forget it. No distilled water top-ups required ever.',
  },
  {
    icon: Zap,
    title: 'Instant Start Power',
    description:
      'High cranking power guarantees quick starts even on cold winter mornings.',
  },
  {
    icon: Calendar,
    title: 'Long-Lasting Warranty',
    description:
      'Up to 19 months of hassle-free replacement warranty for peace of mind.',
  },
  {
    icon: Headphones,
    title: 'Quick WhatsApp Support',
    description:
      'Message us to confirm stock, delivery support, and the right battery before you visit.',
  },
];

const supportPoints = [
  'Share your bike or scooter model on WhatsApp and get the right battery without guesswork.',
  'See real stock and confirm availability before you visit or place the order.',
  'Get clear warranty details and pricing in one short conversation.',
];

const reviewCards = [
  {
    name: 'Verified commuter',
    role: 'Daily rider',
    quote:
      'Fast reply on WhatsApp and the battery performance has been solid from day one.',
    image: '/vk_poster.webp',
  },
  {
    name: 'Verified scooter owner',
    role: 'Scooter rider',
    quote:
      'Maintenance free battery, clear warranty explanation, and the buying process felt easy.',
    image: '/battery_3.jpeg',
  },
  {
    name: 'Verified delivery rider',
    role: 'High-usage rider',
    quote:
      'Needed a quick replacement and they had ready stock available when I asked.',
    image: '/battery_1.jpeg',
  },
  {
    name: 'Verified city rider',
    role: 'Urban commuter',
    quote:
      'Bike starts instantly now and I liked that they suggested the right option without confusion.',
    image: '/battery_label.png',
  },
];

const slidingReviews = [...reviewCards, ...reviewCards];

function App() {
  const currentYear = new Date().getFullYear();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const callLink = createPhoneLink();
  const whatsAppLinkProps = siteConfig.whatsappNumber
    ? {
        target: '_blank',
        rel: 'noreferrer',
      }
    : {};

  return (
    <div className="site-shell">
      <main id="top">
        <section className="hero-section">
          <div className="container">
            <div className="hero-shell">
              <header className="topbar">
                <div className="header-row">
                  <button
                    type="button"
                    className="mobile-menu-button"
                    aria-label="Open navigation menu"
                    aria-expanded={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen((open) => !open)}
                  >
                    <Menu size={30} />
                  </button>

                  <a href="#top" className="logo-group">
                    <div className="logo-mark" aria-hidden="true">
                      <div className="logo-stack">
                        <span className="logo-chip logo-chip-vk">VK</span>
                        <span className="logo-chip logo-chip-mk">MK</span>
                      </div>
                    </div>

                    <div className="logo-copy">
                      <div className="brand-wordmark">
                        <span className="brand-wordmark-vk">VK</span>
                        <span className="brand-wordmark-&">&</span>
                        <span className="brand-wordmark-mk">MK Gold</span>
                      </div>
                      <div className="logo-subtitle">Two Wheeler Batteries</div>
                    </div>
                  </a>

                  <nav className="nav-menu" aria-label="Primary">
                    {navItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className={`nav-item${item.current ? ' nav-item-current' : ''}`}
                      >
                        <span>{item.label}</span>
                        {item.hasCaret ? <ChevronDown size={16} /> : null}
                      </a>
                    ))}
                  </nav>

                  <a
                    href={createWhatsAppLink(
                      'Hi, I want details for your two wheeler battery options.',
                    )}
                    {...whatsAppLinkProps}
                    className="btn btn-primary header-cta"
                    onClick={() => trackClick('Header WhatsApp CTA')}
                  >
                    <MessageCircle size={18} />
                    Chat on WhatsApp
                  </a>
                </div>

                <div className={`mobile-nav-panel${isMobileMenuOpen ? ' is-open' : ''}`}>
                  {navItems.map((item) => (
                    <a
                      key={`mobile-${item.label}`}
                      href={item.href}
                      className="mobile-nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </header>

              <div className="hero-panel">
                <div className="hero-panel-overlay" aria-hidden="true" />

                <div className="mobile-hero-layout">
                  <motion.div
                    className="mobile-hero-copy"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <h1>
                      <span>Power For</span>
                      <span className="headline-emphasis">Every Ride</span>
                    </h1>

                    <div className="hero-divider mobile-hero-divider" aria-hidden="true">
                      <span />
                      <span />
                    </div>

                    <p className="mobile-hero-lead">
                      Reliable. Durable. High performance. Premium two-wheeler
                      batteries from <strong>MK Gold</strong> and{' '}
                      <strong>VK Power</strong>.
                    </p>

                    <div className="mobile-hero-actions">
                      <a href="#brands" className="btn btn-primary">
                        Explore Batteries
                        <ArrowRight size={18} />
                      </a>
                      <a
                        href={createWhatsAppLink(
                          'Hi, I want the right two-wheeler battery. Please share stock, price, and warranty details.',
                        )}
                        {...whatsAppLinkProps}
                        className="btn btn-outline"
                        onClick={() => trackClick('Mobile Hero WhatsApp CTA')}
                      >
                        <MessageCircle size={18} />
                        Chat on WhatsApp
                      </a>
                    </div>
                  </motion.div>

                  <div className="mobile-feature-panel">
                    {heroFeatures.map((feature) => {
                      const Icon = feature.icon;

                      return (
                        <article key={`mobile-${feature.title}`} className="mobile-feature-card">
                          <div className="mobile-feature-icon">
                            <Icon size={22} />
                          </div>
                          <div className="mobile-feature-copy">
                            <strong>{feature.title}</strong>
                            <span>{feature.detail}</span>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>

                <div className="hero-grid">
                  <motion.div
                    className="hero-copy"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <p className="eyebrow">Premium Two Wheeler Batteries</p>
                    <h1>
                      <span>Power For</span>
                      <span className="headline-emphasis">Every Ride</span>
                    </h1>

                    <div className="hero-divider" aria-hidden="true">
                      <span />
                      <span />
                    </div>

                    <p className="hero-lead">
                      Reliable. Durable. High performance. Premium two-wheeler
                      batteries from <strong>MK Gold</strong> and{' '}
                      <strong>VK Power</strong>.
                    </p>

                    <div className="hero-actions">
                      <a href="#brands" className="btn btn-primary">
                        Explore Batteries
                        <ArrowRight size={18} />
                      </a>
                      <a
                        href={createWhatsAppLink(
                          'Hi, I want the right two-wheeler battery. Please share stock, price, and warranty details.',
                        )}
                        {...whatsAppLinkProps}
                        className="btn btn-outline"
                        onClick={() => trackClick('Hero WhatsApp CTA')}
                      >
                        <MessageCircle size={18} />
                        Chat on WhatsApp
                      </a>
                    </div>

                    <div className="hero-feature-grid">
                      {heroFeatures.map((feature) => {
                        const Icon = feature.icon;

                        return (
                          <article key={feature.title} className="hero-feature-card">
                            <div className="hero-feature-icon">
                              <Icon size={22} />
                            </div>
                            <div className="hero-feature-copy">
                              <strong>{feature.title}</strong>
                              <span>{feature.detail}</span>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </motion.div>

                  <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, delay: 0.15 }}
                  >
                  
                  </motion.div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <section className="section" id="brands">
          <div className="container">
            <motion.div className="section-heading" {...fadeInProps}>
              <p className="section-tag">Our Premium Selection</p>
              <h2>Two reliable battery options, explained clearly.</h2>
              <p className="section-lead">
                We keep the choice simple: one solid everyday option and one
                longer-warranty upgrade for riders who want more value.
              </p>
            </motion.div>

            <motion.div
              className="brand-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
            >
              {brandCards.map((brand) => (
                <motion.article
                  variants={itemProps}
                  key={brand.name}
                  className={`brand-card ${brand.theme}`}
                >
                  <div className="brand-media">
                    <img
                      src={brand.image}
                      alt={`${brand.name} battery`}
                      loading="lazy"
                      decoding="async"
                    />
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
                      {...whatsAppLinkProps}
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

        <section className="section story-section" id="why-us">
          <div className="container story-grid">
            <div className="story-photo-card">
              <img
                src="/battery_1.jpeg"
                alt="Ready stock of two wheeler batteries"
                loading="lazy"
                decoding="async"
              />
              <div className="story-photo-overlay">
                <p className="section-tag section-tag-dark">Ready stock</p>
                <h3>
                  Actual inventory visuals build trust faster than generic
                  filler.
                </h3>
              </div>
            </div>

            <motion.div className="story-content" {...fadeInProps}>
              <p className="section-tag">Why Riders Choose Us</p>
              <h2>Fresh stock, clear warranty, and quick answers before you buy.</h2>
              <p className="section-lead">
                The goal is simple: help riders choose the right battery
                without confusion, delays, or sales pressure.
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
            </motion.div>
          </div>
        </section>

        <section className="section reviews-section" id="reviews">
          <div className="container">
            <motion.div className="section-heading section-heading-light" {...fadeInProps}>
              <p className="section-tag">Customer ratings</p>
              <h2>Reviews from riders who wanted fast, clear support.</h2>
              <p className="section-lead">
                Real buying decisions usually happen after a quick conversation.
                These reviews reinforce that promise.
              </p>
            </motion.div>

            <div className="review-marquee">
              <div className="review-track">
                {slidingReviews.map((review, index) => (
                  <article key={`${review.name}-${index}`} className="review-card">
                    <img
                      className="review-image"
                      src={review.image}
                      alt={`${review.name} review visual`}
                      loading="lazy"
                      decoding="async"
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
                <h2>Send your model on WhatsApp and get the right battery fast.</h2>
                <p className="section-lead">
                  No long form needed. Just send your bike or scooter details and
                  get price, stock, and warranty help in one reply.
                </p>

                <div className="contact-actions">
                  <a
                    href={createWhatsAppLink(
                      'Hi, I want to buy a new two-wheeler battery. I will share my vehicle model. Please send the right option, price, and warranty details.',
                    )}
                    {...whatsAppLinkProps}
                    className="btn btn-white"
                    onClick={() => trackClick('Footer CTA')}
                  >
                    <MessageCircle size={18} />
                    Send Model on WhatsApp
                  </a>
                  <a href={callLink} className="btn btn-outline-light">
                    <Phone size={18} />
                    Call Now
                  </a>
                </div>
              </motion.div>

              <div className="contact-side">
                <div className="contact-detail">
                  <Phone size={18} />
                  <span>{siteConfig.displayPhone}</span>
                </div>
                <div className="contact-detail">
                  <MapPin size={18} />
                  <span>{siteConfig.businessLocation}</span>
                </div>

                <div className="contact-panels">
                  <article className="contact-panel">
                    <Store size={20} />
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
            <div className="footer-brand">{siteConfig.businessName}</div>
            <p>
              WhatsApp-first support for VK Power and MK Gold bike and scooter
              batteries.
            </p>
          </div>

          <div className="footer-links">
            <a href="#brands">Batteries</a>
            <a href="#why-us">Why Us</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-meta">
            <span>{siteConfig.displayPhone}</span>
            <span>© {currentYear}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
