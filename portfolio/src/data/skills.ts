import type { SkillGroup } from '../types'

export const skillGroups: SkillGroup[] = [
  {
    category: 'Front-End',
    items: [
      'HTML5 & CSS3 (semantic, responsive)',
      'JavaScript',
      'TypeScript',
      'React 19 (hooks, context)',
      'Tailwind CSS v4',
      'Accessibility (WCAG dasar)',
    ],
  },
  {
    category: 'Back-End',
    items: [
      'Node.js & Bun',
      'Express & REST API',
      'PostgreSQL & Prisma',
      'MongoDB (materi kuliah)',
      'Java (materi kuliah)',
      'Socket.IO (real-time)',
      'Integrasi WhatsApp (Baileys)',
      'Autentikasi (Clerk, JWT)',
    ],
  },
  {
    category: 'Cloud, QA & Tools',
    items: [
      'AWS L1 Infrastructure Monitoring',
      'AWS Certified Cloud Practitioner',
      'Manual QA (Functional & UAT)',
      'Git & GitHub',
      'Python (dasar) & web scraping',
      'Macro automation, Asana, Trello, Notion',
    ],
  },
]
