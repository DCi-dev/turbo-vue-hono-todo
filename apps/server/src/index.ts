import { Hono } from 'hono';
import todo from './todo';

const app = new Hono();

app.get('/', (c) => {
	// I'm a tea pot response

	return c.json({ message: "I'm a tea pot" }, 418);
});

app.route('/todo', todo);

export default app;
