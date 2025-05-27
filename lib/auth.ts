// Token management
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

export const setToken = (token: string): void => {
  localStorage.setItem('token', token)
}

export const removeToken = (): void => {
  localStorage.removeItem('token')
}

// Authentication check
export const isAuthenticated = (): boolean => {
  return !!getToken()
}

// Authenticated fetch wrapper
export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getToken()
  
  if (!token) {
    throw new Error('No authentication token found')
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  // If we get a 401, the token is invalid or expired
  if (response.status === 401) {
    removeToken()
    window.location.href = '/auth/login'
    throw new Error('Authentication token expired')
  }

  return response
} 