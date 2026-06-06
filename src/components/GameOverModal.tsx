import { RotateCcw, Skull, Trophy } from 'lucide-react'
import { useGameStore } from '@/store/useGameStore'

export function GameOverModal() {
  const isGameOver = useGameStore((state) => state.isGameOver)
  const score = useGameStore((state) => state.score)
  const highScore = useGameStore((state) => state.highScore)
  const resetGame = useGameStore((state) => state.resetGame)

  if (!isGameOver) return null

  const isNewRecord = score >= highScore && score > 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-gradient-to-b from-snake-darker to-snake-dark rounded-3xl border-2 border-snake-body/50 p-10 shadow-2xl max-w-md w-full mx-4 animate-bounce-slow">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <div className="w-20 h-20 bg-snake-food rounded-full flex items-center justify-center shadow-glow-red">
            <Skull size={40} className="text-white" />
          </div>
        </div>

        <div className="text-center mt-6">
          <h2 className="text-3xl font-pixel text-snake-food mb-2">
            游戏结束
          </h2>
          <p className="text-snake-body/70 font-mono text-sm mb-6">
            Game Over
          </p>

          {isNewRecord && (
            <div className="mb-6 py-3 px-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
              <div className="flex items-center justify-center gap-2 text-yellow-400">
                <Trophy size={24} className="fill-yellow-400" />
                <span className="font-pixel text-lg">新纪录!</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-black/30 rounded-xl p-4 border border-snake-body/20">
              <div className="text-snake-head/60 text-xs font-mono uppercase mb-1">
                本次得分
              </div>
              <div className="text-3xl font-pixel text-white">
                {score}
              </div>
            </div>
            <div className="bg-black/30 rounded-xl p-4 border border-yellow-500/20">
              <div className="text-yellow-400/60 text-xs font-mono uppercase mb-1">
                最高记录
              </div>
              <div className="text-3xl font-pixel text-yellow-400">
                {highScore}
              </div>
            </div>
          </div>

          <button
            onClick={resetGame}
            className="group w-full py-4 px-6 bg-gradient-to-r from-snake-body to-snake-head hover:from-snake-head hover:to-snake-body text-white font-pixel text-lg rounded-xl transition-all duration-300 shadow-glow-green hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <RotateCcw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
            再来一局
          </button>

          <p className="mt-4 text-xs text-snake-body/50 font-mono">
            按空格键快速重新开始
          </p>
        </div>
      </div>
    </div>
  )
}
