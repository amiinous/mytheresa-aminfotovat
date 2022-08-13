import { ActivityIndicator } from 'react-native'
import React from 'react'

interface Props {
  size?: 'small' | 'large'
}

const MYActivityIndicator = ({ size = 'large' }: Props) => {
  return <ActivityIndicator size={size} />
}

export default MYActivityIndicator
