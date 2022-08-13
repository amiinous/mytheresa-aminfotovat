import { Text } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import Variables from '@/Theme/Variables'
import ScreenContainer from '@/Components/Common/ScreenContainer'

const HomePage = () => {
  return (
    <ScreenContainer status="fulfilled" titleTx="home.title">
      <Text style={{ marginTop: 50 }}>HomePage</Text>
    </ScreenContainer>
  )
}

export default HomePage
