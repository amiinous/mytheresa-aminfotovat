import React from 'react'
import { GestureResponderEvent, ImageStyle } from 'react-native'
import MYImage from '@/Components/UIKit/Image/MYImage'
import MYTouchableOpacity from '@/Components/UIKit/MYTouchableOpacity'

import back_image from '@/Assets/Images/back.png'
import oops_image from '@/Assets/Images/oops.png'
import bookmark_filled_image from '@/Assets/Images/bookmark_filled.png'
import bookmark_outline_image from '@/Assets/Images/bookmark_outline.png'
import star_filled_image from '@/Assets/Images/star_filled.png'
import star_outline_image from '@/Assets/Images/star_outline.png'
import soul_filled_image from '@/Assets/Images/soul_filled.png'
import soul_outline_image from '@/Assets/Images/soul_outline.png'
import empty_wishlist_image from '@/Assets/Images/empty_wishlist.png'

import Variables from '@/Theme/Variables'

const { dark } = Variables.Colors

interface IconType {
  name: IconKeys
  color?: string
  style?: ImageStyle
  size?: number
  onPress?: (item?: GestureResponderEvent) => void
}

const Icon = ({ name, size = 24, color = dark, style, onPress }: IconType) => {
  const defaultStyle = { height: size, width: size, tintColor: color }
  const content = (
    <MYImage source={iconMap[name]} style={[defaultStyle, style]} />
  )

  return !onPress ? (
    content
  ) : (
    <MYTouchableOpacity onPress={onPress} style={[defaultStyle, style]}>
      {content}
    </MYTouchableOpacity>
  )
}

const iconMap = {
  back: back_image,
  oops: oops_image,
  bookmarkFilled: bookmark_filled_image,
  bookmarkOutline: bookmark_outline_image,
  starFilled: star_filled_image,
  starOutline: star_outline_image,
  soulFilled: soul_filled_image,
  soulOutline: soul_outline_image,
  emptyWishlist: empty_wishlist_image,
}

export type IconKeys = keyof typeof iconMap

export default Icon
