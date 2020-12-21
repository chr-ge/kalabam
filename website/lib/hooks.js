import { useState, useEffect } from 'react'

export const useCountDown = (time) => {
  const [count, setCount] = useState(time)

  useEffect(() => {
    setCount(time)
  }, [time])

  useEffect(() => {
    if (!count) return
    const timeout = setTimeout(() => setCount(count - 1), 1000)

    return () => clearTimeout(timeout)
  }, [count])

  return [count, setCount]
}
