import { useEffect } from 'react'
import { GameBoard } from '@/components/GameBoard'
import { ScorePanel } from '@/components/ScorePanel'
import { GameOverModal } from '@/components/GameOverModal'
import { StartOverlay } from '@/components/StartOverlay'
import { useKeyboard } from '@/hooks/useKeyboard'
import { useGameLoop } from '@/hooks/useGameLoop'
import { useGameStore } from '@/store/useGameStore'

export default function GamePage() {
  const loadHighScore = useGameStore((state) => state.loadHighScore)

  useEffect(() => {
    loadHighScore()
  }, [loadHighScore])

  useKeyboard()
  useGameLoop()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-pixel text-snake-head text-shadow-glow mb-3 tracking-wider">
          🐍 贪吃蛇
        </h1>
        <p className="text-snake-body/60 font-mono text-sm">
          SNAKE GAME
        </p>
      </div>

      <div className="relative">
        <GameBoard />
        <StartOverlay />
      </div>

      <ScorePanel />

      <GameOverModal />

      <div className="mt-8 text-center">
        <p className="text-snake-body/40 text-xs font-mono">
          使用方向键或 WASD 控制蛇移动
        </p>
      </div>
    </div>
  )
}
