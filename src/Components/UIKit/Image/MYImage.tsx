import Variables from '@/Theme/Variables'
import React, { Fragment, useCallback, useState } from 'react'
import { Image, ImageProps } from 'react-native'
import styled from 'styled-components/native'

const { dark } = Variables.Colors

interface Props extends ImageProps {}

const MYImage = (props: Props) => {
  const [shouldShowPlaceHolder, setStatus] = useState(true)
  const onLoad = useCallback(() => setStatus(false), [])
  return (
    <Fragment>
      {shouldShowPlaceHolder ? <Placeholder style={props.style} /> : null}
      <Image onLoad={onLoad} {...props} />
    </Fragment>
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

export default MYImage
