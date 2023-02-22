export const renderEmpty = <T>(value: T) => {
  if (!value || typeof value === 'undefined') {
    return '-'
  }

  return value
}
