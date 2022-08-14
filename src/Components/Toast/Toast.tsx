import React, { PureComponent } from 'react'
import { Animated, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import MYText from '@/Components/UIKit/Text/MYText'
import ToastService from './ToastService'
import { WithTranslation, withTranslation } from 'react-i18next'
import Variables from '@/Theme/Variables'
import { TxKeyPath } from '@/i18n'

const SCREEN_WIDTH = Dimensions.get('window').width

const { caution, white } = Variables.Colors

export const DURATION = {
  DEFAULT_LENGTH: 3000,
  FOREVER: 0,
}

export type ToastObject = {
  bottom?: number
  content?: string
  contentTx?: TxKeyPath
  duration?: number
}

export type ShowToast = (toast: ToastObject) => void

type State = {
  toast: ToastObject | null
}

interface Props extends WithTranslation<'translation'> {}

class Toast extends PureComponent<Props, State> {
  opacity: Animated.Value = new Animated.Value(0)
  timer: NodeJS.Timeout | null = null

  constructor(props: Props) {
    super(props)
    this.state = { toast: null }
    this.opacity = new Animated.Value(0)
  }

  componentDidMount() {
    ToastService.setOnShowToastListener(this.show)
  }

  componentWillUnmount() {
    ToastService.setOnShowToastListener(undefined)
  }

  show: ShowToast = ({
    bottom = 32,
    content,
    contentTx,
    duration = DURATION.DEFAULT_LENGTH,
  }: ToastObject) => {
    const toast = {
      bottom,
      content,
      contentTx,
      duration,
    }

    this.timer && clearTimeout(this.timer)
    this.setState({ toast }, () => {
      Animated.timing(this.opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        if (duration !== DURATION.FOREVER) {
          this.close()
        }
      })
    })
  }

  close = () => {
    if (this.state.toast)
      this.timer = setTimeout(() => {
        Animated.timing(this.opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          this.dismiss()
        })
      }, this.state.toast.duration)
  }

  dismiss = () => {
    this.setState({
      toast: null,
    })
  }

  render() {
    if (!this.state.toast) {
      return null
    }

    const { t } = this.props
    const { content, contentTx, bottom } = this.state.toast
    const text = contentTx ? t(contentTx) : content

    return (
      <Container
        style={{
          bottom,
          opacity: this.opacity,
        }}
      >
        <ErrorText
          text={text ? text : t('defaultToastMessage')}
          color={white}
        />
      </Container>
    )
  }
}

export default withTranslation('translation')(Toast)

const Container = styled(Animated.View)`
  margin-horizontal: 20px;
  background-color: ${caution};
  border-radius: 8px;
  padding: 16px;
  position: absolute;
  width: ${SCREEN_WIDTH - 40}px;
  z-index: 110;
  flex-direction: row;
  align-items: center;
`

const ErrorText = styled(MYText)`
  flex: 1;
  line-height: 24px;
`
