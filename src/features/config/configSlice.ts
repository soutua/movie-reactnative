import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getConfig} from '../../api/apiClient'
import {RootState} from '../../app/store'
import {ImageConfig} from '../../app/types'

export const loadConfig = createAsyncThunk(
  'config/fetchConfig',
  async () => await getConfig(),
)

const configSlice = createSlice({
  name: 'config',
  initialState: null as ImageConfig | null,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loadConfig.fulfilled, (state, action) => action.payload)
  },
})

export const selectConfig = (state: RootState) => state.config

export default configSlice.reducer
