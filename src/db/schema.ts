import { mysqlTable, varchar, int, timestamp, boolean, text, mysqlEnum } from "drizzle-orm/mysql-core";

export const routineBlocks = mysqlTable("routine_blocks", {
  id: int("id").autoincrement().primaryKey(),
  label: varchar("label", { length: 100 }).notNull(),
  dayOfWeek: mysqlEnum("day_of_week", ["mon","tue","wed","thu","fri","sat","sun"]).notNull(),
  startTime: varchar("start_time", { length: 5 }).notNull(),
  endTime: varchar("end_time", { length: 5 }).notNull(),
  category: mysqlEnum("category", ["school","coding","drawing","exercise","meal","sleep","freelance","other"]).notNull(),
  activeDuringSchool: boolean("active_during_school").default(true),
});

export const exerciseLogs = mysqlTable("exercise_logs", {
  id: int("id").autoincrement().primaryKey(),
  exerciseName: varchar("exercise_name", { length: 100 }).notNull(),
  sets: int("sets").notNull(),
  reps: int("reps").notNull(),
  sessionType: mysqlEnum("session_type", ["morning","post_nap"]).notNull(),
  loggedAt: timestamp("logged_at").defaultNow(),
});

export const skillPractice = mysqlTable("skill_practice", {
  id: int("id").autoincrement().primaryKey(),
  skillType: mysqlEnum("skill_type", ["coding","drawing"]).notNull(),
  topic: varchar("topic", { length: 150 }).notNull(),
  stage: mysqlEnum("stage", ["learn","apply","test","drill"]).notNull(),
  passed: boolean("passed"),
  notes: text("notes"),
  loggedAt: timestamp("logged_at").defaultNow(),
});

export const subjects = mysqlTable("subjects", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  currentGrade: varchar("current_grade", { length: 5 }),
});

export const assessments = mysqlTable("assessments", {
  id: int("id").autoincrement().primaryKey(),
  subjectId: int("subject_id").notNull(),
  title: varchar("title", { length: 150 }).notNull(),
  score: int("score"),
  maxScore: int("max_score"),
  takenAt: timestamp("taken_at").defaultNow(),
});

export const meals = mysqlTable("meals", {
  id: int("id").autoincrement().primaryKey(),
  mealType: mysqlEnum("meal_type", ["breakfast","lunch","dinner","snack"]).notNull(),
  description: text("description").notNull(),
  suggestedByAi: boolean("suggested_by_ai").default(false),
  loggedAt: timestamp("logged_at").defaultNow(),
});

export const topics = mysqlTable("topics", {
  id: int("id").autoincrement().primaryKey(),
  subjectId: int("subject_id").notNull(),
  name: varchar("name", { length: 150 }).notNull(),
  masteryLevel: int("mastery_level").default(0),
});

export const quizAttempts = mysqlTable("quiz_attempts", {
  id: int("id").autoincrement().primaryKey(),
  topicId: int("topic_id").notNull(),
  question: text("question").notNull(),
  correct: boolean("correct"),
  attemptedAt: timestamp("attempted_at").defaultNow(),
});
