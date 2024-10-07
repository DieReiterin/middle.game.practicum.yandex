import { useEffect, useRef, useState } from 'react'
import { Game } from './Game'
import sky1 from './textures/a-blue-sky.jpg'
import ground1 from './textures/ground1.jpg'
import player1 from './textures/player1.png'
import player2 from './textures/player2.png'
import { Box, Container } from '@mui/material'

function GameDemo() {
  const gameContainerRef = useRef<HTMLDivElement>(null)

  const [gameConfig, setGameConfig] = useState(() => ({
    width: 915,
    height: 595,
    callback: handleGameEnd,
    colors: {
      ground: '#654321',
      sky: '#87CEEB',
      player1: '#0000FF',
      player2: '#FF0000',
    },
    textures: {
      ground: ground1,
      sky: sky1,
      player1: player1,
      player2: player2,
    },
    computerDodgeProbability: 0.2,
    computerAttackSpeedMultiplier: 1,
  }))

  function handleGameEnd(state: 'win' | 'lose' | 'pause') {
    if (state === 'win') {
      console.log('Вы победили!')
      const newConfig = {
        ...gameConfig,
        computerDodgeProbability: gameConfig.computerDodgeProbability! + 0.05,
        computerAttackSpeedMultiplier:
          gameConfig.computerAttackSpeedMultiplier! + 0.3,
        callback: handleGameEnd,
      }
      setGameConfig(newConfig)
      restartGame(newConfig)
    } else if (state === 'lose') {
      console.log('Вы проиграли.')
      restartGame(gameConfig)
    } else if (state === 'pause') {
      console.log('Игра на паузе.')
    }
  }

  // Function to restart the game with a new configuration
  const restartGame = (config: typeof gameConfig) => {
    // Get the current game instance and destroy it
    const currentGame = Game.getInstance()
    if (currentGame) {
      if (gameContainerRef.current && currentGame.canvas) {
        gameContainerRef.current.innerHTML = '' // Clear the previous Canvas
      }
      currentGame.destroy()
    }

    const newGame = Game.createInstance(config)

    if (gameContainerRef.current && newGame) {
      gameContainerRef.current.innerHTML = ''
      gameContainerRef.current.appendChild(newGame.canvas)
    }
  }

  useEffect(() => {
    restartGame(gameConfig)

    return () => {
      const currentGame = Game.getInstance()
      if (gameContainerRef.current && currentGame?.canvas) {
        gameContainerRef.current.removeChild(currentGame.canvas)
      }
      currentGame?.destroy()
    }
  }, [gameConfig])

  useEffect(() => {
    handlePause()
  }, [])

  const handlePause = () => {
    const currentGame = Game.getInstance()
    currentGame?.togglePause()
  }

  return (
    <Container>
      <div ref={gameContainerRef}></div>
      <button
        onKeyDown={e => {
          if (e.key === ' ') {
            e.preventDefault() // Disable space (only for demonstration)
          }
        }}
        onClick={handlePause}>
        Pause / Continue
      </button>
    </Container>
  )
}

export default GameDemo