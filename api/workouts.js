import { authenticateUser } from './_apiUtils.js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { workouts } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';

const sql = postgres(process.env.COCKROACH_DB_URL);
const db = drizzle(sql);

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);

    if (req.method === 'GET') {
      const result = await db.select()
        .from(workouts)
        .where(eq(workouts.userId, user.id))
        .orderBy(workouts.date.desc())
        .limit(10);

      res.status(200).json(result);
    } else if (req.method === 'POST') {
      const { type, duration, date } = req.body;

      if (!type || !duration || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newWorkout = await db.insert(workouts).values({
        type,
        duration: Number(duration),
        date,
        userId: user.id,
      }).returning();

      res.status(201).json(newWorkout);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}