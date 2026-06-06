import { useGameStore } from '@/store/useGameStore'
import { GRID_SIZE, CELL_SIZE } from '@/utils/constants'

export function GameBoard() {
  const snake = useGameStore((state) => state.snake)
  const food = useGameStore((state) => state.food)

  const boardSize = GRID_SIZE * CELL_SIZE

  return (
    <div
      className="relative bg-snake-darker border-4 border-snake-body rounded-xl shadow-glow-green bg-grid-pattern"
      style={{
        width: boardSize,
        height: boardSize,
        backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
      }}
    >
      {snake.map((segment, index) => {
        const isHead = index === 0
        const isTail = index === snake.length - 1
        let bgColor = 'bg-snake-body'
        if (isHead) bgColor = 'bg-snake-head shadow-glow-green'
        else if (isTail) bgColor = 'bg-snake-tail'

        return (
          <div
            key={`snake-${index}`}
            className={`absolute ${bgColor} rounded-md transition-all duration-75`}
            style={{
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              left: segment.x * CELL_SIZE + 1,
              top: segment.y * CELL_SIZE + 1,
              opacity: isHead ? 1 : 1 - index * 0.02,
            }}
          >
            {isHead && (
              <div className="w-full h-full flex items-center justify-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-snake-darker" />
                <div className="w-1.5 h-1.5 rounded-full bg-snake-darker" />
              </div>
            )}
          </div>
        )
      })}

      <div
        className="absolute bg-snake-food rounded-full shadow-glow-red animate-pulse-fast"
        style={{
          width: CELL_SIZE - 6,
          height: CELL_SIZE - 6,
          left: food.x * CELL_SIZE + 3,
          top: food.y * CELL_SIZE + 3,
        }}
      >
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-700 rounded-full" />
      </div>
    </div>
  )
}
