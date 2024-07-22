import type { User } from 'lucia'

export function useUser() {
  return useState<User | null>('user', () => null)
}
