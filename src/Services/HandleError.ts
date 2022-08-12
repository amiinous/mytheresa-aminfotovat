import ToastService from '@/Components/Toast/ToastService'

export interface Error {
  message?: string
}

export default function ({ message }: Error) {
  ToastService.showToast({ content: message })
  return Promise.reject({ message })
}
