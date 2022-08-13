import React from 'react'
import { ViewStyle, StyleSheet, View } from 'react-native'
import styled from 'styled-components/native'
import { TxKeyPath } from '@/i18n'
import MYText from '@/Components/UIKit/Text/MYText'
import Icon, { IconKeys } from '@/Components/Common/Icon'
import Variables from '@/Theme/Variables'

const { white, lightGray } = Variables.Colors

interface Props {
  titleTx?: TxKeyPath
  title?: string
  leftIcon?: IconKeys
  onLeftIconPress?: () => void
  rightIcon?: IconKeys
  onRightIconPress?: () => void
  renderRightWidget?: () => JSX.Element
}

export default function Header(props: Props) {
  const {
    titleTx,
    title,
    leftIcon,
    onLeftIconPress,
    rightIcon,
    onRightIconPress,
  } = props

  return (
    <Container>
      {title || titleTx ? (
        <View style={styles.titleContainer}>
          <MYText text={title} tx={titleTx} preset={'hugeTitle'} />
        </View>
      ) : null}

      {onRightIconPress && rightIcon ? (
        <Icon
          name={rightIcon}
          onPress={onRightIconPress}
          size={24}
          color={white}
          style={styles.rightIcon}
        />
      ) : null}
      {onLeftIconPress && leftIcon ? (
        <Icon
          name={leftIcon}
          onPress={onLeftIconPress}
          size={30}
          color={white}
          style={styles.leftIcon}
        />
      ) : null}
    </Container>
  )
}

const Container = styled.View`
  padding-vertical: 16px;
  flex-direction: row;
  align-items: center;
  background-color: ${white};
  height: 80px;
  border-bottom-width: 1px;
  border-bottom-color: ${lightGray};
`

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  leftIcon: {
    position: 'absolute',
    left: 8,
  },
  rightIcon: {
    position: 'absolute',
    right: 8,
  },
})
