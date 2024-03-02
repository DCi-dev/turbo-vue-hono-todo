import { z } from 'zod';

const UpdateTodo = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	done: z.boolean().default(false),
});

type UpdateTodoType = z.infer<typeof UpdateTodo>;

export { UpdateTodo, UpdateTodoType };
