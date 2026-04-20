export type Fetcher = <T>(url: string, options?: RequestInit) => Promise<T>

export const fetcher =
  (baseUrl: string, _request: Request): Fetcher =>
  async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    // TODO: Extract auth token from _request when authentication is implemented
    // const token = getAuthToken(_request)

    const res = await fetch(`${baseUrl}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    })

    if (!res.ok) {
      throw new Response(res.statusText, { status: res.status })
    }

    if (res.status === 204) {
      return undefined as T
    }

    return res.json() as T
  }
