import { titleCase as tc } from 'title-case'

export function titleCase(string: string | undefined) {
  return string ? tc(string) : ''
}
