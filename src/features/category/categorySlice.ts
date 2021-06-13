import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {getCategoryMovies} from 'api/apiClient'
import {RootState} from 'app/store'
import {Movie} from 'app/types'

export const getCategory = createAsyncThunk(
  'category/getCategory',
  async (category: string) => {
    const result = await getCategoryMovies(category)
    return {category, result}
  },
)

interface CategoryResult {
  [key: string]: Array<Movie>
}

const categorySlice = createSlice({
  name: 'category',
  initialState: {} as CategoryResult,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      const {category, result} = action.payload
      state[category] = result
    })
  },
})

export default categorySlice.reducer

export const selectCategory = (state: RootState, category: string) =>
  state.category[category]
