import { ActivityIndicator } from 'react-native'
import React from 'react'
import Variables from '@/Theme/Variables'
const { dark } = Variables.Colors

interface Props {
  size?: 'small' | 'large'
}

const MYActivityIndicator = ({ size = 'large' }: Props) => {
  return <ActivityIndicator color={dark} size={size} />
}

export default MYActivityIndicator
