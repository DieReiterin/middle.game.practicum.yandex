import { RefObject, useEffect } from 'react'

interface IUseFullscreen<T = HTMLDivElement> {
  elemRef?: RefObject<T>
}

export const useFullscreen = (props?: IUseFullscreen) => {
  const fullScreenHandler = (e: KeyboardEvent) => {
    if (typeof document === 'undefined') {
      return
    }

    if (e.code !== 'F11') {
      return
    }
    e.preventDefault()
    const element = props ? props.elemRef?.current : document.documentElement

    if (!element) {
      return
    }

    if (!document.fullscreenElement) {
      if (element.requestFullscreen) {
        void element.requestFullscreen()
      }
    } else {
      void document.exitFullscreen()
    }
  }

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }
    document.addEventListener('keydown', fullScreenHandler)

    return () => {
      document.removeEventListener('keydown', fullScreenHandler)
    }
  }, [])
}