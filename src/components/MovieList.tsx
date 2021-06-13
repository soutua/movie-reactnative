import React from 'react'
import MovieItem from 'components/MovieItem'
import {Movie} from 'app/types'
import {Dimensions, StyleSheet, View} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'

interface MovieListProps {
  movies: Array<Movie>
}

const styles = StyleSheet.create({
  list: {
    padding: 4,
  },
})

const numColumns = 3
const screenWidth = Dimensions.get('window').width
const itemWidth = Math.trunc((screenWidth - styles.list.padding) / numColumns)

const MovieList = (props: MovieListProps) => {
  const {movies} = props

  if (movies) {
    return (
      <FlatList
        style={styles.list}
        data={movies}
        numColumns={numColumns}
        renderItem={({item}) => (
          <MovieItem key={item.id} movie={item} itemWidth={itemWidth} />
        )}
      />
    )
  } else {
    return <View />
  }
}

export default MovieList
