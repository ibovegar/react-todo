import { useEffect, useRef } from 'react'

export function useAutoSave(
  callback: (title: string, description: string) => void,
  title: string,
  description: string,
  enabled: boolean,
  delay = 500
) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (!enabled) return
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => callbackRef.current(title, description), delay)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [title, description, enabled, delay])
}
