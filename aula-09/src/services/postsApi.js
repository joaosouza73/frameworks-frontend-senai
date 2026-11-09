const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com').replace(/\/$/, '')

async function requestJSON(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options)

  if (!response.ok) {
    throw new Error(`A API respondeu com o status ${response.status}.`)
  }

  return response.json()
}

export function getPosts({ limit = 12, signal } = {}) {
  return requestJSON(`/posts?_limit=${limit}`, { signal })
}

export function getPost(postId, { signal } = {}) {
  return requestJSON(`/posts/${encodeURIComponent(postId)}`, { signal })
}

export function getComments(postId, { signal } = {}) {
  return requestJSON(`/posts/${encodeURIComponent(postId)}/comments`, { signal })
}

export function createPost(post) {
  return requestJSON('/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(post),
  })
}
