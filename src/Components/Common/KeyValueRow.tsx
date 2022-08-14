import styled from 'styled-components/native'
import MYText from '@/Components/UIKit/Text/MYText'
import React from 'react'
import { TxKeyPath } from '@/i18n'
import { StyleProp, ViewStyle } from 'react-native'

interface Props {
  label: TxKeyPath
  value: string
  style?: StyleProp<ViewStyle>
}

const KeyValueRow = ({ label, value, style }: Props) => {
  return (
    <Container style={style}>
      <KeyText tx={label} preset="headingTwo" />
      <ValueText text={value} />
    </Container>
  )
}

export default KeyValueRow

const Container = styled.View``
const KeyText = styled(MYText)``
const ValueText = styled(MYText)``
