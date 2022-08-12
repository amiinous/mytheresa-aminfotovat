import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './utils'
import Variables from '@/Theme/Variables'
import HomePage from '@/Screens/HomePage'

const Stack = createNativeStackNavigator()

const ApplicationNavigator = () => {
  const { white } = Variables.Colors

  return (
    <SafeAreaView style={{ backgroundColor: white, flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle={'dark-content'} />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
