import { getContent } from '@/lib/content'
import { Workspace } from '@/components/Workspace'

export const revalidate = 60

export function generateStaticParams() {
  return [
    { view: 'projects' },
    { view: 'skills' },
    { view: 'experience' },
    { view: 'contact' },
  ]
}

export default async function ViewPage() {
  const content = await getContent()
  return <Workspace content={content} />
}
