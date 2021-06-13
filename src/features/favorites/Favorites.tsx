import React from 'react'
import {getFavorites, selectAllFavorites} from './favoritesSlice'
import MovieList from 'components/MovieList'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {useEffect} from 'react'
import {getAuth} from 'features/auth/authSlice'
import {StyleSheet, Text} from 'react-native'

const styles = StyleSheet.create({
  title: {
    margin: 20,
    fontSize: 20,
    alignSelf: 'center',
  },
})

const Favorites = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getFavorites())
  }, [dispatch])

  const auth = useAppSelector(getAuth)
  const favorites = useAppSelector(selectAllFavorites)

  if (auth) {
    return <MovieList movies={favorites} />
  } else {
    return <Text style={styles.title}>Login to add some favorites!</Text>
  }
}

export default Favorites
