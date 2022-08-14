import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import api from '@/Services/HttpClient'
import { RootState } from '..'

type CategorizedMovieList = Record<string, Movie[]>

interface MoviesState {
  data: CategorizedMovieList
  status: NetworkStatus
}

interface GetMoviesResult {
  page: number
  results: Movie[]
  total_results: number
  total_pages: number
}

const initialState = { data: {}, status: 'fulfilled' } as MoviesState

/**
 * Actions
 */
export const getMoviesByGenres = createAsyncThunk<
  CategorizedMovieList,
  Genre[],
  { state: RootState }
>('Movies/getMoviesbyGenres', async (genres: Genre[], { getState }) => {
  const resultsArray = await Promise.all(
    genres.map(genre =>
      api.get<GetMoviesResult>(`discover/movie?with_genres=${genre.id}`),
    ),
  )
  const categorizedMovies = {} as CategorizedMovieList
  const secureBaseUrl = getState().config.secure_base_url
  const posterSizes = getState().config.poster_sizes
  const baseUrl = secureBaseUrl + posterSizes[posterSizes.length - 1] // get the original size

  resultsArray.map((result, index) => {
    categorizedMovies[`${genres[index].name}`] = result.data.results.map(
      movie => {
        return {
          ...movie,
          poster_path: baseUrl + movie.poster_path,
          backdrop_path: baseUrl + movie.backdrop_path,
        }
      },
    )
  })

  return categorizedMovies
})

/**
 * Selectors
 */

export const selectGetMoviesStatus = (state: RootState) => state.movies.status

export const selectMovies = (state: RootState) => state.movies.data

/**
 * Reducer
 */

export default createReducer(initialState, builder => {
  builder.addCase(getMoviesByGenres.fulfilled, (state, { payload }) => {
    state.status = 'fulfilled'
    state.data = payload
  })
  builder.addCase(getMoviesByGenres.pending, state => {
    state.status = 'loading'
  })
  builder.addCase(getMoviesByGenres.rejected, state => {
    state.status = 'error'
  })
})
