declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type MovieDetailsParams = {
  movie: Movie
}

export type RootStackParamList = {
  Home: undefined
  MovieDetails: MovieDetailsParams
  Wishlist: undefined
}

export type AppScreenNames = keyof RootStackParamList
