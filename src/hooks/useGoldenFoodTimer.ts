import { useState, useEffect } from 'react'
import type { GoldenFood } from '@/types/game'
import { GOLDEN_FOOD_DURATION } from '@/utils/constants'

export function useGoldenFoodTimer(goldenFood: GoldenFood | null) {
  const [remainingTime, setRemainingTime] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    if (!goldenFood) {
      setRemainingTime(0)
      setProgress(0)
      return
    }

    const updateTimer = () => {
      const now = Date.now()
      const remaining = Math.max(0, goldenFood.expiresAt - now)
      setRemainingTime(remaining)
      setProgress(remaining / GOLDEN_FOOD_DURATION)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 100)

    return () => clearInterval(interval)
  }, [goldenFood])

  return { remainingTime, progress }
}
