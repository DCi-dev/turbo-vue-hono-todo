import { z } from 'zod';

const GetTodo = z.object({
	id: z.string(),
});

type GetTodoType = z.infer<typeof GetTodo>;

export { GetTodo, GetTodoType };
