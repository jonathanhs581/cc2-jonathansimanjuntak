export interface Profile {
  name: string
  role: string
  photo: string
  tagline: string
  email: string
  location: string
  linkedin?: string
  github: string
}

export interface NavLink {
  id: string
  label: string
}

export type ProjectCategory =
  | 'Full-Stack'
  | 'Front-End'
  | 'Automation & Ops'
  | 'QA & Testing'

export interface Project {
  id: string
  title: string
  description: string
  category: ProjectCategory
  technologies: string[]
  image: string
  liveUrl?: string
  repoUrl?: string
  star: {
    situation: string
    task: string
    action: string
    result: string
  }
}

export interface SkillGroup {
  category: 'Front-End' | 'Back-End' | 'Cloud, QA & Tools'
  items: string[]
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  responsibilities: string[]
}

export interface EducationItem {
  school: string
  degree: string
  period: string
  note?: string
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  avatar?: string
}
