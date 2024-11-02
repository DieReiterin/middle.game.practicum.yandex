// Game.ts
import { GameConfig, GamepadState } from './types'
import { Player } from './Player'
import {
  GROUND_HEIGHT,
  DEFAULT_GAME_SCREEN_WIDTH,
  DEFAULT_GAME_SCREEN_HEIGHT,
  AIR_ATTACK_COOLDOWN,
  FIREBALL_COOLDOWN,
  SHIELD_COOLDOWN,
  COMPUTER_DODGE_PROBABILITY,
  COMPUTER_ATTACK_SPEED,
  DEFAULT_PLAYER_COLOR,
  DEFAULT_COMPUTER_COLOR,
  MANA_REGEN_TIME,
  PLAYER_NAME,
  COMPUTER_NAME,
  PLAYER_X_OFFSET,
  COMPUTER_X_OFFSET,
  HEALTH_BAR_Y,
  MANA_BAR_Y,
  NAME_Y,
  Controls,
  GameStates,
  DEFAULT_SKY_COLOR,
  DEFAULT_GROUND_COLOR,
} from './constants'

export class Game {
  private static instance: Game | null = null
  public canvas!: HTMLCanvasElement
  private context!: CanvasRenderingContext2D
  private readonly config: GameConfig
  private player!: Player
  private computer!: Player
  public isPaused = true
  private isGameOver = false
  private lastTime = 0
  private animationFrameId: number | null = null
  private skyImage: HTMLImageElement | null = null
  private groundImage: HTMLImageElement | null = null
  private player1Image: HTMLImageElement | null = null
  private player2Image: HTMLImageElement | null = null
  private totalImagesToLoad = 0
  private imagesLoadedCount = 0
  private justUnpaused = false
  private gamepadIndex: number | null = null

  private constructor(config: GameConfig = {}) {
    if (Game.instance) {
      throw new Error(
        'Экземпляр Game уже существует. Используйте Game.getInstance() или Game.createInstance()',
      )
    }

    this.config = {
      width: DEFAULT_GAME_SCREEN_WIDTH,
      height: DEFAULT_GAME_SCREEN_HEIGHT,
      fireballCooldown: FIREBALL_COOLDOWN,
      airAttackCooldown: AIR_ATTACK_COOLDOWN,
      shieldCooldown: SHIELD_COOLDOWN,
      manaRegenTime: MANA_REGEN_TIME,
      computerDodgeProbability: COMPUTER_DODGE_PROBABILITY,
      computerAttackSpeedMultiplier: COMPUTER_ATTACK_SPEED,
      ...config,
    }
    this.initCanvas()
    this.bindEvents()
    this.loadImages()
    this.checkGamepads()
  }

  public static createInstance(config: GameConfig): Game {
    if (Game.instance) {
      Game.instance.destroy()
    }
    Game.instance = new Game(config)
    return Game.instance
  }

  public static getInstance(): Game | null {
    return Game.instance
  }

  private initCanvas() {
    if (typeof document === 'undefined') {
      return
    }

    this.canvas = document.createElement('canvas')
    this.canvas.width = this.config.width!
    this.canvas.height = this.config.height!
    const context = this.canvas.getContext('2d')
    if (!context) throw new Error('Canvas not supported')
    this.context = context
  }

  private loadImages() {
    const { sky, ground, player1, player2 } = this.config || {}
    const imagesToLoad: { [key: string]: string } = {}

    if (sky && sky.textures) {
      imagesToLoad['skyImage'] = sky.textures
      this.totalImagesToLoad++
    }
    if (ground && ground.textures) {
      imagesToLoad['groundImage'] = ground.textures
      this.totalImagesToLoad++
    }
    if (player1 && player1.textures) {
      imagesToLoad['player1Image'] = player1.textures
      this.totalImagesToLoad++
    }
    if (player2 && player2.textures) {
      imagesToLoad['player2Image'] = player2.textures
      this.totalImagesToLoad++
    }

    const startGame = () => {
      this.initPlayers()
      this.gameLoop = this.gameLoop.bind(this)
      this.lastTime = performance.now()
      this.animationFrameId = requestAnimationFrame(this.gameLoop)
    }

    if (this.totalImagesToLoad === 0) {
      // No images to load
      startGame()
    } else {
      for (const key in imagesToLoad) {
        const img = new Image()
        img.src = imagesToLoad[key]
        img.onload = () => {
          ;(this as any)[key] = img
          this.imagesLoadedCount++
          if (this.imagesLoadedCount === this.totalImagesToLoad) {
            startGame()
          }
        }
        img.onerror = () => {
          console.error(`Failed to load image: ${imagesToLoad[key]}`)
          this.imagesLoadedCount++
          if (this.imagesLoadedCount === this.totalImagesToLoad) {
            startGame()
          }
        }
      }
    }
  }

  private initPlayers() {
    this.player = new Player({
      x: PLAYER_X_OFFSET,
      y: this.config.height! - GROUND_HEIGHT,
      color: this.config.player1?.colors || DEFAULT_PLAYER_COLOR,
      texture: this.player1Image,
      controls: {
        left: Controls.Left,
        right: Controls.Right,
        jump: Controls.Jump,
        fireball: Controls.Fireball,
        airAttack: Controls.AirAttack,
        shield: Controls.Shield,
      },
      isComputer: false,
      config: this.config,
      canvasWidth: this.config.width!,
      canvasHeight: this.config.height!,
      groundHeight: GROUND_HEIGHT,
      name: PLAYER_NAME,
      getGameOver: this.isGameOverNow.bind(this),
      shouldFlip: false,
    })

    this.computer = new Player({
      x: this.config.width! - COMPUTER_X_OFFSET,
      y: this.config.height! - GROUND_HEIGHT,
      color: this.config.player2?.colors || DEFAULT_COMPUTER_COLOR,
      texture: this.player2Image,
      isComputer: true,
      config: this.config,
      dodgeProbability: this.config.computerDodgeProbability,
      attackSpeedMultiplier: this.config.computerAttackSpeedMultiplier,
      canvasWidth: this.config.width!,
      canvasHeight: this.config.height!,
      groundHeight: GROUND_HEIGHT,
      name: COMPUTER_NAME,
      getGameOver: this.isGameOverNow.bind(this),
      shouldFlip: true,
    })
  }

  public destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }
    window.removeEventListener('keydown', this.keydownHandler)
    window.removeEventListener('gamepadconnected', this.onGamepadConnected)
    window.removeEventListener(
      'gamepaddisconnected',
      this.onGamepadDisconnected,
    )
    this.player?.destroy()
    this.computer?.destroy()
    Game.instance = null
  }

  private keydownHandler = (e: KeyboardEvent) => {
    if (e.code === Controls.Pause) {
      this.togglePause()
    }
  }

  private bindEvents() {
    window.addEventListener('keydown', this.keydownHandler)
    window.addEventListener('gamepadconnected', this.onGamepadConnected)
    window.addEventListener('gamepaddisconnected', this.onGamepadDisconnected)
  }

  private checkGamepads(): void {
    const gamepads = navigator.getGamepads()
    for (let i = 0; i < gamepads.length; i++) {
      const gp = gamepads[i]
      if (gp && this.isSuitableGamepad(gp)) {
        this.onGamepadConnected({ gamepad: gp } as GamepadEvent)
        break
      }
    }
  }

  private onGamepadConnected = (e: GamepadEvent) => {
    if (this.isSuitableGamepad(e.gamepad)) {
      this.gamepadIndex = e.gamepad.index
    }
  }

  private onGamepadDisconnected = (e: GamepadEvent) => {
    if (this.gamepadIndex === e.gamepad.index) {
      this.gamepadIndex = null
    }
  }

  private isSuitableGamepad(gamepad: Gamepad): boolean {
    return gamepad.mapping === 'standard' && gamepad.buttons.length > 0
  }

  private togglePause() {
    if (this.isPaused) {
      this.resumeGame()
    } else {
      this.pauseGame()
    }
  }

  public pauseGame() {
    if (this.isPaused) {
      return
    }

    this.isPaused = true
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }
    this.config.callback?.(GameStates.Pause)
  }

  public resumeGame() {
    if (!this.isPaused) {
      return
    }

    this.isPaused = false
    this.justUnpaused = true
    this.animationFrameId = requestAnimationFrame(this.gameLoop)
  }

  private gameLoop = (timestamp: number) => {
    if (this.isGameOver) {
      return
    }

    // If the game was just unpaused, we need to update the lastTime
    if (this.justUnpaused) {
      this.lastTime = timestamp
      this.justUnpaused = false
    }

    if (!this.isPaused) {
      const deltaTime = Math.min(timestamp - this.lastTime, 100)
      this.lastTime = timestamp

      // Retrieve the state of the gamepad and pass it to the update method

      let gamepadState: GamepadState | null = null
      if (this.gamepadIndex !== null) {
        const gamepad = navigator.getGamepads()[this.gamepadIndex]
        if (gamepad) {
          gamepadState = {
            axes: gamepad.axes,
            buttons: gamepad.buttons.map(button => button.pressed),
          }
        }
      }

      this.update(deltaTime, gamepadState)
      this.draw()

      if (!this.isGameOver) {
        this.animationFrameId = requestAnimationFrame(this.gameLoop)
      }
    } else {
      // Draw a frame to visually show the pause
      this.draw()
    }
  }

  private update(deltaTime: number, gamepadState: GamepadState | null) {
    if (this.isGameOver || !this.player || !this.computer) {
      return
    }

    // Update the player
    this.player.update(deltaTime, this.computer, gamepadState)

    // If the player health is less than or equal to 0, the player lost
    if (this.player.health <= 0) {
      if (!this.isGameOver) {
        this.isGameOver = true
        this.config.callback?.(GameStates.Lose)
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId)
          this.animationFrameId = null
        }
      }
      return
    }

    // Update the computer player
    this.computer.update(deltaTime, this.player)

    // If the computer health is less than or equal to 0, the player won
    if (this.computer.health <= 0) {
      if (!this.isGameOver) {
        this.isGameOver = true
        this.config.callback?.(GameStates.Win)
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId)
          this.animationFrameId = null
        }
      }
      return
    }
  }

  public isGameOverNow(): boolean {
    return this.isGameOver
  }

  private draw() {
    // Clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Draw the sky
    if (this.skyImage) {
      this.context.drawImage(
        this.skyImage,
        0,
        0,
        this.canvas.width,
        this.canvas.height - GROUND_HEIGHT,
      )
    } else {
      this.context.fillStyle = this.config.sky?.colors || DEFAULT_SKY_COLOR
      this.context.fillRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height - GROUND_HEIGHT,
      )
    }

    // Draw the ground
    if (this.groundImage) {
      this.context.drawImage(
        this.groundImage,
        0,
        this.canvas.height - GROUND_HEIGHT,
        this.canvas.width,
        GROUND_HEIGHT,
      )
    } else {
      this.context.fillStyle =
        this.config.ground?.colors || DEFAULT_GROUND_COLOR
      this.context.fillRect(
        0,
        this.canvas.height - GROUND_HEIGHT,
        this.canvas.width,
        GROUND_HEIGHT,
      )
    }

    // Draw the players
    this.player?.draw(this.context)
    this.computer?.draw(this.context)

    // Draw the UI elements (health and mana bars, names)
    this.drawUI()
  }

  private drawUI() {
    this.context.save()

    // Text style
    this.context.font = '16px Arial'
    this.context.textAlign = 'left'
    this.context.textBaseline = 'top'
    this.context.fillStyle = 'black'

    // Player health bar
    this.context.fillStyle = 'red'
    this.context.fillRect(20, HEALTH_BAR_Y, this.player?.health * 2, 20)
    this.context.strokeStyle = 'black'
    this.context.lineWidth = 1
    this.context.strokeRect(20, HEALTH_BAR_Y, 200, 20)

    // Player mana bar
    this.context.fillStyle = 'blue'
    this.context.fillRect(20, MANA_BAR_Y, this.player?.mana * 2, 20)
    this.context.strokeStyle = 'black'
    this.context.lineWidth = 1
    this.context.strokeRect(20, MANA_BAR_Y, 200, 20)

    // Player name below the mana bar
    this.context.fillStyle = 'black'
    this.context.fillText(this.player?.name, 20, NAME_Y)

    // Computer health bar
    this.context.fillStyle = 'red'
    this.context.fillRect(
      this.canvas.width - 220,
      HEALTH_BAR_Y,
      this.computer?.health * 2,
      20,
    )
    this.context.strokeStyle = 'black'
    this.context.lineWidth = 1
    this.context.strokeRect(this.canvas.width - 220, HEALTH_BAR_Y, 200, 20)

    // Computer mana bar
    this.context.fillStyle = 'blue'
    this.context.fillRect(
      this.canvas.width - 220,
      MANA_BAR_Y,
      this.computer?.mana * 2,
      20,
    )
    this.context.strokeStyle = 'black'
    this.context.lineWidth = 1
    this.context.strokeRect(this.canvas.width - 220, MANA_BAR_Y, 200, 20)

    // Computer name below the mana bar
    this.context.fillStyle = 'black'
    this.context.textAlign = 'right'
    this.context.fillText(this.computer?.name, this.canvas.width - 20, NAME_Y)

    this.context.restore()
  }
}
