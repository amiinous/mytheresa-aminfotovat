import React from 'react'
import { StatusBar } from 'react-native'
import styled from 'styled-components/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './utils'
import Variables from '@/Theme/Variables'
import StartupPage from '@/Screens/StartupPage'
import MainNavigator from './MainNavigator'
import Toast from '@/Components/Toast/Toast'

const { white } = Variables.Colors

const Stack = createNativeStackNavigator()

const ApplicationNavigator = () => {
  return (
    <SafeAreaView>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle={'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={StartupPage} />
          <Stack.Screen name="Main" component={MainNavigator} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </SafeAreaView>
  )
}

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${white};
`

export default ApplicationNavigator
