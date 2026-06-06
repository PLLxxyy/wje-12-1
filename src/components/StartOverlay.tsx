import { Play, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'
import { useGameStore } from '@/store/useGameStore'

export function StartOverlay() {
  const isPlaying = useGameStore((state) => state.isPlaying)
  const isGameOver = useGameStore((state) => state.isGameOver)
  const startGame = useGameStore((state) => state.startGame)

  if (isPlaying || isGameOver) return null

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-xl">
      <div className="text-center">
        <button
          onClick={startGame}
          className="group py-4 px-8 bg-gradient-to-r from-snake-body to-snake-head hover:from-snake-head hover:to-snake-body text-white font-pixel text-base rounded-xl transition-all duration-300 shadow-glow-green hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-3"
        >
          <Play size={20} className="fill-white" />
          开始游戏
        </button>

        <div className="mt-8 text-snake-body/60">
          <p className="text-xs font-mono uppercase tracking-wider mb-3">操作方式</p>
          <div className="flex flex-col items-center gap-2">
            <ArrowUp size={24} className="text-snake-head" />
            <div className="flex gap-2">
              <ArrowLeft size={24} className="text-snake-head" />
              <ArrowDown size={24} className="text-snake-head" />
              <ArrowRight size={24} className="text-snake-head" />
            </div>
          </div>
          <p className="mt-4 text-xs font-mono text-snake-body/40">
            方向键 或 WASD 控制移动
          </p>
        </div>
      </div>
    </div>
  )
}
