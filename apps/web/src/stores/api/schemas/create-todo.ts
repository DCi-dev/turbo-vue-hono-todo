import { z } from 'zod'

export const CreateTodo = z.object({
  title: z.string(),
  description: z.string().optional()
})

export type CreateTodoType = z.infer<typeof CreateTodo>
