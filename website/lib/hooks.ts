import { useState, useEffect } from 'react'

type UseCountDown = (time: number) => [number, (time: number) => void]

export const useCountDown: UseCountDown = (time) => {
  const [count, setCount] = useState<number>(time)

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
