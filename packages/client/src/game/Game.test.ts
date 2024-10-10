import { Game } from './Game'
import { GameConfig } from './types'

describe('Game', () => {
  let game: Game

  beforeEach(() => {
    const config: GameConfig = {
      width: 800,
      height: 600,
      textures: {
        sky: 'path/to/sky.png',
        ground: 'path/to/ground.png',
        player1: 'path/to/player1.png',
        player2: 'path/to/player2.png',
      },
      colors: {
        player1: 'red',
        player2: 'blue',
        sky: 'lightblue',
        ground: 'green',
      },
      callback: jest.fn(),
    }

    game = Game.createInstance(config)
  })

  afterEach(() => {
    game.destroy()
  })

  test('should create an instance of the game', () => {
    expect(game).toBeInstanceOf(Game)
    expect(game.canvas).toBeDefined()
    expect(game.canvas.width).toBe(800)
    expect(game.canvas.height).toBe(600)
  })

  test('should pause and resume the game', () => {
    game.pauseGame()
    expect(game['isPaused']).toBe(true)

    game.resumeGame()
    expect(game['isPaused']).toBe(false)
  })
})
