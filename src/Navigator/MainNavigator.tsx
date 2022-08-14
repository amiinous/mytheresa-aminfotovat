import React from 'react'
import HomePage from '@/Screens/HomePage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetailsPage from '@/Screens/MovieDetailsPage'
import WishlistPage from '@/Screens/WishlistPage'

const MainStackNavigator = createNativeStackNavigator()

const MainStack = () => (
  <MainStackNavigator.Navigator screenOptions={{ headerShown: false }}>
    <MainStackNavigator.Screen name="Home" component={HomePage} />
    <MainStackNavigator.Screen
      name="MovieDetails"
      component={MovieDetailsPage}
    />
    <MainStackNavigator.Screen name="Wishlist" component={WishlistPage} />
  </MainStackNavigator.Navigator>
)

export default MainStack
