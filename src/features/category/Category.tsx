import React from 'react'
import {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {getCategory, selectCategory} from './categorySlice'
import MovieList from 'components/MovieList'

export interface CategoryProps {
  category: string
}

const Category = (props: CategoryProps) => {
  const {category} = props

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getCategory(category))
  }, [category, dispatch])

  const categoryData = useAppSelector(state => selectCategory(state, category))

  return <MovieList movies={categoryData} />
}

export default Category
