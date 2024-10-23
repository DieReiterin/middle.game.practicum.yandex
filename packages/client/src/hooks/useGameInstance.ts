import { useEffect, useCallback, useRef, RefObject } from 'react'
import { Game } from '@/game/Game'
import { GameConfig } from '@/game/types'

export const useGameInstance = (
  initialConfig: GameConfig,
  containerRef: RefObject<HTMLDivElement>
) => {
  const configRef = useRef<GameConfig>(initialConfig)

  const restartGame = useCallback(
    (newConfig?: Partial<GameConfig>) => {
      if (newConfig) {
        configRef.current = { ...configRef.current, ...newConfig }
      }

      const currentGame = Game.getInstance()
      if (currentGame) {
        currentGame.destroy()
        if (containerRef.current) {
          containerRef.current.innerHTML = ''
        }
      }

      const newGame = Game.createInstance(configRef.current)
      if (newGame && containerRef.current) {
        containerRef.current.innerHTML = ''
        containerRef.current.appendChild(newGame.canvas)
      }
    },
    [containerRef]
  )

  useEffect(() => {
    restartGame()

    return () => {
      const currentGame = Game.getInstance()
      if (currentGame) {
        if (containerRef.current && currentGame.canvas) {
          containerRef.current.removeChild(currentGame.canvas)
        }
        currentGame.destroy()
      }
    }
  }, [restartGame, containerRef])

  return restartGame
}
