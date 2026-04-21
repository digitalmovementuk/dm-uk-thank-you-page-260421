import { startTransition, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  LazyMotion,
  animate,
  domAnimation,
  m,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  HERO_CHIPS,
  NAV_LINKS,
  REVIEWS,
  REVIEW_SUMMARY,
  SLOT_GROUPS,
  STATS,
  STEPS,
} from './content';

const SECTION_REVEAL = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const CARD_REVEAL = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.62,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 12.5 10 17l9-10"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroCheckIcon(props) {
  return (
    <m.svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <m.path
        d="M5 12.5 10 17l9-10"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.72, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
      />
    </m.svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.5 4.5h2.3l1 5-1.9 1.9a15 15 0 0 0 3.7 3.7l1.9-1.9 5 1v2.3a1.5 1.5 0 0 1-1.5 1.5A14.5 14.5 0 0 1 6 6a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="15"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M7.5 3.5v4M16.5 3.5v4M3.5 10.5h17" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#EA4335"
        d="M12 10.2v3.8h5.4a4.7 4.7 0 0 1-2.1 3.1l3.2 2.4c1.9-1.8 3-4.4 3-7.5 0-.6-.1-1.2-.2-1.8H12Z"
      />
      <path
        fill="#34A853"
        d="M12 22a9.9 9.9 0 0 0 6.5-2.3l-3.2-2.4c-.9.6-2 .9-3.3.9a5.8 5.8 0 0 1-5.5-4H3.2v2.5A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.5 14.2a6 6 0 0 1 0-4.4V7.3H3.2a10 10 0 0 0 0 9.4l3.3-2.5Z"
      />
      <path
        fill="#4285F4"
        d="M12 5.8c1.8 0 3.3.6 4.5 1.7l2.7-2.7A10 10 0 0 0 3.2 7.3l3.3 2.5a5.8 5.8 0 0 1 5.5-4Z"
      />
    </svg>
  );
}

function SectionTitle({ eyebrow, title, copy }) {
  return (
    <m.div
      className="section-title"
      variants={SECTION_REVEAL}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </m.div>
  );
}

function Header({ onOpenModal, progress }) {
  return (
    <header className="site-header">
      <div className="scroll-progress-wrap" aria-hidden="true">
        <m.div className="scroll-progress" style={{ scaleX: progress }} />
      </div>
      <div className="shell header-inner">
        <a className="brand" href="#top" aria-label="Digital Movement UK thank you page">
          <img src="brand/logo-color-negative.svg" alt="Digital Movement" />
        </a>
        <nav className="header-nav" aria-label="Page sections">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <m.button
          className="button button--light button--small"
          type="button"
          onClick={onOpenModal}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          Priority Call
        </m.button>
      </div>
    </header>
  );
}

function Hero({ onOpenModal }) {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const motifY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 140]);
  const motifScale = useTransform(scrollYProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.08]);

  return (
    <section id="top" ref={heroRef} className="hero">
      <div className="hero-backdrop" aria-hidden="true" />
      <m.img
        className="hero-motif"
        src="brand/motif-positive.png"
        alt=""
        style={{ y: motifY, scale: motifScale }}
      />
      <div className="shell hero-inner">
        <m.div className="hero-copy" variants={SECTION_REVEAL} initial="hidden" animate="visible">
          <div className="hero-kicker">
            <span className="hero-kicker__dot" />
            Request received
          </div>
          <m.div
            className="hero-confirm"
            initial={{ scale: 0.86, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            <HeroCheckIcon />
          </m.div>
          <h1>
            Thank you. <span>We&apos;ve got your details.</span>
          </h1>
          <p className="hero-lead">
            One of our digital marketing specialists will review your website and come back to you
            within 24 hours.
          </p>
          <div className="hero-status">
            {HERO_CHIPS.map((chip) => (
              <span key={chip} className="hero-chip">
                {chip}
              </span>
            ))}
          </div>
          <div className="hero-actions">
            <m.button
              className="button button--primary"
              type="button"
              onClick={onOpenModal}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <CalendarIcon />
              Book a priority call
            </m.button>
            <m.a
              className="button button--ghost"
              href="tel:02038157992"
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <PhoneIcon />
              Call us now
            </m.a>
          </div>
          <m.div
            className="hero-logo-pill"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src="brand/logo-color-positive.svg" alt="Digital Movement" />
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

function NextStepsSection() {
  return (
    <section id="next-steps" className="section-shell section-shell--soft">
      <div className="shell">
        <SectionTitle
          eyebrow="What happens next"
          title="Three simple steps"
          copy="This part stays quick and clear, just like the prototype."
        />
        <div className="steps-grid">
          {STEPS.map((step, index) => (
            <m.article
              key={step.title}
              className="step-card"
              custom={index}
              variants={CARD_REVEAL}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
            >
              <span className="step-phase">{step.phase}</span>
              <div className="step-index">{String(index + 1).padStart(2, '0')}</div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedStat({ value, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, shouldReduceMotion, value]);

  return (
    <div ref={ref} className="stat-item">
      <strong>
        {displayValue.toLocaleString()}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

function ReviewsSlider() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeReview = REVIEWS[activeIndex];

  useEffect(() => {
    if (shouldReduceMotion) return undefined;
    const timer = window.setInterval(() => {
      startTransition(() => {
        setActiveIndex((current) => (current + 1) % REVIEWS.length);
      });
    }, 4800);
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  const goTo = (index) => {
    startTransition(() => setActiveIndex(index));
  };

  const goPrevious = () => {
    startTransition(() => {
      setActiveIndex((current) => (current - 1 + REVIEWS.length) % REVIEWS.length);
    });
  };

  const goNext = () => {
    startTransition(() => {
      setActiveIndex((current) => (current + 1) % REVIEWS.length);
    });
  };

  return (
    <m.div
      className="reviews-shell"
      variants={SECTION_REVEAL}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="reviews-summary">
        <div className="reviews-summary__chip">
          <GoogleIcon />
          <span>Google Reviews</span>
        </div>
        <div className="reviews-summary__meta">
          <strong>{REVIEW_SUMMARY.rating}</strong>
          <span>Based on {REVIEW_SUMMARY.count}</span>
        </div>
      </div>

      <div className="review-slider">
        <button
          className="review-arrow review-arrow--left"
          type="button"
          onClick={goPrevious}
          aria-label="Previous review"
        >
          <ArrowIcon />
        </button>

        <div className="review-slider__viewport">
          <AnimatePresence mode="wait">
            <m.article
              key={activeReview.name}
              className="review-card"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="review-stars" aria-hidden="true">
                *****
              </div>
              <blockquote>{activeReview.quote}</blockquote>
              <div className="review-meta">
                <strong>{activeReview.name}</strong>
                <span>{activeReview.role}</span>
              </div>
            </m.article>
          </AnimatePresence>
        </div>

        <button
          className="review-arrow"
          type="button"
          onClick={goNext}
          aria-label="Next review"
        >
          <ArrowIcon />
        </button>
      </div>

      <div className="review-dots" aria-label="Review navigation">
        {REVIEWS.map((review, index) => (
          <button
            key={review.name}
            className={index === activeIndex ? 'is-active' : ''}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Show review ${index + 1}`}
            aria-pressed={index === activeIndex}
          />
        ))}
      </div>
    </m.div>
  );
}

function ProofSection() {
  return (
    <section id="proof" className="section-shell section-shell--gradient">
      <div className="shell">
        <SectionTitle
          eyebrow="Proof"
          title="Google reviews and real results"
          copy="This section is shorter now, but still keeps the strongest proof visible."
        />
        <div className="stats-grid">
          {STATS.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </div>
        <ReviewsSlider />
      </div>
    </section>
  );
}

function PrioritySection({ onOpenModal }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="priority-call" className="section-shell section-shell--cta">
      <div className="shell priority-shell">
        <SectionTitle
          eyebrow="Want to speak sooner?"
          title="Book a priority call"
          copy="Pick a slot or call the team directly."
        />
        <div className="priority-actions">
          <m.button
            className="button button--primary button--large"
            type="button"
            onClick={onOpenModal}
            whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
          >
            <CalendarIcon />
            Choose a priority slot
          </m.button>
          <m.a
            className="button button--ghost button--large"
            href="tel:02038157992"
            whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
          >
            <PhoneIcon />
            Call 0203 815 7992
          </m.a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <img className="footer-logo" src="brand/logo-mono-positive.svg" alt="Digital Movement" />
        <p>
          128 City Road, London, EC1V 2NX, United Kingdom
          <br />
          0203 815 7992 | office@digitalmovement.uk
        </p>
      </div>
    </footer>
  );
}

function PriorityModal({ open, onClose }) {
  const [selectedDay, setSelectedDay] = useState(SLOT_GROUPS[0].day);
  const currentSlots = SLOT_GROUPS.find((group) => group.day === selectedDay)?.slots ?? [];

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, open]);

  const chooseDay = (day) => {
    startTransition(() => setSelectedDay(day));
  };

  const bookSlot = (time) => {
    const subject = `Priority call request - ${selectedDay} ${time}`;
    const body =
      "Hi Digital Movement,%0D%0A%0D%0AI'd like to request the " +
      `${selectedDay} ${time}` +
      " priority call slot.%0D%0A%0D%0AName:%0D%0ABusiness:%0D%0AWebsite:%0D%0APhone:%0D%0A%0D%0AThanks";
    window.location.href = `mailto:office@digitalmovement.uk?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <m.div
            className="modal-card"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="priority-modal-title"
          >
            <button className="modal-close" type="button" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </button>
            <img
              className="modal-logo"
              src="brand/logo-color-positive.svg"
              alt="Digital Movement"
            />
            <span className="eyebrow">Priority call</span>
            <h3 id="priority-modal-title">Choose a preferred slot</h3>
            <p>
              Pick the day that works best and we&apos;ll start a ready-made email with that slot
              filled in.
            </p>
            <div className="slot-days" role="tablist" aria-label="Available days">
              {SLOT_GROUPS.map((group) => (
                <button
                  key={group.day}
                  className={selectedDay === group.day ? 'is-active' : ''}
                  type="button"
                  onClick={() => chooseDay(group.day)}
                >
                  {group.day}
                </button>
              ))}
            </div>
            <div className="slot-grid">
              {currentSlots.map((slot) => (
                <m.button
                  key={slot}
                  className="slot-button"
                  type="button"
                  onClick={() => bookSlot(slot)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {slot}
                </m.button>
              ))}
            </div>
            <div className="modal-divider" />
            <div className="modal-direct">
              <a href="tel:02038157992">
                <PhoneIcon />
                Call us instead
              </a>
              <a href="mailto:office@digitalmovement.uk">
                <ArrowIcon />
                Email the team
              </a>
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  return (
    <LazyMotion features={domAnimation}>
      <div className="page-shell">
        <Header onOpenModal={() => setIsModalOpen(true)} progress={scrollYProgress} />
        <main>
          <Hero onOpenModal={() => setIsModalOpen(true)} />
          <NextStepsSection />
          <ProofSection />
          <PrioritySection onOpenModal={() => setIsModalOpen(true)} />
        </main>
        <Footer />
        <PriorityModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </LazyMotion>
  );
}
