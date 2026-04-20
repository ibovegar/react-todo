import { fetcher } from '../api-client'
import { tagApi } from './tag-api'

export function createTagApi({ request }: { request: Request }) {
  const baseUrl = process.env.API_BASE_URL ?? ''
  return tagApi(fetcher(`${baseUrl}/api`, request))
}
