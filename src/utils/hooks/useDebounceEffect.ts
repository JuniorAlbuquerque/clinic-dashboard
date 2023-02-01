/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'

export const useDebouncedEffect = <F extends (...args: any[]) => any>(
  effect: F,
  deps: any[],
  delay = 166
) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay)

    return () => clearTimeout(handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(deps || []), delay])
}
