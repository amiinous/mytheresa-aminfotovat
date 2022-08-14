import styled from 'styled-components/native'
import React, { useEffect, useState } from 'react'
import MYImage from '@/Components/UIKit/Image/MYImage'
import Logo_image from '@/Assets/Images/logo.png'
import MYActivityIndicator from '@/Components/UIKit/MYActivityIndicator'
import Variables from '@/Theme/Variables'
import { useAppDispatch } from '@/Store/hooks'
import { getConfig } from '@/Store/configuration'
import { navigateAndReset } from '@/Navigator/utils'
import Button from '@/Components/UIKit/Button'

const { white } = Variables.Colors

const StartupPage = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    setIsLoading(true)
    dispatch(getConfig())
      .unwrap()
      .then(() => {
        navigateAndReset('Main')
      })
      .catch(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Container>
      <LogoImage source={Logo_image} resizeMode="contain" />
      {isLoading ? (
        <MYActivityIndicator />
      ) : (
        <Button onPress={() => getData()} tx="tryAgain" />
      )}
    </Container>
  )
}

export default StartupPage

const Container = styled.View`
  flex: 1;
  background-color: ${white};
  align-items: center;
  justify-content: center;
`

const LogoImage = styled(MYImage)`
  width: 250px;
  height: 100px;
`
