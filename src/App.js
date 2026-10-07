import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } }
};

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Install />
      <FAQ />
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="nav-inner">
        <span className="nav-logo">C.A.R.E</span>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how">How It Works</a>
          <a href="#install">Install</a>
          <a href="#faq">FAQ</a>
        </div>
        <a href="/download/app.apk" className="nav-download" download>
          Download
        </a>
      </div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <motion.section
      className="hero"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      <motion.div className="hero-badge" variants={fadeUp}>
        <span>📱 Android App</span>
      </motion.div>

      <motion.h1 className="hero-title" variants={fadeUp}>
        Education Funding <br />Made Easy
      </motion.h1>

      <motion.p className="hero-subtitle" variants={fadeUp}>
        C.A.R.E is the official student loan management app for
        Colegio de San Gabriel Arcangel. Apply, track, and pay — all in one app.
      </motion.p>

      <motion.div className="hero-actions" variants={fadeUp}>
        <a href="/download/app.apk" className="btn-primary" download>
          ⬇ Download the App
        </a>
        <a href="#features" className="btn-secondary">
          Learn More
        </a>
      </motion.div>

      <motion.p className="hero-meta" variants={fadeUp}>
        Android 5.0+ • 15 MB • Version 1.0
      </motion.p>

      <motion.div
        className="phone-mockup"
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="phone-screen">
          <div className="phone-header">Hello, Kenneth!</div>
          <div className="phone-card">
            <div className="phone-label">Total Available</div>
            <div className="phone-amount">₱5,000.00</div>
          </div>
          <div className="phone-row"></div>
          <div className="phone-row"></div>
        </div>
      </motion.div>
    </motion.section>
  );
}

function Features() {
  const items = [
    { icon: '📝', title: 'Apply Online', desc: 'Submit a loan application in under 2 minutes.' },
    { icon: '💰', title: 'Multiple Payments', desc: 'Pay via GCash, Maya, card, or bank transfer.' },
    { icon: '📊', title: 'Track Balance', desc: 'View your amortization and remaining balance.' },
    { icon: '📄', title: 'Upload Documents', desc: 'Submit IDs and enrollment proof securely.' },
    { icon: '🔒', title: 'Verified Accounts', desc: 'Every student is verified by school managers.' },
    { icon: '📱', title: 'Access Anywhere', desc: 'Check your loan status anytime, anywhere.' },
  ];

  return (
    <section id="features" className="section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        Everything you need
      </motion.h2>

      <motion.div
        className="features-grid"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((f) => (
          <motion.div
            key={f.title}
            className="feature-card"
            variants={fadeUp}
            whileHover={{ y: -6 }}
          >
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: '01', title: 'Apply', desc: 'Fill out the loan form inside the app.' },
    { n: '02', title: 'Get Approved', desc: 'A school manager reviews and approves your loan.' },
    { n: '03', title: 'Pay Easily', desc: 'Pay via GCash, Maya, bank, or cash — on your schedule.' },
  ];

  return (
    <section id="how" className="section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        How It Works
      </motion.h2>

      <div className="steps-grid">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            className="step-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <div className="step-number">{s.n}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Install() {
  const steps = [
    'Tap the Download button above.',
    'Open the downloaded C.A.R.E.apk file.',
    'If Android asks, allow "Install from unknown sources".',
    'Install the app and open it.',
    'Log in with your student number.',
  ];

  return (
    <section id="install" className="section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        How to Install
      </motion.h2>

      <motion.ol
        className="install-list"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {steps.map((s, i) => (
          <motion.li key={i} variants={fadeUp}>
            <span className="install-num">{i + 1}</span>
            <span>{s}</span>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: 'Is the app free?', a: 'Yes. C.A.R.E is free for all CDSGA students.' },
    { q: 'Is my data safe?', a: 'Yes. Passwords are hashed with bcrypt, and all data is protected by Row Level Security on the backend.' },
    { q: 'What if I forget my password?', a: 'Use the "Forgot Password" link on the login screen, or contact your school manager.' },
    { q: 'Why does Android warn me about unknown sources?', a: 'Because the app is not distributed through Google Play. This is normal for school and thesis apps.' },
  ];

  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="faq-list">
        {faqs.map((f, i) => (
          <motion.div
            key={i}
            className="faq-item"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <button
              className="faq-question"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{f.q}</span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="faq-answer"
                >
                  <p>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p>© 2026 C.A.R.E Student Loan Manager</p>
      <p>Colegio de San Gabriel Arcangel</p>
    </motion.footer>
  );
}

export default App;