import api from './api'

export async function listMembers(search = '') {
  const response = await api.get('/members', { params: search ? { search } : {} })
  return response.data
}

export async function createMember(payload) {
  const response = await api.post('/members', payload)
  return response.data
}
