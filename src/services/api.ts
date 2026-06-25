const BASE_URL = 'https://dummyjson.com';

export async function getResource<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}
