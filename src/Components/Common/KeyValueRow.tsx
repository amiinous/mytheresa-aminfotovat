import styled from 'styled-components/native'
import MYText from '@/Components/UIKit/Text/MYText'
import React from 'react'
import { TxKeyPath } from '@/i18n'
import { StyleProp, ViewStyle } from 'react-native'
import { TextPresets } from '@/Components/UIKit/Text/MYText.presets'

interface Props {
  label: TxKeyPath
  value: string
  style?: StyleProp<ViewStyle>
  preset: TextPresets
}

const KeyValueRow = ({ label, value, style, preset }: Props) => {
  return (
    <Container style={style}>
      <KeyText tx={label} preset={preset} />
      <ValueText text={value} preset={preset} />
    </Container>
  )
}

export default KeyValueRow

const Container = styled.View``
const KeyText = styled(MYText)``
const ValueText = styled(MYText)`
  margin-top: 4px;
`
