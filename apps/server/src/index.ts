import { Hono } from 'hono';
import { cors } from 'hono/cors';
import todo from './todo';

const corsOptions = {
	origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type'],
};

const app = new Hono();

app.use(cors(corsOptions));

app.get('/', (c) => {
	// I'm a tea pot response

	return c.json({ message: "I'm a tea pot" }, 418);
});

app.route('/todo', todo);

export default app;
