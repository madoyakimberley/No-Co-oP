CREATE TABLE `quiz_attempts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`topic_id` int NOT NULL,
	`question` text NOT NULL,
	`correct` boolean,
	`attempted_at` timestamp DEFAULT (now()),
	CONSTRAINT `quiz_attempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `topics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subject_id` int NOT NULL,
	`name` varchar(150) NOT NULL,
	`mastery_level` int DEFAULT 0,
	CONSTRAINT `topics_id` PRIMARY KEY(`id`)
);
