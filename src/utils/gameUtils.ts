import type { Position, Direction, GoldenFood } from '@/types/game'
import { GRID_SIZE, GOLDEN_FOOD_DURATION } from './constants'

export function getNextHeadPosition(head: Position, direction: Direction): Position {
  const moves: Record<Direction, Position> = {
    UP: { x: head.x, y: head.y - 1 },
    DOWN: { x: head.x, y: head.y + 1 },
    LEFT: { x: head.x - 1, y: head.y },
    RIGHT: { x: head.x + 1, y: head.y },
  }
  return moves[direction]
}

export function checkWallCollision(position: Position): boolean {
  return (
    position.x < 0 ||
    position.x >= GRID_SIZE ||
    position.y < 0 ||
    position.y >= GRID_SIZE
  )
}

export function checkSelfCollision(head: Position, snakeBody: Position[]): boolean {
  return snakeBody.some((segment) => segment.x === head.x && segment.y === head.y)
}

export function checkFoodCollision(head: Position, food: Position): boolean {
  return head.x === food.x && head.y === food.y
}

export function isOppositeDirection(current: Direction, next: Direction): boolean {
  const opposites: Record<Direction, Direction> = {
    UP: 'DOWN',
    DOWN: 'UP',
    LEFT: 'RIGHT',
    RIGHT: 'LEFT',
  }
  return opposites[current] === next
}

export function generateRandomFood(snake: Position[], existingFood?: Position, goldenFood?: GoldenFood): Position {
  const occupied = new Set(snake.map((seg) => `${seg.x},${seg.y}`))
  if (existingFood) occupied.add(`${existingFood.x},${existingFood.y}`)
  if (goldenFood) occupied.add(`${goldenFood.position.x},${goldenFood.position.y}`)
  
  const emptySpots: Position[] = []

  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      if (!occupied.has(`${x},${y}`)) {
        emptySpots.push({ x, y })
      }
    }
  }

  if (emptySpots.length === 0) {
    return { x: 0, y: 0 }
  }

  return emptySpots[Math.floor(Math.random() * emptySpots.length)]
}

export function checkGoldenFoodCollision(head: Position, goldenFood: GoldenFood | null): boolean {
  if (!goldenFood) return false
  return head.x === goldenFood.position.x && head.y === goldenFood.position.y
}

export function isGoldenFoodExpired(goldenFood: GoldenFood | null): boolean {
  if (!goldenFood) return false
  return Date.now() >= goldenFood.expiresAt
}

export function generateGoldenFood(snake: Position[], normalFood: Position): GoldenFood | null {
  const position = generateRandomFood(snake, normalFood)
  return {
    position,
    expiresAt: Date.now() + GOLDEN_FOOD_DURATION,
  }
}
