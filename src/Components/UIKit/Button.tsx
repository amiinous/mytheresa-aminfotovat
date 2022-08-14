import React from 'react'
import styled from 'styled-components/native'
import MYTouchableOpacity from '@/Components/UIKit/MYTouchableOpacity'
import MYText from '@/Components/UIKit/Text/MYText'
import { TxKeyPath } from '@/i18n'
import Variables from '@/Theme/Variables'
import Icon, { IconKeys } from '@/Components/Common/Icon'
import { StyleProp, ViewStyle } from 'react-native'

const { dark } = Variables.Colors

interface Props {
  onPress?: () => void
  tx?: TxKeyPath
  icon?: IconKeys
  style?: StyleProp<ViewStyle>
}

const Button = ({ onPress, tx, icon, style }: Props) => {
  return (
    <Container onPress={onPress} style={style}>
      {icon ? <Icon name={icon} style={{ marginRight: tx ? 8 : 0 }} /> : null}
      {tx ? <MYText tx={tx} preset="headingTwo" /> : null}
    </Container>
  )
}

export default Button

const Container = styled(MYTouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border-width: 2px;
  border-color: ${dark};
  padding: 8px;
`
