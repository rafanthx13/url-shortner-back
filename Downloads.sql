CREATE DATABASE  IF NOT EXISTS `url_shortner` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `url_shortner`;
-- MySQL dump 10.13  Distrib 5.7.32, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: url_shortner
-- ------------------------------------------------------
-- Server version	5.7.31-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `log_access_url`
--

DROP TABLE IF EXISTS `log_access_url`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log_access_url` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `url_id` int(11) NOT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  KEY `fk_log_access_url_1_idx` (`url_id`),
  CONSTRAINT `fk_log_access_url_1` FOREIGN KEY (`url_id`) REFERENCES `url_links` (`url_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_access_url`
--

LOCK TABLES `log_access_url` WRITE;
/*!40000 ALTER TABLE `log_access_url` DISABLE KEYS */;
INSERT INTO `log_access_url` VALUES (1,1,'2021-12-18 14:51:40'),(2,1,'2021-12-18 14:51:43'),(3,1,'2021-12-18 14:51:44'),(4,1,'2021-12-18 14:53:17'),(5,2,'2021-12-18 14:53:37'),(41,12,'2021-12-20 15:33:04'),(42,19,'2021-12-20 18:53:18');
/*!40000 ALTER TABLE `log_access_url` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `url_links`
--

DROP TABLE IF EXISTS `url_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `url_links` (
  `url_id` int(11) NOT NULL AUTO_INCREMENT,
  `actual_url` varchar(255) NOT NULL,
  `go_to_url` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT '0',
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`url_id`),
  UNIQUE KEY `go_to_url_UNIQUE` (`go_to_url`),
  KEY `fk_url_links_1_idx` (`user_id`),
  CONSTRAINT `fk_url_links_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `url_links`
--

LOCK TABLES `url_links` WRITE;
/*!40000 ALTER TABLE `url_links` DISABLE KEYS */;
INSERT INTO `url_links` VALUES (1,'youtube','http://youtube.com',1,1,'2021-12-20 16:32:40'),(2,'google','http://youtube.com/43242',2,4,'2021-12-20 16:32:40'),(3,'linkedin','https://google.com',1,2,'2021-12-20 16:32:40'),(5,'insomia','https://insomnia.rest/download',1,10,'2021-12-20 16:32:40'),(6,'nao-eh-git','https://github.com/Joabsonlg/',1,5,'2021-12-20 16:32:40'),(7,'radar64','http://www.radar64.com/home.php',2,6,'2021-12-20 16:32:40'),(9,'re','http://a4u.com.br/',1,8,'2021-12-20 16:32:40'),(12,'https://www.cyberciti.biz/faq/unix-linux-check-if-port-is-in-use-command/','GCX6t',7,5,'2021-12-20 16:32:40'),(18,'frontURL','Wlrbz',NULL,6,'2021-12-20 16:32:40'),(19,'https://v3.vuejs.org/guide/class-and-style.html#object-syntax','ROxD0',NULL,0,'2021-12-20 18:52:46'),(20,'alfa-omega-2','d7oVP',NULL,0,'2021-12-20 19:08:01'),(21,'omega-tera-1','nsbTm',NULL,0,'2021-12-20 19:10:37');
/*!40000 ALTER TABLE `url_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'rafan10','crowthunder','rafaassis15@gmail.com','2021-11-01 03:00:00','ADMIN'),(2,'rafan20','silverthunder','alfa@gmail.com','2021-11-02 03:00:00','USER'),(3,'rafan25','$2b$10$SjK3lE/2zlaL8jPGvFjKQuSNoddZY3rmSdv.LUrrekWE7TYeHYG4O','rafa@gmail.com','2021-12-18 15:15:42',NULL),(4,'rafan12','$2b$10$.MlogleRnX/CkDU0.aCu8.wKEALTVHxfAHSZxhLcrm8XNFyGrF/z.','rafa-421421@gmail.com','2021-12-18 19:27:31',NULL),(5,'rafan13','$2b$10$zfY.mwIl5RoZO2V/f9548Olg48m68P9Sp.bsg6lslRl0YilArrv8O','rafa-4214251@gmail.com','2021-12-18 19:29:16',NULL),(6,'rafan14','$2b$10$f0FzmQF1WA86gZRk0NhJxebcyP07aVD3e96x3/xBCNhkSdsoCYZp2','rafa-42142541@gmail.com','2021-12-18 19:30:14',NULL),(7,'rafan15','$2b$10$8Z5wxon3qId562CiG3Kbp.Y/E1umqJLdR.uzr6HhUpvh/uJWwZgEq','crowthunder@gmail.com','2021-12-18 19:37:50',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-20 19:22:02
