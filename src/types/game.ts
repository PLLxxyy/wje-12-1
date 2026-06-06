export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export interface Position {
  x: number
  y: number
}

export interface GoldenFood {
  position: Position
  expiresAt: number
}
