# Digital Movement UK Design System

Project: DM UK Thank You Landing Page  
Prepared: 2026-04-18

## What this is

This document turns the Digital Movement UK brand into one usable system for this project.

It combines:

- the live brand presentation on `https://digitalmovement.uk`
- the local logo pack and social media assets in `Assets/`
- the written brand guide in `Assets/Digital Movement UK - Brand & Colour Reference.docx`
- the tone examples in `Assets/Tone and Voice Martey/Tone of Voice emails.docx`
- the thank-you page prototype in `Assets/Thank You Page prototype/Thank You Page Prototype/Thank You.html`

## The simple version

Digital Movement UK feels:

- bold
- fast
- direct
- premium without being fancy
- results-first
- proof-heavy
- human, not corporate

The brand wins by mixing:

- dark, high-contrast backgrounds
- hot pink and magenta highlights
- a warm orange-to-magenta-to-violet logo gradient
- very bold uppercase headlines
- short plain-English copy
- trust signals early and often

## Source-of-truth model

There are 3 different layers in the source material. They do not match perfectly, so this project needs one clean rule set.

### 1. Brand core

These are the most stable brand assets:

- the logo pack
- the social media motif pack
- the written brand and colour guide

This layer gives us:

- the real logo
- the gradient DNA
- the deep plum/ink wordmark colour
- the social/media accent colours
- the voice principles

### 2. Live-site implementation

The current website adds the product/UI behaviour:

- Axiforma as the live site type system
- very dark charcoal/plum page backgrounds
- bright pink CTA gradients
- rounded pill CTAs
- proof-first landing page structure
- review badges, counters, result cards, video case studies, and contact forms

### 3. Thank-you page recommendation

For the DM UK Thank You Landing Page, the best system is:

- keep the official logo and gradient family from the asset pack
- match the live site's dark/plum interface mood
- use the live site's proof-first landing page patterns
- keep the copy tone warm, blunt, and UK-specific
- treat Poppins as an editable fallback, not the primary web brand face, because the live site is already visually anchored in Axiforma

## Brand personality

### Brand promise

Digital Movement UK does not sell vague marketing. It sells real growth, plain-English advice, and visible proof.

### Personality traits

- Confident: says what it does and what results it aims for.
- Direct: avoids fluff and explains things simply.
- Energetic: uses strong contrast, bold headlines, and bright accents.
- Trust-building: reviews, results, guarantees, and numbers appear early.
- Low-pressure: feels approachable, not pushy.

### Tone keywords

- guaranteed
- real results
- no jargon
- five-star
- free proposal
- page 1
- straightforward
- fast

## Logo system

### Primary marks

Use these files as the master references:

- `Assets/LOGO PACK/Digital Movement Logo Colour Positive.svg`
- `Assets/LOGO PACK/Digital Movement Logo Colour Negative.svg`
- `Assets/LOGO PACK/Digital Movement Logo Mono Positive.svg`
- `Assets/LOGO PACK/Digital Movement Logo Mono Negative.svg`

### What the logo looks like

- The symbol is a stylised `DM` monogram built from rounded linework.
- The monogram carries the gradient energy.
- The wordmark is a rounded geometric sans wordmark in deep plum.
- The logo feels soft-edged, modern, and digital rather than sharp or corporate.

### Logo usage rules

- Use `Colour Positive` on light backgrounds.
- Use `Colour Negative` or `Mono Positive` on dark backgrounds.
- Use the icon mark alone for avatars, favicons, badges, social profile images, and oversized background motifs.
- Keep generous clear space around the logo. A safe rule is at least the height of the logo's `M` stroke.
- Do not redraw the wordmark.
- Do not flatten the gradient into one solid colour unless using an approved mono file.
- Do not place the full-colour logo directly on busy gradients unless it sits inside a clean container.

### Visual motif rules

The social pack shows a repeatable motif:

- crop the `DM` icon very large
- let it bleed off the edges
- place it over a warm orange-magenta-violet gradient field
- use the wordmark in white when the background is saturated

This motif is part of the brand and should be reused for covers, hero accents, and background decorations.

## Colour system

### Core brand colours

| Token | Hex | Use |
| --- | --- | --- |
| DM Ink | `#321F4F` | Main wordmark colour from the logo pack |
| DM UI Ink | `#221334` | Live site primary dark UI colour |
| DM Plum 700 | `#3F2544` | Live site hero/footer dark gradient stop |
| DM Plum 600 | `#3E2444` | Live site hero/footer dark gradient stop |
| DM Plum 500 | `#332543` | Live site deep surface tone |
| DM Plum 400 | `#3B2347` | Live site dark accent surface |
| DM Pink | `#F13C64` | Live CTA gradient start |
| DM Magenta | `#E6359B` | Live CTA gradient middle |
| DM Hot Magenta | `#EC178D` | Logo and brand guide hero accent |
| DM Violet | `#D332FF` | Logo gradient stop and motif edge |
| DM Orange | `#FFB23D` | Logo gradient start |
| DM Orange Deep | `#F05F22` | Logo warm transition stop |
| DM Gold | `#F5A623` | Star ratings and highlight accent |
| White | `#FFFFFF` | Main high-contrast copy on dark backgrounds |
| Soft Grey | `#E9E8E8` | Form fields on live site |
| Body Grey | `#5C5C5C` | Long-form copy on light sections |
| Muted Grey | `#6B6A6A` | Secondary field and helper text |

### Social/editorial colour from the local brand guide

The local written brand guide also names this colour:

- `#1A1464` as "DM Navy"

Use it as an optional editorial/social background, not the main landing-page background, because the live site has clearly moved toward a darker plum/charcoal system.

### Canonical gradients

#### Logo gradient

Use the logo's multistop gradient when reproducing the icon mark:

```css
linear-gradient(
  135deg,
  #FFB23D 14%,
  #F05F22 33%,
  #EC178D 59%,
  #D332FF 78%,
  #9A2FC6 100%
)
```

#### Live CTA gradient

This is the main live-site action gradient:

```css
linear-gradient(
  90deg,
  #F13C64 0%,
  #E6359B 50%,
  #DC2EC9 100%
)
```

#### Thank-you page dark background gradient

For the thank-you landing page, use a dark base with magenta glow, not a flat colour:

```css
background:
  radial-gradient(1200px 600px at 80% -10%, rgba(237, 30, 121, 0.18), transparent 60%),
  radial-gradient(900px 500px at 10% 10%, rgba(99, 46, 162, 0.25), transparent 55%),
  linear-gradient(180deg, #1C1330 0%, #150D26 40%, #0F0820 100%);
```

### Colour behaviour rules

- Dark pages should feel almost black-plum, not bright navy.
- Pink and magenta are for action, emphasis, and glow.
- Orange is part of the logo DNA, not something that should dominate every page section.
- Gold is for ratings, stars, or tiny highlights only.
- On dark pages, white copy should do most of the work.
- Limit each screen to one dominant dark background plus one bright accent gradient.

## Typography system

### Primary web type choice

The live site is visually built around `Axiforma`.

Recommended hierarchy:

- Display and headline: `Axiforma-Bold`
- Navigation, buttons, section labels: `Axiforma-SemiBold`
- Body and form text: `Axiforma-Regular`

### Fallback stack

The local brand guide recommends `Poppins`, and the live site still imports `Montserrat` in places.

Use this fallback order:

```css
font-family: "Axiforma", "Poppins", "Montserrat", "Arial", sans-serif;
```

### Prototype note

The thank-you prototype uses `Manrope`. Treat that as a prototype exploration, not the master brand font.

### Type style rules

- Headlines are big, bold, and usually uppercase.
- Headline tracking is slightly tight.
- Buttons and nav labels are uppercase with extra spacing.
- Body text stays sentence case and easy to read.
- Copy should feel clean and modern, not editorial or serif-heavy.

### Recommended scale for this project

| Role | Style |
| --- | --- |
| H1 | Extra bold, uppercase, very large, tight tracking |
| H2 | Bold, uppercase, slightly smaller than H1 |
| Eyebrow | Small uppercase, high tracking, accent colour |
| Nav label | SemiBold, uppercase, spaced letters |
| Button | SemiBold or Bold, uppercase |
| Body | Regular, medium-large on dark backgrounds |
| Fine print | Regular, muted grey, never tiny on mobile |

## Layout and spacing system

### Containers

- Use wide desktop containers around `1100px` to `1280px`.
- Keep hero content centred or split cleanly.
- Do not let text run too wide on dark backgrounds.

### Spacing rhythm

- Large sections: `80px` to `96px` vertical padding on desktop
- Medium sections: `56px` to `72px`
- Card padding: `28px` to `40px`
- Mobile sections: reduce to `48px` to `64px`

### Shape language

- Pill buttons
- Rounded cards
- Circular badges for steps, checks, and counts
- Soft corners, not sharp rectangles

### Borders and depth

- Prefer soft 1px borders on dark cards using translucent white
- Use magenta glow sparingly for high-value elements
- Keep shadows soft and wide, not harsh and black

### Motion rules

- Small pulses on confirmation/check states
- Light hover lift on cards and CTAs
- Count-up animations for proof stats
- Marquee and glow only when they support momentum
- Motion should feel alive, not noisy

## Component system

### Core live-site components

### 1. Header / nav bar

Anatomy:

- dark translucent top bar
- brand logo left
- uppercase nav labels
- high-contrast pill CTA on the right

Rules:

- keep the CTA visually strongest item in the nav
- use white or near-white nav text on dark headers
- keep the layout clean and horizontally spacious

### 2. Hero section

Anatomy:

- video or dark atmospheric background
- trust badge or review proof near the top
- huge uppercase headline
- short proof-led supporting sentence
- CTA directly below
- metrics or proof counters close by

Rules:

- the main promise should be visible immediately
- do not bury proof under the fold
- support text stays short and plain

### 3. Google rating badge

Anatomy:

- white rounded chip
- Google icon
- rating number
- star row
- review count

Rules:

- use this as an instant trust block
- keep it compact
- prefer white chip on dark backgrounds for contrast

### 4. Results card

Anatomy:

- small category tag
- huge percentage or metric
- short label
- quote snippet
- client name

Rules:

- make the metric the hero
- keep the quote believable and readable
- do not overload a card with too many data points

### 5. Video proof grid

Anatomy:

- rounded poster tiles
- muted autoplay or click-to-play video
- floating sound control

Rules:

- use real business proof where possible
- keep overlays minimal
- avoid cluttering the video with too much text

### 6. Contact form block

Anatomy:

- strong heading
- minimal fields
- one clear submit CTA
- often paired with dark background and gradient action button

Rules:

- inputs should feel simple and low-friction
- one action per form
- on dark sections, use very clear field contrast

### 7. Footer

Anatomy:

- dark branded background
- guarantee-led summary
- sitemap
- services
- address, phone, email, socials

Rules:

- footer is still a sales/trust surface, not just a legal dump
- keep contact details easy to scan

## Thank-you page components

The prototype defines a stronger post-conversion system for this project.

### 1. Confirmation hero

Anatomy:

- glowing check icon
- bold confirmation headline
- short response-time message
- live status strip

Purpose:

- reassure immediately
- reduce uncertainty
- show that a real person will respond

### 2. Process cards

Anatomy:

- numbered circular badge
- step title
- short explanation
- optional expandable details

Purpose:

- explain what happens next
- lower friction after form submission

### 3. Trust stats band

Anatomy:

- large animated proof numbers
- short uppercase labels
- testimonial panel below

Purpose:

- keep trust high after conversion
- remind users they made the right choice

### 4. Fast-track CTA

Anatomy:

- one primary booking CTA
- one WhatsApp CTA

Purpose:

- let high-intent users skip the queue
- keep momentum after form submission

### 5. Booking modal

Anatomy:

- compact dark modal
- simple day picker
- simple time slots
- confirmation state

Purpose:

- feels premium and immediate
- removes the need to wait passively

## Imagery and graphic direction

### What fits the brand

- dark hero videos with subtle overlays
- real client proof
- review screenshots
- website mockups
- bold cropped DM motif artwork
- glowing confirmation icons

### What does not fit

- generic blue SaaS illustrations
- flat pastel dashboards
- corporate stock photography with no proof value
- overly clean minimalism with no energy

### Social art direction

From the social pack, the visual recipe is:

- oversized cropped DM mark
- warm gradient field
- white logo or wordmark
- big simple statement
- very few extra colours

## Voice and copy system

### Voice summary

Digital Movement UK should sound like a smart person explaining things clearly, not like a deck full of marketing jargon.

### Voice traits

- warm
- direct
- honest
- confident
- no-pressure
- UK-specific
- proof-led

### Copy rules

- Use short sentences.
- Explain one idea at a time.
- Put proof close to claims.
- Use UK language: `enquiries`, `business`, `£`, `page 1`.
- Prefer plain English over agency phrases.
- Talk about outcomes, not features alone.

### Good phrase patterns

- Get guaranteed results
- Real results
- Free proposal
- We show you the maths
- No jargon
- One of our specialists will be in touch
- Here is what happens next

### Avoid

- synergy
- omnichannel excellence
- full-funnel transformation
- revolutionary growth frameworks
- vague "solutions" language with no specifics

## Do and do not

### Do

- Use deep dark plum as the main page atmosphere.
- Use hot pink and magenta for urgency and action.
- Preserve the real logo gradient.
- Put trust proof near the top of key pages.
- Use large uppercase headings for major promises.
- Keep UI rounded and friendly.
- Write like a human talking to a business owner.

### Do not

- Turn the brand into a generic blue agency site.
- Mix too many accent colours in one interface.
- Use the full-colour logo on a chaotic gradient background.
- Make every line of text uppercase.
- Overcomplicate forms.
- Sound corporate or abstract.
- Let decorative motion distract from the proof and CTA.

## Recommended tokens for this project

Use this as the starter token set for the thank-you landing page:

```css
:root {
  --dm-font-display: "Axiforma", "Poppins", "Montserrat", "Arial", sans-serif;
  --dm-font-body: "Axiforma", "Poppins", "Montserrat", "Arial", sans-serif;

  --dm-bg-950: #0F0820;
  --dm-bg-900: #120A1F;
  --dm-bg-850: #150D26;
  --dm-bg-800: #1C1330;
  --dm-surface-700: #221334;
  --dm-surface-650: #2A1C3D;
  --dm-surface-600: #332543;

  --dm-ink: #321F4F;
  --dm-text: #FFFFFF;
  --dm-text-muted: rgba(255, 255, 255, 0.72);
  --dm-text-soft: rgba(255, 255, 255, 0.48);

  --dm-accent-pink: #F13C64;
  --dm-accent-magenta: #E6359B;
  --dm-accent-hot-magenta: #EC178D;
  --dm-accent-violet: #D332FF;
  --dm-accent-orange: #FFB23D;
  --dm-accent-orange-deep: #F05F22;
  --dm-accent-gold: #F5A623;
  --dm-accent-whatsapp: #25D366;

  --dm-gradient-brand: linear-gradient(135deg, #FFB23D 14%, #F05F22 33%, #EC178D 59%, #D332FF 78%, #9A2FC6 100%);
  --dm-gradient-cta: linear-gradient(90deg, #F13C64 0%, #E6359B 50%, #DC2EC9 100%);
  --dm-gradient-page: linear-gradient(180deg, #1C1330 0%, #150D26 40%, #0F0820 100%);

  --dm-radius-card: 16px;
  --dm-radius-pill: 999px;
  --dm-border-soft: 1px solid rgba(255, 255, 255, 0.08);
  --dm-border-strong: 1px solid rgba(255, 255, 255, 0.16);
  --dm-shadow-accent: 0 14px 32px -12px rgba(237, 30, 121, 0.55);
  --dm-shadow-soft: 0 24px 60px -24px rgba(0, 0, 0, 0.45);
}
```

## Final synthesis decision

If there is ever a conflict between the sources, use this order:

1. Official logo files and motif pack
2. Current live-site visual language
3. Written local brand guide
4. Thank-you prototype-specific choices

That means:

- keep the official logo gradient
- keep the live site's Axiforma-led, dark-plum, proof-first UI direction
- keep the local guide's voice and social motif cues
- treat any prototype-only font or colour choices as optional unless they support the main brand

## Source map

- Live site: `https://digitalmovement.uk`
- Live theme CSS: `https://digitalmovement.uk/wp-content/themes/digitalmovement/css/custom.css`
- Logo pack: `Assets/LOGO PACK/`
- Social motif pack: `Assets/SOCIAL MEDIA LOGO/`
- Brand guide: `Assets/Digital Movement UK - Brand & Colour Reference.docx`
- Tone examples: `Assets/Tone and Voice Martey/Tone of Voice emails.docx`
- Thank-you prototype: `Assets/Thank You Page prototype/Thank You Page Prototype/Thank You.html`
