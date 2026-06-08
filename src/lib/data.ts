import { Treatment } from '@/types';

// ============================================================
// AnviGleams — Static Data
// ============================================================

export const TREATMENTS: Treatment[] = [
  {
    treatmentId: 'acne-treatment',
    name: 'Acne Treatment',
    slug: 'acne-treatment',
    description:
      'Our advanced acne treatment combines the latest dermatological techniques with premium skincare formulations to clear existing breakouts, reduce inflammation, and prevent future acne formation. Suitable for all skin types and severity levels.',
    benefits: [
      'Clears existing breakouts fast',
      'Reduces redness & inflammation',
      'Minimises pore size',
      'Prevents future acne formation',
    ],
    price: 0,
    images: ['/treatments/acne-treatment.jpg'],
    faqs: [
      { q: 'How many sessions do I need?', a: 'Most clients see significant improvement in 3–6 sessions.' },
      { q: 'Is there any downtime?', a: 'Minimal to no downtime.' },
    ],
    isActive: true,
    order: 1,
  },
  {
    treatmentId: 'pigmentation-treatment',
    name: 'Pigmentation Treatment',
    slug: 'pigmentation-treatment',
    description:
      'Target uneven skin tone, dark spots, melasma, and sun damage with our precision pigmentation correction protocol. Using advanced technology and clinical-strength brightening agents for visible results.',
    benefits: [
      'Fades dark spots & melasma',
      'Evens out skin complexion',
      'Reverses sun damage',
    ],
    price: 0,
    images: ['/treatments/pigmentation-treatment.jpg'],
    faqs: [
      { q: 'Will pigmentation return?', a: 'Maintenance and SPF protection help prevent recurrence.' },
    ],
    isActive: true,
    order: 2,
  },
  {
    treatmentId: 'scar-reduction-treatment',
    name: 'Scar Reduction Treatment',
    slug: 'scar-reduction-treatment',
    description:
      'Clinically proven micro-needling and advanced resurfacing techniques to visibly reduce the appearance of acne scars, surgical scars, and stretch marks. Stimulates collagen production for natural skin renewal.',
    benefits: [
      'Reduces scar depth & visibility',
      'Stimulates collagen production',
      'Improves skin texture',
    ],
    price: 0,
    images: ['/treatments/scar-reduction-treatment.jpg'],
    faqs: [
      { q: 'Can old scars be treated?', a: 'Yes, even old scars respond well to our protocol.' },
    ],
    isActive: true,
    order: 3,
  },
  {
    treatmentId: 'full-body-miracle-treatment',
    name: 'Full Body Miracle Treatment',
    slug: 'full-body-miracle-treatment',
    description:
      'Our most luxurious offering — a head-to-toe skin transformation experience. Deep-cleanse, exfoliate, hydrate, and rejuvenate your entire body using premium ingredients and expert hands.',
    benefits: [
      'Head-to-toe rejuvenation',
      'Deep body exfoliation',
      'Intense moisturisation',
    ],
    price: 0,
    images: ['/treatments/full-body-miracle-treatment.jpg'],
    faqs: [
      { q: 'Is it suitable for sensitive skin?', a: 'Yes, we use hypoallergenic products.' },
    ],
    isActive: true,
    order: 4,
  },
  {
    treatmentId: 'skin-tightening',
    name: 'Skin Tightening',
    slug: 'skin-tightening',
    description:
      'Non-surgical radiofrequency and ultrasound-based skin tightening to firm sagging skin, define facial contours, and restore youthful elasticity. No downtime, no surgery.',
    benefits: [
      'Firms & lifts sagging skin',
      'Defines jaw & neck contour',
      'Non-surgical, no downtime',
    ],
    price: 0,
    images: ['/treatments/skin-tightening.jpg'],
    faqs: [
      { q: 'How long do results last?', a: 'Results typically last 12–18 months.' },
    ],
    isActive: true,
    order: 5,
  },
  {
    treatmentId: 'skin-brightening-and-lightening',
    name: 'Skin Brightening and Lightening',
    slug: 'skin-brightening-and-lightening',
    description:
      'Restore your skin\'s natural, luminous glow with our skin brightening treatment. It gently exfoliates dull surface cells and infuses illuminating serums to create a smooth, radiant complexion.',
    benefits: [
      'Restores natural glow',
      'Reduces dullness',
      'Deep hydration',
    ],
    price: 0,
    images: ['/treatments/skin-brightening-and-lightening.jpg'],
    faqs: [
      { q: 'Is it safe for all skin types?', a: 'Yes, it is highly customisable.' },
    ],
    isActive: true,
    order: 6,
  },
  {
    treatmentId: 'hydra-facial',
    name: 'Hydra Facial',
    slug: 'hydra-facial',
    description:
      'The globally acclaimed Hydra Facial uses patented technology to cleanse, extract, and hydrate skin in one powerful step. Instantly visible, zero discomfort, zero downtime.',
    benefits: [
      'Instantly clearer skin',
      'Deep pore cleansing',
      'Intense hydration infusion',
    ],
    price: 0,
    images: ['/treatments/hydra-facial.jpg'],
    faqs: [
      { q: 'How quickly will I see results?', a: 'Results are visible immediately.' },
    ],
    isActive: true,
    order: 7,
  },
  {
    treatmentId: 'carbon-facial',
    name: 'Carbon Facial',
    slug: 'carbon-facial',
    description:
      'Known as the "Hollywood Peel," the Carbon Facial deeply purifies pores, reduces oiliness, and creates a porcelain-like finish using advanced laser technology and medical-grade carbon.',
    benefits: [
      'Deep pore purification',
      'Reduces oiliness',
      'Instant brightening',
    ],
    price: 0,
    images: ['/treatments/carbon-facial.jpg'],
    faqs: [
      { q: 'Does it hurt?', a: 'No, it is completely painless.' },
    ],
    isActive: true,
    order: 8,
  },
  {
    treatmentId: 'medi-facial',
    name: 'Medi Facial',
    slug: 'medi-facial',
    description:
      'A medical-grade facial tailored by our expert to treat specific skin concerns using clinical-strength active ingredients. Far superior to standard salon facials.',
    benefits: [
      'Clinical-grade ingredients',
      'Tailored to your skin',
      'Longer-lasting results',
    ],
    price: 0,
    images: ['/treatments/medi-facial.jpg'],
    faqs: [
      { q: 'How is it different from a regular facial?', a: 'It uses active medical ingredients for deeper penetration.' },
    ],
    isActive: true,
    order: 9,
  },
  {
    treatmentId: 'mole-removal',
    name: 'Mole Removal',
    slug: 'mole-removal',
    description:
      'Safe, precise, and virtually scarless removal of unwanted moles and skin tags using advanced dermatological tools. Quick procedure with minimal recovery time.',
    benefits: [
      'Safe & precise',
      'Virtually scarless',
      'Quick procedure',
    ],
    price: 0,
    images: ['/treatments/mole-removal.jpg'],
    faqs: [
      { q: 'Will it leave a scar?', a: 'We use techniques designed to minimise scarring.' },
    ],
    isActive: true,
    order: 10,
  },
  {
    treatmentId: 'hair-removal',
    name: 'Hair Removal',
    slug: 'hair-removal',
    description:
      'Advanced laser hair reduction for smooth, hair-free skin. Safe for all skin tones and provides long-lasting results compared to traditional waxing or shaving.',
    benefits: [
      'Long-lasting hair reduction',
      'Safe for all skin types',
      'Prevents ingrown hairs',
    ],
    price: 0,
    images: ['/treatments/hair-removal.jpg'],
    faqs: [
      { q: 'How many sessions are required?', a: 'Typically 6-8 sessions for optimal results.' },
    ],
    isActive: true,
    order: 11,
  },
];

export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
];

export const CLINIC_INFO = {
  name: 'AnviGleams',
  tagline: 'Skin & Aesthetic Studio',
  phone: '+91 9022256128',
  whatsapp: '+919022256128',
  address: 'House 4, Lane 4, Shankar Township Colony, Ghulewadi, Sangamner, Maharashtra 422605',
  mapQuery: 'AnviGleams',
  instagramHandle: 'anvigleams',
  email: 'anvigleams@gmail.com',
};

// Certifications for Pramila Wakale
export const CERTIFICATIONS = [
  {
    id: 'cosmetology',
    title: 'Diploma in Cosmetology',
    shortDesc: 'Foundation in professional beauty science.',
    fullDesc:
      'A comprehensive foundation programme covering skin anatomy, advanced facial treatments, chemical peels, hair care science, and professional salon techniques. This diploma forms the bedrock of evidence-based skin and beauty practice.',
  },
  {
    id: 'facial-aesthetics',
    title: 'Master Course in Facial Aesthetics',
    shortDesc: 'Advanced non-surgical facial enhancement.',
    fullDesc:
      'An advanced professional course covering non-surgical facial enhancement techniques including advanced facial massage, contouring, anti-ageing protocols, skin rejuvenation, and personalised treatment planning for diverse skin types.',
  },
  {
    id: 'semi-permanent-makeup',
    title: 'Master Course in Semi-Permanent Makeup',
    shortDesc: 'Precision artistry in long-lasting beauty.',
    fullDesc:
      'Professional training in semi-permanent makeup techniques including microblading, ombre brows, lip blush, and eyeliner procedures. Covers colour theory, skin undertones, safety protocols, and client consultation for lasting, natural results.',
  },
  {
    id: 'trichology',
    title: 'Master Course in Trichology',
    shortDesc: 'Science-based scalp & hair care expertise.',
    fullDesc:
      'A specialist programme in trichology covering the science of hair and scalp health. Topics include hair loss diagnosis, scalp conditions, PRP preparation, hair growth treatments, and nutritional guidance for optimal hair wellness.',
  },
];
