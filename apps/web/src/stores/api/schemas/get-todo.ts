import { z } from 'zod'

export const GetTodo = z.object({
  id: z.string()
})

export type GetTodoType = z.infer<typeof GetTodo>
