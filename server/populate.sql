INSERT INTO `Users` (`username`, `password_hash`, `first_name`, `last_name`, `graduation_year`, `email`) VALUES
	("mipatov", "PasswordHashMarkIpatov", "Mark", "Ipatov", 2024, "markthehopeful@gmail.com"),
	("waleko", "PasswordHashAlexKovrigin", "Alex", "Kovrigin", 2024, "alexmail@alexkovrigin.me"),
	("petrtsv", "PasswordHashPetrTsvetkov", "Petr", "Tsvetkov", 2024, NULL),
	("kirdmivus", "PasswordHashKirillIvanov", "Kirill", "Ivanov", 2024, "k.ivanov@jacobs-university.de"),
	("mixxxa", "PasswordHashMikhailBudnikov", "Mikhail", "Budnikov", 2024, NULL),
	("kotlin", "PasswordHashKirillKarnauhov", "Kirill", "Karnauhov", 2023, "k.karnauhov@jacobs-university.de"),
	("andshein", "PasswordHashAndreyShein", "Andrei", "Shein", 2023, NULL),
	("valgol", "PasswordHashValeryGolovin", "Valery", "Golovin", 2023, "v.golovin@jacobs-university.de"),
	("p.baumann", "PasswordHashPeterBaumann", "Peter", "Baumann", NULL, "p.baumann@jacobs-university.de"),
	("öööüüüööö", "PasswordHashJürgenSchönwälder", "Jürgen", "Schönwälder", NULL, NULL);

INSERT INTO `Tokens` (`token_id`, `expires_in`, `user_id`) VALUES
    ("FakeTokenId1", "2022-11-12 23:59:59", 1),
    ("FakeTokenId2", "2022-11-07 21:52:31", 2);

INSERT INTO `Groups` (`name`, `description`) VALUES 
	("F22_CO-562-A", "Second Year 2022 Operating Systems"), 
	("F22_CO-560-A", "Second Year 2022 Databases and Web Services"), 
	("F22_JTMS-12", "Second Year 2022 Probabilities and Random Processes"),
	("F22_JTLA-1001", "German A1.1 2022"),
	("F22_JTLA-1015", "Databases Internals JetBrains");

INSERT INTO `User_MEMBER_OF_Group` (`user_id`, `group_id`) VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(2, 1),
	(2, 2),
	(2, 3),
	(2, 5),
	(3, 1),
	(3, 2),
	(3, 3),
	(3, 4),
	(4, 1),
	(4, 2),
	(4, 3),
	(4, 4),
	(4, 5),
	(5, 1),
	(5, 3),
	(5, 5),
	(6, 4),
	(6, 5),
	(7, 4),
	(7, 5),
	(8, 5),
	(9, 2),
	(10, 1);

INSERT INTO `Assignments` (`deadline`, `text`) VALUES 
	("2022-10-06 23:59:59", "DBWS Deadline for Assignment 3"),
	("2022-10-13 23:59:59", "DBWS Deadline for Assignment 4"),
	("2022-10-20 23:59:59", "DBWS Deadline for Assignment 5"),
	("2022-10-06 22:00:00", "OS  Deadline for Assignment 4"),
	("2022-10-13 22:00:00", "OS  Deadline for Assignment 5"),
	("2022-10-20 22:00:00", "OS  Deadline for Assignment 6"),
	("2022-09-26 23:59:00", "PRP Deadline for Problem Set 1"),
	("2022-10-08 09:49:00", "PRP Deadline for Problem Set 2"),
	("2022-10-08 09:45:00", "German Deadline for Previous Homework"),
	("2022-10-15 09:45:00", "German Deadline for Current Homework"),
	("2022-10-22 09:45:00", "German Deadline for Next Homework"),
	("2022-10-16 12:00:00", "Databases Internals Deadline for Current Homework"),
	("2022-10-18 12:00:00", "Databases Internals Deadline for Next Homework");

INSERT INTO `Assignment_RELATES_TO_Group` (`assignment_id`, `group_id`) VALUES 
	(1, 1),
	(2, 1),
	(3, 1),
	(4, 2),
	(5, 2),
	(6, 2),
	(7, 3),
	(8, 3),
	(9, 4),
	(10, 4),
	(11, 4),
	(12, 5),
	(13, 5);

INSERT INTO `User_HAS_COMPLETED_Assignment` (`user_id`, `assignment_id`, `timestamp`) VALUES 
	(1, 1, "2022-10-03 21:12:33"),
	(1, 2, "2022-10-13 15:31:00"),
	(1, 4, "2022-10-04 23:11:22"),
	(1, 5, "2022-10-11 12:10:00"),
	(1, 7, "2022-09-20 21:00:20"),
	(1, 8, "2022-10-04 11:00:00"),
	(2, 1, "2022-10-03 21:12:33"),
	(2, 2, "2022-10-13 15:31:00"),
	(2, 4, "2022-10-04 23:11:22"),
	(2, 5, "2022-10-11 12:10:00"),
	(2, 6, "2022-10-12 19:10:00"),
	(2, 7, "2022-09-19 11:00:20"),
	(2, 8, "2022-10-06 21:00:00"),
	(2, 12, "2022-10-15 19:38:00"),
	(3, 1, "2022-10-03 21:12:33"),
	(3, 2, "2022-10-13 15:31:00"),
	(3, 4, "2022-10-04 23:11:22"),
	(3, 7, "2022-09-19 11:00:20"),
	(3, 9, "2022-10-08 08:59:20"),
	(4, 1, "2022-10-03 21:12:33"),
	(4, 2, "2022-10-13 15:31:00"),
	(4, 4, "2022-10-05 23:11:22"),
	(4, 5, "2022-10-12 11:34:22"),
	(4, 7, "2022-09-19 11:00:20"),
	(4, 8, "2022-10-08 08:59:20"),
	(4, 9, "2022-10-04 09:35:22"),
	(4, 12, "2022-10-15 11:35:22"),
	(5, 1, "2022-10-02 23:12:33"),
	(5, 4, "2022-10-04 23:11:22"),
	(5, 5, "2022-10-11 11:34:22"),
	(5, 7, "2022-09-18 11:00:20"),
	(5, 8, "2022-10-04 08:59:20"),
	(5, 12, "2022-10-13 11:35:22"),
	(6, 9, "2022-10-03 12:32:12"),
	(6, 12, "2022-10-13 11:52:12"),
	(7, 9, "2022-10-03 22:32:12"),
	(7, 10, "2022-10-11 12:33:12"),
	(8, 12, "2022-10-12 09:15:12");


INSERT INTO `Roles` (`name`, `description`) VALUES 
	("Administrator", "Administrator of F22 562 OS"), 
	("Administrator", "Administrator of F22 560 DBWS"), 
	("Administrator", "Administrator of F22 J12 PRP"), 
	("Administrator", "Administrator of F22 001 GER"), 
	("Administrator", "Administrator of F22 015 DBI JB"), 
	("Moderator", "Moderator of F22 562 OS"), 
	("Moderator", "Moderator of F22 560 DBWS"), 
	("Moderator", "Moderator of F22 J12 PRP"), 
	("Moderator", "Moderator of F22 001 GER"), 
	("Moderator", "Moderator of F22 015 DBI JB"), 
	("Reader", "Reader of F22 562 OS"), 
	("User", "User of F22 560 DBWS"), 
	("Reader", "Reader of F22 J12 PRP"), 
	("User", "User of F22 001 GER"), 
	("Reader", "Reader of F22 015 DBI JB"),
	("Banned", "Banned from F22 001 GER"),
	("Banned", "Banned from F22 015 DBI JB");


INSERT INTO `PublicGroups` (`group_id`, `default_role_id`) VALUES
	(1, 11),
	(3, 13),
	(5, 15);

INSERT INTO `TemporaryRoles` (`expiry_date`, `role_id`) VALUES 
	("2022-10-15 23:59:59", 16), 
	("2021-10-10 12:00:00", 17);

INSERT INTO `Permissions` (`name`, `description`, `type`) VALUES 
	("CAN_CREATE", "User can create assignments", 1), 
	("CAN_MODIFY", "User can modify assignments", 2), 
	("CAN_DELETE", "User can delete assignments", 4), 
	("CAN_WATCH", "User can see the assignments", 8), 
	("CAN_DISBAND_GROUP", "User can disband the group", 16);

INSERT INTO `Attachments` (`file_path`, `file_type`) VALUES 
	("/home/mipatov/populate.sql", "application/sql"), 
	("/home/mipatov/schema.sql", "application/sql"), 
	("/home/mipatov/hw2.pdf", "application/pdf"), 
	("/home/mipatov/german.txt", "text/plain"), 
	("/home/mipatov/german.png", "image/png");

INSERT INTO `RecurringAssignments` (`interval`, `assignment_id`) VALUES 
	(7, 3), 
	(7, 6), 
	(7, 8), 
	(14, 12); 

INSERT INTO `DelayedAssignments` (`publication_date`, `assignment_id`) VALUES 
	("2022-10-16 12:00:00", 11), 
	("2022-10-16 13:00:00", 13);

INSERT INTO `Assignment_HAS_Attachment` (`assignment_id`, `attachment_id`) VALUES 
	(2, 1), 
	(2, 2), 
	(1, 3), 
	(10, 4), 
	(11, 5);

INSERT INTO `Role_RELATES_TO_Group` (`role_id`, `group_id`) VALUES 
	(1, 1), 
	(2, 2), 
	(3, 3), 
	(4, 4), 
	(5, 5), 
	(6, 1), 
	(7, 2), 
	(8, 3), 
	(9, 4), 
	(10, 5), 
	(11, 1), 
	(12, 2), 
	(13, 3), 
	(14, 4), 
	(15, 5), 
	(16, 4), 
	(17, 5);

INSERT INTO `User_HAS_Role` (`user_id`, `role_id`) VALUES 
	(1, 6), 
	(1, 7), 
	(1, 3), 
	(2, 6), 
	(2, 7), 
	(2, 8), 
	(2, 5), 
	(3, 11), 
	(3, 12), 
	(3, 13), 
	(3, 4), 
	(4, 11), 
	(4, 12), 
	(4, 13), 
	(4, 16), 
	(4, 15),
	(5, 11), 
	(5, 13), 
	(5, 15), 
	(6, 14),
	(6, 17),
	(7, 14),
	(7, 15),
	(8, 15),
	(9, 2),
	(10, 1);

INSERT INTO `Role_INCLUDES_Permission` (`role_id`, `permission_id`) VALUES 
	(1, 1),
	(1, 2),
	(1, 3),
	(1, 4),
	(1, 5),
	(2, 1),
	(2, 2),
	(2, 3),
	(2, 4),
	(2, 5),
	(3, 1),
	(3, 2),
	(3, 3),
	(3, 4),
	(3, 5),
	(4, 1),
	(4, 2),
	(4, 3),
	(4, 4),
	(4, 5),
	(5, 1),
	(5, 2),
	(5, 3),
	(5, 4),
	(5, 5),
	(6, 1),
	(6, 2),
	(6, 3),
	(6, 4),
	(7, 1),
	(7, 2),
	(7, 3),
	(7, 4),
	(8, 1),
	(8, 2),
	(8, 3),
	(8, 4),
	(9, 1),
	(9, 2),
	(9, 3),
	(9, 4),
	(10, 1),
	(10, 2),
	(10, 3),
	(10, 4),
	(11, 4),
	(12, 1),
	(12, 4),
	(13, 4),
	(14, 1),
	(14, 4),
	(15, 4);

INSERT INTO `Assignment_CREATED_BY_User` (`user_id`, `assignment_id`, `timestamp`) VALUES 
	(9, 1, "2022-10-01 01:00:00"), 
	(9, 2, "2022-10-07 02:01:00"), 
	(9, 3, "2022-10-14 03:02:00"), 
	(10, 4, "2022-10-01 04:34:00"), 
	(10, 5, "2022-10-07 05:34:00"), 
	(10, 6, "2022-10-14 06:34:00"), 
	(1, 7, "2022-09-21 07:34:00"), 
	(2, 8, "2022-09-30 08:34:00"), 
	(6, 9, "2022-10-01 09:34:00"), 
	(4, 10, "2022-10-08 10:34:00"), 
	(3, 11, "2022-10-11 11:34:00"), 
	(3, 12, "2022-10-11 12:34:00"), 
	(3, 13, "2022-10-12 13:34:00");

