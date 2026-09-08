export type Service = {
  slug: string
  title: string
  description: string
  deliverables: string[]
  tier: string
  icon: 'drill' | 'platform' | 'pipeline' | 'shield' | 'wrench' | 'gauge'
}

export type Testimonial = {
  quote: string
  name: string
  role: string
  avatar: string
}

export const stats = [
  { value: '28', suffix: '+', label: 'Years of Operation' },
  { value: '140', suffix: '+', label: 'Wells Delivered' },
  { value: '96', suffix: '%', label: 'Client Retention' },
  { value: '1200', suffix: '+', label: 'Field Specialists' },
]

export const services: Service[] = [
  {
    slug: 'offshore-drilling',
    title: 'Offshore Drilling',
    description:
      'Deepwater and shallow-water drilling campaigns run by seasoned crews with semi-submersible and jack-up experience across Southeast Asian basins.',
    deliverables: ['Well planning & design', 'Rig contracting & mobilization', 'Real-time drilling supervision'],
    tier: 'Campaign-based contract',
    icon: 'drill',
  },
  {
    slug: 'onshore-rig-operations',
    title: 'Onshore Rig Operations',
    description:
      'Full-scope onshore drilling and workover services, from pad construction to completions, with rigs sized for remote and frontier terrain.',
    deliverables: ['Land drilling & workover', 'Mud logging & solids control', 'Well intervention'],
    tier: 'Dayrate or metered',
    icon: 'wrench',
  },
  {
    slug: 'field-engineering',
    title: 'Field Engineering',
    description:
      'Front-end engineering, well integrity assurance, and facilities design backed by in-house petroleum and structural engineers.',
    deliverables: ['FEED studies', 'Well integrity audits', 'Facilities & pipeline design'],
    tier: 'Study-based engagement',
    icon: 'gauge',
  },
  {
    slug: 'pipeline-infrastructure',
    title: 'Pipeline & Infrastructure',
    description:
      'Construction, commissioning, and maintenance of flowlines and gathering systems that keep production moving safely onshore and offshore.',
    deliverables: ['Flowline installation', 'Pigging operations', 'Corrosion management'],
    tier: 'EPC package',
    icon: 'pipeline',
  },
  {
    slug: 'hse-compliance',
    title: 'HSE & Compliance',
    description:
      'Zero-harm safety programs, environmental permitting, and regulatory compliance aligned with KKKS and international standards.',
    deliverables: ['Safety case development', 'Environmental permitting', 'Emergency response planning'],
    tier: 'Retainer or per-project',
    icon: 'shield',
  },
  {
    slug: 'decommissioning',
    title: 'Decommissioning & P&A',
    description:
      'Environmentally responsible plug-and-abandonment and platform decommissioning, planned to return sites to a clean baseline.',
    deliverables: ['P&A design & execution', 'Topside removal', 'Seabed clearance'],
    tier: 'Scope-based contract',
    icon: 'platform',
  },
]

export const testimonials: Testimonial[] = [
  {
    quote:
      'NusaDrill took over a stalled deepwater campaign and delivered the well eleven days ahead of schedule. Their drilling supervisors are simply the best we have worked with.',
    name: 'Danu Prasetyo',
    role: 'Vice President of Exploration, Karimun Energy',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    quote:
      'Their HSE discipline changed how our own teams operate. Two years, zero lost-time incidents across three concurrent sites.',
    name: 'Amelia Hartono',
    role: 'Asset Manager, Bawean Petroleum',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    quote:
      'From FEED to first oil in fourteen months. NusaDrill coordinated rig, pipeline, and permitting as one package, which saved us months of procurement pain.',
    name: 'Rizky Mahendra',
    role: 'Director of Operations, Selat Gas Indonesia',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
]

export const milestones = [
  {
    year: '1998',
    title: 'Founded in Balikpapan',
    text: 'Started as a six-man workover crew servicing mature fields in East Kalimantan.',
  },
  {
    year: '2006',
    title: 'First Offshore Contract',
    text: 'Awarded our first offshore campaign in the Java Sea, opening the deepwater division.',
  },
  {
    year: '2015',
    title: 'Regional Expansion',
    text: 'Expanded operations to Natuna, Madura, and West Papua with a fleet of twelve rigs.',
  },
  {
    year: '2024',
    title: 'Energy Transition Commitment',
    text: 'Launched our decommissioning and geothermal crossover division with a zero-harm mandate.',
  },
]

export const values = [
  {
    title: 'Safety Before Schedule',
    text: 'No barrel is worth a life. Every plan we sign carries a stop-work authority for every person on site.',
  },
  {
    title: 'Engineered Honesty',
    text: 'We report wells as they are, not as we wish they were. Clear data builds trust that outlasts campaigns.',
  },
  {
    title: 'Local Roots, Global Standards',
    text: '95% of our field workforce is Indonesian, trained to international drilling standards.',
  },
  {
    title: 'Deliver, Then Deliver Again',
    text: 'We measure success by the client who calls us back for the next campaign.',
  },
]
