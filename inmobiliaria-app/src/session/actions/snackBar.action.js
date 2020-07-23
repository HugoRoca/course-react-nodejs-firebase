export const openMessage = (dispatch, snackBar) => {
  dispatch({
    type: 'OPEN_SNACKBAR',
    snackBar,
  })
}