import { createTheme, PaletteColor } from '@mui/material'

const { palette } = createTheme()
const { augmentColor } = palette
const createColor = (mainColor: string): PaletteColor =>
  augmentColor({ color: { main: mainColor, contrastText: '#fff' } })

export const theme = createTheme({
  palette: {
    secondary: createColor('#ffffff'),
    primary: createColor('#B0ABFE'),
  },
})
