import { FC, useEffect, useRef, useState } from 'react'
import { Box, Container } from '@mui/material'
import { Game } from '../../game/Game'
import sky1 from '../../game/textures/a-blue-sky.jpg'
import ground1 from '../../game/textures/ground1.jpg'
import player1 from '../../game/textures/player1.png'
import player2 from '../../game/textures/player2.png'
import {
    FinishModal,
    PreviewModal,
    TFinishMode,
    TOpenMode,
} from '../../components'
import ReplayIcon from '@mui/icons-material/Replay'
import PauseIcon from '@mui/icons-material/Pause'
import styles from './GamePage.module.scss'

export const GamePage: FC = () => {
    const [openMode, setOpenMode] = useState<TOpenMode | null>('start')
    const [finishMode, setFinishMode] = useState<TFinishMode | null>(null)

    const gameContainerRef = useRef<HTMLDivElement>(null)

    const [gameConfig, setGameConfig] = useState(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
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
                computerDodgeProbability:
                    gameConfig.computerDodgeProbability! + 0.05,
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
    }, [openMode])

    useEffect(() => {
        const handleResize = () => {
            setGameConfig(prevConfig => ({
                ...prevConfig,
                width: window.innerWidth,
                height: window.innerHeight,
            }))
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handlePause = () => {
        const currentGame = Game.getInstance()
        currentGame?.togglePause()
    }
    return (
        <Box className={styles.wrapper}>
            <Box className={styles.controlsWrapper}>
                <Box className={styles.controls}>
                    <PauseIcon
                        className={styles.btn}
                        fontSize="large"
                        onClick={() => {
                            setOpenMode('pause')
                        }}
                    />

                    <ReplayIcon
                        className={styles.btn}
                        fontSize="large"
                        onClick={() => {
                            setFinishMode('lose')
                        }}
                    />
                </Box>
            </Box>
            <div className={styles.gameContainer} ref={gameContainerRef}></div>

            {/* <Container>
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
      </Container> */}

            <PreviewModal setOpenMode={setOpenMode} openMode={openMode} />
            {finishMode && (
                <FinishModal
                    onStart={() => {
                        setFinishMode(null)
                        setOpenMode('start')
                    }}
                    mode={finishMode}
                />
            )}
        </Box>
    )
}
