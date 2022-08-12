import { StyleSheet, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import Variables from '@/Theme/Variables'
const { caution } = Variables.Colors

const HomePage = () => {
  return (
    <Container>
      <Text style={{ marginTop: 50 }}>HomePage</Text>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: ${caution};
`

export default HomePage

const styles = StyleSheet.create({})
