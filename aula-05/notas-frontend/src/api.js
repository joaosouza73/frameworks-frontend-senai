const apiBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '')

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    })
  } catch {
    throw new Error('Não foi possível conectar à API. Confira o endereço e tente novamente.')
  }

  if (response.status === 204) return null

  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(payload.erro || `A API respondeu com status ${response.status}.`)
  }
  return payload
}

export const notesApi = {
  list: () => request('/api/notes'),
  create: (note) => request('/api/notes', { method: 'POST', body: JSON.stringify(note) }),
  update: (id, note) => request(`/api/notes/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(note),
  }),
  remove: (id) => request(`/api/notes/${encodeURIComponent(id)}`, { method: 'DELETE' }),
}
