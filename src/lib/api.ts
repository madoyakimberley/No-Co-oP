export async function apiFetch(url: string, options: RequestInit = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "x-api-key": process.env.NEXT_PUBLIC_APP_SECRET || "",
    },
  });
}
