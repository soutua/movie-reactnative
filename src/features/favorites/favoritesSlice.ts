import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import {
  getFavorites as getFavs,
  getFavorite as getFav,
  putFavorite as putFav,
  deleteFavorite as deleteFav,
} from 'api/apiClient'
import {RootState} from 'app/store'
import {Movie} from 'app/types'

export const getFavorites = createAsyncThunk(
  'favorites/getFavorites',
  async () => await getFavs(),
)

export const getFavorite = createAsyncThunk(
  'favorites/getFavorite',
  async (id: number) => await getFav(id),
)

export const putFavorite = createAsyncThunk(
  'favorites/putFavorite',
  async (id: number) => await putFav(id),
)

export const deleteFavorite = createAsyncThunk(
  'favorites/deleteFavorite',
  async (id: number) => {
    await deleteFav(id)
    return id
  },
)

const favoritesAdapter = createEntityAdapter<Movie>()

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: favoritesAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getFavorites.fulfilled, (state, action) => {
      favoritesAdapter.setAll(state, action.payload)
    })
    builder.addCase(getFavorite.fulfilled, (state, action) => {
      favoritesAdapter.upsertOne(state, action.payload)
    })
    builder.addCase(putFavorite.fulfilled, (state, action) => {
      favoritesAdapter.upsertOne(state, action.payload)
    })
    builder.addCase(deleteFavorite.fulfilled, (state, action) => {
      favoritesAdapter.removeOne(state, action.payload)
    })
  },
})

export default favoritesSlice.reducer

export const {
  selectAll: selectAllFavorites,
  selectById: selectFavoriteById,
} = favoritesAdapter.getSelectors<RootState>(state => state.favorites)
