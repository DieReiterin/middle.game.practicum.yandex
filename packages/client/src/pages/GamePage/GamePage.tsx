import { FC, useEffect, useRef, useState } from 'react'
import { Box } from '@mui/material'
import { Game } from '../../game/Game'
import sky1 from '../../game/textures/a-blue-sky.jpg'
import ground1 from '../../game/textures/ground1.jpg'
import player1 from '../../game/textures/player1.png'
import player2 from '../../game/textures/player2.png'
import { GameModal, TGameModalMode, TGameModalAction } from '../../components'
import PauseIcon from '@mui/icons-material/Pause'
import styles from './GamePage.module.scss'

export const GamePage: FC = () => {
    const [modalMode, setModalMode] = useState<TGameModalMode>('start')

    const gameContainerRef = useRef<HTMLDivElement>(null)

    const [gameConfig, setGameConfig] = useState(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
        callback: handleGameInnerEvent,
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
        computerAttackSpeedMultiplier: 0.5,
    }))

    // Function opens modal when game instance is aborted from inside (by win, lose, or keyboard pause)
    function handleGameInnerEvent(type: 'win' | 'lose' | 'pause') {
        setModalMode(type)
    }

    // Function to restart game instance with a new config
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

    // Hook starts game instance on mount and destroys it on unmount
    useEffect(() => {
        restartGame(gameConfig)

        return () => {
            const currentGame = Game.getInstance()
            if (gameContainerRef.current && currentGame?.canvas) {
                gameContainerRef.current.removeChild(currentGame.canvas)
            }
            currentGame?.destroy()
        }
    }, [])

    const pauseGameInstance = () => {
        const currentGame = Game.getInstance()
        currentGame?.pauseGame()
    }
    const resumeGameInstance = () => {
        const currentGame = Game.getInstance()
        currentGame?.resumeGame()
    }

    const modalAction = (action: TGameModalAction) => {
        if (action === 'restart') {
            restartGame(gameConfig)
        } else if (action === 'nextLevel') {
            const newConfig = {
                ...gameConfig,
                computerDodgeProbability:
                    gameConfig.computerDodgeProbability! + 0.05,
                computerAttackSpeedMultiplier:
                    gameConfig.computerAttackSpeedMultiplier! + 0.3,
            }
            setGameConfig(newConfig)
            restartGame(gameConfig)
        }

        setModalMode('closed')
        resumeGameInstance() // game instance starts and restarts paused, so here we resume it
    }

    return (
        <Box className={styles.wrapper}>
            <Box className={styles.controlsWrapper}>
                <Box className={styles.controls}>
                    <PauseIcon
                        className={styles.btn}
                        fontSize="large"
                        onClick={() => {
                            pauseGameInstance()
                            setModalMode('pause')
                        }}
                    />
                </Box>
            </Box>
            <div className={styles.gameContainer} ref={gameContainerRef}></div>

            <GameModal mode={modalMode} modalAction={modalAction} />
        </Box>
    )
}
