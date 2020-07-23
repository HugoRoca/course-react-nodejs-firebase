import sessionReducer from './session.reducer'
import snackBarReducer from './snackBar.reducer'

export const mainReducer = ({session, snackBar}, action) => {
  return {
    session: sessionReducer(session, action),
    snackBar: snackBarReducer(snackBar, action)
  }
}