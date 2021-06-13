import React, {useState} from 'react'
import {search, selectAllMovies} from './searchSlice'
import MovieList from 'components/MovieList'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {TextInput} from 'react-native-gesture-handler'
import {
  View,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  StyleSheet,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    color: '#000000',
  },
})

const Search = () => {
  const dispatch = useAppDispatch()
  const searchResults = useAppSelector(selectAllMovies)
  const [text, onChangeText] = useState('')

  const onSubmit = (
    event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    dispatch(search(event.nativeEvent.text))
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search movies..."
        placeholderTextColor="#000000"
        onChangeText={onChangeText}
        value={text}
        onSubmitEditing={onSubmit}
      />

      <MovieList movies={searchResults} />
    </View>
  )
}

export default Search
