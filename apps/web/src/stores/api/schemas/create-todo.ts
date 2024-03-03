import { z } from 'zod'

export const CreateTodo = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  description: z
    .string()
    .max(1000, { message: 'Description must be at most 1000 characters long' })
    .optional()
})

export type CreateTodoType = z.infer<typeof CreateTodo>
