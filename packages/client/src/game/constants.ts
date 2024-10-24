// Control keys
export enum Controls {
  Left = 'KeyA',
  Right = 'KeyD',
  Jump = 'Space',
  Fireball = 'KeyE',
  AirAttack = 'KeyF',
  Shield = 'KeyW',
  Pause = 'Escape',
}

// xbox gamepad buttons
export enum GamepadButtons {
  A = 0,
  B = 1,
  X = 2,
  Y = 3,
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
export const AIR_ATTACK_CHARGE_TIME = 1000 // ms
export const AIR_ATTACK_MANA_COST = 20
export const AIR_ATTACK_SHIFT = 0.15 // shift X in % of the screen width (0 to 1)
export const AIR_ATTACK_DURATION = 300 // ms
export const AIR_ATTACK_LINE_COLOR = 'cyan'
export const AIR_ATTACK_LINE_WIDTH = 3 // px
export const AIR_ATTACK_PARTICLE_COLOR = 'cyan'
export const AIR_ATTACK_PARTICLE_RADIUS = 5 // px
export const AIR_ATTACK_LINE_NUM = 3
export const AIR_ATTACK_LINE_GAP = 5
export const AIR_ATTACK_PARTICLE_DURATION = 500 // ms
export const AIR_ATTACK_LINE_DURATION = 50 // ms

// Fireball settings
export const FIREBALL_COOLDOWN = 2000 // ms
export const FIREBALL_SAFE_DISTANCE = 150 // px
export const FIREBALL_SPEED = 5
export const FIREBALL_RADIUS = 10 // px
export const FIREBALL_COLOR = 'orange'

// Shield settings
export const SHIELD_COOLDOWN = 5000 // ms
export const SHIELD_MANA_COST = 20
export const SHIELD_DURATION = 2000 // ms
export const SHIELD_COLOR = 'rgba(255, 255, 255, 0.35)'
export const SHIELD_LINE_WIDTH = 4 // px
export const SHIELD_RADIUS = 15 // px

// Computer AI settings
export const COMPUTER_ATTACK_SPEED = 1 // e.g., 1.3 for 130%
export const COMPUTER_DODGE_PROBABILITY = 0.05 // 0 to 1

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
export const PLAYER_WIDTH = 81
export const PLAYER_HEIGHT = 130
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
export const MOVE_SPEED = 200 // Speed in pixels per second
export const JUMP_VELOCITY = -13
