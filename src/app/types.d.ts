export interface Movie {
  id: number
  title: string
  overview: string | null
  posterPath: string | null
  backdropPath: string | null
}

export interface ImageConfig {
  baseUrl: string
  posterSizes: Array<string>
  backdropSizes: Array<string>
}

export interface Auth {
  username: string | null
  token: string | null
}

export interface Error {
  error: string
}

export type RootStackParamList = {
  Home: undefined
  Search: undefined
  Favorites: undefined
  Settings: undefined
  Login: undefined
  Register: undefined
  Details: {movieId: number}
}
