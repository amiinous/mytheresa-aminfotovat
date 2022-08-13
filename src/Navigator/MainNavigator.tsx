import React from 'react'
import HomePage from '@/Screens/HomePage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const MainStackNavigator = createNativeStackNavigator()

const MainStack = () => (
  <MainStackNavigator.Navigator screenOptions={{ headerShown: false }}>
    <MainStackNavigator.Screen name="Home" component={HomePage} />
  </MainStackNavigator.Navigator>
)

export default MainStack
