import { createTheme, PaletteColor, Theme } from '@mui/material'
import {
  colorAccentSoft,
  colorAccentSoftDark,
  colorBgPrimary,
  colorBgPrimaryDark,
  colorBgSecondary,
  colorBgTertiary,
  colorBgTertiaryDark,
  colorBorder,
  colorBorder2,
  colorBorder3,
  colorBorderDark,
  colorBorderSecondaryDark,
  colorBorderTertiaryDark,
  colorBtn,
  colorBtnActive,
  colorBtnActiveDark,
  colorBtnDark,
  colorBtnHover,
  colorBtnHoverDark,
  colorError,
  colorErrorDark,
  colorText,
  colorText2,
  colorTextDark,
  colorTextDisabledDark,
  fontFamily,
  fontSize,
  lightGray,
  navyBlue,
} from '../styles/vars'

const { palette } = createTheme()
const { augmentColor } = palette
const createColor = (mainColor: string, contrastText: string): PaletteColor =>
  augmentColor({ color: { main: mainColor, contrastText } })

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: createColor(colorBtn, colorText2),
    background: {
      default: colorBgPrimary,
    },
    customBackground: {
      secondary: colorBgSecondary,
      tertiary: colorBgTertiary,
    },
    error: {
      main: colorError,
    },
    active: {
      button: colorBtnActive,
    },
    button: {
      default: colorBtn,
      active: colorBtnActive,
      hover: colorBtnHover,
    },
    border: {
      default: colorBorder,
      secondary: colorBorder2,
      tertiary: colorBorder3,
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

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: createColor(navyBlue, lightGray),
    background: {
      default: colorBgPrimaryDark,
    },
    customBackground: {
      secondary: colorBorderSecondaryDark,
      tertiary: colorBgTertiaryDark,
    },
    error: {
      main: colorErrorDark,
    },
    active: {
      button: colorBtnActiveDark,
    },
    button: {
      default: colorBtnDark,
      active: colorBtnActiveDark,
      hover: colorBtnHoverDark,
    },
    border: {
      default: colorBorderDark,
      secondary: colorBorderSecondaryDark,
      tertiary: colorBorderTertiaryDark,
    },
    text: {
      primary: colorTextDark,
      secondary: colorAccentSoftDark,
      disabled: colorTextDisabledDark,
    },
  },
  typography: {
    fontFamily,
    fontSize,
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colorTextDark,
        },
      },
    },
  },
})

export const themesMap: Record<number, Theme> = {
  1: lightTheme,
  2: darkTheme,
}
