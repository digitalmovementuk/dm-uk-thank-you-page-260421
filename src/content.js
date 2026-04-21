export const CONTACT_DETAILS = {
  whatsappHref:
    'https://wa.me/447446967403?text=Hi%20Digital%20Movement,%20I%27d%20like%20to%20discuss%20my%20enquiry.',
  whatsappDisplay: '+44 7446 967403',
  phoneHref: 'tel:+447446967403',
  phoneDisplay: '+44 7446 967403',
  email: 'office@digitalmovement.uk',
  websiteHref: 'https://digitalmovement.uk/',
  instagramHref: 'https://www.instagram.com/digitalmovementuk/',
  privacyHref: 'https://digitalmovement.uk/privacy-policy/',
  contactHref: 'https://digitalmovement.uk/contact-us/',
  webDesignHref: 'https://digitalmovement.uk/web-design/',
  seoHref: 'https://digitalmovement.uk/seo/',
  mapHref: 'https://www.google.com/maps?q=128+City+Road,+London,+EC1V+2NX,+United+Kingdom',
  addressLines: ['128 City Road', 'London, EC1V 2NX', 'United Kingdom'],
};

export const FOOTER_LINK_GROUPS = [
  {
    title: 'Services',
    links: [
      { label: 'Web Design', href: CONTACT_DETAILS.webDesignHref },
      { label: 'SEO', href: CONTACT_DETAILS.seoHref },
      { label: 'Contact Us', href: CONTACT_DETAILS.contactHref },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'digitalmovement.uk', href: CONTACT_DETAILS.websiteHref },
      { label: 'Privacy Policy', href: CONTACT_DETAILS.privacyHref },
      { label: 'Instagram', href: CONTACT_DETAILS.instagramHref },
    ],
  },
];

export const REVIEW_SUMMARY = {
  rating: '5.0',
  count: '102 reviews',
};

export const FEATURED_REVIEW = {
  quote:
    'Dean and the team built us a clear website, sorted the lead flow, and we started seeing real enquiries soon after.',
  name: 'Beth Sorensen',
  role: 'Verified Google Review',
};

export const CASE_STUDIES = [
  {
    eyebrow: 'Case Study 01',
    title: 'Renovation brand repositioned for higher-value enquiries',
    quote:
      'The new site gave us a much stronger first impression and made the business feel more premium from the first click.',
    person: 'Director, renovation company',
    stat: '143%',
    statLabel: 'increase in qualified enquiry rate after the relaunch',
    copy:
      'Sharper service messaging and cleaner trust signals helped turn more visits into serious enquiries.',
    previewCopy: 'Cleaner trust signals helped turn more visits into serious enquiries.',
    image: '/case-studies/case-study-cmd.png',
    imageAlt: 'Website preview for a bathroom renovation company',
    imagePosition: '50% 24%',
  },
  {
    eyebrow: 'Case Study 02',
    title: 'Homebuilding advisory site rebuilt for stronger trust',
    quote:
      'The website finally explained our offer clearly and gave people the confidence to take the next step.',
    person: 'Growth lead, property brand',
    stat: '96%',
    statLabel: 'lift in booked consultations from warmer traffic',
    copy:
      'A clearer homepage story and stronger offer framing helped more ready-to-act visitors come through.',
    previewCopy: 'A clearer story helped more ready-to-act visitors book a conversation.',
    image: '/case-studies/case-study-homebuilders.png',
    imageAlt: 'Website preview for a homebuilding advisory brand',
    imagePosition: '50% 28%',
  },
  {
    eyebrow: 'Case Study 03',
    title: 'Commercial interiors website made easier to trust',
    quote:
      'The new look felt far more aligned with the level of projects we wanted to win, and leads became more consistent.',
    person: 'Founder, interiors company',
    stat: '121%',
    statLabel: 'increase in organic lead volume within the first growth cycle',
    copy:
      'A more credible visual presence and tighter service presentation improved trust before the first call.',
    previewCopy: 'A more credible first impression improved trust before the first call.',
    image: '/case-studies/case-study-buildmarque.png',
    imageAlt: 'Website preview for a commercial interiors company',
    imagePosition: '50% 30%',
  },
];

export const NEXT_STEPS = [
  {
    number: '01',
    title: 'Audit',
    copy: 'We review your website, market, and local search opportunities.',
  },
  {
    number: '02',
    title: 'Strategy call',
    copy: 'We share the findings, sharpen the offer, and agree the fastest route to leads.',
  },
  {
    number: '03',
    title: 'Launch',
    copy: 'We deliver the new SEO-ready website, submit it, and start building traction.',
  },
];

export const NEXT_STEPS_NOTES = [
  'First website leads usually start building from around month 3.',
  'No heavy workload on your side. We handle the setup and rollout.',
];
