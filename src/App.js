import React, { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import './App.css';

const APK_URL = `${process.env.PUBLIC_URL}/download/app.apk`;

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } }
};

const revealViewport = { once: true, amount: 0.2 };

/* -------------------------------------------------------------------------- */
/*  Icons                                                                     */
/* -------------------------------------------------------------------------- */

const ICONS = {
  android: (
    <>
      <path d="M7 10.5a5 5 0 0 1 5-5 5 5 0 0 1 5 5v6a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3v-6Z" />
      <path d="M8.2 6.6 6.6 4.2M15.8 6.6l1.6-2.4" />
      <path d="M10 13.6h.01M14 13.6h.01" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  check: <path d="m5 12 4.5 4.5L19 7" />,
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 11.5 2 2 4-4" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  wallet: (
    <>
      <path d="M20 8.5V7a2 2 0 0 0-2-2H5a2 2 0 0 1 0-4h13.5" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16V8.5H5" />
      <path d="M17 14.5h.01" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="m7 15 4-5 3 3 5-6" />
    </>
  ),
  doc: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h5" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="m9 13.2-1.2 7.3L12 18l4.2 2.5-1.2-7.3" />
      <path d="m10.3 9 1.2 1.2 2.4-2.4" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10.4 21a2 2 0 0 0 3.2 0" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  star: (
    <path d="M12 3.5l2.5 5.4 5.9.7-4.4 4 1.2 5.9-5.2-3-5.2 3 1.2-5.9-4.4-4 5.9-.7L12 3.5Z" />
  )
};

function Icon({ name, size = 20, strokeWidth = 1.7, className = '' }) {
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {ICONS[name]}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  Brand                                                                     */
/* -------------------------------------------------------------------------- */

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="C.A.R.E — back to top">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none">
          <path
            d="M21.6 9.3a8.4 8.4 0 1 0 0 13.4"
            stroke="currentColor"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <circle cx="24" cy="16" r="2.2" fill="currentColor" />
        </svg>
      </span>
      <span className="brand-word">C.A.R.E</span>
    </a>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                    */
/* -------------------------------------------------------------------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`navbar${scrolled ? ' is-scrolled' : ''}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container navbar-inner">
        <Brand />

        <nav className="nav-links" aria-label="Primary">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#download">Install</a>
          <a href="#faq">FAQ</a>
        </nav>

        <a
          className="btn btn-primary btn-compact nav-cta"
          href={APK_URL}
          download
          aria-label="Download APK for Android"
        >
          <Icon name="download" size={16} />
          <span>Download APK</span>
        </a>
      </div>
    </motion.header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function PhoneMockup() {
  const quickActions = [
    { icon: 'doc', label: 'Apply' },
    { icon: 'wallet', label: 'Pay' },
    { icon: 'chart', label: 'Records' }
  ];

  return (
    <div className="hero-visual" aria-hidden="true">
      <span className="hero-halo" />
      <span className="hero-ring" />

      <div className="phone-wrap">
        <motion.div
          className="float-card float-card--top"
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="float-icon float-icon--green">
            <Icon name="check" size={14} strokeWidth={2.4} />
          </span>
          <div>
            <p className="float-title">Application approved</p>
            <p className="float-sub">₱5,000 · Tuition assistance</p>
          </div>
        </motion.div>

        <motion.div
          className="phone"
          initial={{ opacity: 0, y: 44, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -1.6 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="phone-screen">
          <span className="phone-glare" />
          <span className="phone-notch" />

          <div className="status-bar">
            <span>9:41</span>
            <span className="status-icons">
              <i className="status-signal" />
              <i className="status-wifi" />
              <i className="status-battery" />
            </span>
          </div>

          <div className="app-body">
            <div className="app-header">
              <div>
                <p className="app-eyebrow">Good morning</p>
                <h4>Emmanuel</h4>
              </div>
              <span className="app-avatar">E</span>
            </div>

            <div className="app-balance">
              <div className="app-balance-top">
                <span>Outstanding balance</span>
                <Icon name="lock" size={11} />
              </div>
              <div className="app-balance-amount">
                ₱12,500<span>.00</span>
              </div>
              <div className="app-balance-meta">
                <span>Next due · Nov 15</span>
                <span className="app-pill">On track</span>
              </div>
              <div className="app-progress">
                <span style={{ width: '62%' }} />
              </div>
            </div>

            <div className="app-actions">
              {quickActions.map((action) => (
                <span className="app-action" key={action.label}>
                  <Icon name={action.icon} size={16} />
                  <em>{action.label}</em>
                </span>
              ))}
            </div>

            <div className="app-activity">
              <div className="app-activity-head">
                <span>Recent activity</span>
                <span className="app-link">View all</span>
              </div>

              <div className="app-row">
                <span className="app-row-icon app-row-icon--green">
                  <Icon name="check" size={12} strokeWidth={2.4} />
                </span>
                <div className="app-row-text">
                  <strong>Payment received</strong>
                  <span>GCash · Oct 12</span>
                </div>
                <span className="app-row-amount app-row-amount--green">+₱1,250</span>
              </div>

              <div className="app-row">
                <span className="app-row-icon app-row-icon--gold">
                  <Icon name="badge" size={12} />
                </span>
                <div className="app-row-text">
                  <strong>Loan approved</strong>
                  <span>Tuition · Oct 03</span>
                </div>
                <span className="app-row-amount">₱5,000</span>
              </div>
            </div>

            <div className="app-next">
              <div className="app-next-head">
                <span>Next payment</span>
                <span>Nov 15</span>
              </div>
              <div className="app-next-row">
                <strong>₱1,250.00</strong>
                <span className="app-next-btn">Pay now</span>
              </div>
            </div>

            <div className="app-tabbar">
              <span className="app-tab is-active">
                <Icon name="chart" size={14} />
              </span>
              <span className="app-tab">
                <Icon name="wallet" size={14} />
              </span>
              <span className="app-tab">
                <Icon name="doc" size={14} />
              </span>
              <span className="app-tab">
                <Icon name="bell" size={14} />
              </span>
            </div>
          </div>
        </div>
      </motion.div>

        <motion.div
          className="float-card float-card--bottom"
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="float-icon float-icon--rose">
            <Icon name="wallet" size={14} />
          </span>
          <div>
            <p className="float-title">Payment received</p>
            <p className="float-sub">₱1,250.00 via GCash</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.span className="eyebrow" variants={fadeUp}>
            <span className="eyebrow-dot" />
            Official CDSGA student app
            <span className="eyebrow-rule" />
            Android
          </motion.span>

          <motion.h1 className="hero-title" variants={fadeUp}>
            Student loans,
            <br />
            <em className="accent">without the paperwork.</em>
          </motion.h1>

          <motion.p className="hero-lede" variants={fadeUp}>
            Apply, track, and settle your student loan from your phone. C.A.R.E
            keeps every requirement, receipt, and peso in one calm, secure place
            — built for Colegio de San Gabriel Arcangel.
          </motion.p>

          <motion.div className="hero-actions" variants={fadeUp}>
            <a
              className="btn btn-primary btn-download"
              href={APK_URL}
              download
              aria-label="Download APK for Android"
            >
              <span className="btn-icon">
                <Icon name="android" size={22} />
              </span>
              <span className="btn-label">
                <strong>Download APK</strong>
                <small>v1.0 · ~32 MB · Android</small>
              </span>
              <span className="btn-arrow">
                <Icon name="download" size={16} />
              </span>
            </a>

            <a className="btn btn-ghost" href="#features">
              Explore features
              <Icon name="arrow" size={16} />
            </a>
          </motion.div>

          <motion.div className="hero-trust" variants={fadeUp}>
            <span className="trust-item">
              <Icon name="shield" size={15} />
              Verified student accounts
            </span>
            <span className="trust-sep" />
            <span className="trust-item">
              <Icon name="lock" size={15} />
              Your data stays private
            </span>
          </motion.div>
        </motion.div>

        <PhoneMockup />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Payment rails                                                             */
/* -------------------------------------------------------------------------- */

function Rails() {
  const rails = [
    { name: 'GCash', tone: 'blue' },
    { name: 'Maya', tone: 'green' },
    { name: 'InstaPay', tone: 'teal' },
    { name: 'Bank transfer', tone: 'gold' },
    { name: 'Cash', tone: 'neutral' }
  ];

  return (
    <div className="rails">
      <div className="container rails-inner">
        <span className="rails-label">Pay through</span>
        <div className="rails-list">
          {rails.map((rail) => (
            <span className={`rail rail--${rail.tone}`} key={rail.name}>
              <i />
              {rail.name}
            </span>
          ))}
        </div>
        <span className="rails-note">Instant in-app receipts</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Live stats                                                                */
/* -------------------------------------------------------------------------- */

const formatCount = (value) => new Intl.NumberFormat('en-PH').format(value);

const formatPeso = (value) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value);

function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (typeof target !== 'number' || Number.isNaN(target)) return undefined;

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setValue(target);
      return undefined;
    }

    let frame;
    let start;

    const tick = (now) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

function Stat({ label, value, format, note }) {
  const animated = useCountUp(value);
  const ready = typeof value === 'number' && !Number.isNaN(value);

  return (
    <div className="stat">
      <span className="stat-label">
        <i />
        {label}
      </span>
      <div className="stat-value">{ready ? format(animated) : '—'}</div>
      <p className="stat-note">{note}</p>
    </div>
  );
}

function LiveStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;

    if (typeof fetch !== 'function') return undefined;

    fetch('https://loanmanagerbackend-4z2g.onrender.com/public-stats')
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled && data.success) {
          setStats({
            students: Number(data.totalStudents) || 0,
            loans: Number(data.totalLoans) || 0,
            disbursed: Number(data.totalDisbursed) || 0
          });
        }
      })
      .catch(() => {
        /* Stats are decorative — fail quietly if the API is unavailable. */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Only show the band once there is real activity to display.
  const hasStats =
    stats &&
    (stats.students > 0 || stats.loans > 0 || stats.disbursed > 0);

  if (!hasStats) return null;

  return (
    <section className="section stats-section" id="stats">
      <div className="container">
        <motion.div
          className="stats-panel"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="stats-heading">
            <span className="eyebrow eyebrow--small">
              <span className="eyebrow-dot" />
              Live from the app
            </span>
            <h2>
              The app, <em className="accent">in numbers.</em>
            </h2>
            <p>
              A running view of the C.A.R.E community. Figures update
              automatically as students apply, get approved, and repay.
            </p>
          </div>

          <div className="stats-grid">
            <Stat
              label="Students registered"
              value={stats ? stats.students : null}
              format={formatCount}
              note="Verified accounts on the platform"
            />
            <Stat
              label="Loans processed"
              value={stats ? stats.loans : null}
              format={formatCount}
              note="Applications reviewed and approved"
            />
            <Stat
              label="Total disbursed"
              value={stats ? stats.disbursed : null}
              format={formatPeso}
              note="Released to students to date"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Features                                                                  */
/* -------------------------------------------------------------------------- */

function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Everything included
            </span>
            <h2>
              Built for the way
              <br />
              <em className="accent">students actually live.</em>
            </h2>
          </div>
          <p>
            No queues, no paper forms, no guessing. C.A.R.E puts your entire
            student loan — from first application to final payment — in one
            place that fits in your pocket.
          </p>
        </motion.div>

        <motion.div
          className="bento"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
        >
          <motion.article
            className="bento-card bento-card--wide"
            variants={fadeUp}
            whileHover={{ y: -4 }}
          >
            <div className="bento-split">
              <div className="bento-copy">
                <span className="bento-icon tint-rose">
                  <Icon name="doc" size={19} />
                </span>
                <h3>Apply in under two minutes.</h3>
                <p>
                  Choose your program, amount, and term, then submit. No
                  printers. No queues. No paper trail.
                </p>
              </div>

              <div className="mock-form">
                <div className="mock-form-head">
                  <span>New application</span>
                  <span className="mock-step">Step 2 of 3</span>
                </div>
                <div className="mock-row">
                  <span>Loan program</span>
                  <strong>Tuition assistance</strong>
                </div>
                <div className="mock-row">
                  <span>Amount</span>
                  <strong className="mock-amount">₱5,000</strong>
                </div>
                <div className="mock-row">
                  <span>Term</span>
                  <strong>4 months</strong>
                </div>
                <div className="mock-progress">
                  <span className="on" />
                  <span className="on" />
                  <span />
                </div>
                <div className="mock-submit">Continue</div>
              </div>
            </div>
          </motion.article>

          <motion.article
            className="bento-card bento-card--mid"
            variants={fadeUp}
            whileHover={{ y: -4 }}
          >
            <span className="bento-icon tint-green">
              <Icon name="wallet" size={19} />
            </span>
            <h3>Pay the way you already do.</h3>
            <p>
              Settle dues through GCash, Maya, InstaPay, or a bank transfer —
              then keep the receipt inside the app.
            </p>

            <div className="pay-grid" aria-hidden="true">
              {[
                { name: 'GCash', tone: 'blue', mark: 'G' },
                { name: 'Maya', tone: 'green', mark: 'M' },
                { name: 'InstaPay', tone: 'teal', mark: 'I' },
                { name: 'Bank', tone: 'gold', mark: 'B' }
              ].map((method) => (
                <span className="pay-chip" key={method.name}>
                  <span className={`pay-dot pay-dot--${method.tone}`}>
                    {method.mark}
                  </span>
                  {method.name}
                </span>
              ))}
            </div>
          </motion.article>

          <motion.article
            className="bento-card bento-card--third"
            variants={fadeUp}
            whileHover={{ y: -4 }}
          >
            <span className="bento-icon tint-gold">
              <Icon name="chart" size={19} />
            </span>
            <h3>See every peso.</h3>
            <p>
              A live balance, amortization schedule, and full payment history.
              Know exactly what is next.
            </p>

            <div className="chart" aria-hidden="true">
              {[38, 52, 44, 66, 58, 80, 100].map((height, index) => (
                <span
                  key={index}
                  className={index === 6 ? 'is-current' : ''}
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <div className="chart-footer">
              <span>Remaining balance</span>
              <strong>₱12,500.00</strong>
            </div>
          </motion.article>

          <motion.article
            className="bento-card bento-card--third"
            variants={fadeUp}
            whileHover={{ y: -4 }}
          >
            <span className="bento-icon tint-violet">
              <Icon name="shield" size={19} />
            </span>
            <h3>Security, by default.</h3>
            <p>
              Hashed passwords, row-level security, and access controlled by
              your school. Your records stay yours.
            </p>

            <div className="security-visual" aria-hidden="true">
              <span className="security-ring">
                <Icon name="shield" size={26} />
              </span>
              <span className="security-tag">bcrypt</span>
              <span className="security-tag security-tag--right">RLS</span>
            </div>
          </motion.article>

          <motion.article
            className="bento-card bento-card--third"
            variants={fadeUp}
            whileHover={{ y: -4 }}
          >
            <span className="bento-icon tint-blue">
              <Icon name="badge" size={19} />
            </span>
            <h3>Verified by your school.</h3>
            <p>
              Every account is reviewed by a CDSGA manager, so approvals and
              records come from a source you trust.
            </p>

            <div className="verify-card" aria-hidden="true">
              <span className="verify-check">
                <Icon name="check" size={11} strokeWidth={2.6} />
              </span>
              <div className="verify-lines">
                <span />
                <span />
              </div>
              <span className="verify-tag">Verified</span>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  How it works                                                              */
/* -------------------------------------------------------------------------- */

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Apply',
      text: 'Pick your loan program, amount, and term. Upload your school ID and enrollment proof once.'
    },
    {
      number: '02',
      title: 'Get approved',
      text: 'A school manager reviews your application. You get a notification the moment it is approved.'
    },
    {
      number: '03',
      title: 'Pay on your terms',
      text: 'Settle monthly dues in-app with GCash, Maya, InstaPay, or bank transfer. Every receipt stays saved.'
    }
  ];

  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <motion.div
          className="section-head section-head--center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Three steps
            </span>
            <h2>
              From application to
              <br />
              <em className="accent">paid, in one app.</em>
            </h2>
          </div>
          <p>
            C.A.R.E removes the back-and-forth. Here is the whole journey —
            start to finish.
          </p>
        </motion.div>

        <div className="steps">
          {steps.map((step, index) => (
            <motion.article
              className="step"
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <span className="step-line" aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Download                                                                  */
/* -------------------------------------------------------------------------- */

function Download() {
  const installSteps = [
    'Tap “Download APK” and wait for the file to finish saving.',
    'Open the file, then allow installs from your browser if Android asks.',
    'Sign in with your student number and password.'
  ];

  return (
    <section className="section download-section" id="download">
      <div className="container">
        <motion.div
          className="download-panel"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="download-glow" aria-hidden="true" />
          <span className="download-grid" aria-hidden="true" />

          <div className="download-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Get the app
            </span>

            <h2>
              Take C.A.R.E
              <br />
              <em className="accent">with you.</em>
            </h2>

            <p>
              Download the official Android app and keep your student loan
              within reach — free for every CDSGA student.
            </p>

            <a
              className="btn btn-primary btn-download btn-download--large"
              href={APK_URL}
              download
              aria-label="Download APK for Android"
            >
              <span className="btn-icon">
                <Icon name="android" size={24} />
              </span>
              <span className="btn-label">
                <strong>Download APK</strong>
                <small>v1.0 · ~32 MB · Android 5.0+</small>
              </span>
              <span className="btn-arrow">
                <Icon name="download" size={17} />
              </span>
            </a>

            <p className="download-fineprint">
              No Google Play account needed. Installs directly from your
              browser.
            </p>
          </div>

          <div className="install-card">
            <div className="install-head">
              <span>Install in three steps</span>
              <span className="install-badge">APK</span>
            </div>

            <ol className="install-list">
              {installSteps.map((step, index) => (
                <li key={step}>
                  <span className="install-num">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="install-note">
              <Icon name="info" size={15} />
              <p>
                Android may warn you about installing outside Google Play. That
                is normal for school-distributed apps. You can switch the
                permission off again afterwards.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

const FAQS = [
  {
    q: 'Is C.A.R.E free to use?',
    a: 'Yes. The app is free for all Colegio de San Gabriel Arcangel students. There is no download fee and no subscription.'
  },
  {
    q: 'Is my information safe?',
    a: 'Passwords are hashed with bcrypt, and records are protected by row-level security on the backend. Only you and authorised school managers can access your loan details.'
  },
  {
    q: 'Why does Android warn me when installing?',
    a: 'C.A.R.E is distributed directly rather than through Google Play, so Android asks you to allow installs from your browser. This is normal. You can turn the permission off again once the app is installed.'
  },
  {
    q: 'I forgot my password. What should I do?',
    a: 'Tap “Forgot Password” on the login screen and follow the steps, or contact your school manager to have your account reset.'
  },
  {
    q: 'Which devices are supported?',
    a: 'C.A.R.E runs on Android 5.0 and above. There is no iOS version at the moment.'
  },
  {
    q: 'How do I make a payment?',
    a: 'Open the app, choose the amount due, and pay via GCash, Maya, InstaPay, or bank transfer. Keep your reference number so the payment can be matched to your account.'
  }
];

function FaqItem({ item, index, openIndex, setOpenIndex }) {
  const isOpen = openIndex === index;
  const buttonId = `faq-button-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <div className={`faq-item${isOpen ? ' is-open' : ''}`}>
      <button
        type="button"
        className="faq-question"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setOpenIndex(isOpen ? null : index)}
      >
        <span>{item.q}</span>
        <span className="faq-icon">
          <Icon name="plus" size={14} strokeWidth={2} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="faq-answer"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-layout">
        <motion.div
          className="faq-intro"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Good to know
          </span>
          <h2>
            Questions,
            <br />
            <em className="accent">answered.</em>
          </h2>
          <p>
            Everything you need to know before you download. Still stuck? Your
            school manager can help with account and loan concerns.
          </p>
          <a className="faq-contact" href="#download">
            See the install guide
            <Icon name="arrowUpRight" size={15} />
          </a>
        </motion.div>

        <motion.div
          className="faq-list"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{
            duration: 0.7,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {FAQS.map((item, index) => (
            <FaqItem
              key={item.q}
              item={item}
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand />
            <p>
              The official student loan manager for Colegio de San Gabriel
              Arcangel. Apply, track, and repay — all from your Android phone.
            </p>
            <span className="footer-chip">
              <Icon name="android" size={14} />
              Android · v1.0
            </span>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h4>App</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How it works</a>
              <a href="#download">Install</a>
            </div>
            <div className="footer-col">
              <h4>Support</h4>
              <a href="#faq">FAQ</a>
              <a href="#download">Install guide</a>
              <a href={APK_URL} download>
                Download APK
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} C.A.R.E · Colegio de San Gabriel Arcangel</p>
          <p className="footer-made">
            Made for students
            <span className="footer-dot" />
            Philippines
          </p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Ambient background + mobile CTA                                           */
/* -------------------------------------------------------------------------- */

function BackgroundFx() {
  return (
    <div className="bg-fx" aria-hidden="true">
      <span className="bg-grid" />
      <span className="bg-noise" />
      <span className="bg-orb bg-orb--one" />
      <span className="bg-orb bg-orb--two" />
      <span className="bg-orb bg-orb--three" />
    </div>
  );
}

function MobileCta() {
  return (
    <div className="mobile-cta">
      <div className="mobile-cta-copy">
        <strong>C.A.R.E for Android</strong>
        <span>Free · v1.0</span>
      </div>
      <a
        className="btn btn-primary btn-compact"
        href={APK_URL}
        download
        aria-label="Download APK for Android"
      >
        <Icon name="download" size={15} />
        Download APK
      </a>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  App                                                                       */
/* -------------------------------------------------------------------------- */

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="site" id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <BackgroundFx />
        <Navbar />

        <main id="main">
          <Hero />
          <Rails />
          <LiveStats />
          <Features />
          <HowItWorks />
          <Download />
          <Faq />
        </main>

        <Footer />
        <MobileCta />
      </div>
    </MotionConfig>
  );
}
