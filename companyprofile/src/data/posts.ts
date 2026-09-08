export type Post = {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  image: string
}

export const categories = ['Drilling', 'Engineering', 'HSE', 'Energy Transition']

export const seedPosts: Post[] = [
  {
    id: 'seed-1',
    title: 'How We Cut Deepwater Drilling Costs by 18%',
    excerpt:
      'Batch drilling and a redesigned casing program paid for themselves in a single campaign. Here is the engineering behind it.',
    content:
      'When our client asked us to look at a three-well deepwater program, the biggest cost driver was not the rig. It was time.\n\nWe rebuilt the well design around batch setting, grouped casing runs across all three wells, and moved the completion team onto the rig while drilling was still underway on the adjacent well.\n\nThe result: eighteen percent lower total cost and first oil eleven days ahead of plan. The lesson we keep repeating is simple: the cheapest barrel is the one you do not have to wait for.',
    author: 'Field Engineering Team',
    date: '2026-08-21',
    category: 'Drilling',
    image: '/images/blog-1.webp',
  },
  {
    id: 'seed-2',
    title: 'The Quiet Case for Early Decommissioning Planning',
    excerpt:
      'Wells designed for their end-of-life from day one are cheaper to abandon, safer to operate, and easier to permit.',
    content:
      'Decommissioning is usually the last line item anyone wants to discuss. Yet the wells that are cheapest to abandon are the ones that were designed for abandonment from the start.\n\nWe now run a P&A review at the FEED stage of every campaign. Which barriers will we leave behind? Can we pull tubulars without a workover rig? Are cellars accessible in thirty years?\n\nThese questions cost nothing at planning time and save millions at the end of field life.',
    author: 'Decommissioning Division',
    date: '2026-07-09',
    category: 'Energy Transition',
    image: '/images/blog-2.webp',
  },
  {
    id: 'seed-3',
    title: 'Well Integrity Audits: What 200 Wells Taught Us',
    excerpt:
      'After two hundred integrity audits across mature fields, three failure patterns keep showing up. All of them are preventable.',
    content:
      'Mature fields age quietly. Barriers degrade between interventions, and paperwork drifts from reality one workover at a time.\n\nAcross two hundred audits, the same three patterns appear: corroded production casings behind stuck tubing, annulus pressures nobody logged, and tree assemblies serviced on schedules that no longer match well conditions.\n\nOur recommendation is always the same: risk-rank your wells, verify the top ten physically, and let data drive the rest of the schedule.',
    author: 'Field Engineering Team',
    date: '2026-06-18',
    category: 'Engineering',
    image: '/images/blog-3.webp',
  },
  {
    id: 'seed-4',
    title: 'Zero Lost-Time Incidents: A Two-Year Field Report',
    excerpt:
      'Two years, three concurrent sites, zero LTI. This is the safety system that made it happen, in plain language.',
    content:
      'Safety programs fail when they live in binders. Ours lives in the pre-shift meeting.\n\nEvery crew starts the day identifying the single riskiest task ahead and naming who can stop it. Supervisors are scored on hazard reports raised, not hazards hidden. And every stop-work event, big or small, is shared across all sites within twenty-four hours.\n\nNone of this is revolutionary. The difference is that we actually do it, every shift, every day.',
    author: 'HSE Directorate',
    date: '2026-05-30',
    category: 'HSE',
    image: '/images/blog-4.webp',
  },
  {
    id: 'seed-5',
    title: 'RemoteOps: Drilling Support From Balikpapan',
    excerpt:
      'Real-time data links let one engineering team support four rigs at once. Here is how our remote operations center works.',
    content:
      'A drilling engineer staring at one rig sees maybe a hundred parameters. Our operations center in Balikpapan watches four rigs and several thousand, streamed in real time.\n\nThe center does not replace the judgment of the derrickman. It catches the trends humans miss: slow torque creep, mud losses that are ten barrels off trend, a BHA that has been run past its fatigue envelope.\n\nIn its first year, RemoteOps flagged nine downhole events early enough to avoid flat time. That is nine rigs-days our clients did not pay for.',
    author: 'Remote Operations',
    date: '2026-04-22',
    category: 'Engineering',
    image: '/images/blog-5.webp',
  },
  {
    id: 'seed-6',
    title: 'What Geothermal Wells Can Learn From Oil & Gas',
    excerpt:
      'High-temperature drilling is not new to us. The crossover between deep gas wells and geothermal is bigger than most operators expect.',
    content:
      'Geothermal wells are, mechanically, high-temperature gas wells with an attitude. Lost circulation, hard rock, and corrosive fluids are problems our crews have managed for decades.\n\nThe crossover that matters most is planning discipline: pore pressure prediction, casing seat selection, and managed-pressure drilling all transfer directly.\n\nOur geothermal division is now supporting two development programs in West Java, staffed almost entirely by graduates of our gas drilling crews.',
    author: 'Decommissioning Division',
    date: '2026-03-14',
    category: 'Energy Transition',
    image: '/images/blog-6.webp',
  },
]
