import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import {searchMovies} from 'api/apiClient'
import {RootState} from 'app/store'
import {Movie} from 'app/types'

export const search = createAsyncThunk(
  'search/doSearch',
  async (query: string) => {
    return await searchMovies(query)
  },
)

const searchAdapter = createEntityAdapter<Movie>()

const searchSlice = createSlice({
  name: 'search',
  initialState: searchAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(search.fulfilled, (state, action) => {
      searchAdapter.setAll(state, action.payload)
    })
  },
})

export default searchSlice.reducer

export const {
  selectAll: selectAllMovies,
  selectById: selectMovieById,
} = searchAdapter.getSelectors<RootState>(state => state.search)
