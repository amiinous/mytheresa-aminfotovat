import React, { useCallback, useState } from 'react'
import styled from 'styled-components/native'
import ScreenContainer from '@/Components/Common/ScreenContainer'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { MovieDetailsParams } from '@/Types/NavigationTypes'
import MYText from '@/Components/UIKit/Text/MYText'
import MYImage from '@/Components/UIKit/Image/MYImage'
import Variables from '@/Theme/Variables'
import KeyValueRow from '@/Components/Common/KeyValueRow'
import Button from '@/Components/UIKit/Button'
import { useAppDispatch, useAppSelector } from '@/Store/hooks'
import {
  addToWishlist,
  removeFromWishlist,
  selectWishlist,
} from '@/Store/movies'
import { IconKeys } from '@/Components/Common/Icon'
import { TxKeyPath } from '@/i18n'
import ToastService from '@/Components/Toast/ToastService'
import { TextPresets } from '@/Components/UIKit/Text/MYText.presets'

const { MARGINS } = Variables

interface Theme {
  preset: TextPresets
  buttonIcon: IconKeys
  buttonTx: TxKeyPath
}

function wishListButtonProps(isAddedToWishList: boolean): {
  icon: IconKeys
  tx: TxKeyPath
} {
  return isAddedToWishList
    ? {
        icon: 'bookmarkFilled',
        tx: 'movieDetails.addedToWishlist',
      }
    : {
        icon: 'bookmarkOutline',
        tx: 'movieDetails.addWishList',
      }
}

function getPageTheme(
  category: MainCategory,
  isAddedToWishlist: boolean,
): Theme {
  let theme: { preset: TextPresets; buttonIcon: IconKeys }
  switch (category) {
    case 'Action':
      theme = {
        preset: 'action',
        buttonIcon: isAddedToWishlist ? 'bookmarkFilled' : 'bookmarkOutline',
      }
      break
    case 'Animation':
      theme = {
        preset: 'animation',
        buttonIcon: isAddedToWishlist ? 'starFilled' : 'starOutline',
      }
      break
    case 'Horror':
      theme = {
        preset: 'horror',
        buttonIcon: isAddedToWishlist ? 'soulFilled' : 'soulOutline',
      }
  }

  return {
    ...theme,
    buttonTx: isAddedToWishlist
      ? 'movieDetails.addedToWishlist'
      : 'movieDetails.addWishList',
  }
}

const MovieDetailsPage = () => {
  const {
    params: { movie },
  } = useRoute<RouteProp<{ params: MovieDetailsParams }>>()
  const {
    id,
    title,
    release_date,
    vote_average,
    vote_count,
    backdrop_path,
    overview,
    main_category,
  } = movie
  const dispatch = useAppDispatch()
  const wishlist = useAppSelector(selectWishlist)

  const navigation = useNavigation()
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(
    wishlist.some(movie => movie.id === id),
  )
  const { preset, buttonIcon, buttonTx } = getPageTheme(
    main_category,
    isAddedToWishlist,
  )

  const onHeaderBackPress = useCallback(() => navigation.goBack(), [])

  const onWishlistPress = useCallback(() => {
    if (isAddedToWishlist) {
      ToastService.showToast({
        contentTx: 'movieDetails.removedFromWishlist',
        preset,
      })
      dispatch(removeFromWishlist(movie.id))
    } else {
      ToastService.showToast({
        contentTx: 'movieDetails.successfullyAddedToWishlist',
        preset,
      })
      dispatch(addToWishlist(movie))
    }

    setIsAddedToWishlist(!isAddedToWishlist)
  }, [isAddedToWishlist])

  const renderOverview = () => (
    <OverviewContainer>
      <OverviewLabel tx="movieDetails.overview" preset={preset} />
      <OverviewText text={overview} numberOfLines={0} preset={preset} />
    </OverviewContainer>
  )

  const renderInfo = () => (
    <InfoColumn>
      <TopInfoContainer>
        {release_date ? (
          <ReleaseDate
            label="movieDetails.releaseDate"
            value={release_date}
            preset={preset}
          />
        ) : null}
        {vote_average ? (
          <Vote
            label="movieDetails.rate"
            value={`${vote_average} /10 (${vote_count ?? ''})`}
            preset={preset}
          />
        ) : null}
      </TopInfoContainer>
      <WishlistButton
        onPress={onWishlistPress}
        icon={buttonIcon}
        tx={buttonTx}
        preset={preset}
      />
    </InfoColumn>
  )

  return (
    <ScreenContainer
      title={title}
      preset={preset}
      leftIcon="back"
      onLeftIconPress={onHeaderBackPress}
    >
      <Container>
        <TopContainer>
          <MovieImage source={{ uri: backdrop_path }} />
          {renderInfo()}
        </TopContainer>
        {renderOverview()}
      </Container>
    </ScreenContainer>
  )
}

export default MovieDetailsPage

const MovieImage = styled(MYImage)`
  border-radius: 8px;
  width: 60%;
  aspect-ratio: 1.3;
  margin-right: 8px;
`
const Container = styled.ScrollView`
  padding-horizontal: ${MARGINS.HORIZONTAL}px;
  padding-vertical: ${MARGINS.VERTICAL}px;
`

const InfoColumn = styled.View`
  justify-content: space-between;
  flex: 1;
`
const ReleaseDate = styled(KeyValueRow)`
  margin-bottom: 8px;
`
const Vote = styled(KeyValueRow)`
  margin-bottom: 8px;
`
const TopInfoContainer = styled.View``
const WishlistButton = styled(Button)``

const OverviewContainer = styled.View`
  margin-top: 8px;
`
const OverviewLabel = styled(MYText)``
const OverviewText = styled(MYText)``

const TopContainer = styled.View`
  flex-direction: row;
`
