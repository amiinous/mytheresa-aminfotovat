import React from 'react'
import { useTranslation } from 'react-i18next'
import { ColorValue, StyleProp } from 'react-native'
import { presets, TextPresets } from './MYText.presets'
import type { TextStyle } from 'react-native'
import type { TxKeyPath } from '@/i18n/'
import styled from 'styled-components/native'

interface Props {
  style?: StyleProp<TextStyle>
  /**
   * use i18m key here to use translations
   */
  tx?: TxKeyPath
  /**
   * this prop will be displayed with no manipulations
   */
  text?: string
  children?: string
  /**
   * pre-defined presets that usually used in designs
   */
  preset?: TextPresets
  numberOfLines?: number
  color?: ColorValue
  allowFontScaling?: boolean
  onTextLayout?: (e: any) => void
  ellipsizeMode?: 'tail' | 'head'
  onPress?: () => void
  limitLength?: number
}

export default function DKText(props: Props) {
  const {
    tx,
    numberOfLines = 1,
    children,
    preset = 'default',
    style: styleOverride,
    text,
    color,
    allowFontScaling = false,
    limitLength,
    ...rest
  } = props

  const { t } = useTranslation()
  const transleted = tx && t(tx)
  let content = text || transleted || children || ''
  if (limitLength && content?.length > limitLength)
    content = content?.substring(0, limitLength) + '...'

  let styles: StyleProp<TextStyle> = [presets[preset]]

  if (color) styles = [presets[preset], { color }]
  styles = [...styles, styleOverride]

  return (
    <Text
      numberOfLines={numberOfLines}
      allowFontScaling={allowFontScaling}
      style={[styles]}
      {...rest}
    >
      {content}
    </Text>
  )
}

const Text = styled.Text``
