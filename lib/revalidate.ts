import { revalidatePath } from 'next/cache'

const ROUTES = ['/', '/projects', '/skills', '/experience', '/contact']

export function revalidateAll() {
  ROUTES.forEach((r) => revalidatePath(r))
}
