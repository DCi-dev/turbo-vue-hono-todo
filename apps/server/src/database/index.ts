import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';

const sqlite = new Database('./src/database/sqlite.db', { create: true });
const db = drizzle(sqlite);

// Create a todo table
const createTodoTable = sqlite.query(`create table  if not exists todo (
	id integer primary key autoincrement,
	title text not null,
	description text,
	done integer,
	created_at text default (datetime('now'))
)`);

createTodoTable.run();

export { db };
