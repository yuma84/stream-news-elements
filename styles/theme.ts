import { blue, green } from '@mui/material/colors'
import { createTheme, Theme } from '@mui/material/styles'

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: blue[500],
    },
  },
})

export default theme
