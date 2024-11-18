import '@mui/material/styles'

interface CustomPalette {
  customBackground: {
    secondary: string
    tertiary: string
  }
  active: {
    button: string
  }
  border: {
    default: string
    secondary: string
    tertiary: string
  }
  button: {
    default: string
    hover: string
    active: string
  }
}

declare module '@mui/material/styles' {
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends Partial<CustomPalette> {}
}
