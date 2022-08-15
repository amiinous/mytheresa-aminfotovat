import React from 'react'
import styled from 'styled-components/native'
import { TxKeyPath } from '@/i18n'
import MYText from '@/Components/UIKit/Text/MYText'
import Icon, { IconKeys } from '@/Components/Common/Icon'
import Variables from '@/Theme/Variables'
import { TextPresets } from '@/Components/UIKit/Text/MYText.presets'

const { white, lightGray } = Variables.Colors

interface Props {
  titleTx?: TxKeyPath
  title?: string
  leftIcon?: IconKeys
  onLeftIconPress?: () => void
  rightIcon?: IconKeys
  onRightIconPress?: () => void
  renderRightWidget?: () => JSX.Element
  preset?: TextPresets
}

function Header(props: Props) {
  const {
    titleTx,
    title,
    leftIcon,
    onLeftIconPress,
    rightIcon,
    onRightIconPress,
    preset,
  } = props

  return (
    <Container>
      {title || titleTx ? (
        <TitleContainer>
          <MYText
            text={title}
            tx={titleTx}
            limitLength={24}
            preset={preset ? preset : 'hugeTitle'}
          />
        </TitleContainer>
      ) : null}

      {onRightIconPress && rightIcon ? (
        <RightIcon name={rightIcon} onPress={onRightIconPress} size={24} />
      ) : null}
      {onLeftIconPress && leftIcon ? (
        <LeftIcon name={leftIcon} onPress={onLeftIconPress} size={30} />
      ) : null}
    </Container>
  )
}

export default React.memo(Header)

const Container = styled.View`
  padding-vertical: 16px;
  flex-direction: row;
  align-items: center;
  background-color: ${white};
  height: 80px;
  border-bottom-width: 1px;
  border-bottom-color: ${lightGray};
`

const TitleContainer = styled.View`
  flex: 1;
  align-items: center;
`

const RightIcon = styled(Icon)`
  position: absolute;
  right: 8px;
`
const LeftIcon = styled(Icon)`
  position: absolute;
  left: 8px;
`
