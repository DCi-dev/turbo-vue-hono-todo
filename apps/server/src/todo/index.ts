import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono';
import { db } from '../database';
import { todos } from '../database/schema/todos';
import { CreateTodo, GetTodo, UpdateTodo } from './types';

const app = new Hono();

app.get('/', async (c) => {
	const dbTodos = await db.select().from(todos);

	return c.json(dbTodos);
});

// TODOs CRUD
app.post(
	'/',
	zValidator('json', CreateTodo, async (result, c) => {
		if (!result.success) {
			return c.text('Invalid!', 400);
		}

		const response = await db.insert(todos).values(result.data);

		return c.json(result.data);
	})
);

app.get(
	'/:id',
	zValidator('param', GetTodo, async (result, c) => {
		if (!result.success) {
			return c.text('Invalid!', 400);
		}

		const todo = await db.select().from(todos);

		console.log('todo', todo);

		return c.json(todo);
	})
);

app.put(
	'/:id',
	zValidator('json', UpdateTodo, async (result, c) => {
		if (!result.success) {
			return c.text('Invalid!', 400);
		}

		const { id } = c.req.param() as { id: number };

		if (!id || isNaN(id)) {
			return c.text('Invalid!', 400);
		}

		await db
			.update(todos)
			.set(result.data)
			.where(eq(todos.id, Number(id) as unknown as number));

		return c.json(result.data);
	})
);

app.delete(
	'/:id',
	zValidator('param', GetTodo, async (result, c) => {
		if (!result.success) {
			return c.text('Invalid!', 400);
		}

		const id = result.data.id;

		const deleteTodo = await db
			.delete(todos)
			.where(eq(todos.id, id as unknown as number));

		return c.json(result.data);
	})
);

export default app;
