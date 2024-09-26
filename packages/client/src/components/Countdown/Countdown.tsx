import { FC, useEffect, useState } from 'react'
import { Box, Modal, Typography } from '@mui/material'
import styles from './Countdown.module.scss'

interface ICountdownProps {
  timeLeft?: number
}

export const Countdown: FC<ICountdownProps> = ({ timeLeft = 3 }) => {
  const [value, setValue] = useState<number>(timeLeft)

  useEffect(() => {
    if (value <= 0) {
      return
    }

    const intervalHandler = setInterval(() => {
      setValue(prevValue => --prevValue)
    }, 1000)

    return () => {
      clearInterval(intervalHandler)
    }
  }, [value])

  return (
    <>
      {value > 0 && (
        <Modal open={true}>
          <Box className={styles.wrapper}>
            <Typography
              className={styles.counter}
              color={'primary'}
              variant="h1"
              textAlign="center">
              {value}
            </Typography>
          </Box>
        </Modal>
      )}
    </>
  )
}
