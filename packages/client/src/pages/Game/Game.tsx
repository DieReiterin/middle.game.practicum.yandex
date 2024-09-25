import { FC, useState } from 'react'
import example from './draft-preview 2.png'
import { Box } from '@mui/material'
import { PreviewModal, TOpenMode } from '../../components'
import HelpIcon from '@mui/icons-material/Help'

export const Game: FC = () => {
  const [openMode, setOpenMode] = useState<TOpenMode>('start')

  const handleOpenHelp = () => {
    setOpenMode('pause')
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
      <img src={example} alt={'example'} />

      <PreviewModal setOpenMode={setOpenMode} openMode={openMode} />
    </Box>
  )
}
