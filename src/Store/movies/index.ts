import { createAction, createAsyncThunk, createReducer } from '@reduxjs/toolkit'
import api from '@/Services/HttpClient'
import { RootState } from '..'

type CategorizedMovieList = Record<string, Movie[]>

interface MoviesState {
  data: CategorizedMovieList
  wishlist: Movie[]
  status: NetworkStatus
}

interface GetMoviesResult {
  page: number
  results: Movie[]
  total_results: number
  total_pages: number
}

export const initialState = {
  data: {},
  wishlist: [],
  status: 'loading',
} as MoviesState

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
  const baseUrl = secureBaseUrl + posterSizes[posterSizes.length - 2] // get a sizer lower than original (to make loading images faster)

  resultsArray.map((result, index) => {
    categorizedMovies[`${genres[index].name}`] = result.data.results.map(
      movie => {
        return {
          ...movie,
          poster_path: baseUrl + movie.poster_path,
          backdrop_path: baseUrl + movie.backdrop_path,
          main_category: genres[index].name,
        }
      },
    )
  })

  return categorizedMovies
})

export const addToWishlist = createAction<Movie>('Movie/addToWishlist')
export const removeFromWishlist = createAction<number>(
  'Movie/removeFromWishlist',
)

/**
 * Selectors
 */

export const selectGetMoviesStatus = (state: RootState) => state.movies.status

export const selectMovies = (state: RootState) => state.movies.data

export const selectWishlist = (state: RootState) => state.movies.wishlist

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

  builder.addCase(addToWishlist, (state, { payload: movie }) => {
    if (!state.wishlist.some(_movie => _movie.id === movie.id))
      state.wishlist.push(movie)
  })

  builder.addCase(removeFromWishlist, (state, { payload: movieId }) => {
    state.wishlist = state.wishlist.filter(movie => movie.id !== movieId)
  })
})
