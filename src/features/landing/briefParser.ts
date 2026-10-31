import { parseBanglaDigits } from '../../components/ui/Input';

export interface ParsedBrief {
  title: string;
  category: string;
  type: 'digital' | 'local';
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  area?: string;
  missingFields: string[];
}

interface CategoryDefinition {
  name: string;
  type: 'digital' | 'local';
  defaultMin: number;
  defaultMax: number;
  defaultDeadline: string;
  keywords: string[];
}

const CATEGORIES: CategoryDefinition[] = [
  {
    name: 'CV writing',
    type: 'digital',
    defaultMin: 1000,
    defaultMax: 2000,
    defaultDeadline: '3 days',
    keywords: [
      'cv',
      'resume',
      'cover letter',
      'curriculum',
      'সিভি',
      'রেজুমে',
      'চাকরি',
    ],
  },
  {
    name: 'Web development',
    type: 'digital',
    defaultMin: 8000,
    defaultMax: 25000,
    defaultDeadline: '10 days',
    keywords: [
      'web',
      'website',
      'shop',
      'frontend',
      'react',
      'wordpress',
      'ওয়েবসাইট',
      'সাইট',
      'শপ',
    ],
  },
  {
    name: 'Design',
    type: 'digital',
    defaultMin: 1500,
    defaultMax: 4000,
    defaultDeadline: '4 days',
    keywords: [
      'logo',
      'poster',
      'design',
      'flyer',
      'banner',
      'ui',
      'লোগো',
      'ডিজাইন',
      'ব্যানার',
      'পোস্টার',
    ],
  },
  {
    name: 'Photography',
    type: 'local',
    defaultMin: 4000,
    defaultMax: 8000,
    defaultDeadline: '5 days',
    keywords: [
      'photo',
      'photograph',
      'shoot',
      'camera',
      'ছবি',
      'ফটোগ্রাফি',
      'ক্যামেরা',
      'শুট',
    ],
  },
  {
    name: 'Tutoring',
    type: 'local',
    defaultMin: 3000,
    defaultMax: 6000,
    defaultDeadline: '1 month',
    keywords: [
      'tutor',
      'maths',
      'math',
      'tuition',
      'physics',
      'student',
      'পড়াশোনা',
      'টিউশন',
      'টিউটর',
      'গণিত',
    ],
  },
  {
    name: 'Admin help',
    type: 'digital',
    defaultMin: 1000,
    defaultMax: 3000,
    defaultDeadline: '2 days',
    keywords: [
      'visa',
      'booking',
      'form',
      'entry',
      'data',
      'ভিসা',
      'বুকিং',
      'ফর্ম',
      'ডাটা',
    ],
  },
  {
    name: 'Writing',
    type: 'digital',
    defaultMin: 500,
    defaultMax: 2500,
    defaultDeadline: '2 days',
    keywords: [
      'write',
      'writing',
      'article',
      'translate',
      'translation',
      'লেখা',
      'অনুবাদ',
      'কনটেন্ট',
    ],
  },
];

const KNOWN_AREAS = [
  'Dhanmondi',
  'Mirpur',
  'Uttara',
  'Gulshan',
  'Banani',
  'Mohammadpur',
  'Agrabad',
  'Zindabazar',
  'ধানমন্ডি',
  'মিরপুর',
  'উত্তরা',
  'গুলশান',
  'বনানী',
  'মোহাম্মদপুর',
  'আগ্রাবাদ',
  'জিন্দাবাজার',
];

export function parseBriefInput(text: string): ParsedBrief {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      title: '',
      category: '',
      type: 'digital',
      budgetMin: 0,
      budgetMax: 0,
      deadline: '',
      missingFields: ['category', 'budget', 'timeline'],
    };
  }

  const normalisedText = parseBanglaDigits(trimmed.toLowerCase());

  // 1. Match category
  const matchedCat = CATEGORIES.find((cat) =>
    cat.keywords.some((k) => normalisedText.includes(k.toLowerCase())),
  );

  // 2. Extract budget if mentioned (e.g. "৳2000", "2000 taka", "1500tk", "3000")
  const budgetMatch = normalisedText.match(
    /(?:৳|tk|taka)?\s*(\d{3,6})\s*(?:৳|tk|taka|-|\s*to\s*(\d{3,6}))?/i,
  );
  let budgetMin = matchedCat ? matchedCat.defaultMin : 1500;
  let budgetMax = matchedCat ? matchedCat.defaultMax : 3000;

  if (budgetMatch && budgetMatch[1]) {
    const val1 = parseInt(budgetMatch[1], 10);
    if (val1 >= 100) {
      budgetMin = val1;
      budgetMax = budgetMatch[2] ? parseInt(budgetMatch[2], 10) : val1;
    }
  }

  // 3. Extract deadline (e.g. "tomorrow", "this week", "by friday", "in 3 days")
  let deadline = matchedCat ? matchedCat.defaultDeadline : '3–5 days';
  if (/tomorrow|কালকে|আগামীকাল/i.test(normalisedText)) {
    deadline = 'Tomorrow';
  } else if (/this week|এই সপ্তাহ/i.test(normalisedText)) {
    deadline = 'This week';
  } else if (/friday|শুক্রবার/i.test(normalisedText)) {
    deadline = 'By Friday';
  } else if (/urgent|জরুরি/i.test(normalisedText)) {
    deadline = '24 hours';
  }

  // 4. Extract location if local
  let area: string | undefined = undefined;
  for (const a of KNOWN_AREAS) {
    if (normalisedText.includes(a.toLowerCase())) {
      area = a.charAt(0).toUpperCase() + a.slice(1);
      break;
    }
  }

  const category = matchedCat ? matchedCat.name : 'Task assistance';
  const type = matchedCat ? matchedCat.type : 'digital';

  if (type === 'local' && !area) {
    area = 'Dhanmondi, Dhaka (approximate)';
  }

  // 5. Generate formatted title
  const title =
    trimmed.charAt(0).toUpperCase() + trimmed.slice(1).replace(/[.!?]+$/, '');

  const missingFields: string[] = [];
  if (!matchedCat) missingFields.push('specific category');
  if (!budgetMatch) missingFields.push('exact budget');

  return {
    title: title.slice(0, 90),
    category,
    type,
    budgetMin,
    budgetMax,
    deadline,
    area,
    missingFields,
  };
}
