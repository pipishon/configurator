export const showPopup = (state, line) => {
  state.lineToEdite = line
  state.isPopupVisible = true
}

export const hidePopup = (state) => {
  state.isPopupVisible = false
}
