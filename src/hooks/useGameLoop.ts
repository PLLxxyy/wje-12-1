import { useEffect, useRef } from 'react'
import { useGameStore } from '@/store/useGameStore'

export function useGameLoop() {
  const isPlaying = useGameStore((state) => state.isPlaying)
  const isGameOver = useGameStore((state) => state.isGameOver)
  const moveSnake = useGameStore((state) => state.moveSnake)
  const checkGoldenFoodTimeout = useGameStore((state) => state.checkGoldenFoodTimeout)
  const moveInterval = useGameStore((state) => state.moveInterval)
  const timerRef = useRef<number | null>(null)
  const goldenTimerRef = useRef<number | null>(null)

  useEffect(() => {
    if (isPlaying && !isGameOver) {
      timerRef.current = window.setInterval(() => {
        moveSnake()
      }, moveInterval)

      goldenTimerRef.current = window.setInterval(() => {
        checkGoldenFoodTimeout()
      }, 100)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      if (goldenTimerRef.current) {
        clearInterval(goldenTimerRef.current)
        goldenTimerRef.current = null
      }
    }
  }, [isPlaying, isGameOver, moveSnake, checkGoldenFoodTimeout, moveInterval])
}
