import { ViewProps } from 'react-native'
import React from 'react'
import Variables from '@/Theme/Variables'
import Header from './Header'
import { TxKeyPath } from '@/i18n'
import PendingState from '@/Components/Common/PendingState'
import ErrorState from './ErrorState'
import { IconKeys } from './Icon'
import styled from 'styled-components/native'

const { white } = Variables.Colors

interface Props extends ViewProps {
  title?: string
  titleTx?: TxKeyPath
  onLeftIconPress?: () => void
  leftIcon?: IconKeys
  onRightIconPress?: () => void
  rightIcon?: IconKeys
  status: NetworkStatus
  showDisplayMode?: boolean
}

const ScreenContainer = ({
  title,
  titleTx,
  leftIcon,
  onLeftIconPress,
  children,
  status,
  onRightIconPress,
  rightIcon,
}: Props) => {
  let content
  switch (status) {
    case 'loading':
      content = <PendingState />
      break
    case 'error':
      content = <ErrorState />
      break
    default:
      content = children
  }

  return (
    <Container>
      <Header
        title={title}
        titleTx={titleTx}
        leftIcon={leftIcon}
        onLeftIconPress={onLeftIconPress}
        onRightIconPress={onRightIconPress}
        rightIcon={rightIcon}
      />
      {content}
    </Container>
  )
}

export default ScreenContainer

const Container = styled.View`
  flex: 1;
  background-color: ${white};
`
