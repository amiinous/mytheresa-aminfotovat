import React from 'react'
import MYActivityIndicator from '@/Components/UIKit/MYActivityIndicator'
import Variables from '@/Theme/Variables'
import styled from 'styled-components/native'
const { white } = Variables.Colors

type PendingStateProps = {
  backgroundColor?: string
}

const PendingState = ({ backgroundColor }: PendingStateProps) => {
  return (
    <Container backgroundColor={backgroundColor}>
      <MYActivityIndicator />
    </Container>
  )
}

const Container = styled.View<{ backgroundColor: string }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : white};
`

export default PendingState
