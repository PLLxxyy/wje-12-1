import { useEffect } from 'react'
import type { Direction } from '@/types/game'
import { useGameStore } from '@/store/useGameStore'

const KEY_DIRECTION_MAP: Record<string, Direction> = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  w: 'UP',
  W: 'UP',
  s: 'DOWN',
  S: 'DOWN',
  a: 'LEFT',
  A: 'LEFT',
  d: 'RIGHT',
  D: 'RIGHT',
}

export function useKeyboard() {
  const setDirection = useGameStore((state) => state.setDirection)
  const isPlaying = useGameStore((state) => state.isPlaying)
  const startGame = useGameStore((state) => state.startGame)
  const isGameOver = useGameStore((state) => state.isGameOver)
  const resetGame = useGameStore((state) => state.resetGame)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (isGameOver) {
          resetGame()
        } else if (!isPlaying) {
          startGame()
        }
        return
      }

      const direction = KEY_DIRECTION_MAP[e.key]
      if (direction) {
        e.preventDefault()
        setDirection(direction)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setDirection, isPlaying, isGameOver, startGame, resetGame])
}
