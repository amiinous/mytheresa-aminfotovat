import { Text } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components/native'
import Variables from '@/Theme/Variables'
import ScreenContainer from '@/Components/Common/ScreenContainer'
import { useAppDispatch, useAppSelector } from '@/Store/hooks'
import {
  getMoviesByGenres,
  selectGetMoviesStatus,
  selectMovies,
} from '@/Store/movies'
import { HOMEPAGE_GENRES } from '@/Config'
import MoviesRow from '@/Components/MoviesRow'
import { useNavigation } from '@react-navigation/native'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const getData = useCallback(
    () => dispatch(getMoviesByGenres(HOMEPAGE_GENRES)),
    [],
  )
  const status = useAppSelector(selectGetMoviesStatus)
  const movies = useAppSelector(selectMovies)
  useEffect(() => {
    getData()
  }, [])

  const onWishlistPress = useCallback(() => navigation.navigate('Wishlist'), [])

  return (
    <ScreenContainer
      status={status}
      retry={getData}
      titleTx="home.title"
      rightIcon="bookmarkOutline"
      onRightIconPress={onWishlistPress}
    >
      <MoviesScrollView>
        {Object.keys(movies).map(genre => {
          return <MoviesRow key={genre} title={genre} movies={movies[genre]} />
        })}
      </MoviesScrollView>
    </ScreenContainer>
  )
}

const MoviesScrollView = styled.ScrollView`
  padding-vertical: 20px;
`

export default HomePage
