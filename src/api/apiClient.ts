import axios from 'axios'
import {store} from 'app/store'
import {getAuth} from 'features/auth/authSlice'

const baseUrl = 'https://movies.roun.org/api'

axios.interceptors.request.use(config => {
  const auth = getAuth(store.getState())

  if (auth) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }

  return config
})

const login = async (username: string, password: string) => {
  const response = await axios.post(`${baseUrl}/user/login`, {
    username,
    password,
  })

  return response.data
}

const register = async (username: string, password: string) => {
  const response = await axios.post(`${baseUrl}/user/register`, {
    username,
    password,
  })

  return response.data
}

const searchMovies = async (query: string) => {
  const response = await axios.get(`${baseUrl}/search`, {
    params: {
      q: query,
    },
  })

  return response.data
}

const getCategoryMovies = async (category: string) => {
  const response = await axios.get(`${baseUrl}/category/${category}`)
  return response.data
}

const getMovie = async (id: number) => {
  const response = await axios.get(`${baseUrl}/movie/${id}`)
  return response.data
}

const getFavorites = async () => {
  const response = await axios.get(`${baseUrl}/favorite/all`)
  return response.data
}

const getFavorite = async (id: number) => {
  const response = await axios.get(`${baseUrl}/favorite/${id}`)
  return response.data
}

const putFavorite = async (id: number) => {
  const response = await axios.put(`${baseUrl}/favorite/${id}`)
  return response.data
}

const deleteFavorite = async (id: number) => {
  const response = await axios.delete(`${baseUrl}/favorite/${id}`)
  return response.data
}

const getConfig = async () => {
  const response = await axios.get(`${baseUrl}/configuration`)
  return response.data
}

export {
  login,
  register,
  searchMovies,
  getCategoryMovies,
  getMovie,
  getFavorites,
  getFavorite,
  putFavorite,
  deleteFavorite,
  getConfig,
}
