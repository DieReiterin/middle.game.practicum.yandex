import { FC, useLayoutEffect, useState } from 'react'
import { Box, Modal, Typography } from '@mui/material'

interface ICountdownProps {
  timeLeft?: number
}

export const Countdown: FC<ICountdownProps> = ({ timeLeft = 3 }) => {
  const [value, setValue] = useState<number>(timeLeft)
  const [isOpen, setOpen] = useState<boolean>(true)

  useLayoutEffect(() => {
    if (value <= 0) {
      isOpen && setOpen(false)
      return
    }

    const intervalHandler = setInterval(() => {
      setValue(value - 1)
      if (value <= 0) {
        clearInterval(intervalHandler)
      }
    }, 1000)

    return () => {
      clearInterval(intervalHandler)
    }
  }, [value])

  return (
    <>
      <Modal open={isOpen}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
          <Typography
            sx={{ textShadow: '1px 1px 5px #000' }}
            color={'primary'}
            variant="h1"
            textAlign="center">
            {value}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}
