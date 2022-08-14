type NetworkStatus = 'fulfilled' | 'loading' | 'error'

interface Movie {
  id: number
  title: string
  poster_path?: string
  backdrop_path?: string
  overview?: string
  release_date?: string
  vote_average?: number
  vote_count?: number
}

interface Genre {
  id: number
  name: string
}
