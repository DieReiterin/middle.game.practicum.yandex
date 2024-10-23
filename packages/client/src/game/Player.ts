import { GameConfig, PlayerConfig } from './types'
import { Fireball } from './Fireball'
import { AirAttack } from './AirAttack'
import { drawRoundedRect } from './utils'
import {
  GRAVITY,
  AIR_ATTACK_CHARGE_TIME,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  MAX_HEALTH,
  MAX_MANA,
  COMPUTER_DODGE_PROBABILITY,
  COMPUTER_ATTACK_SPEED,
  MOVE_SPEED,
  AIR_ATTACK_COOLDOWN,
  FIREBALL_COOLDOWN,
  SHIELD_COOLDOWN,
  MANA_REGEN_TIME,
  AIR_ATTACK_MANA_COST,
  AIR_ATTACK_SHIFT,
  SHIELD_MANA_COST,
  SHIELD_DURATION,
  FIREBALL_SAFE_DISTANCE,
  JUMP_VELOCITY,
  SHIELD_COLOR,
  SHIELD_LINE_WIDTH,
  SHIELD_RADIUS,
  FIREBALL_SPEED,
  FIREBALL_COLOR,
  AIR_ATTACK_LINE_NUM,
  AIR_ATTACK_PARTICLE_COLOR,
  AIR_ATTACK_PARTICLE_RADIUS,
  AIR_ATTACK_LINE_COLOR,
  AIR_ATTACK_LINE_WIDTH,
  AIR_ATTACK_DURATION,
} from './constants'

export class Player {
  public x: number
  public y: number
  public width: number = PLAYER_WIDTH
  public height: number = PLAYER_HEIGHT
  public color: string
  public health: number = MAX_HEALTH
  public mana: number = MAX_MANA
  public isJumping = false
  public isShieldActive = false
  public isAirAttacking = false
  public fireballs: Fireball[] = []
  public name: string
  private readonly texture: HTMLImageElement | null
  private movementDirection = 1 // 1 - right, -1 - left
  private shouldFlip: boolean
  private readonly isComputer: boolean
  private controls: any
  private config: GameConfig
  private readonly keysPressed: any = {}
  private readonly dodgeProbability: number
  private readonly attackSpeedMultiplier: number
  private velocityY = 0
  private readonly canvasWidth: number
  private readonly canvasHeight: number
  private readonly groundHeight: number
  private keysJustPressed: any = {}
  private hasAttemptedToDodgeAirAttack = false
  private readonly getGameOver: () => boolean

  // Cooldown timers
  private fireballCooldownTimer = 0
  private airAttackCooldownTimer = 0
  private shieldCooldownTimer = 0
  private shieldDurationTimer = 0

  // Preparing AirAttack
  private isPreparingAirAttack = false
  private airAttackPreparationTime = 0
  private isPerformingAirAttack = false
  private airAttack: AirAttack | null = null

  constructor(config: PlayerConfig) {
    this.x = config.x
    this.y = config.y
    this.color = config.color
    this.isComputer = config.isComputer
    this.config = config.config
    this.dodgeProbability =
      config.dodgeProbability || COMPUTER_DODGE_PROBABILITY
    this.attackSpeedMultiplier =
      config.attackSpeedMultiplier || COMPUTER_ATTACK_SPEED
    this.canvasWidth = config.canvasWidth
    this.canvasHeight = config.canvasHeight
    this.groundHeight = config.groundHeight
    this.name = config.name
    this.texture = config.texture || null
    this.getGameOver = config.getGameOver
    this.shouldFlip = config.shouldFlip

    if (!this.isComputer && config.controls) {
      this.controls = config.controls
      this.bindControls()
    }

    this.keysPressed = {}
    this.keysJustPressed = {}
  }

  private keydownHandler = (e: KeyboardEvent) => {
    const key = e.code
    if (!this.keysPressed[key]) {
      this.keysPressed[key] = true
      this.keysJustPressed[key] = true
    }
  }

  private keyupHandler = (e: KeyboardEvent) => {
    const key = e.code
    this.keysPressed[key] = false
  }

  private bindControls() {
    window.addEventListener('keydown', this.keydownHandler)
    window.addEventListener('keyup', this.keyupHandler)
  }

  public destroy() {
    if (!this.isComputer) {
      window.removeEventListener('keydown', this.keydownHandler)
      window.removeEventListener('keyup', this.keyupHandler)
    }
    // Here you can add additional cleanup code
    // (future implementation)
  }

  public update(deltaTime: number, opponent: Player, gamepadState: any = null) {
    if (this.isComputer) {
      this.computerAI(deltaTime, opponent)
    } else {
      this.handleInput(deltaTime, opponent, gamepadState)
      this.keysJustPressed = {}
    }
    this.applyPhysics()
    this.updateFireballs()
    this.checkFireballCollisions(opponent)
    this.regenerateMana(deltaTime)
    this.updateShield(deltaTime)

    // If the player is on the right side of the opponent, flip the texture
    this.shouldFlip = this.x > opponent.x

    // Update cooldown timers
    if (this.fireballCooldownTimer > 0) {
      this.fireballCooldownTimer -= deltaTime
      if (this.fireballCooldownTimer < 0) {
        this.fireballCooldownTimer = 0
      }
    }
    if (this.airAttackCooldownTimer > 0) {
      this.airAttackCooldownTimer -= deltaTime
    }
    if (this.shieldCooldownTimer > 0) {
      this.shieldCooldownTimer -= deltaTime
    }

    // Update AirAttack
    if (this.airAttack) {
      this.airAttack.update(deltaTime)
      if (this.airAttack.isFinished()) {
        this.airAttack = null
      }
    }

    // Check if height is not zero
    if (this.height <= 0) {
      this.height = PLAYER_HEIGHT
    }
  }

  public checkFireballCollisions(opponent: Player) {
    // If the game is over, do not handle collisions
    if (this.getGameOver()) {
      return
    }

    for (let i = opponent.fireballs.length - 1; i >= 0; i--) {
      const fireball = opponent.fireballs[i]
      if (fireball.collidesWith(this)) {
        if (this.isShieldActive) {
          // Fireball is blocked by the shield
          opponent.fireballs.splice(i, 1)
        } else {
          // Deal damage
          this.health = Math.max(0, this.health - 20)
          //console.log(`Player health in Player.ts: ${this.health}`);
          opponent.fireballs.splice(i, 1)
        }
      }
    }
  }

  private handleInput(deltaTime: number, opponent: Player, gamepadState: any) {
    if (this.isShieldActive || this.isPerformingAirAttack) {
      return
    }

    const moveSpeed = MOVE_SPEED * (deltaTime / 1000)

    if (this.keysPressed[this.controls.left]) {
      this.x -= moveSpeed
      if (this.x < 0) this.x = 0
    }
    if (this.keysPressed[this.controls.right]) {
      this.x += moveSpeed
      if (this.x + this.width > this.canvasWidth)
        this.x = this.canvasWidth - this.width
    }
    if (this.keysPressed[this.controls.jump] && !this.isJumping) {
      this.isJumping = true
      this.velocityY = JUMP_VELOCITY
    }
    if (this.keysPressed[this.controls.fireball]) {
      this.shootFireball(opponent)
    }
    if (this.keysJustPressed[this.controls.airAttack]) {
      this.performAirAttack(opponent)
    }
    if (this.keysPressed[this.controls.shield]) {
      this.activateShield()
    }
    if (gamepadState) {
      this.handleGamepadInput(deltaTime, opponent, gamepadState)
    }
  }

  private handleGamepadInput(
    deltaTime: number,
    opponent: Player,
    gamepadState: any
  ) {
    const moveSpeed = MOVE_SPEED * (deltaTime / 1000)

    // Mapping gamepad buttons to actions
    const [leftStickX] = gamepadState.axes
    const buttons = gamepadState.buttons

    // Move left and right with the analog stick
    if (leftStickX < -0.2) {
      this.x -= moveSpeed
      if (this.x < 0) this.x = 0
    } else if (leftStickX > 0.2) {
      this.x += moveSpeed
      if (this.x + this.width > this.canvasWidth)
        this.x = this.canvasWidth - this.width
    }

    // Jump (assume button 0 to “A” on the Xbox controller)
    if (buttons[0] && !this.isJumping) {
      this.isJumping = true
      this.velocityY = JUMP_VELOCITY
    }

    // Fireball shot (assume button 2 is the “X” button on the Xbox controller)
    if (buttons[2]) {
      this.shootFireball(opponent)
    }

    // Air attack (assume button 1 is “B” on the Xbox controller)
    if (buttons[1]) {
      this.performAirAttack(opponent)
    }

    // Shield (assume button 3 is the “Y” button on the Xbox controller)
    if (buttons[3]) {
      this.activateShield()
    }
  }

  private shootFireball(opponent: Player) {
    if (this.fireballCooldownTimer <= 0 && !this.isPreparingAirAttack) {
      const direction = opponent.x > this.x ? 1 : -1
      let fireballSpeed = FIREBALL_SPEED
      if (this.isComputer) {
        fireballSpeed *= this.attackSpeedMultiplier
      }
      this.fireballs.push(
        new Fireball(
          this.x + this.width / 2,
          this.y - this.height / 2, // It's center of the player
          direction,
          FIREBALL_COLOR,
          fireballSpeed
        )
      )
      // Set timer without dividing by attackSpeedMultiplier
      this.fireballCooldownTimer =
        this.config.fireballCooldown || FIREBALL_COOLDOWN
    }
  }

  private startAirAttackPreparation(deltaTime: number, opponent: Player) {
    if (this.mana < 20 || this.isPerformingAirAttack) return
    if (!this.isPreparingAirAttack) {
      this.isPreparingAirAttack = true
      this.airAttackPreparationTime = 0
      this.startAttackAnimation()
    }
    this.airAttackPreparationTime += deltaTime
    if (this.airAttackPreparationTime >= AIR_ATTACK_CHARGE_TIME) {
      this.performAirAttack(opponent)
    }
  }

  private cancelAirAttackPreparation() {
    if (this.isPreparingAirAttack) {
      this.isPreparingAirAttack = false
      this.airAttackPreparationTime = 0
      this.stopAttackAnimation()
    }
  }

  private performAirAttack(opponent: Player) {
    if (this.isPerformingAirAttack) return // Prevent multiple attacks
    if (this.airAttackCooldownTimer <= 0 && this.mana >= AIR_ATTACK_MANA_COST) {
      this.mana -= AIR_ATTACK_MANA_COST
      this.isPerformingAirAttack = true
      this.isAirAttacking = true
      this.airAttackCooldownTimer =
        this.config.airAttackCooldown || AIR_ATTACK_COOLDOWN

      // Initialize AirAttack
      this.airAttack = new AirAttack(
        this,
        opponent,
        () => {
          this.isPerformingAirAttack = false // Reset the flag when the attack is finished
        },
        {
          duration: AIR_ATTACK_DURATION,
          numLines: AIR_ATTACK_LINE_NUM,
          lineColor: AIR_ATTACK_LINE_COLOR,
          particleCount: AIR_ATTACK_LINE_WIDTH,
          particleColor: AIR_ATTACK_PARTICLE_COLOR,
          particleRadius: AIR_ATTACK_PARTICLE_RADIUS,
        }
      )
      this.airAttack.start()
    }
  }

  public executeAirAttackEffect(opponent: Player) {
    if (this.isAirAttacking) {
      if (opponent.isShieldActive || opponent.isJumping) {
        // Atack failed
        // You can add a visual effect of failure
        // (feature implementation)
      } else {
        // Apply the effect
        const shift = this.canvasWidth * AIR_ATTACK_SHIFT
        if (this.x < opponent.x) {
          opponent.x += shift
        } else {
          opponent.x -= shift
        }

        // If the opponent is out of the screen, reduce health to zero
        if (opponent.x < 0 || opponent.x + opponent.width > this.canvasWidth) {
          opponent.health = 0
        }
      }
      this.isAirAttacking = false
      opponent.isAirAttacking = false
    }
  }

  private activateShield() {
    if (this.shieldCooldownTimer <= 0 && this.mana >= SHIELD_MANA_COST) {
      this.isShieldActive = true
      this.shieldDurationTimer = 0
      this.mana -= SHIELD_MANA_COST
      this.shieldCooldownTimer = this.config.shieldCooldown || SHIELD_COOLDOWN
    }
  }

  private applyPhysics() {
    if (this.isJumping) {
      this.velocityY += GRAVITY
      this.y += this.velocityY

      if (this.y >= this.canvasHeight - this.groundHeight) {
        this.y = this.canvasHeight - this.groundHeight
        this.isJumping = false
        this.velocityY = 0
      }
    }
  }

  private updateFireballs() {
    for (let i = this.fireballs.length - 1; i >= 0; i--) {
      const fireball = this.fireballs[i]
      fireball.update()
      if (fireball.x < 0 || fireball.x > this.canvasWidth) {
        this.fireballs.splice(i, 1)
      }
    }
  }

  private regenerateMana(deltaTime: number) {
    const manaRegenRatePerMs =
      100 / (this.config.manaRegenTime || MANA_REGEN_TIME)
    //const manaBefore = this.mana;
    this.mana = Math.min(100, this.mana + manaRegenRatePerMs * deltaTime)
    //console.log(`Mana before: ${manaBefore.toFixed(2)}, after: ${this.mana.toFixed(2)}`);
  }

  private updateShield(deltaTime: number) {
    if (this.isShieldActive) {
      this.shieldDurationTimer += deltaTime
      if (this.shieldDurationTimer >= SHIELD_DURATION) {
        this.isShieldActive = false
        this.shieldDurationTimer = 0
      }
    }
  }

  private computerAI(deltaTime: number, opponent: Player) {
    if (this.isShieldActive) {
      // Computer does not perform actions while performing air attack or shield is active
      return
    }

    // Check if the opponent is performing an air attack
    if (opponent.isPerformingAirAttack) {
      if (!this.hasAttemptedToDodgeAirAttack) {
        if (Math.random() < this.dodgeProbability) {
          this.attemptDodge()
        }
        this.hasAttemptedToDodgeAirAttack = true
      }
      return
    } else {
      // Reset the flag if the opponent is not performing an air attack
      this.hasAttemptedToDodgeAirAttack = false
    }

    // Check if the player is under fireball threat
    const isUnderFireballThreat = this.checkIncomingFireballs(opponent)

    if (isUnderFireballThreat) {
      // Decision to dodge
      if (Math.random() < this.dodgeProbability) {
        this.attemptDodge()
      }
      // If decided not to dodge, do nothing
    } else {
      // Rest of the AI logic
      this.defaultBehavior(deltaTime, opponent)
    }
  }

  private checkIncomingFireballs(opponent: Player): boolean {
    for (const fireball of opponent.fireballs) {
      // Check if the fireball is coming towards the computer
      const isFireballComingTowardsComputer =
        (fireball.direction > 0 &&
          fireball.x > opponent.x &&
          fireball.x < this.x + this.width) ||
        (fireball.direction < 0 &&
          fireball.x < opponent.x &&
          fireball.x > this.x)

      if (isFireballComingTowardsComputer) {
        const distance = Math.abs(fireball.x - (this.x + this.width / 2))
        if (distance < FIREBALL_SAFE_DISTANCE) {
          return true // If the fireball is close enough, return true
        }
      }
    }
    return false
  }

  private attemptJumpOverPlayer(opponent: Player) {
    if (!this.isJumping && this.isOnGround()) {
      this.isJumping = true
      this.velocityY = JUMP_VELOCITY

      // Change direction to move in the opposite direction from the player
      if (opponent.x < this.x) {
        this.movementDirection = 1 // Move right
      } else {
        this.movementDirection = -1 // Move left
      }
    }
  }

  private isOnGround(): boolean {
    return !this.isJumping && this.y >= this.canvasHeight - this.groundHeight
  }

  private defaultBehavior(deltaTime: number, opponent: Player) {
    const moveSpeed =
      MOVE_SPEED * (deltaTime / 1000) * this.attackSpeedMultiplier

    // Randomly change direction
    if (Math.random() < 0.01) {
      this.movementDirection *= -1
    }

    // Move in the current direction
    this.x += moveSpeed * this.movementDirection

    // Limit movement within the screen
    if (this.x < 0) {
      this.x = 0
      this.movementDirection = 1
    }
    if (this.x + this.width > this.canvasWidth) {
      this.x = this.canvasWidth - this.width
      this.movementDirection = -1
    }

    // Check if the player is close to the opponent and jump if pressed against the edge
    const distanceToPlayer = Math.abs(opponent.x - this.x)
    if (
      distanceToPlayer < 100 &&
      (this.x <= 0 || this.x + this.width >= this.canvasWidth)
    ) {
      this.attemptJumpOverPlayer(opponent)
    }

    // Fireball attack
    if (this.fireballCooldownTimer <= 0 && Math.random() < 0.05) {
      this.shootFireball(opponent)
    }

    // Air attack
    if (
      !this.isPreparingAirAttack &&
      !this.isPerformingAirAttack &&
      this.mana >= AIR_ATTACK_MANA_COST
    ) {
      if (Math.random() < 0.02) {
        this.isPreparingAirAttack = true
        this.airAttackPreparationTime = 0
        this.startAttackAnimation()
      }
    }

    if (this.isPreparingAirAttack) {
      this.startAirAttackPreparation(deltaTime, opponent)
    }

    // Reset air attack preparation if the player jumps
    if (this.mana < AIR_ATTACK_MANA_COST || opponent.isJumping) {
      this.cancelAirAttackPreparation()
    }
  }

  private attemptDodge() {
    if (
      !this.isJumping &&
      this.shieldCooldownTimer <= 0 &&
      Math.random() < this.dodgeProbability
    ) {
      // Decision to jump or use shield
      if (Math.random() < 0.5) {
        // Jump
        this.isJumping = true
        this.velocityY = JUMP_VELOCITY
      } else {
        // Shield
        this.activateShield()
      }
    } else if (!this.isJumping) {
      // If shield is on cooldown, jump
      this.isJumping = true
      this.velocityY = JUMP_VELOCITY
    }
  }

  private startAttackAnimation() {
    // Here you can add additional logic if needed
    // For example, visual effects or sound
    // (future implementation)
  }

  private stopAttackAnimation() {
    // Stop the animation if it was started
    // Here you can remove effects or stop the sound
    // (future implementation)
  }

  public draw(context: CanvasRenderingContext2D) {
    // Draw AirAttack if it is active
    if (this.airAttack) {
      this.airAttack.draw(context)
    }

    context.save()

    if (this.shouldFlip) {
      // Flip the context horizontally
      context.scale(-1, 1)
      context.translate(-this.x * 2 - this.width, 0)
    }

    // Draw the character
    if (this.texture) {
      context.drawImage(
        this.texture,
        this.x,
        this.y - this.height,
        this.width,
        this.height
      )
    } else {
      context.fillStyle =
        this.isPreparingAirAttack && this.airAttack ? 'white' : this.color
      context.fillRect(this.x, this.y - this.height, this.width, this.height)
    }

    context.restore()

    // Draw the shield if it is active
    if (this.isShieldActive) {
      context.save()

      context.strokeStyle = SHIELD_COLOR
      context.lineWidth = SHIELD_LINE_WIDTH

      drawRoundedRect(
        context,
        this.x - 5,
        this.y - this.height - 5,
        this.width + 10,
        this.height + 10,
        SHIELD_RADIUS
      )

      context.stroke()
      context.restore()
    }

    // Draw the fireballs
    this.fireballs.forEach(fireball => fireball.draw(context))
  }
}
