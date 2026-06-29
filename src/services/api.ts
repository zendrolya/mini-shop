const BASE_URL = 'https://dummyjson.com';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function getResource<T>(
  path: string,
  signal?: AbortSignal
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, { signal });
  if (!response.ok) {
    const message = response.statusText || `Ошибка ${response.status}`;
    throw new ApiError(response.status, message);
  }
  return response.json() as Promise<T>;
}
