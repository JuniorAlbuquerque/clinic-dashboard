type GenericFn = (...args: unknown[]) => unknown

// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce<T extends GenericFn>(fn: any, wait = 20) {
  let timeout: NodeJS.Timeout

  const debounced = (...args: unknown[]) => {
    const later = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }

  debounced.clear = () => clearTimeout(timeout)

  return debounced
}
