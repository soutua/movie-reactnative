import AsyncStorage from '@react-native-async-storage/async-storage'
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {login as loginCall, register as registerCall} from 'api/apiClient'
import {RootState} from '../../app/store'
import {Auth, Error} from '../../app/types'

interface AuthParam {
  username: string
  password: string
}

interface AuthState {
  auth: Auth | null
  loginError: string | null
  registerError: string | null
}

export const login = createAsyncThunk(
  'auth/doLogin',
  async (auth: AuthParam) => {
    const authToken = await loginCall(auth.username, auth.password)
    await AsyncStorage.setItem('@auth', JSON.stringify(authToken))
    return authToken
  },
)

export const register = createAsyncThunk(
  'auth/doRegister',
  async (auth: AuthParam, thunkAPI) => {
    try {
      const response = await registerCall(auth.username, auth.password)
      thunkAPI.dispatch(login(auth))
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  },
)

export const loadAuth = createAsyncThunk('auth/doLoadAuth', async () => {
  const tokenJson = await AsyncStorage.getItem('@auth')
  return tokenJson ? JSON.parse(tokenJson) : null
})

export const logout = createAsyncThunk('auth/doLogout', async () => {
  return await AsyncStorage.removeItem('@auth')
})

const initialState: AuthState = {
  auth: null,
  loginError: null,
  registerError: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      return {auth: action.payload, loginError: null, registerError: null}
    })
    builder.addCase(login.rejected, () => {
      return {auth: null, loginError: 'login_failed', registerError: null}
    })
    builder.addCase(register.rejected, (state, action) => {
      return {
        auth: null,
        loginError: null,
        registerError: (action.payload as Error).error,
      }
    })
    builder.addCase(loadAuth.fulfilled, (state, action) => {
      return {
        auth: action.payload,
        loginError: null,
        registerError: null,
      }
    })
    builder.addCase(logout.fulfilled, () => {
      return {auth: null, loginError: null, registerError: null}
    })
  },
})

export const getAuth = (state: RootState) => state.auth.auth
export const getLoginError = (state: RootState) => state.auth.loginError
export const getRegisterError = (state: RootState) => state.auth.registerError

export default authSlice.reducer
