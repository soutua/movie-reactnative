import {store} from 'app/store'
import {selectConfig} from 'features/config/configSlice'
import {Movie} from './types'

const getWidthOption = (options: Array<string>, width: number) => {
  let selectedValue = parseInt(
    options.filter(value => value.charAt(0) === 'w')[0].substring(1),
    10,
  )
  let lowestDelta = Number.MAX_SAFE_INTEGER

  options
    .filter(value => value.charAt(0) === 'w')
    .map(value => parseInt(value.substring(1), 10))
    .forEach(value => {
      const valueDelta = Math.abs(width - value)

      if (valueDelta < lowestDelta || !selectedValue) {
        lowestDelta = valueDelta
        selectedValue = value
      }
    })

  return 'w' + selectedValue.toString()
}

const getPosterImageUrl = (movie: Movie, width: number) => {
  const config = selectConfig(store.getState())
  if (!movie.posterPath || !config) {
    return 'placeholder'
  }
  return (
    config.baseUrl +
    getWidthOption(config.posterSizes, width) +
    movie.posterPath
  )
}

const getBackdropImageUrl = (movie: Movie, width: number) => {
  const config = selectConfig(store.getState())
  if (!movie.backdropPath || !config) {
    return 'placeholder'
  }
  return (
    config.baseUrl +
    getWidthOption(config.backdropSizes, width) +
    movie.backdropPath
  )
}

export {getPosterImageUrl, getBackdropImageUrl}
