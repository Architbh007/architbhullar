import { getContent } from '@/lib/content'
import { JourneyExperience } from '@/components/journey/JourneyExperience'

export const revalidate = 60

export default async function JourneyPage() {
  const content = await getContent()
  return <JourneyExperience socials={content.socials} />
}
