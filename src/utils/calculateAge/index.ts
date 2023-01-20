import { differenceInYears } from 'date-fns'

export function calculateAge(birthday: Date) {
  const diff = differenceInYears(new Date(), birthday)

  return diff
}
