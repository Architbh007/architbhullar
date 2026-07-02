export interface Project {
  id: string
  name: string
  fullName: string
  tagline: string
  problem: string
  architecture: string
  challenges: string[]
  solution: string
  stack: string[]
  github?: string
  demo?: string
  banner?: string
  video?: string
  status: 'active' | 'completed' | 'archived'
  timeline: string
  role: string
  impact: string
  learnings: string[]
  futureImprovements: string[]
  featured?: boolean
}

export interface Skill {
  name: string
  proficiency?: string
}

export interface SkillGroup {
  category: string
  skills: Skill[]
}

export interface StackRow {
  category: string
  technologies: string[]
}

export interface StoryEntry {
  year: string
  events: string[]
}

export interface ExperienceItem {
  organization: string
  role: string
  duration: string
  description: string
  highlights: string[]
  type: 'education' | 'work' | 'project' | 'achievement'
  location: string
}

export interface Profile {
  name: string
  firstName: string
  lastName: string
  title: string
  subtitle: string
  bio: string
  bioExtended: string[]
  photo: string
  availability: string
  location: string
  university: string
  email: string
  wam?: number
  wamTarget?: number
}

export interface Socials {
  github: string
  linkedin: string
  email: string
  resume: string
}

export interface SiteContent {
  profile: Profile
  story: StoryEntry[]
  stack: StackRow[]
  projects: Project[]
  skills: SkillGroup[]
  experience: ExperienceItem[]
  socials: Socials
}
