import { pgTable, serial, text, integer, timestamp, uuid } from 'drizzle-orm/pg-core';

export const workouts = pgTable('workouts', {
  id: serial('id').primaryKey(),
  type: text('type').notNull(),
  duration: integer('duration').notNull(),
  date: timestamp('date').notNull(),
  userId: uuid('user_id').notNull(),
});