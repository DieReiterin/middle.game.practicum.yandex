import { GameStates } from './constants'

export interface GameConfig {
  width?: number
  height?: number
  callback?: (state: GameStates) => void
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

export interface PlayerConfig {
  x: number
  y: number
  color: string
  controls?: {
    left: string
    right: string
    jump: string
    fireball: string
    airAttack: string
    shield: string
  }
  isComputer: boolean
  texture?: HTMLImageElement | null
  config: GameConfig
  dodgeProbability?: number
  attackSpeedMultiplier?: number
  canvasWidth: number
  canvasHeight: number
  groundHeight: number
  name: string
  getGameOver: () => boolean
  shouldFlip: boolean
}

export interface AirAttackConfig {
  duration: number
  numLines: number
  lineColor: string
  particleCount: number
  particleColor: string
  particleRadius: number
}

export interface GamepadState {
  axes: readonly number[]
  buttons: boolean[]
}
