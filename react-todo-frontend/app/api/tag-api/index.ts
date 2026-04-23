import { tagApi } from './tag-api'

import { createApiClient } from '~/api'

export function createTagApi({ request }: { request: Request }) {
  const baseUrl = process.env.API_BASE_URL ?? ''
  return tagApi(createApiClient(baseUrl, request))
}
