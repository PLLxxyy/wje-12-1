import { create } from 'zustand'
import type { Position, Direction, GoldenFood } from '@/types/game'
import { INITIAL_SNAKE, INITIAL_DIRECTION, MOVE_INTERVAL, HIGH_SCORE_KEY, GOLDEN_FOOD_SPAWN_CHANCE, GOLDEN_FOOD_POINTS } from '@/utils/constants'
import {
  getNextHeadPosition,
  checkWallCollision,
  checkSelfCollision,
  checkFoodCollision,
  isOppositeDirection,
  generateRandomFood,
  checkGoldenFoodCollision,
  isGoldenFoodExpired,
  generateGoldenFood,
} from '@/utils/gameUtils'

interface GameStore {
  snake: Position[]
  food: Position
  goldenFood: GoldenFood | null
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
  checkGoldenFoodTimeout: () => void
}

const loadHighScoreFromStorage = (): number => {
  if (typeof window === 'undefined') return 0
  const stored = localStorage.getItem(HIGH_SCORE_KEY)
  return stored ? parseInt(stored, 10) : 0
}

export const useGameStore = create<GameStore>((set, get) => ({
  snake: INITIAL_SNAKE,
  food: generateRandomFood(INITIAL_SNAKE),
  goldenFood: null,
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

  checkGoldenFoodTimeout: () => {
    const state = get()
    if (state.goldenFood && isGoldenFoodExpired(state.goldenFood)) {
      set({ goldenFood: null })
    }
  },

  moveSnake: () => {
    const state = get()
    if (state.isGameOver || !state.isPlaying) return

    if (state.goldenFood && isGoldenFoodExpired(state.goldenFood)) {
      set({ goldenFood: null })
    }

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
    const ateGoldenFood = checkGoldenFoodCollision(newHead, state.goldenFood)
    const newSnake = ateFood || ateGoldenFood
      ? [newHead, ...state.snake]
      : [newHead, ...state.snake.slice(0, -1)]

    let newScore = state.score
    if (ateFood) newScore += 1
    if (ateGoldenFood) newScore += GOLDEN_FOOD_POINTS

    const newFood = ateFood ? generateRandomFood(newSnake, undefined, ateGoldenFood ? undefined : state.goldenFood) : state.food
    const newGoldenFood = ateGoldenFood ? null : state.goldenFood

    let spawnedGoldenFood = newGoldenFood
    if (!newGoldenFood && Math.random() < GOLDEN_FOOD_SPAWN_CHANCE) {
      spawnedGoldenFood = generateGoldenFood(newSnake, newFood)
    }

    set({
      snake: newSnake,
      food: newFood,
      goldenFood: spawnedGoldenFood,
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
      goldenFood: null,
      direction: INITIAL_DIRECTION,
      nextDirection: INITIAL_DIRECTION,
      score: 0,
      isGameOver: false,
      isPlaying: true,
    })
  },
}))
