import type { ExperienceItem } from '@/types'

export const experience: ExperienceItem[] = [
  {
    organization: 'Deakin University',
    role: 'Bachelor of Software Engineering (Honours)',
    duration: '2022 – Present',
    description:
      'Studying software engineering with a focus on systems design, AI/ML integration, and full-stack web development. Consistently applied coursework through real projects built outside of assessments.',
    highlights: [
      'Focus on practical AI integration and automation projects',
      'Completed capstone in conversational AI (EVAT)',
      'Active member of the Computer Science & Engineering Society',
    ],
    type: 'education',
    location: 'Melbourne, Australia',
  },
  {
    organization: 'Deakin University',
    role: 'App Team Lead',
    duration: '2023 – 2024',
    description:
      'Led a student development team building internal university applications. Owned architecture decisions, code reviews, and sprint planning for a team of five.',
    highlights: [
      'Led a team of 5 student developers',
      'Introduced Git branching strategy and basic CI/CD practices',
      'Shipped 2 internal tools used by university staff',
    ],
    type: 'work',
    location: 'Melbourne, Australia',
  },
  {
    organization: 'Deakin University',
    role: 'QA Assistant',
    duration: '2023',
    description:
      'Performed quality assurance testing for internal software systems. Built automated test scripts that significantly reduced manual testing overhead on a legacy codebase.',
    highlights: [
      'Automated ~40% of previously manual test cases',
      'Improved test coverage across two legacy systems',
      'Documented testing procedures for future team members',
    ],
    type: 'work',
    location: 'Melbourne, Australia',
  },
  {
    organization: 'Deakin Hack 2023',
    role: 'Hackathon — Top 3 Placement',
    duration: '2023',
    description:
      'Built the initial prototype of NodeMap during a 48-hour hackathon. The project placed in the top 3 out of 20+ competing teams and was later developed into a full tool.',
    highlights: [
      'Top 3 placement from 20+ teams',
      'Built a working prototype in 48 hours',
      'NodeMap later developed into a complete developer tool',
    ],
    type: 'achievement',
    location: 'Melbourne, Australia',
  },
]
