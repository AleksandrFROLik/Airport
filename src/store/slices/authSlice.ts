import {} from "../../models/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const ACCESS_KEY = 'access'
const USERNAME_KEY = 'username'


interface AuthSlice {
  access: string
  username: string
  isAuth: boolean
}

const initialState: AuthSlice = {
  access: localStorage.getItem(ACCESS_KEY) ?? '',
  username: localStorage.getItem(USERNAME_KEY) ?? '',
  isAuth: Boolean(localStorage.getItem(ACCESS_KEY))
}


interface AuhPayload {
  access: string
  username: string
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register(state, action: PayloadAction<AuhPayload>) {
      state.access = action.payload.access
      state.username = action.payload.username
      state.isAuth = Boolean(action.payload.access)

      localStorage.setItem(ACCESS_KEY, action.payload.access)
      localStorage.setItem(USERNAME_KEY, action.payload.username)
    },
    logout(state) {
      state.access = ''
      state.username = ''
      state.isAuth = false

      localStorage.removeItem(ACCESS_KEY)
      localStorage.removeItem(USERNAME_KEY)
    }
  }
})

export default authSlice.reducer