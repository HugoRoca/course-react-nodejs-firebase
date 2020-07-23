export const openMessage = (dispatch, open) => {
  dispatch({
    type: 'OPEN_SNACKBAR',
    snackBar: open,
  })
}