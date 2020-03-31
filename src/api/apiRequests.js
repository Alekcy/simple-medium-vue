import { apiUrl } from '@/apiConfig.js'

export async function getUserByEmail(email) {
  const res = await fetch(`${apiUrl}/users?login=${email}`)
  return await res.json()
}

export async function getPosts(page, postsPerPage) {
  const res = await fetch(`${apiUrl}/posts?_page=${page}&_limit=${postsPerPage}`)
  let totalPosts = 0;
  for (let pair of res.headers.entries()) {
      if (pair[0] === 'x-total-count') {
        totalPosts = pair[1]
      }
    }
  return {
    posts: await res.json(),
    totalPosts,
  }
}

export async function getPostById(id) {
  return await fetch(`${apiUrl}/posts/${id}`)
}

export async function createPost(data) {
  return await fetch(`${apiUrl}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export async function changePost(id, data) {
  return await fetch(`${apiUrl}/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
}

export async function deletePost(id) {
  return await fetch(`${apiUrl}/posts/${id}`, {method: 'DELETE'})
}

export async function postClapRequest(id, claps) {
  const res = await fetch(`${apiUrl}/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      claps: claps
    })
  })
  return await res.json()
}
