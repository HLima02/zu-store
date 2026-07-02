const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://dummyjson.com'


export async function http<T>( path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers},
    ...options
  })

  if(!res.ok) throw new Error(`Erro ${res.status} ao buscar ${path}`)

  return res.json() as Promise<T>
}