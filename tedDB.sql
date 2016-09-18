-- MySQL dump 10.13  Distrib 5.7.15, for Linux (x86_64)
--
-- Host: localhost    Database: tedDB
-- ------------------------------------------------------
-- Server version	5.7.13-0ubuntu0.16.04.2

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
-- Table structure for table `Bid`
--

DROP TABLE IF EXISTS `Bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Bid` (
  `idBid` int(11) NOT NULL AUTO_INCREMENT,
  `idItem` int(11) NOT NULL,
  `idBidder` int(11) NOT NULL,
  `amount` float NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idBid`),
  UNIQUE KEY `idBid_UNIQUE` (`idBid`),
  KEY `fk_Bid_Item_idx` (`idItem`),
  KEY `fk_Bid_User1_idx` (`idBidder`),
  CONSTRAINT `fk_Bid_Item` FOREIGN KEY (`idItem`) REFERENCES `Item` (`idItem`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Bid_User1` FOREIGN KEY (`idBidder`) REFERENCES `User` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11351 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Category` (
  `idCategory` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`idCategory`),
  UNIQUE KEY `idCategory_UNIQUE` (`idCategory`)
) ENGINE=InnoDB AUTO_INCREMENT=19845 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Image`
--

DROP TABLE IF EXISTS `Image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Image` (
  `idImage` int(11) NOT NULL AUTO_INCREMENT,
  `image` blob NOT NULL,
  PRIMARY KEY (`idImage`),
  UNIQUE KEY `idImage_UNIQUE` (`idImage`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Item`
--

DROP TABLE IF EXISTS `Item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Item` (
  `idItem` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `buy_price` varchar(45) DEFAULT NULL,
  `first_bid` varchar(45) DEFAULT NULL,
  `currently` varchar(45) DEFAULT NULL,
  `number_of_bids` int(11) NOT NULL,
  `idLocation` int(11) NOT NULL,
  `started` timestamp NULL DEFAULT NULL,
  `ends` timestamp NULL DEFAULT NULL,
  `description` longtext NOT NULL,
  `idImage` int(11) DEFAULT NULL,
  `idSeller` int(11) NOT NULL,
  PRIMARY KEY (`idItem`),
  UNIQUE KEY `idItem_UNIQUE` (`idItem`),
  KEY `fk_Item_Location1_idx` (`idLocation`),
  KEY `fk_Item_Image1_idx` (`idImage`),
  KEY `fk_Item_User1_idx` (`idSeller`),
  CONSTRAINT `fk_Item_Image1` FOREIGN KEY (`idImage`) REFERENCES `Image` (`idImage`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Item_Location1` FOREIGN KEY (`idLocation`) REFERENCES `Location` (`idLocation`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Item_User1` FOREIGN KEY (`idSeller`) REFERENCES `User` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4327 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ItemCategory`
--

DROP TABLE IF EXISTS `ItemCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ItemCategory` (
  `idItem` int(11) NOT NULL,
  `idCategory` int(11) NOT NULL,
  PRIMARY KEY (`idItem`,`idCategory`),
  KEY `fk_Item_has_Category_Category1_idx` (`idCategory`),
  KEY `fk_Item_has_Category_Item1_idx` (`idItem`),
  CONSTRAINT `fk_Item_has_Category_Category1` FOREIGN KEY (`idCategory`) REFERENCES `Category` (`idCategory`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Item_has_Category_Item1` FOREIGN KEY (`idItem`) REFERENCES `Item` (`idItem`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Location`
--

DROP TABLE IF EXISTS `Location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Location` (
  `idLocation` int(11) NOT NULL AUTO_INCREMENT,
  `country` varchar(45) NOT NULL,
  `city` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `postal_code` int(11) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idLocation`),
  UNIQUE KEY `idLocation_UNIQUE` (`idLocation`)
) ENGINE=InnoDB AUTO_INCREMENT=20064 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Message`
--

DROP TABLE IF EXISTS `Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Message` (
  `idMessage` int(11) NOT NULL AUTO_INCREMENT,
  `idSender` int(11) NOT NULL,
  `idReceiver` int(11) NOT NULL,
  `message` longtext,
  `read` tinyint(1) NOT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `deleted_by_receiver` tinyint(1) DEFAULT NULL,
  `deleted_by_sender` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idMessage`),
  UNIQUE KEY `idMessage_UNIQUE` (`idMessage`),
  KEY `fk_User_has_User_User2_idx` (`idReceiver`),
  KEY `fk_User_has_User_User1_idx` (`idSender`),
  CONSTRAINT `fk_User_has_User_User1` FOREIGN KEY (`idSender`) REFERENCES `User` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_User_User2` FOREIGN KEY (`idReceiver`) REFERENCES `User` (`idUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `idUser` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` int(11) NOT NULL,
  `afm` varchar(45) NOT NULL,
  `rating_bidder` float DEFAULT NULL,
  `rating_seller` float DEFAULT NULL,
  `admin` tinyint(1) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `idLocation` int(11) NOT NULL,
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `idUser_UNIQUE` (`idUser`),
  KEY `fk_User_Location1_idx` (`idLocation`),
  CONSTRAINT `fk_User_Location1` FOREIGN KEY (`idLocation`) REFERENCES `Location` (`idLocation`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15697 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-09-18 12:38:35
