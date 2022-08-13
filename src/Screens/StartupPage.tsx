import styled from 'styled-components/native'
import React, { useEffect, useState } from 'react'
import MYImage from '@/Components/UIKit/Image/MYImage'
import Logo_image from '@/Assets/Images/logo.png'
import MYActivityIndicator from '@/Components/UIKit/MYActivityIndicator'
import Variables from '@/Theme/Variables'
import { useAppDispatch } from '@/Store/hooks'
import { getConfig } from '@/Store/configuration'
import { navigateAndReset } from '@/Navigator/utils'

const { white } = Variables.Colors

const StartupPage = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
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
  })
  return (
    <Container>
      <LogoImage source={Logo_image} resizeMode="contain" />
      {isLoading ? <MYActivityIndicator /> : null}
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
  margin-bottom: 32px;
  width: 250px;
`
