CREATE TABLE `Users` (
	`user_id` INT NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(255) UNIQUE NOT NULL,
	`password_hash` VARCHAR(255) NOT NULL,
	`first_name` VARCHAR(255) NOT NULL,
	`last_name` VARCHAR(255) NOT NULL,
	`graduation_year` INT,
	`email` VARCHAR(255),
	PRIMARY KEY (`user_id`)
);

CREATE TABLE `Tokens` (
    `token_id` VARCHAR(255) NOT NULL,
    `expires_in` DATETIME NOT NULL,
    `user_id` INT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`),
    PRIMARY KEY (`token_id`)
);

CREATE TABLE `Groups` (
	`group_id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`description` TEXT NOT NULL,
	PRIMARY KEY (`group_id`)
);

CREATE TABLE `Assignments` (
	`assignment_id` INT NOT NULL AUTO_INCREMENT,
	`deadline` DATETIME NOT NULL,
	`text` TEXT NOT NULL,
	PRIMARY KEY (`assignment_id`)
);

CREATE TABLE `Roles` (
	`role_id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`description` TEXT NOT NULL,
	PRIMARY KEY (`role_id`)
);

CREATE TABLE `Permissions` (
	`permission_id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`description` TEXT NOT NULL,
	`type` INT NOT NULL,
	PRIMARY KEY (`permission_id`)
);

CREATE TABLE `Attachments` (
	`attachment_id` INT NOT NULL AUTO_INCREMENT,
	`file_path` TEXT NOT NULL,
	`file_type` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`attachment_id`)
);

CREATE TABLE `PublicGroups` (
	`group_id` INT NOT NULL,
	`default_role_id` INT NOT NULL,
        FOREIGN KEY (`group_id`) REFERENCES `Groups`(`group_id`),
        FOREIGN KEY (`default_role_id`) REFERENCES `Roles`(`role_id`)
);

CREATE TABLE `TemporaryRoles` (
	`expiry_date` DATETIME NOT NULL,
	`role_id` INT NOT NULL,
	FOREIGN KEY (`role_id`) REFERENCES `Roles`(`role_id`)
);

CREATE TABLE `RecurringAssignments` (
	`interval` INT NOT NULL,
	`assignment_id` INT NOT NULL,
	FOREIGN KEY (`assignment_id`) REFERENCES `Assignments`(`assignment_id`)
);

CREATE TABLE `DelayedAssignments` (
	`publication_date` DATETIME NOT NULL,
	`assignment_id` INT NOT NULL,
	FOREIGN KEY (`assignment_id`) REFERENCES `Assignments`(`assignment_id`)
);

CREATE TABLE `User_MEMBER_OF_Group` (
	`user_id` INT NOT NULL,
	`group_id` INT NOT NULL,
	PRIMARY KEY (`user_id`, `group_id`),
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`),
	FOREIGN KEY (`group_id`) REFERENCES `Groups`(`group_id`)
);

CREATE TABLE `Assignment_CREATED_BY_User` (
	`user_id` INT NOT NULL,
	`assignment_id` INT NOT NULL UNIQUE,
	`timestamp` TIMESTAMP NOT NULL,
	PRIMARY KEY (`user_id`, `assignment_id`),
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`),
	FOREIGN KEY (`assignment_id`) REFERENCES `Assignments`(`assignment_id`)
);

CREATE TABLE `User_HAS_COMPLETED_Assignment` (
	`user_id` INT NOT NULL,
	`assignment_id` INT NOT NULL,
	`timestamp` TIMESTAMP NOT NULL,
	PRIMARY KEY (`user_id`, `assignment_id`),
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`),
	FOREIGN KEY (`assignment_id`) REFERENCES `Assignments`(`assignment_id`)
);


CREATE TABLE `Assignment_HAS_Attachment` (
	`assignment_id` INT NOT NULL,
	`attachment_id` INT NOT NULL UNIQUE,
	PRIMARY KEY (`assignment_id`, `attachment_id`),
	FOREIGN KEY (`assignment_id`) REFERENCES `Assignments`(`assignment_id`),
	FOREIGN KEY (`attachment_id`) REFERENCES `Attachments`(`attachment_id`)
);

CREATE TABLE `Assignment_RELATES_TO_Group` (
	`assignment_id` INT NOT NULL UNIQUE,
	`group_id` INT NOT NULL,
	PRIMARY KEY (`assignment_id`, `group_id`),
	FOREIGN KEY (`assignment_id`) REFERENCES `Assignments`(`assignment_id`),
	FOREIGN KEY (`group_id`) REFERENCES `Groups`(`group_id`)
);

CREATE TABLE `Role_INCLUDES_Permission` (
	`role_id` INT NOT NULL,
	`permission_id` INT NOT NULL,
	PRIMARY KEY (`role_id`, `permission_id`),
	FOREIGN KEY (`role_id`) REFERENCES `Roles`(`role_id`),
	FOREIGN KEY (`permission_id`) REFERENCES `Permissions`(`permission_id`)
);

CREATE TABLE `Role_RELATES_TO_Group` (
	`role_id` INT NOT NULL,
	`group_id` INT NOT NULL,
	PRIMARY KEY (`role_id`, `group_id`),
	FOREIGN KEY (`role_id`) REFERENCES `Roles`(`role_id`),
	FOREIGN KEY (`group_id`) REFERENCES `Groups`(`group_id`)
);

CREATE TABLE `User_HAS_Role` (
	`user_id` INT NOT NULL,
	`role_id` INT NOT NULL,
	PRIMARY KEY (`user_id`, `role_id`),
	FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`),
	FOREIGN KEY (`role_id`) REFERENCES `Roles`(`role_id`)
);

