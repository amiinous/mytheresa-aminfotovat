import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import MovieTile from '@/Components/MovieTile'

describe('MovieTile Snapshot test ', () => {
  it('renders correctly', () => {
    expect(shallow(<MovieTile />)).toMatchSnapshot()
  })
})
