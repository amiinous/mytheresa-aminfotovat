import React from 'react'
import {
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  GestureResponderEvent,
  TouchableOpacityProps,
} from 'react-native'

const HIT_SLOP = { top: 16, left: 16, bottom: 16, right: 16 }

interface MYTouchableOpacityProps extends TouchableOpacityProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  onPress?: (item?: GestureResponderEvent) => void
  onLayout?: (event?: any) => void
  disabled?: boolean
  activeOpacity?: number
}

export default function ({
  children,
  style,
  onPress,
  onLayout,
  disabled = false,
  activeOpacity = 0.7,
}: MYTouchableOpacityProps) {
  return (
    <TouchableOpacity
      onLayout={onLayout}
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={style}
      disabled={disabled}
      hitSlop={HIT_SLOP}
    >
      {children}
    </TouchableOpacity>
  )
}
