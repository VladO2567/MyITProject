CREATE DATABASE `paywave` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(300) NOT NULL,
  `profilePic` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `models` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `payName` varchar(45) NOT NULL,
  `recName` varchar(150) NOT NULL,
  `bankNum` int NOT NULL,
  `accNum` int NOT NULL,
  `payRefNum` varchar(45) NOT NULL,
  `payDesc` varchar(300) NOT NULL,
  `payImg` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `modelId` int NOT NULL,
  `recName` varchar(150) NOT NULL,
  `bankNum` int NOT NULL,
  `accNum` int NOT NULL,
  `payRefNum` varchar(45) NOT NULL,
  `payDesc` varchar(300) NOT NULL,
  `payAmount` decimal(10,2) NOT NULL,
  `payedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `userId_idx` (`userId`),
  KEY `modelId_idx` (`modelId`),
  CONSTRAINT `modelId` FOREIGN KEY (`modelId`) REFERENCES `models` (`id`),
  CONSTRAINT `payUserId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


