import styled from 'styled-components/native'
import React, { useCallback } from 'react'
import MYImage from '@/Components/UIKit/Image/MYImage'
import { Dimensions, StyleSheet } from 'react-native'
import Variables from '@/Theme/Variables'
import MYTouchableOpacity from '@/Components/UIKit/MYTouchableOpacity'
import { navigate } from '@/Navigator/utils'
const { MARGINS } = Variables
const { dark } = Variables.Colors

const SCREEN_WIDTH = Dimensions.get('screen').width
const INTER_CARD_MARGIN = 16
const CARD_WIDTH =
  (SCREEN_WIDTH - 2 * MARGINS.HORIZONTAL - 2 * INTER_CARD_MARGIN) / 2.5

interface Props {
  movie: Movie
}

const MovieTile = ({ movie }: Props) => {
  const onPress = useCallback(() => navigate('MovieDetails', { movie }), [])
  return (
    <Container onPress={onPress} style={styles.cardShadow}>
      <PosterImage source={{ uri: movie?.poster_path }} />
    </Container>
  )
}

export default React.memo(
  MovieTile,
  (prevProps, nextProps) => prevProps.movie?.id === nextProps.movie?.id,
)

const Container = styled(MYTouchableOpacity)`
  border-radius: 8px;
  width: ${CARD_WIDTH}px;
  aspect-ratio: 0.5;
  margin-right: ${INTER_CARD_MARGIN}px;
  elevation: 10;
  shadow-color: ${dark};
`
const PosterImage = styled(MYImage)`
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
`

/**
 * I read the code of `css-to-react-native` library (https://github.com/styled-components/css-to-react-native/blob/master/src/transforms/boxShadow.js)
 * and as it always return the `shadowOpacity ` as 1 and I wanted it to be 0.5 (it was important to me!) I did not use styled-components to pass box shadow styles
 */
const styles = StyleSheet.create({
  cardShadow: {
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
})
