export interface GameConfig {
  width?: number
  height?: number
  callback?: (state: 'win' | 'lose' | 'pause') => void
  textures?: {
    ground?: string
    sky?: string
    player1?: string
    player2?: string
  }
  colors?: {
    ground?: string
    sky?: string
    player1?: string
    player2?: string
  }
  computerDodgeProbability?: number
  computerAttackSpeedMultiplier?: number
  fireballCooldown?: number
  airAttackCooldown?: number
  shieldCooldown?: number
  manaRegenTime?: number
}
