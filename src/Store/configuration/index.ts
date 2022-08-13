import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import api from '@/Services/HttpClient'

interface ConfigState {
  secure_base_url: string
  poster_sizes: string[]
}

const initialState = {} as ConfigState

/**
 * Actions
 */

export const getConfig = createAsyncThunk('Config/getConfig', async () => {
  const res = await api.get<{ images: ConfigState }>('configuration')
  return res.data
})

/**
 * Reducer
 */

export default createReducer(initialState, builder => {
  builder.addCase(getConfig.fulfilled, (state, { payload }) => {
    state.secure_base_url = payload.images.secure_base_url
    state.poster_sizes = payload.images.poster_sizes
  })
})
