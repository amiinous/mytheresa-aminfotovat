import { TextStyle, StyleSheet } from 'react-native'
import Variables from '@/Theme/Variables'

const BASE: TextStyle = {
  fontFamily: 'Helvetica',
  fontSize: 16,
  color: Variables.Colors.dark,
}

const _presets = {
  /**
   * The default text styles.
   */
  default: { ...BASE },
  smallBody: {
    ...BASE,
    fontSize: 12,
  },
  headingTwo: {
    ...BASE,
    fontSize: 16,
    fontWeight: '800',
  },
  heading: {
    ...BASE,
    fontSize: 20,
    fontWeight: '800',
  },
  hugeTitle: {
    ...BASE,
    fontSize: 20,
    fontWeight: 'bold',
  },
  horror: {
    ...BASE,
    fontFamily: 'Horror Corps Demo',
    fontSize: 14,
  },
  animation: {
    ...BASE,
    fontFamily: 'Water Galon',
  },
  action: {
    ...BASE,
    fontFamily: 'Rebellion',
    lineHeight: 20,
  },
}

export const presets = StyleSheet.create<Record<string, TextStyle>>(_presets)

export type TextPresets = keyof typeof _presets
