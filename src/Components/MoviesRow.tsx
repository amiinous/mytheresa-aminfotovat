import styled from 'styled-components/native'
import React, { useCallback } from 'react'
import MYText from '@/Components/UIKit/Text/MYText'
import { ListRenderItem, StyleSheet } from 'react-native'
import MovieTile from '@/Components/MovieTile'
import Variables from '@/Theme/Variables'
const { MARGINS } = Variables

interface Props {
  title: string
  movies: Movie[]
}

const MoviesRow = ({ title, movies }: Props) => {
  const renderMovie: ListRenderItem<Movie> = useCallback(({ item: movie }) => {
    return <MovieTile movie={movie} />
  }, [])

  return (
    <Container>
      <CateogryTitle text={title} preset="heading" />
      <MovieList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={movies}
        renderItem={renderMovie}
        contentContainerStyle={styles.listContainer}
      />
    </Container>
  )
}

export default MoviesRow

const Container = styled.View``

const CateogryTitle = styled(MYText)`
  margin-left: ${MARGINS.HORIZONTAL}px;
  margin-bottom: 8px;
`

const MovieList = styled.FlatList`
  flex: 1;
`

// Here the paddingBottom is used in order for the shadow in Android get visible!
const styles = StyleSheet.create({
  listContainer: { paddingLeft: 20, paddingBottom: 20 },
})
