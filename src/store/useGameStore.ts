import { create } from 'zustand'
import type { Position, Direction } from '@/types/game'
import { INITIAL_SNAKE, INITIAL_DIRECTION, MOVE_INTERVAL, HIGH_SCORE_KEY } from '@/utils/constants'
import {
  getNextHeadPosition,
  checkWallCollision,
  checkSelfCollision,
  checkFoodCollision,
  isOppositeDirection,
  generateRandomFood,
} from '@/utils/gameUtils'

interface GameStore {
  snake: Position[]
  food: Position
  direction: Direction
  nextDirection: Direction
  score: number
  highScore: number
  isGameOver: boolean
  isPlaying: boolean
  moveInterval: number
  setDirection: (dir: Direction) => void
  moveSnake: () => void
  startGame: () => void
  resetGame: () => void
  loadHighScore: () => void
}

const loadHighScoreFromStorage = (): number => {
  if (typeof window === 'undefined') return 0
  const stored = localStorage.getItem(HIGH_SCORE_KEY)
  return stored ? parseInt(stored, 10) : 0
}

export const useGameStore = create<GameStore>((set, get) => ({
  snake: INITIAL_SNAKE,
  food: generateRandomFood(INITIAL_SNAKE),
  direction: INITIAL_DIRECTION,
  nextDirection: INITIAL_DIRECTION,
  score: 0,
  highScore: 0,
  isGameOver: false,
  isPlaying: false,
  moveInterval: MOVE_INTERVAL,

  loadHighScore: () => {
    set({ highScore: loadHighScoreFromStorage() })
  },

  setDirection: (dir: Direction) => {
    const { direction, isGameOver, isPlaying } = get()
    if (isGameOver || !isPlaying) return
    if (isOppositeDirection(direction, dir)) return
    set({ nextDirection: dir })
  },

  moveSnake: () => {
    const state = get()
    if (state.isGameOver || !state.isPlaying) return

    const direction = state.nextDirection
    const head = state.snake[0]
    const newHead = getNextHeadPosition(head, direction)

    if (checkWallCollision(newHead)) {
      const newHigh = Math.max(state.score, state.highScore)
      if (typeof window !== 'undefined') {
        localStorage.setItem(HIGH_SCORE_KEY, newHigh.toString())
      }
      set({
        isGameOver: true,
        isPlaying: false,
        highScore: newHigh,
      })
      return
    }

    const bodyWithoutTail = state.snake.slice(0, -1)
    if (checkSelfCollision(newHead, bodyWithoutTail)) {
      const newHigh = Math.max(state.score, state.highScore)
      if (typeof window !== 'undefined') {
        localStorage.setItem(HIGH_SCORE_KEY, newHigh.toString())
      }
      set({
        isGameOver: true,
        isPlaying: false,
        highScore: newHigh,
      })
      return
    }

    const ateFood = checkFoodCollision(newHead, state.food)
    const newSnake = ateFood
      ? [newHead, ...state.snake]
      : [newHead, ...state.snake.slice(0, -1)]

    const newScore = ateFood ? state.score + 1 : state.score
    const newFood = ateFood ? generateRandomFood(newSnake) : state.food

    set({
      snake: newSnake,
      food: newFood,
      direction,
      score: newScore,
    })
  },

  startGame: () => {
    const state = get()
    if (state.isGameOver) return
    set({ isPlaying: true })
  },

  resetGame: () => {
    set({
      snake: INITIAL_SNAKE,
      food: generateRandomFood(INITIAL_SNAKE),
      direction: INITIAL_DIRECTION,
      nextDirection: INITIAL_DIRECTION,
      score: 0,
      isGameOver: false,
      isPlaying: true,
    })
  },
}))
