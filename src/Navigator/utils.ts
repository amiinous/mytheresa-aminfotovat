import { AppScreenNames, RootStackParamList } from '@/Types/NavigationTypes'
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export function navigate<K extends AppScreenNames>(
  name: K,
  params: RootStackParamList[K],
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

export function navigateAndReset(name: string, index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    )
  }
}
