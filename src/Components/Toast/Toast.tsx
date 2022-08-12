import React, { PureComponent } from 'react'
import { Animated, Dimensions, StyleSheet } from 'react-native'
import ELText from '@/Components/UIKit/Text/ELText'
import ToastService from './ToastService'
import { WithTranslation, withTranslation } from 'react-i18next'
import Variables from '@/Theme/Variables'

const SCREEN_WIDTH = Dimensions.get('window').width

const { caution, white } = Variables.Colors

export const DURATION = {
  DEFAULT_LENGTH: 3000,
  FOREVER: 0,
}

export type ToastObject = {
  bottom?: number
  content?: string
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
    duration = DURATION.DEFAULT_LENGTH,
  }: ToastObject) => {
    const toast = {
      bottom,
      content,
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

    const { content, bottom } = this.state.toast
    const { t } = this.props
    return (
      <Animated.View
        style={[
          styles.container,
          {
            bottom,
            opacity: this.opacity,
          },
        ]}
      >
        <ELText
          text={content ? content : t('defaultToastMessage')}
          color={white}
          style={{ flex: 1, lineHeight: 24 }}
        />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: caution,
    borderRadius: 8,
    padding: 16,
    position: 'absolute',
    width: SCREEN_WIDTH - 40,
    zIndex: 110,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default withTranslation('translation')(Toast)
