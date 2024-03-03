import { z } from 'zod'

export const UpdateTodo = z.object({
  id: z.number(),
  title: z.string().optional(),
  description: z.string().optional(),
  done: z.boolean().default(false).optional()
})

export type UpdateTodoType = z.infer<typeof UpdateTodo>
