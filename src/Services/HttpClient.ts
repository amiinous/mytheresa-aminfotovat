import axios from 'axios'
import handleError from '@/Services/HandleError'
import { Config } from '@/Config'
import { setupCache, buildMemoryStorage } from 'axios-cache-interceptor'
const storage = buildMemoryStorage()

const CACHE_TTL = 1000 * 1 * 1
const TIMEOUT = 3000

function addApiKeytoUrl(url: string, apiKey: string) {
  return url + `${url.includes('?') ? '&' : '?'}api_key=${apiKey}`
}

const instance = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: TIMEOUT,
})

instance.interceptors.request.use(request => {
  if (request.url)
    return { ...request, url: addApiKeytoUrl(request.url, Config.API_KEY) }
  else return request
})

instance.interceptors.response.use(
  response => response,
  ({ message }) => {
    return handleError({ message })
  },
)

export default setupCache(instance, { ttl: CACHE_TTL, storage })
