import { Player } from './Player'
import { AirAttackConfig } from './types'
import {
  AIR_ATTACK_DURATION,
  AIR_ATTACK_LINE_COLOR,
  AIR_ATTACK_LINE_DURATION,
  AIR_ATTACK_LINE_GAP,
  AIR_ATTACK_LINE_NUM,
  AIR_ATTACK_LINE_WIDTH,
  AIR_ATTACK_PARTICLE_COLOR,
  AIR_ATTACK_PARTICLE_DURATION,
  AIR_ATTACK_PARTICLE_RADIUS,
} from './constants'

export class AirAttack {
  private readonly config: AirAttackConfig
  private elapsed = 0
  private isActive = false
  private readonly numLines: number
  private readonly lineColor: string
  private particles: { x: number; y: number; dx: number; dy: number }[] = []
  private readonly particleColor: string
  private readonly particleRadius: number
  private particleDuration: number = AIR_ATTACK_PARTICLE_DURATION
  private lineDuration: number = AIR_ATTACK_LINE_DURATION
  private readonly totalDuration: number
  private linesVisible = false
  private effectApplied = false
  private attacker: Player
  private readonly target: Player
  private readonly onComplete: () => void

  constructor(
    attacker: Player,
    target: Player,
    onComplete: () => void,
    config?: Partial<AirAttackConfig>
  ) {
    this.config = {
      duration: AIR_ATTACK_DURATION,
      numLines: AIR_ATTACK_LINE_NUM,
      lineColor: AIR_ATTACK_LINE_COLOR,
      particleCount: AIR_ATTACK_LINE_WIDTH,
      particleColor: AIR_ATTACK_PARTICLE_COLOR,
      particleRadius: AIR_ATTACK_PARTICLE_RADIUS,
      ...config,
    }
    this.numLines = this.config.numLines
    this.lineColor = this.config.lineColor
    this.particleColor = this.config.particleColor
    this.particleRadius = this.config.particleRadius
    this.totalDuration = this.particleDuration + this.lineDuration
    this.attacker = attacker
    this.target = target
    this.onComplete = onComplete
  }

  public start() {
    this.isActive = true
    this.elapsed = 0
    this.createParticles()
  }

  private createParticles() {
    const positions = [
      {
        x: this.attacker.x - 200,
        y: this.attacker.y - this.attacker.height / 2,
      },
      {
        x: this.attacker.x + this.attacker.width + 200,
        y: this.attacker.y - this.attacker.height / 2,
      },
      {
        x: this.attacker.x + this.attacker.width / 2,
        y: this.attacker.y - this.attacker.height / 2 - 200,
      },
    ]

    positions.forEach(pos => {
      this.particles.push({
        x: pos.x,
        y: pos.y,
        dx:
          (this.attacker.x + this.attacker.width / 2 - pos.x) /
          this.particleDuration,
        dy:
          (this.attacker.y - this.attacker.height / 2 - pos.y) /
          this.particleDuration,
      })
    })
  }

  public update(deltaTime: number) {
    if (!this.isActive) return

    this.elapsed += deltaTime

    if (this.elapsed <= this.particleDuration) {
      // Update particle positions
      this.particles.forEach(particle => {
        particle.x += particle.dx * deltaTime
        particle.y += particle.dy * deltaTime
      })
    } else if (this.elapsed <= this.totalDuration) {
      // Particle duration is over, lines are visible
      this.linesVisible = true

      if (!this.effectApplied) {
        // Apply attack effect once
        this.effectApplied = true
        this.applyAttackEffect()
      }
    } else {
      // Animation is complete
      this.isActive = false
      this.onComplete()
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    if (!this.isActive) return

    if (this.elapsed <= this.particleDuration) {
      // Draw particles
      context.fillStyle = this.particleColor
      this.particles.forEach(particle => {
        context.beginPath()
        context.arc(particle.x, particle.y, this.particleRadius, 0, Math.PI * 2)
        context.fill()
        context.closePath()
      })
    }

    if (this.linesVisible) {
      // Draw lines
      context.save()

      // Smoothly fade out the lines
      const lineElapsed = this.elapsed - this.particleDuration
      const alpha = 1 - lineElapsed / this.lineDuration
      context.globalAlpha = alpha > 0 ? alpha : 0

      const startX = this.attacker.x + this.attacker.width / 2
      const startY = this.attacker.y - this.attacker.height / 2

      const endX = this.target.x + this.target.width / 2
      const endY = startY // Y remains unchanged

      for (let i = 0; i < this.numLines; i++) {
        context.strokeStyle = this.lineColor
        context.lineWidth = AIR_ATTACK_LINE_WIDTH
        context.beginPath()
        context.moveTo(startX, startY + i * AIR_ATTACK_LINE_GAP)
        context.lineTo(endX, endY + i * AIR_ATTACK_LINE_GAP)
        context.stroke()
        context.closePath()
      }

      context.restore()
    }
  }

  private applyAttackEffect() {
    this.attacker.executeAirAttackEffect(this.target)
  }

  public isFinished(): boolean {
    return !this.isActive
  }
}
