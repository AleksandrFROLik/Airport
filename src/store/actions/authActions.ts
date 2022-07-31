import { AppDispatch } from "../index";
import axios from "../../axios";
import { authSlice } from "../slices/authSlice";

interface AuthResponse {
  access: string
  refresh: string
}

interface AuthData {
  username: string
  password: string
}

export const fetchAuth = (data: AuthData) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<AuthResponse>(`auth/register`, data)
      dispatch(authSlice.actions.register({
        username: data.username,
        access: response.data.access,
      }))

    } catch (e) {
      console.log('error', e)
    }
  }
}