import React from 'react'
import styled from 'styled-components/native'
import Icon from '@/Components/Common/Icon'

const ErrorState = () => {
  return (
    <Container>
      <Icon name="oops" size={200} />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export default ErrorState
