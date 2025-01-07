CREATE TABLE IF NOT EXISTS "workouts" (
  "id" SERIAL PRIMARY KEY,
  "type" TEXT NOT NULL,
  "duration" INTEGER NOT NULL,
  "date" TIMESTAMP NOT NULL,
  "user_id" UUID NOT NULL
);