import { z } from 'zod'

export const UpdateTodo = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  done: z.boolean().default(false)
})

export type UpdateTodoType = z.infer<typeof UpdateTodo>
