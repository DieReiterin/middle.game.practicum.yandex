import { createTheme, PaletteColor } from '@mui/material'
import {
  colorAccentSoft,
  colorBgPrimary,
  colorBtn,
  colorError,
  colorText,
  colorText2,
  fontFamily,
  fontSize,
} from '../styles/vars'

const { palette } = createTheme()
const { augmentColor } = palette
const createColor = (mainColor: string, contrastText: string): PaletteColor =>
  augmentColor({ color: { main: mainColor, contrastText } })

export const theme = createTheme({
  palette: {
    primary: createColor(colorBtn, colorText2),
    background: {
      default: colorBgPrimary,
    },
    error: {
      main: colorError,
    },
    text: {
      primary: colorText,
      secondary: colorAccentSoft,
      disabled: colorText2,
    },
  },
  typography: {
    fontFamily,
    fontSize,
    button: {
      textTransform: 'none',
    },
  },
})
