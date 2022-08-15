type NetworkStatus = 'fulfilled' | 'loading' | 'error'

type MainCategory = 'Action' | 'Horror' | 'Animation'

interface Movie {
  id: number
  title: string
  poster_path?: string
  backdrop_path?: string
  overview?: string
  release_date?: string
  vote_average?: number
  vote_count?: number
  main_category: MainCategory
}

interface Genre {
  id: number
  name: MainCategory
}
