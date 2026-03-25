const BASE_URL = 'http://localhost:3001'

export const api = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(BASE_URL + url)
    
    if (!response.ok) {
      throw new Error(`GET ${url}: ${response.status} ${response.statusText}`)
    }
    
    return await response.json()
  },

  post: async <TResponse, TBody>(url: string, data: TBody): Promise<TResponse> => {
    const response = await fetch(BASE_URL + url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      throw new Error(`POST ${url}: ${response.status} ${response.statusText}`)
    }
    
    return await response.json()
  },

  delete: async (url: string): Promise<void> => {
    const response = await fetch(BASE_URL + url, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error(`DELETE ${url}: ${response.status} ${response.statusText}`)
    }
  },
}