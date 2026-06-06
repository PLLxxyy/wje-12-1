import { Trophy, Star } from 'lucide-react'
import { useGameStore } from '@/store/useGameStore'

export function ScorePanel() {
  const score = useGameStore((state) => state.score)
  const highScore = useGameStore((state) => state.highScore)

  return (
    <div className="absolute top-6 right-6 flex flex-col gap-3">
      <div className="bg-black/40 backdrop-blur-md rounded-2xl px-6 py-4 border border-snake-body/30 shadow-lg">
        <div className="flex items-center gap-2 text-snake-head mb-1">
          <Star size={18} className="fill-snake-head" />
          <span className="text-xs font-mono uppercase tracking-wider">得分</span>
        </div>
        <div className="text-4xl font-pixel text-white text-shadow-glow">
          {score.toString().padStart(3, '0')}
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-md rounded-xl px-4 py-2 border border-yellow-500/20">
        <div className="flex items-center gap-2">
          <Trophy size={14} className="text-yellow-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-yellow-400/80">
            最高分
          </span>
          <span className="text-lg font-pixel text-yellow-400 ml-auto">
            {highScore.toString().padStart(3, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}
