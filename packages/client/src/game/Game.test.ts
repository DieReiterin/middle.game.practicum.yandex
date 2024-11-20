import { Game } from './Game'
import { GameConfig } from './types'

beforeAll(() => {
  Object.defineProperty(navigator, 'getGamepads', {
    value: jest.fn().mockReturnValue([]),
    writable: true,
  })
})

describe('Game', () => {
  let game: Game

  beforeEach(() => {
    const config: GameConfig = {
      width: 800,
      height: 600,
      sky: {
        texture: 'path/to/sky.png',
        color: 'lightblue',
      },
      ground: {
        texture: 'path/to/ground.png',
        color: 'green',
      },
      player1: {
        texture: 'path/to/player1.png',
        color: 'red',
      },
      player2: {
        texture: 'path/to/player2.png',
        color: 'blue',
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
