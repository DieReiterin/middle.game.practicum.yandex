// Control keys
export enum Controls {
  Left = 'a',
  Right = 'd',
  Jump = ' ',
  Fireball = 'e',
  AirAttack = 'f',
  Shield = 'w',
  Pause = 'escape',
}

// Game states
export enum GameStates {
  Win = 'win',
  Lose = 'lose',
  Pause = 'pause',
}

/** Game settings **/

// Air attack settings
export const AIR_ATTACK_COOLDOWN = 5000 // ms

// Fireball settings
export const FIREBALL_COOLDOWN = 2000 // ms

// Shield settings
export const SHIELD_COOLDOWN = 5000 // ms

// Computer AI settings
export const COMPUTER_ATTACK_SPEED = 1 // e.g., 1.3 for 130%
export const COMPUTER_DODGE_PROBABILITY = 0.4 // 0 to 1

// Default colors
export const DEFAULT_COMPUTER_COLOR = 'blue'
export const DEFAULT_GROUND_COLOR = 'brown'
export const DEFAULT_PLAYER_COLOR = 'red'
export const DEFAULT_SKY_COLOR = 'lightblue'

// Default sizes (px)
export const DEFAULT_GAME_SCREEN_WIDTH = 915
export const DEFAULT_GAME_SCREEN_HEIGHT = 595

// Game interface (px from the top)
export const HEALTH_BAR_Y = 20
export const MANA_BAR_Y = 50
export const NAME_Y = 80

// Player settings
export const PLAYER_NAME = 'Player'
export const PLAYER_X_OFFSET = 100 // from left side

// Computer settings
export const COMPUTER_NAME = 'Computer'
export const COMPUTER_X_OFFSET = 150 // from right side

// Game settings
export const GRAVITY = 0.5
export const GROUND_HEIGHT = 65
export const MANA_REGEN_TIME = 30000
export const MAX_MANA = 100
export const MAX_HEALTH = 100
