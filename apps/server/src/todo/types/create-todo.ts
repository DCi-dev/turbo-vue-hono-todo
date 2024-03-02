import { z } from 'zod';

const CreateTodo = z.object({
	title: z.string(),
	description: z.string().optional(),
});

type CreateTodoType = z.infer<typeof CreateTodo>;

export { CreateTodo, CreateTodoType };
