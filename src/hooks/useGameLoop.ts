import { useEffect, useRef } from 'react'
import { useGameStore } from '@/store/useGameStore'

export function useGameLoop() {
  const isPlaying = useGameStore((state) => state.isPlaying)
  const isGameOver = useGameStore((state) => state.isGameOver)
  const moveSnake = useGameStore((state) => state.moveSnake)
  const moveInterval = useGameStore((state) => state.moveInterval)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (isPlaying && !isGameOver) {
      timerRef.current = window.setInterval(() => {
        moveSnake()
      }, moveInterval)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isPlaying, isGameOver, moveSnake, moveInterval])
}
