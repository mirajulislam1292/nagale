import type { Snapshot } from '../types/marketplace';
export const users = [
  {
    id: 'usr-client-1',
    name: 'Mahim Rahman',
    initials: 'MR',
    role: 'client',
  },
  {
    id: 'usr-client-2',
    name: 'Samira Reza',
    initials: 'SR',
    role: 'client',
  },
];
export const paymentAccounts = {
  'usr-client-1': [
    {
      type: 'bKash',
      last4: '4521',
    },
  ],
  nusrat: [
    {
      type: 'bKash',
      last4: '7730',
    },
    {
      type: 'Nagad',
      last4: '2208',
    },
  ],
};
export const disputeSeeds = [
  {
    id: 'D-1029',
    orderId: 'N-1029',
    narrative: 'SVG files were late and the editable source is missing.',
  },
  {
    id: 'D-1031',
    orderId: 'N-1031',
    narrative: 'The agreed product photo set is incomplete.',
  },
];
const seed: Snapshot = {
  feeRate: 0.1,
  providers: [
    {
      id: 'nusrat',
      name: 'Nusrat Jahan',
      initials: 'NJ',
      headline: 'CV writer & career document specialist',
      area: 'Dhanmondi',
      skills: ['CV writing', 'Translation'],
      rating: 4.9,
      completed: 38,
      price: 1200,
      verified: true,
      bio: 'I help graduates turn their experience into clear, well-structured CVs. Every project includes an editable document and one round of revisions.',
      reviews: 34,
      level: 2,
      accountStatus: 'active',
      verification: {
        l1: 'approved',
        l2: 'approved',
        l3: 'not_started',
      },
    },
    {
      id: 'tanvir',
      name: 'Tanvir Ahmed',
      initials: 'TA',
      headline: 'Web designer & frontend developer',
      area: 'Uttara',
      skills: ['Web development', 'Design'],
      rating: 4.8,
      completed: 24,
      price: 18000,
      verified: true,
      bio: 'Practical websites for small businesses. I focus on responsive layouts, accessible content and a straightforward handover.',
      reviews: 21,
      level: 2,
      accountStatus: 'active',
      verification: {
        l1: 'approved',
        l2: 'approved',
        l3: 'not_started',
      },
    },
    {
      id: 'farhana',
      name: 'Farhana Akter',
      initials: 'FA',
      headline: 'Graphic designer & presentation specialist',
      area: 'Mirpur',
      skills: ['Design', 'Presentations'],
      rating: 4.9,
      completed: 46,
      price: 2500,
      verified: true,
      bio: 'I design presentations, social media layouts and print-ready brand materials. My process starts with a clear brief and a first draft for review.',
      reviews: 41,
      level: 1,
      accountStatus: 'active',
      verification: {
        l1: 'approved',
        l2: 'in_review',
        l3: 'not_started',
      },
    },
    {
      id: 'rafiul',
      name: 'Rafiul Islam',
      initials: 'RI',
      headline: 'Photographer for products & small events',
      area: 'Mohammadpur',
      skills: ['Photography', 'Local services'],
      rating: 4.7,
      completed: 19,
      price: 4000,
      verified: true,
      bio: 'Product and event photography across Dhaka. We agree on the location, shot list and delivery format before the booking begins.',
      reviews: 17,
      level: 2,
      accountStatus: 'active',
      verification: {
        l1: 'approved',
        l2: 'approved',
        l3: 'not_started',
      },
    },
    {
      id: 'kamal',
      name: 'Kamal Ahmed',
      initials: 'KA',
      headline: 'Service provider',
      area: 'Dhaka',
      skills: ['Design'],
      rating: 0,
      reviews: 0,
      completed: 0,
      price: 1500,
      verified: false,
      level: 1,
      bio: '',
      accountStatus: 'suspended',
      verification: {
        l1: 'approved',
        l2: 'in_review',
        l3: 'not_started',
      },
    },
  ],
  gigs: [
    {
      id: 'g1',
      title: 'Write a graduate CV for an internship application',
      category: 'CV writing',
      type: 'digital',
      summary:
        'A one-page CV for a business graduate applying for marketing internships. Include an editable copy and one revision.',
      budget: 1500,
      area: 'Anywhere in Bangladesh',
      deadline: '2026-11-07',
      status: 'open',
      proposals: 3,
      clientId: 'usr-client-1',
    },
    {
      id: 'g2',
      title: 'Build a website for a neighbourhood bakery',
      category: 'Web development',
      type: 'digital',
      summary:
        'A responsive four-page website with a menu, opening hours and enquiry form. Content and product photos will be provided.',
      budget: 22000,
      area: 'Anywhere in Bangladesh',
      deadline: '2026-11-14',
      status: 'open',
      proposals: 2,
      clientId: 'usr-client-1',
    },
    {
      id: 'g3',
      title: 'Photograph 12 handmade products',
      category: 'Photography',
      type: 'local',
      summary:
        'Clean product photographs on a neutral background. One half-day session, edited images delivered digitally.',
      budget: 4500,
      area: 'Dhanmondi, Dhaka',
      deadline: '2026-11-10',
      status: 'open',
      proposals: 1,
      clientId: 'usr-client-1',
    },
    {
      id: 'g4',
      title: 'Design a presentation for a university project',
      category: 'Design',
      type: 'digital',
      summary:
        'Turn supplied content into a clear 15-slide presentation. Deliver both editable slides and a PDF.',
      budget: 2500,
      area: 'Anywhere in Bangladesh',
      deadline: '2026-11-09',
      status: 'open',
      proposals: 2,
      clientId: 'usr-client-1',
    },
    {
      id: 'g5',
      title: 'Translate a visa support letter',
      category: 'Translation',
      type: 'digital',
      summary: 'Translate the supplied Bangla letter into English.',
      budget: 1800,
      area: 'Anywhere in Bangladesh',
      deadline: '2026-11-08',
      clientId: 'usr-client-2',
      status: 'open',
      proposals: 0,
    },
    {
      id: 'g6',
      title: 'English tutor for class 8',
      category: 'Tuition',
      type: 'local',
      summary: 'Two English lessons each week in Dhanmondi.',
      budget: 3000,
      area: 'Dhanmondi',
      deadline: '2026-11-09',
      clientId: 'usr-client-2',
      status: 'open',
      proposals: 0,
    },
    {
      id: 'g7',
      title: 'Proofread a 10-page thesis summary',
      category: 'Writing',
      type: 'digital',
      summary: 'Check grammar and clarity; preserve the original meaning.',
      budget: 1500,
      area: 'Anywhere in Bangladesh',
      deadline: '2026-11-10',
      clientId: 'usr-client-2',
      status: 'open',
      proposals: 0,
    },
  ],
  proposals: [
    {
      id: 'p1',
      gigId: 'g1',
      providerId: 'nusrat',
      price: 1200,
      days: 2,
      message:
        'I can structure your experience into a one-page CV, with an editable version and one revision. Please share the role requirements after booking.',
    },
    {
      id: 'p2',
      gigId: 'g1',
      providerId: 'farhana',
      price: 1500,
      days: 3,
      message:
        'I can prepare a clean, readable CV layout and help organise your education and project experience.',
    },
    {
      id: 'p3',
      gigId: 'g1',
      providerId: 'tanvir',
      price: 1400,
      days: 3,
      message:
        'I can format your existing content into a professional CV and provide an editable copy.',
    },
    {
      id: 'p4',
      gigId: 'g2',
      providerId: 'tanvir',
      price: 20000,
      days: 7,
      message:
        'I can build the four pages, optimise for mobile and provide a complete handover.',
    },
  ],
  orders: [
    {
      id: 'N-1042',
      title: 'Graduate CV and cover letter',
      providerId: 'nusrat',
      clientId: 'usr-client-1',
      clientName: 'Mahim Rahman',
      price: 1500,
      status: 'delivered',
      clientAccepted: true,
      providerAccepted: true,
      deliveryFile: 'CV_and_cover_letter_draft.pdf',
      delivery: 'Please review the delivered files.',
      privateDetails: {
        workspaceNotes:
          'Agreed brief and materials are available to the order participants.',
      },
      events: [
        {
          text: 'Proposal accepted',
          at: '2026-10-20T08:00:00Z',
        },
        {
          text: 'Payment funded',
          at: '2026-10-20T08:05:00Z',
        },
        {
          text: 'Details unlocked',
          at: '2026-10-20T08:06:00Z',
        },
        {
          text: 'Delivery submitted',
          at: '2026-10-21T10:00:00Z',
        },
      ],
    },
    {
      id: 'N-1041',
      title: 'Social media launch templates',
      providerId: 'farhana',
      clientId: 'usr-client-1',
      clientName: 'Mahim Rahman',
      price: 3000,
      status: 'details_unlocked',
      clientAccepted: true,
      providerAccepted: true,
      privateDetails: {
        workspaceNotes:
          'Agreed brief and materials are available to the order participants.',
      },
      events: [
        {
          text: 'Proposal accepted',
          at: '2026-10-21T08:00:00Z',
        },
        {
          text: 'Payment funded',
          at: '2026-10-21T08:05:00Z',
        },
        {
          text: 'Details unlocked',
          at: '2026-10-21T08:06:00Z',
        },
      ],
    },
    {
      id: 'N-1038',
      title: 'Product catalogue layout',
      providerId: 'farhana',
      clientId: 'usr-client-1',
      clientName: 'Mahim Rahman',
      price: 2500,
      status: 'completed',
      clientAccepted: true,
      providerAccepted: true,
      deliveryFile: 'Product_catalogue.pdf',
      delivery: 'Please review the delivered files.',
      privateDetails: {
        workspaceNotes:
          'Agreed brief and materials are available to the order participants.',
      },
      events: [
        {
          text: 'Proposal accepted',
          at: '2026-10-22T08:00:00Z',
        },
        {
          text: 'Payment funded',
          at: '2026-10-22T08:05:00Z',
        },
        {
          text: 'Details unlocked',
          at: '2026-10-22T08:06:00Z',
        },
        {
          text: 'Delivery submitted',
          at: '2026-10-23T10:00:00Z',
        },
        {
          text: 'Payment released',
          at: '2026-10-24T11:00:00Z',
        },
      ],
    },
    {
      id: 'N-1043',
      title: 'Translate a visa support letter (BN to EN)',
      providerId: 'nusrat',
      clientId: 'usr-client-2',
      clientName: 'Samira Reza',
      price: 1800,
      status: 'details_unlocked',
      clientAccepted: true,
      providerAccepted: true,
      privateDetails: {
        workspaceNotes:
          'Agreed brief and materials are available to the order participants.',
      },
      events: [
        {
          text: 'Proposal accepted',
          at: '2026-10-23T08:00:00Z',
        },
        {
          text: 'Payment funded',
          at: '2026-10-23T08:05:00Z',
        },
        {
          text: 'Details unlocked',
          at: '2026-10-23T08:06:00Z',
        },
      ],
    },
    {
      id: 'N-1036',
      title: 'LinkedIn profile rewrite',
      providerId: 'nusrat',
      clientId: 'usr-client-2',
      clientName: 'Samira Reza',
      price: 1200,
      status: 'completed',
      clientAccepted: true,
      providerAccepted: true,
      deliveryFile: 'LinkedIn_profile.pdf',
      delivery: 'Please review the delivered files.',
      privateDetails: {
        workspaceNotes:
          'Agreed brief and materials are available to the order participants.',
      },
      events: [
        {
          text: 'Proposal accepted',
          at: '2026-10-24T08:00:00Z',
        },
        {
          text: 'Payment funded',
          at: '2026-10-24T08:05:00Z',
        },
        {
          text: 'Details unlocked',
          at: '2026-10-24T08:06:00Z',
        },
        {
          text: 'Delivery submitted',
          at: '2026-10-25T10:00:00Z',
        },
        {
          text: 'Payment released',
          at: '2026-10-26T11:00:00Z',
        },
      ],
    },
    {
      id: 'N-1029',
      title: 'Logo for a neighbourhood bakery',
      providerId: 'farhana',
      clientId: 'usr-client-2',
      clientName: 'Samira Reza',
      price: 1500,
      status: 'disputed',
      clientAccepted: true,
      providerAccepted: true,
      deliveryFile: 'Bakery_logo.svg',
      delivery: 'Please review the delivered files.',
      privateDetails: {
        workspaceNotes:
          'Agreed brief and materials are available to the order participants.',
      },
      events: [
        {
          text: 'Proposal accepted',
          at: '2026-10-25T08:00:00Z',
        },
        {
          text: 'Payment funded',
          at: '2026-10-25T08:05:00Z',
        },
        {
          text: 'Details unlocked',
          at: '2026-10-25T08:06:00Z',
        },
        {
          text: 'Delivery submitted',
          at: '2026-10-26T10:00:00Z',
        },
        {
          text: 'Dispute opened',
          at: '2026-10-27T12:00:00Z',
        },
      ],
    },
    {
      id: 'N-1031',
      title: 'Product photos, 10 items',
      providerId: 'rafiul',
      clientId: 'usr-client-2',
      clientName: 'Samira Reza',
      price: 3000,
      status: 'disputed',
      clientAccepted: true,
      providerAccepted: true,
      deliveryFile: 'Product_photos.zip',
      delivery: 'Please review the delivered files.',
      privateDetails: {
        workspaceNotes:
          'Agreed brief and materials are available to the order participants.',
      },
      events: [
        {
          text: 'Proposal accepted',
          at: '2026-10-26T08:00:00Z',
        },
        {
          text: 'Payment funded',
          at: '2026-10-26T08:05:00Z',
        },
        {
          text: 'Details unlocked',
          at: '2026-10-26T08:06:00Z',
        },
        {
          text: 'Delivery submitted',
          at: '2026-10-27T10:00:00Z',
        },
        {
          text: 'Dispute opened',
          at: '2026-10-28T12:00:00Z',
        },
      ],
    },
  ],
  messages: [
    {
      id: 'm1',
      sender: 'provider',
      body: 'I have received your brief. Would you prefer a single-page CV?',
      at: '09:30',
      orderId: 'N-1042',
      senderId: 'nusrat',
    },
    {
      id: 'm2',
      sender: 'you',
      body: 'Yes, one page please. Focus on my university projects.',
      at: '09:32',
      orderId: 'N-1042',
      senderId: 'usr-client-1',
    },
    {
      id: 'm3',
      sender: 'provider',
      body: 'Understood. I will share a first draft here for your review.',
      at: '09:35',
      orderId: 'N-1042',
      senderId: 'nusrat',
    },
  ],
  cases: [
    {
      id: 'F-301',
      subject: 'Message in N-1042',
      reason: 'Attempted off-platform contact',
      risk: 'medium',
      status: 'open',
    },
    {
      id: 'F-302',
      subject: 'Provider portfolio',
      reason: 'Ownership of work needs review',
      risk: 'low',
      status: 'open',
    },
    {
      id: 'F-303',
      subject: 'Repeated payment request',
      reason: 'Payment outside the order workspace',
      risk: 'high',
      status: 'open',
    },
  ],
};
export function createSeed(): Snapshot {
  return structuredClone(seed);
}

export const demoDate = '2026-11-07';

export type VerifTab = 'level1' | 'level2' | 'level3';

export interface VerifItem {
  id: string;
  name: string;
  initials: string;
  date: string;
  docType: string;
  level: number;
}

export const VERIF_DATA: Record<VerifTab, VerifItem[]> = {
  level1: [],
  level2: [
    {
      id: 'v-201',
      name: 'Farhana Akter',
      initials: 'FA',
      date: 'Today, 10:45 AM',
      docType: 'Smart National ID (NID)',
      level: 2,
    },
    {
      id: 'v-202',
      name: 'Kamal Ahmed',
      initials: 'KA',
      date: 'Oct 29, 2026',
      docType: 'Smart National ID (NID)',
      level: 2,
    },
    {
      id: 'v-203',
      name: 'Sadia Rahman',
      initials: 'SR',
      date: 'Oct 28, 2026',
      docType: 'Smart National ID (NID)',
      level: 2,
    },
  ],
  level3: [
    {
      id: 'v-301',
      name: 'Zubair Hossain',
      initials: 'ZH',
      date: 'Today, 11:20 AM',
      docType: 'UI/UX Training Certificate + Portfolio',
      level: 3,
    },
    {
      id: 'v-302',
      name: 'Anika Tabassum',
      initials: 'AT',
      date: 'Oct 30, 2026',
      docType: 'Python Web Development Diploma',
      level: 3,
    },
  ],
};
