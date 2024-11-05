import { FC, useRef, useState, useMemo } from 'react'
import { Box } from '@mui/material'
import PauseIcon from '@mui/icons-material/Pause'
import { Game } from '@/game/Game'
import { GameStates } from '@/game/constants'
import { GameConfig } from '@/game/types'
import styles from './GamePage.module.scss'
import { GameModal, TGameModalMode, TGameModalAction } from '@/components'
import { useFullscreen, useGamepadStatus, useGameInstance } from '@/hooks'
import {
  colors,
  textures,
  computerDodgeProbability,
  computerAttackSpeedMultiplier,
  maxWidth,
  maxHeight,
} from './constants'

export const GamePage: FC = () => {
  const [modalMode, setModalMode] = useState<TGameModalMode>('start')
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const isGamepadOn = useGamepadStatus()
  const gameWidth = Math.min(window.innerWidth, maxWidth)
  const gameHeight = Math.min(window.innerHeight, maxHeight)
  const initialGameConfig = useMemo<GameConfig>(
    () => ({
      width: gameWidth,
      height: gameHeight,
      callback: (type: GameStates) => setModalMode(type),
      colors,
      textures,
      computerDodgeProbability,
      computerAttackSpeedMultiplier,
    }),
    [],
  )
  const restartGame = useGameInstance(initialGameConfig, gameContainerRef)

  useFullscreen()

  const handleModalAction = (action: TGameModalAction) => {
    if (action === 'restart') {
      restartGame()
    } else if (action === 'nextLevel') {
      // Pass only the changed parameters
      restartGame({
        computerDodgeProbability:
          (initialGameConfig.computerDodgeProbability ??
            computerDodgeProbability) + 0.05,
        computerAttackSpeedMultiplier:
          (initialGameConfig.computerAttackSpeedMultiplier ??
            computerAttackSpeedMultiplier) + 0.3,
      })
    }
    setModalMode('closed')
    Game.getInstance()?.resumeGame()
  }

  const togglePause = () => {
    const currentGame = Game.getInstance()
    if (currentGame?.isPaused) {
      currentGame.resumeGame()
      setModalMode('closed')
    } else {
      currentGame?.pauseGame()
      setModalMode('pause')
    }
  }

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.controlsWrapper}>
        <Box className={styles.controls}>
          <PauseIcon
            className={styles.btn}
            fontSize="large"
            onClick={togglePause}
          />
        </Box>
      </Box>
      <div className={styles.gameContainer} ref={gameContainerRef}></div>

      <GameModal
        mode={modalMode}
        modalAction={handleModalAction}
        isGamepadOn={isGamepadOn}
      />
    </Box>
  )
}
