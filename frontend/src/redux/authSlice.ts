import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  userEmail: string | null
}

const initialState: AuthState = {
  userEmail: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string }>) {
      state.userEmail = action.payload.email
    },
    logout(state) {
      state.userEmail = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
