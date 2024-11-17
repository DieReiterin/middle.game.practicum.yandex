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
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Palette extends CustomPalette {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface PaletteOptions extends Partial<CustomPalette> {}
}
