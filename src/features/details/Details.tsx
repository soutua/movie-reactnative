import React from 'react'
import {useEffect, useState} from 'react'
import {getMovie} from 'api/apiClient'
import {Movie, RootStackParamList} from 'app/types'
import {getPosterImageUrl} from 'app/utils'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {getAuth} from 'features/auth/authSlice'
import {
  deleteFavorite,
  getFavorite,
  putFavorite,
  selectFavoriteById,
} from 'features/favorites/favoritesSlice'
import {Button, Image, StyleSheet, Text, View} from 'react-native'
import {margins} from 'app/styles'
import {StackScreenProps} from '@react-navigation/stack'
import {ScrollView} from 'react-native-gesture-handler'

type Props = StackScreenProps<RootStackParamList, 'Details'>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  image: {
    width: 200,
    aspectRatio: 0.69,
    alignSelf: 'center',
    margin: margins.md,
  },
  title: {
    marginLeft: margins.md,
    marginRight: margins.md,
    fontSize: 30,
  },
  description: {
    marginTop: 10,
    marginLeft: margins.md,
    marginRight: margins.md,
  },
  button: {
    margin: margins.md,
  },
})

const Details = ({route}: Props) => {
  const {movieId} = route.params
  const [movie, setMovie] = useState<Movie | null>(null)
  const dispatch = useAppDispatch()
  const auth = useAppSelector(getAuth)
  const favorite = useAppSelector(state => selectFavoriteById(state, movieId))

  useEffect(() => {
    const movieFetch = async () => {
      const movieResult = await getMovie(movieId)
      setMovie(movieResult)
    }

    movieFetch()
    dispatch(getFavorite(movieId))
  }, [dispatch, movieId])

  if (movie) {
    return (
      <ScrollView>
        <Image
          style={styles.image}
          source={{uri: getPosterImageUrl(movie, 350)}}
        />
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.description}>{movie.overview}</Text>
        {auth &&
          (favorite ? (
            <View style={styles.button}>
              <Button
                title="Remove favorite"
                onPress={() => dispatch(deleteFavorite(movieId))}
              />
            </View>
          ) : (
            <View style={styles.button}>
              <Button
                title="Add favorite"
                onPress={() => dispatch(putFavorite(movieId))}
              />
            </View>
          ))}
      </ScrollView>
    )
  } else {
    return <View />
  }
}

export default Details
