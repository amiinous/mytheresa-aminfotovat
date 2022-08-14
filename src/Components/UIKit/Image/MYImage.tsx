import Variables from '@/Theme/Variables'
import React, { useCallback, useState } from 'react'
import { ImageProps } from 'react-native'
import styled from 'styled-components/native'

const { dark } = Variables.Colors

interface Props extends ImageProps {}

const MYImage = (props: Props) => {
  const [shouldShowPlaceHolder, setStatus] = useState(
    typeof props.source === 'number' ? false : true,
  )
  const onLoad = useCallback(() => setStatus(false), [])
  return (
    <Container style={props.style}>
      {shouldShowPlaceHolder ? (
        <Placeholder
          style={[props.style, { width: undefined, height: undefined }]}
        />
      ) : null}
      <Image onLoad={onLoad} {...props} style={[props.style, { flex: 1 }]} />
    </Container>
  )
}

const Placeholder = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${dark};
`

const Container = styled.View``
const Image = styled.Image``

export default MYImage
