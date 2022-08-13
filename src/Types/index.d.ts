type NetworkStatus = 'fulfilled' | 'loading' | 'error'

interface Movie {
  id: number
  title: string
  poster_path?: string
}

interface Genre {
  id: number
  name: string
}
