import React from 'react'
import {getPosterImageUrl} from 'app/utils'
import {Movie} from 'app/types'
import {Image, StyleSheet, Text, View} from 'react-native'
import {TouchableHighlight} from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/core'

interface MovieProps {
  movie: Movie
  itemWidth: number
}

const MovieItem = (props: MovieProps) => {
  const {movie, itemWidth} = props
  const navigation = useNavigation()
  const handleClick = () => navigation.navigate('Details', {movieId: movie.id})

  const padding = 8
  const styles = StyleSheet.create({
    container: {
      width: itemWidth,
      padding: padding,
    },
    image: {
      aspectRatio: 0.69,
      width: itemWidth - 2 * padding,
    },
    text: {},
  })

  return (
    <TouchableHighlight onPress={handleClick} underlayColor="#DDDDDD">
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: getPosterImageUrl(movie, itemWidth)}}
        />
        <Text>{movie.title}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default MovieItem
