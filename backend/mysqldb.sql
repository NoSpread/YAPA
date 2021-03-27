-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.11-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for yapa
CREATE DATABASE IF NOT EXISTS `yapa` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `yapa`;

-- Dumping structure for table yapa.information
CREATE TABLE IF NOT EXISTS `information` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `stocks` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `movement_type` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `workplaceCity` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `workplaceCode` int(11) DEFAULT NULL,
  `workplaceStreet` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `voice` int(11) DEFAULT NULL,
  `residenceCity` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `residenceCode` int(11) DEFAULT NULL,
  `residenceStreet` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `workstart` time DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `uid_info` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table yapa.keys
CREATE TABLE IF NOT EXISTS `keys` (
  `id` int(11) NOT NULL,
  `key` varchar(500) NOT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `uid_key` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table yapa.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
