import { Player } from './Player'
import { FIREBALL_SPEED, FIREBALL_RADIUS } from './constants'

export class Fireball {
  public x: number
  public y: number
  public radius: number = FIREBALL_RADIUS
  public speed: number = FIREBALL_SPEED
  public direction: number
  public color: string

  constructor(
    x: number,
    y: number,
    direction: number,
    color: string,
    speed: number
  ) {
    this.x = x
    this.y = y
    this.direction = direction
    this.color = color
    this.speed = speed
  }

  public update() {
    this.x += this.speed * this.direction
  }

  public draw(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.fillStyle = this.color
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    context.fill()
    context.closePath()
  }

  public collidesWith(player: Player): boolean {
    // Player boundaries
    const playerLeft = player.x
    const playerRight = player.x + player.width
    const playerTop = player.y - player.height
    const playerBottom = player.y

    // If the center of the fireball is inside the player's rectangle
    return (
      this.x + this.radius > playerLeft &&
      this.x - this.radius < playerRight &&
      this.y + this.radius > playerTop &&
      this.y - this.radius < playerBottom
    )
  }
}
