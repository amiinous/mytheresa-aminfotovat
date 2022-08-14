import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import { useAppSelector } from '@/Store/hooks'
import { selectWishlist } from '@/Store/movies'
import ScreenContainer from '@/Components/Common/ScreenContainer'
import { useNavigation } from '@react-navigation/native'
import { Dimensions, FlatList, ListRenderItem } from 'react-native'
import MovieTile from '@/Components/MovieTile'
import Variables from '@/Theme/Variables'
import Icon from '@/Components/Common/Icon'

const { MARGINS } = Variables
const SCREEN_WIDTH = Dimensions.get('screen').width

const CARD_WIDTH =
  (SCREEN_WIDTH - 2 * MARGINS.HORIZONTAL - MARGINS.INTER_ITEM_MARGIN) / 2

const WishlistPage = () => {
  const navigation = useNavigation()
  const onBackPress = useCallback(() => navigation.goBack(), [])
  const wishlist = useAppSelector(selectWishlist)

  const renderEmptyState = () => (
    <EmptyListContainer>
      <Icon name="emptyWishlist" size={200} />
    </EmptyListContainer>
  )

  const renderMovie: ListRenderItem<Movie> = ({ item: movie, index }) => {
    return (
      <Movie
        movie={movie}
        style={{ marginRight: index % 2 === 0 ? MARGINS.INTER_ITEM_MARGIN : 0 }}
      />
    )
  }

  return (
    <ScreenContainer
      titleTx="wishlist.title"
      leftIcon="back"
      onLeftIconPress={onBackPress}
    >
      <Wishlist
        data={wishlist}
        renderItem={renderMovie}
        numColumns={2}
        ListEmptyComponent={renderEmptyState()}
        contentContainerStyle={{
          paddingHorizontal: MARGINS.HORIZONTAL,
          paddingVertical: MARGINS.VERTICAL,
          flexGrow: 1,
        }}
      />
    </ScreenContainer>
  )
}

export default WishlistPage

const Wishlist = styled.FlatList``

const Movie = styled(MovieTile)`
  width: ${CARD_WIDTH}px;
  margin-bottom: ${MARGINS.INTER_ITEM_MARGIN}px;
`

const EmptyListContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`
