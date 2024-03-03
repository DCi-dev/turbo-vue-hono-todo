import ApiService from './api'
import type { CreateTodoType } from './schemas'

export async function getTodos(): Promise<Todo[]> {
  return (await ApiService.fetchData({ url: '/todo', method: 'GET' })) as unknown as Todo[]
}

export async function getTodoById(id: Todo['id']): Promise<Todo> {
  return ApiService.fetchData({
    url: `/todo/${id}`,
    method: 'GET'
  }) as unknown as Todo
}

export async function createTodo(data: CreateTodoType) {
  return ApiService.fetchData({
    url: '/todo',
    method: 'post',
    data
  })
}

export async function updateTodo(data: Todo) {
  return ApiService.fetchData({
    url: `/todo/${data.id}`,
    method: 'put',
    data
  })
}

export async function deleteTodo(id: Todo['id']) {
  return ApiService.fetchData({
    url: `/todo/${id}`,
    method: 'delete'
  })
}
