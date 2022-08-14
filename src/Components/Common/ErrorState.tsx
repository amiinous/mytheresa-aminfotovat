import React from 'react'
import styled from 'styled-components/native'
import Icon from '@/Components/Common/Icon'
import Button from '@/Components/UIKit/Button'

interface Props {
  retry?: () => void
}

const ErrorState = ({ retry }: Props) => {
  return (
    <Container>
      <Icon name="oops" size={200} />
      {retry ? <TryAgainButton onPress={retry} tx="tryAgain" /> : null}
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const TryAgainButton = styled(Button)`
  margin-top: 32px;
`

export default ErrorState
