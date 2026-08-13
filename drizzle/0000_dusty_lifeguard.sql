CREATE TABLE `assessments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subject_id` int NOT NULL,
	`title` varchar(150) NOT NULL,
	`score` int,
	`max_score` int,
	`taken_at` timestamp DEFAULT (now()),
	CONSTRAINT `assessments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `exercise_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`exercise_name` varchar(100) NOT NULL,
	`sets` int NOT NULL,
	`reps` int NOT NULL,
	`session_type` enum('morning','post_nap') NOT NULL,
	`logged_at` timestamp DEFAULT (now()),
	CONSTRAINT `exercise_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `meals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`meal_type` enum('breakfast','lunch','dinner','snack') NOT NULL,
	`description` text NOT NULL,
	`suggested_by_ai` boolean DEFAULT false,
	`logged_at` timestamp DEFAULT (now()),
	CONSTRAINT `meals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `routine_blocks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`label` varchar(100) NOT NULL,
	`day_of_week` enum('mon','tue','wed','thu','fri','sat','sun') NOT NULL,
	`start_time` varchar(5) NOT NULL,
	`end_time` varchar(5) NOT NULL,
	`category` enum('school','coding','drawing','exercise','meal','sleep','freelance','other') NOT NULL,
	`active_during_school` boolean DEFAULT true,
	CONSTRAINT `routine_blocks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `skill_practice` (
	`id` int AUTO_INCREMENT NOT NULL,
	`skill_type` enum('coding','drawing') NOT NULL,
	`topic` varchar(150) NOT NULL,
	`stage` enum('learn','apply','test','drill') NOT NULL,
	`passed` boolean,
	`notes` text,
	`logged_at` timestamp DEFAULT (now()),
	CONSTRAINT `skill_practice_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subjects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`current_grade` varchar(5),
	CONSTRAINT `subjects_id` PRIMARY KEY(`id`)
);
