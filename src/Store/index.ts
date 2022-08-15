import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import movies from './movies'
import config from './configuration'

export type RootState = ReturnType<typeof reducers>
export type AppDispatch = typeof store.dispatch

const persistConfigMovies = {
  key: 'movies',
  storage: AsyncStorage,
  whitelist: ['wishlist'],
}

const persistConfig = {
  key: 'config',
  storage: AsyncStorage,
}

const persistedMovies = persistReducer(persistConfigMovies, movies)
const persistedConfigs = persistReducer(persistConfig, config)

const reducers = combineReducers({
  movies: persistedMovies,
  config: persistedConfigs,
})

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default
      middlewares.push(createDebugger())
    }

    return middlewares
  },
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }
