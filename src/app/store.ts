import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import searchReducer from 'features/search/searchSlice'
import categoryReducer from 'features/category/categorySlice'
import favoritesReducer from 'features/favorites/favoritesSlice'
import authReducer from 'features/auth/authSlice'
import configReducer from 'features/config/configSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    category: categoryReducer,
    favorites: favoritesReducer,
    auth: authReducer,
    config: configReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
