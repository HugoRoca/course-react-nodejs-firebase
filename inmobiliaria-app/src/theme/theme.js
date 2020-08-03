import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#05668d'
    },
    common: {
      white: 'white'
    },
    secondary: {
      main: '#e55934'
    }
  },
  spacing: 10
})

export default theme
