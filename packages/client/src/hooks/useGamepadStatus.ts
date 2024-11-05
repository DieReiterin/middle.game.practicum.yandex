import { useState, useEffect } from 'react'

export const useGamepadStatus = () => {
  const [isGamepadOn, setIsGamepadOn] = useState(false)

  useEffect(() => {
    const checkGamepadStatus = () => {
      const gamepads = navigator.getGamepads ? navigator.getGamepads() : []
      const isConnected = gamepads.some(gp => gp?.mapping === 'standard')
      setIsGamepadOn(isConnected)
    }

    checkGamepadStatus()

    const handleGamepadConnected = () => {
      setIsGamepadOn(true)
    }

    const handleGamepadDisconnected = () => {
      checkGamepadStatus()
    }

    window.addEventListener('gamepadconnected', handleGamepadConnected)
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected)

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected)
      window.removeEventListener(
        'gamepaddisconnected',
        handleGamepadDisconnected,
      )
    }
  }, [])

  return isGamepadOn
}
