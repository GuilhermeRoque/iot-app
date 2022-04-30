import { createSlice } from '@reduxjs/toolkit'

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: {
    snackbarOpen: false,
    snackbarType: "success",
    snackbarMessage: "Sucesso"
  },
  reducers: {
    setSnackbar: (state, action) => {
        state.snackbarOpen = action.payload.snackbarOpen
        state.snackbarType = action.payload.snackbarType
        state.snackbarMessage = action.payload.snackbarMessage
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSnackbar } = snackbarSlice.actions

export default snackbarSlice.reducer
