import { FC, useState } from 'react'
import example from './draft-preview.png'
import { Box } from '@mui/material'
import {
  FinishModal,
  PreviewModal,
  TFinishMode,
  TOpenMode,
} from '../../components'
import HelpIcon from '@mui/icons-material/Help'
import ReplayIcon from '@mui/icons-material/Replay'

export const Game: FC = () => {
  const [openMode, setOpenMode] = useState<TOpenMode | null>('start')
  const [finishMode, setFinishMode] = useState<TFinishMode | null>(null)

  const handleOpenHelp = () => {
    setOpenMode('pause')
  }

  const handleOpenFinish = () => {
    setFinishMode('loose')
  }

  const handleStart = () => {
    setFinishMode(null)
    setOpenMode('start')
  }
  //заглушка
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <HelpIcon
        fontSize="large"
        onClick={handleOpenHelp}
        sx={{
          position: 'absolute',
          top: '20px',
          right: '100px',
          cursor: 'pointer',
        }}
      />

      <ReplayIcon
        fontSize="large"
        onClick={handleOpenFinish}
        sx={{
          position: 'absolute',
          top: '20px',
          right: '140px',
          cursor: 'pointer',
        }}
      />
      <img src={example} alt={'example'} />

      <PreviewModal setOpenMode={setOpenMode} openMode={openMode} />
      {finishMode && <FinishModal onStart={handleStart} mode={finishMode} />}
    </Box>
  )
}
