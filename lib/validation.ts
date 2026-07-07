import { z } from 'zod'

const urlOrEmpty = z.string().trim().refine(
  (v) => v === '' || /^https?:\/\/.+/.test(v) || v.startsWith('/'),
  { message: 'Must be a valid URL' }
)

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  subtitle: z.string(),
  bio: z.string(),
  bioExtended: z.array(z.string()),
  photo: z.string().optional().default(''),
  availability: z.string(),
  location: z.string(),
  university: z.string(),
  email: z.string().email('Invalid email').or(z.literal('')),
  wam: z.number().optional(),
  wamTarget: z.number().optional(),
})

const storyEventSchema = z.object({
  month: z.string().optional(),
  text: z.string(),
})
const storyEntrySchema = z.object({
  year: z.string().min(1, 'Year is required'),
  events: z.array(storyEventSchema),
})
export const timelineSchema = z.array(storyEntrySchema)

const experienceItemSchema = z.object({
  organization: z.string(),
  role: z.string(),
  duration: z.string(),
  description: z.string(),
  highlights: z.array(z.string()),
  type: z.enum(['education', 'work', 'project', 'achievement']),
  location: z.string(),
})
export const experienceSchema = z.array(experienceItemSchema)

const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  proficiency: z.string().optional(),
})
const skillGroupSchema = z.object({
  category: z.string().min(1, 'Category name is required'),
  skills: z.array(skillSchema),
})
export const skillsSchema = z.array(skillGroupSchema)

const projectSchema = z.object({
  id: z.string().min(1, 'Project id (slug) is required'),
  name: z.string().min(1, 'Project name is required'),
  fullName: z.string(),
  tagline: z.string(),
  problem: z.string(),
  architecture: z.string(),
  challenges: z.array(z.string()),
  solution: z.string(),
  stack: z.array(z.string()),
  github: urlOrEmpty.optional(),
  demo: urlOrEmpty.optional(),
  banner: urlOrEmpty.optional(),
  video: urlOrEmpty.optional(),
  status: z.enum(['active', 'completed', 'archived']),
  timeline: z.string(),
  role: z.string(),
  impact: z.string(),
  learnings: z.array(z.string()),
  futureImprovements: z.array(z.string()),
  featured: z.boolean().optional(),
})
export const projectsSchema = z.array(projectSchema).refine(
  (arr) => new Set(arr.map((p) => p.id)).size === arr.length,
  { message: 'Duplicate project id — each project id must be unique' }
)

export const socialLinksSchema = z.object({
  github: urlOrEmpty.optional().default(''),
  linkedin: urlOrEmpty.optional().default(''),
  email: z.string().email('Invalid email').or(z.literal('')),
  resume: urlOrEmpty.optional().default(''),
})

export const contactInformationSchema = z.object({
  availabilityBlurb: z.string(),
  extraBlurb: z.string(),
  responseNote: z.string(),
  calLink: urlOrEmpty.optional().default(''),
})
