import { startTransition, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  CASE_STUDIES,
  CONTACT_DETAILS,
  FEATURED_REVIEW,
  FOOTER_LINK_GROUPS,
  NEXT_STEPS,
  NEXT_STEPS_NOTES,
  REVIEW_SUMMARY,
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

const HERO_CHECK_DRAW_DELAY = 0.28;
const HERO_CHECK_DRAW_DURATION = 0.58;
const HERO_CELEBRATION_MS = 4000;
const CELEBRATION_COLORS = ['#ffd76b', '#ffffff', '#f13c64', '#2166ff', '#d332ff', '#25d366'];
const FIREWORK_ANGLES = Array.from({ length: 18 }, (_, index) => `${index * 20}deg`);
const HERO_FIREWORKS = [
  { left: '50%', top: '28%', color: '#ffd76b', delay: '0.04s', distance: '148px', size: '30px', duration: '1.28s' },
  { left: '50%', top: '30%', color: '#f13c64', delay: '0.18s', distance: '176px', size: '36px', duration: '1.42s' },
  { left: '50%', top: '28%', color: '#ffffff', delay: '0.36s', distance: '202px', size: '24px', duration: '1.26s' },
  { left: '26%', top: '24%', color: '#4d82ff', delay: '0.54s', distance: '124px', size: '22px', duration: '1.12s' },
  { left: '74%', top: '24%', color: '#d332ff', delay: '0.66s', distance: '124px', size: '22px', duration: '1.12s' },
  { left: '18%', top: '34%', color: '#25d366', delay: '0.98s', distance: '112px', size: '18px', duration: '1.04s' },
  { left: '82%', top: '34%', color: '#ffd76b', delay: '1.12s', distance: '112px', size: '18px', duration: '1.04s' },
  { left: '50%', top: '38%', color: '#2166ff', delay: '1.34s', distance: '142px', size: '20px', duration: '1.02s' },
];
const HERO_CONFETTI = Array.from({ length: 78 }, (_, index) => {
  const wave = Math.floor(index / 26);
  const column = index % 26;
  const direction = index % 2 === 0 ? -1 : 1;

  return {
    left: `${2 + column * 3.8 + wave * 0.6}%`,
    top: `${-18 - (index % 4) * 4 - wave * 3}%`,
    size: `${4 + (index % 4)}px`,
    color: CELEBRATION_COLORS[(index + wave) % CELEBRATION_COLORS.length],
    driftX: `${direction * (28 + (column % 6) * 10 + wave * 12)}px`,
    spin: `${direction * (300 + (index % 5) * 32)}deg`,
    delay: `${0.04 * (column % 13) + wave * 0.34}s`,
    duration: `${2.9 + (column % 5) * 0.18 + wave * 0.32}s`,
  };
});

function HeroCheckIcon({ onComplete, ...props }) {
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
        transition={{
          duration: HERO_CHECK_DRAW_DURATION,
          delay: HERO_CHECK_DRAW_DELAY,
          ease: [0.22, 1, 0.36, 1],
        }}
        onAnimationComplete={onComplete}
      />
    </m.svg>
  );
}

function HeroCelebration({ active }) {
  return (
    <AnimatePresence>
      {active ? (
        <m.div
          className="hero-celebration"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <div className="hero-celebration__veil" />
          <div className="hero-confetti">
            {HERO_CONFETTI.map((piece, index) => (
              <span
                key={`${piece.left}-${index}`}
                className="hero-confetti__piece"
                style={{
                  '--left': piece.left,
                  '--top': piece.top,
                  '--size': piece.size,
                  '--color': piece.color,
                  '--drift-x': piece.driftX,
                  '--spin': piece.spin,
                  '--delay': piece.delay,
                  '--duration': piece.duration,
                }}
              />
            ))}
          </div>
          <div className="hero-fireworks">
            {HERO_FIREWORKS.map((burst, index) => (
              <div
                key={`${burst.left}-${index}`}
                className="hero-firework"
                style={{
                  '--left': burst.left,
                  '--top': burst.top,
                  '--color': burst.color,
                  '--delay': burst.delay,
                  '--distance': burst.distance,
                  '--size': burst.size,
                  '--duration': burst.duration,
                }}
              >
                <span className="hero-firework__core" />
                <span className="hero-firework__ring" />
                {FIREWORK_ANGLES.map((angle) => (
                  <span key={angle} className="hero-firework__spark" style={{ '--angle': angle }} />
                ))}
              </div>
            ))}
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
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

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 21a8.6 8.6 0 0 1-4.1-1l-4 1 1.1-3.8A8.7 8.7 0 1 1 12 21Z"
        fill="currentColor"
        opacity="0.14"
      />
      <path
        d="M12 20a8 8 0 0 1-4-1.1l-3 0.8 0.8-2.9A8 8 0 1 1 12 20Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.8c.2-.4.4-.4.7-.4h.6c.2 0 .4 0 .5.4l.6 1.4c.1.3 0 .5-.1.7l-.5.6c-.1.1-.2.3-.1.5.3.6.7 1.2 1.3 1.7.6.5 1.2 1 1.9 1.2.2.1.4 0 .5-.1l.6-.7c.2-.2.4-.2.7-.1l1.4.6c.4.2.4.3.4.5v.6c0 .3 0 .5-.4.7-.4.2-1 .4-1.6.3-.9-.1-2-.7-3.2-1.8-1.1-1-1.8-2.1-2-3-.1-.7 0-1.3.2-1.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3.5" y="6" width="17" height="12" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="m5 7.5 6.2 5.2a1.2 1.2 0 0 0 1.6 0L19 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.8 12h16.4M12 3.8c2.3 2.3 3.6 5.2 3.6 8.2S14.3 17.9 12 20.2M12 3.8C9.7 6.1 8.4 9 8.4 12s1.3 5.9 3.6 8.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function LocationIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 21s6-5.2 6-10.5A6 6 0 0 0 6 10.5C6 15.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10.5" r="2.3" stroke="currentColor" strokeWidth="1.8" />
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

function Header({ progress }) {
  return (
    <header className="site-header">
      <div className="scroll-progress-wrap" aria-hidden="true">
        <m.div className="scroll-progress" style={{ scaleX: progress }} />
      </div>
      <div className="shell header-inner">
        <a className="brand" href="#top" aria-label="Digital Movement UK thank you page">
          <img src="brand/logo-color-negative.svg" alt="Digital Movement" />
        </a>
        <m.a
          className="header-call"
          href={CONTACT_DETAILS.phoneHref}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <PhoneIcon />
          Call {CONTACT_DETAILS.phoneDisplay}
        </m.a>
      </div>
    </header>
  );
}

function Hero({ heroProgress, heroRef, primaryActionRef, onCheckAnimationComplete }) {
  const shouldReduceMotion = useReducedMotion();
  const motifY = useTransform(heroProgress, [0, 1], [0, shouldReduceMotion ? 0 : 140]);
  const motifScale = useTransform(heroProgress, [0, 1], [1, shouldReduceMotion ? 1 : 1.08]);

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
          <m.div
            className="hero-confirm"
            initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.56, rotate: -16, opacity: 0 }}
            animate={
              shouldReduceMotion
                ? { scale: 1, rotate: 0, opacity: 1 }
                : {
                    scale: [0.56, 1.16, 0.95, 1.03, 1],
                    rotate: [-16, 5, -3, 1, 0],
                    opacity: [0, 1, 1, 1, 1],
                  }
            }
            transition={{
              duration: shouldReduceMotion ? 0.18 : 0.98,
              delay: 0.04,
              times: shouldReduceMotion ? undefined : [0, 0.42, 0.68, 0.84, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <HeroCheckIcon onComplete={onCheckAnimationComplete} />
          </m.div>
          <span className="eyebrow eyebrow--hero">Enquiry Received</span>
          <h1>THANK YOU</h1>
          <p className="hero-lead">
            We&apos;ve got your details. If you want to move faster, message us on WhatsApp and
            we&apos;ll get things moving.
          </p>
          <div className="hero-actions">
            <m.a
              ref={primaryActionRef}
              className="hero-whatsapp"
              href={CONTACT_DETAILS.whatsappHref}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="hero-whatsapp__icon">
                <WhatsAppIcon />
              </span>
              <span className="hero-whatsapp__copy">
                <strong>Contact us via WhatsApp</strong>
                <span>{CONTACT_DETAILS.whatsappDisplay}</span>
              </span>
            </m.a>
            <m.a
              className="hero-call-link"
              href={CONTACT_DETAILS.phoneHref}
              whileHover={{ opacity: 1, y: -1 }}
              whileTap={{ scale: 0.99 }}
            >
              <PhoneIcon />
              Prefer to call? {CONTACT_DETAILS.phoneDisplay}
            </m.a>
          </div>
        </m.div>
      </div>
    </section>
  );
}

function StickyPriorityBar({ visible }) {
  return (
    <AnimatePresence>
      {visible ? (
        <m.div
          className="sticky-priority"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sticky-priority__inner">
            <p>Need a faster start?</p>
            <m.a
              className="button sticky-priority__cta sticky-priority__cta--whatsapp"
              href={CONTACT_DETAILS.whatsappHref}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
            >
              <WhatsAppIcon />
              Contact us via WhatsApp
            </m.a>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

function GoogleReviewSection() {
  return (
    <section id="reviews" className="section-shell section-shell--reviews">
      <div className="shell">
        <SectionTitle
          eyebrow="Google review"
          title="Trusted by business owners"
          copy="One strong review is enough to show the standard."
        />
        <m.article
          className="review-feature"
          variants={SECTION_REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="review-feature__summary">
            <div className="review-feature__chip">
              <GoogleIcon />
              <span>Google Rating</span>
            </div>
            <div className="review-feature__meta">
              <strong>{REVIEW_SUMMARY.rating}</strong>
              <span>Based on {REVIEW_SUMMARY.count}</span>
            </div>
          </div>
          <div className="review-feature__stars" aria-hidden="true">
            *****
          </div>
          <blockquote>{FEATURED_REVIEW.quote}</blockquote>
          <div className="review-feature__person">
            <strong>{FEATURED_REVIEW.name}</strong>
            <span>{FEATURED_REVIEW.role}</span>
          </div>
        </m.article>
      </div>
    </section>
  );
}

function CaseStudySlide({ study, index, activeIndex }) {
  return (
    <article className={`case-study-card${activeIndex === index ? ' is-active' : ''}`}>
      <div className="case-study-card__eyebrow-row">
        <span className="eyebrow">{study.eyebrow}</span>
      </div>
      <div className="case-study-card__media">
        <img
          src={study.image}
          alt={study.imageAlt}
          loading="lazy"
          style={{ objectPosition: study.imagePosition }}
        />
      </div>
      <div className="case-study-card__body">
        <p className="case-study-card__person">{study.person}</p>
        <h3>{study.title}</h3>
        <blockquote className="case-study-card__quote">“{study.quote}”</blockquote>
        <p className="case-study-card__copy">{study.copy}</p>
        <div className="case-study-card__result-panel">
          <span className="case-study-card__result-kicker">Key metric</span>
          <div className="case-study-card__result">
            <strong>{study.stat}</strong>
            <span>{study.statLabel}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function StaticCaseStudiesSection() {
  return (
    <section id="case-studies" className="section-shell section-shell--cases">
      <div className="shell">
        <SectionTitle
          eyebrow="Selected results"
          title="Three focused examples"
          copy="A clear scan through three recent proof points."
        />
        <div className="case-study-static-stack">
          {CASE_STUDIES.map((study, index) => (
            <m.div
              key={study.title}
              className="case-study-static-item"
              custom={index}
              variants={CARD_REVEAL}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <CaseStudySlide study={study} index={index} activeIndex={index} />
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudiesSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const sliderViewportRef = useRef(null);
  const sliderTrackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [layoutMetrics, setLayoutMetrics] = useState({
    slideStep: 0,
    entryHoldDistance: 160,
    exitHoldDistance: 220,
    sectionHeight: 1320,
  });
  const [lockState, setLockState] = useState('before');
  const sectionProgress = useMotionValue(0);
  const maxTranslate = layoutMetrics.slideStep * (CASE_STUDIES.length - 1);
  const scrollSpan =
    layoutMetrics.entryHoldDistance + maxTranslate + layoutMetrics.exitHoldDistance;
  const slideStartRatio =
    maxTranslate > 0 && scrollSpan > 0 ? layoutMetrics.entryHoldDistance / scrollSpan : 0;
  const slideEndRatio =
    maxTranslate > 0 && scrollSpan > 0
      ? (layoutMetrics.entryHoldDistance + maxTranslate) / scrollSpan
      : 1;
  const carouselProgress = useTransform(sectionProgress, (latest) => {
    if (maxTranslate <= 0) {
      return 0;
    }

    if (latest <= slideStartRatio) {
      return 0;
    }

    if (latest >= slideEndRatio) {
      return 1;
    }

    return (latest - slideStartRatio) / Math.max(slideEndRatio - slideStartRatio, 0.0001);
  });
  const sliderX = useTransform(carouselProgress, (latest) => -maxTranslate * latest);

  const syncActiveIndex = (progress) => {
    const nextIndex = Math.min(
      CASE_STUDIES.length - 1,
      Math.round(progress * (CASE_STUDIES.length - 1)),
    );

    startTransition(() => {
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    });
  };

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    const measureLayout = () => {
      const track = sliderTrackRef.current;
      const firstSlide = track?.querySelector('.case-study-slider__slide');
      if (!track || !firstSlide || !sliderViewportRef.current) {
        return;
      }

      const computed = window.getComputedStyle(track);
      const gap = parseFloat(computed.columnGap || computed.gap || '0');
      const nextStep = firstSlide.getBoundingClientRect().width + gap;
      const headerOffset =
        parseFloat(
          window.getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
        ) || 0;
      const viewportHeight = window.innerHeight;
      const stickyHeight = Math.max(360, viewportHeight - headerOffset);
      const isCompactViewport = window.innerWidth < 981;
      const nextEntryHoldDistance = isCompactViewport
        ? Math.max(300, Math.min(420, stickyHeight * 0.4))
        : Math.max(220, Math.min(320, stickyHeight * 0.28));
      const nextExitHoldDistance = isCompactViewport
        ? Math.max(280, Math.min(420, stickyHeight * 0.38))
        : Math.max(240, Math.min(360, stickyHeight * 0.3));
      const nextSectionHeight = Math.ceil(
        stickyHeight +
          nextEntryHoldDistance +
          nextStep * (CASE_STUDIES.length - 1) +
          nextExitHoldDistance,
      );

      startTransition(() => {
        setLayoutMetrics((current) => {
          const isSameStep = Math.abs(current.slideStep - nextStep) < 1;
          const isSameEntryHold = Math.abs(current.entryHoldDistance - nextEntryHoldDistance) < 1;
          const isSameExitHold = Math.abs(current.exitHoldDistance - nextExitHoldDistance) < 1;
          const isSameHeight = Math.abs(current.sectionHeight - nextSectionHeight) < 2;

          if (isSameStep && isSameEntryHold && isSameExitHold && isSameHeight) {
            return current;
          }

          return {
            slideStep: nextStep,
            entryHoldDistance: nextEntryHoldDistance,
            exitHoldDistance: nextExitHoldDistance,
            sectionHeight: nextSectionHeight,
          };
        });
      });
    };

    measureLayout();

    const resizeObserver = new ResizeObserver(() => {
      measureLayout();
    });

    if (sliderViewportRef.current) {
      resizeObserver.observe(sliderViewportRef.current);
    }

    const firstSlide = sliderTrackRef.current?.querySelector('.case-study-slider__slide');
    if (firstSlide) {
      resizeObserver.observe(firstSlide);
    }

    window.addEventListener('resize', measureLayout);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measureLayout);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    let frameId = 0;

    const syncSectionProgress = () => {
      frameId = 0;

      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const headerOffset =
        parseFloat(
          window.getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
        ) || 0;
      const viewportHeight = window.innerHeight;
      const stickyHeight = Math.max(360, viewportHeight - headerOffset);
      const scrollSpan = Math.max(section.offsetHeight - stickyHeight, 1);
      const rect = section.getBoundingClientRect();
      const nextProgress = Math.max(0, Math.min(1, (headerOffset - rect.top) / scrollSpan));

      sectionProgress.set(nextProgress);
    };

    const queueSectionProgressSync = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(syncSectionProgress);
    };

    queueSectionProgressSync();

    const resizeObserver = new ResizeObserver(() => {
      queueSectionProgressSync();
    });

    if (sectionRef.current) {
      resizeObserver.observe(sectionRef.current);
    }

    window.addEventListener('scroll', queueSectionProgressSync, { passive: true });
    window.addEventListener('resize', queueSectionProgressSync);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      resizeObserver.disconnect();
      window.removeEventListener('scroll', queueSectionProgressSync);
      window.removeEventListener('resize', queueSectionProgressSync);
    };
  }, [layoutMetrics.sectionHeight, sectionProgress, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    const syncLockState = (latest) => {
      let nextState = 'before';

      if (latest >= 0.995) {
        nextState = 'after';
      } else if (latest >= slideEndRatio && maxTranslate > 0) {
        nextState = 'hold';
      } else if (latest > slideStartRatio + 0.001) {
        nextState = 'sliding';
      }

      startTransition(() => {
        setLockState((current) => (current === nextState ? current : nextState));
      });
    };

    syncActiveIndex(carouselProgress.get());
    syncLockState(sectionProgress.get());

    const unsubscribeProgress = carouselProgress.on('change', syncActiveIndex);
    const unsubscribeSection = sectionProgress.on('change', syncLockState);

    return () => {
      unsubscribeProgress();
      unsubscribeSection();
    };
  }, [carouselProgress, maxTranslate, sectionProgress, shouldReduceMotion, slideEndRatio, slideStartRatio]);

  if (shouldReduceMotion) {
    return <StaticCaseStudiesSection />;
  }

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="section-shell section-shell--cases case-study-lock"
      data-lock-state={lockState}
      style={{ '--case-study-section-height': `${layoutMetrics.sectionHeight}px` }}
    >
      <div className="case-study-lock__sticky">
        <div className="shell case-study-lock__inner">
          <m.div
            className="case-study-lock__title"
            variants={SECTION_REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionTitle
              eyebrow="Selected results"
              title="Scroll through three focused examples"
              copy="This section holds for a moment so you can move through each case study clearly."
            />
            <div className="case-study-lock__progress" aria-label="Case study progress">
              {CASE_STUDIES.map((study, index) => (
                <span
                  key={study.title}
                  className={`case-study-lock__dot${activeIndex === index ? ' is-active' : ''}`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </m.div>
          <div ref={sliderViewportRef} className="case-study-slider">
            <m.div ref={sliderTrackRef} className="case-study-slider__track" style={{ x: sliderX }}>
              {CASE_STUDIES.map((study, index) => (
                <div key={study.title} className="case-study-slider__slide">
                  <CaseStudySlide study={study} index={index} activeIndex={activeIndex} />
                </div>
              ))}
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NextStepsSection() {
  return (
    <section id="next-steps" className="section-shell section-shell--next">
      <div className="shell">
        <SectionTitle
          eyebrow="Next steps"
          title="What happens next"
          copy="Three simple steps."
        />
        <div className="next-steps-flow">
          {NEXT_STEPS.map((step, index) => (
            <m.article
              key={step.number}
              className="next-step"
              custom={index}
              variants={CARD_REVEAL}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <div className="next-step__number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </m.article>
          ))}
        </div>
        <m.div
          className="next-steps-note"
          variants={SECTION_REVEAL}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {NEXT_STEPS_NOTES.map((note) => (
            <span key={note}>{note}</span>
          ))}
        </m.div>
      </div>
    </section>
  );
}

function ContactOptionsSection() {
  return (
    <section className="section-shell section-shell--contact">
      <div className="shell">
        <SectionTitle
          eyebrow="Contact options"
          title="Prefer to speak directly?"
          copy="Choose the quickest way to reach us."
        />
        <div className="contact-options-grid">
          <m.a
            className="contact-option contact-option--whatsapp"
            href={CONTACT_DETAILS.whatsappHref}
            target="_blank"
            rel="noreferrer"
            variants={CARD_REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ y: -4 }}
          >
            <span className="contact-option__icon">
              <WhatsAppIcon />
            </span>
            <strong>WhatsApp</strong>
            <span>{CONTACT_DETAILS.whatsappDisplay}</span>
          </m.a>
          <m.a
            className="contact-option"
            href={CONTACT_DETAILS.phoneHref}
            variants={CARD_REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{ y: -4 }}
          >
            <span className="contact-option__icon">
              <PhoneIcon />
            </span>
            <strong>Call</strong>
            <span>{CONTACT_DETAILS.phoneDisplay}</span>
          </m.a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" id="footer">
      <div className="shell footer-inner">
        <div className="footer-brand">
          <a
            className="footer-logo-link"
            href={CONTACT_DETAILS.websiteHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit digitalmovement.uk"
          >
            <img
              className="footer-logo"
              src="brand/footer-cover-option-2hr.jpg"
              alt="Digital Movement"
            />
          </a>
          <p className="footer-summary">
            Performance-led SEO, web design, and digital growth for businesses across the UK.
          </p>
          <div className="footer-socials" aria-label="Digital Movement links">
            <a
              href={CONTACT_DETAILS.websiteHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit digitalmovement.uk"
              title="digitalmovement.uk"
            >
              <GlobeIcon />
            </a>
            <a
              href={CONTACT_DETAILS.instagramHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Visit Instagram"
              title="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
        <div className="footer-grid">
          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.title} className="footer-column">
              <span className="footer-column__title">{group.title}</span>
              <div className="footer-links">
                {group.links.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div className="footer-column footer-column--contact">
            <span className="footer-column__title">Enquiries</span>
            <div className="footer-contact-list">
              <a href={CONTACT_DETAILS.whatsappHref} target="_blank" rel="noreferrer">
                <WhatsAppIcon />
                <span>WhatsApp {CONTACT_DETAILS.whatsappDisplay}</span>
              </a>
              <a href={CONTACT_DETAILS.phoneHref}>
                <PhoneIcon />
                <span>Call {CONTACT_DETAILS.phoneDisplay}</span>
              </a>
              <a href={`mailto:${CONTACT_DETAILS.email}`}>
                <MailIcon />
                <span>{CONTACT_DETAILS.email}</span>
              </a>
              <a href={CONTACT_DETAILS.mapHref} target="_blank" rel="noreferrer">
                <LocationIcon />
                <span>{CONTACT_DETAILS.addressLines.join(', ')}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {year} Digital Movement. This page is operated by Digital Movement. Privacy
            information is available at{' '}
            <a href={CONTACT_DETAILS.privacyHref} target="_blank" rel="noreferrer">
              digitalmovement.uk/privacy-policy
            </a>
            .
          </p>
          <div className="footer-bottom-links">
            <a href={CONTACT_DETAILS.websiteHref} target="_blank" rel="noreferrer">
              digitalmovement.uk
            </a>
            <a href={CONTACT_DETAILS.instagramHref} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={CONTACT_DETAILS.privacyHref} target="_blank" rel="noreferrer">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [showStickyPriority, setShowStickyPriority] = useState(false);
  const [isHeroPrimaryVisible, setIsHeroPrimaryVisible] = useState(true);
  const [isLastViewportVisible, setIsLastViewportVisible] = useState(false);
  const [isCaseStudiesVisible, setIsCaseStudiesVisible] = useState(false);
  const [isNextStepsVisible, setIsNextStepsVisible] = useState(false);
  const [showHeroCelebration, setShowHeroCelebration] = useState(false);
  const heroRef = useRef(null);
  const primaryActionRef = useRef(null);
  const celebrationTimeoutRef = useRef(null);
  const hasCelebratedRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    const syncStickyPriority = (latest) => {
      const next = latest >= 0.5;

      startTransition(() => {
        setShowStickyPriority((current) => (current === next ? current : next));
      });
    };

    syncStickyPriority(heroScrollProgress.get());
    const unsubscribe = heroScrollProgress.on('change', syncStickyPriority);
    return unsubscribe;
  }, [heroScrollProgress]);

  useEffect(() => {
    const node = primaryActionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        startTransition(() => {
          setIsHeroPrimaryVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.6 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncLastViewportVisibility = () => {
      const doc = document.documentElement;
      const remainingScroll = doc.scrollHeight - window.innerHeight - window.scrollY;
      const next = remainingScroll <= 24;

      startTransition(() => {
        setIsLastViewportVisible((current) => (current === next ? current : next));
      });
    };

    syncLastViewportVisibility();
    window.addEventListener('scroll', syncLastViewportVisibility, { passive: true });
    window.addEventListener('resize', syncLastViewportVisibility);

    return () => {
      window.removeEventListener('scroll', syncLastViewportVisibility);
      window.removeEventListener('resize', syncLastViewportVisibility);
    };
  }, []);

  useEffect(() => {
    const node = document.getElementById('case-studies');
    if (!node) return undefined;

    const syncCaseStudiesVisibility = () => {
      const rect = node.getBoundingClientRect();
      const headerHeight =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
        ) || 0;
      const viewportHeight = window.innerHeight;
      const next =
        rect.top <= viewportHeight + 480 &&
        rect.bottom >= headerHeight + Math.min(160, viewportHeight * 0.18);

      startTransition(() => {
        setIsCaseStudiesVisible((current) => (current === next ? current : next));
      });
    };

    syncCaseStudiesVisibility();
    window.addEventListener('scroll', syncCaseStudiesVisibility, { passive: true });
    window.addEventListener('resize', syncCaseStudiesVisibility);

    return () => {
      window.removeEventListener('scroll', syncCaseStudiesVisibility);
      window.removeEventListener('resize', syncCaseStudiesVisibility);
    };
  }, []);

  useEffect(() => {
    const node = document.getElementById('next-steps');
    if (!node) return undefined;

    const syncNextStepsVisibility = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const next = rect.top <= viewportHeight + 120;

      startTransition(() => {
        setIsNextStepsVisible((current) => (current === next ? current : next));
      });
    };

    syncNextStepsVisibility();
    window.addEventListener('scroll', syncNextStepsVisibility, { passive: true });
    window.addEventListener('resize', syncNextStepsVisibility);

    return () => {
      window.removeEventListener('scroll', syncNextStepsVisibility);
      window.removeEventListener('resize', syncNextStepsVisibility);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (celebrationTimeoutRef.current) {
        clearTimeout(celebrationTimeoutRef.current);
      }
    };
  }, []);

  const handleHeroCheckAnimationComplete = () => {
    if (shouldReduceMotion || hasCelebratedRef.current) {
      return;
    }

    hasCelebratedRef.current = true;
    startTransition(() => {
      setShowHeroCelebration(true);
    });

    celebrationTimeoutRef.current = setTimeout(() => {
      startTransition(() => {
        setShowHeroCelebration(false);
      });
    }, HERO_CELEBRATION_MS);
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="page-shell">
        <HeroCelebration active={showHeroCelebration} />
        <Header progress={scrollYProgress} />
        <main>
          <Hero
            heroProgress={heroScrollProgress}
            heroRef={heroRef}
            primaryActionRef={primaryActionRef}
            onCheckAnimationComplete={handleHeroCheckAnimationComplete}
          />
          <GoogleReviewSection />
          <CaseStudiesSection />
          <NextStepsSection />
          <ContactOptionsSection />
        </main>
        <Footer />
        <StickyPriorityBar
          visible={
            showStickyPriority &&
            !isHeroPrimaryVisible &&
            !isLastViewportVisible &&
            !isCaseStudiesVisible &&
            !isNextStepsVisible
          }
        />
      </div>
    </LazyMotion>
  );
}
