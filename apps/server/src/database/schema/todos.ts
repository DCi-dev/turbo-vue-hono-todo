import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todo', {
	id: integer('id').unique().primaryKey({ autoIncrement: true }),
	title: text('title').notNull(),
	description: text('description'),
	done: integer('done', { mode: 'boolean' }),
	createdAt: text('created_at').default(sql`datetime('now')`),
});
