import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import snackbarReducer from './snackbarSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    snackbar: snackbarReducer
  },  
})