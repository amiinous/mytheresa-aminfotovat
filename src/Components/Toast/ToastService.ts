import { Keyboard } from 'react-native'
import { ShowToast, ToastObject } from './Toast'

class ToastService {
  _listener?: ShowToast = undefined

  constructor() {}

  showToast({
    bottom = 16,
    content,
    duration = 3000,
    contentTx,
    preset,
  }: ToastObject) {
    Keyboard.dismiss()
    this._listener &&
      this._listener({
        bottom,
        content,
        duration,
        contentTx,
        preset,
      })
  }

  setOnShowToastListener(listener?: ShowToast) {
    this._listener = listener
  }
}

export default new ToastService()
