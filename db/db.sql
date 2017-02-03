-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema minecraft
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `minecraft` ;

-- -----------------------------------------------------
-- Schema minecraft
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `minecraft` DEFAULT CHARACTER SET utf8 ;
USE `minecraft` ;

-- -----------------------------------------------------
-- Table `minecraft`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `minecraft`.`users` ;

CREATE TABLE IF NOT EXISTS `minecraft`.`users` (
  `userid` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(64) NOT NULL,
  `lastname` VARCHAR(64) NOT NULL,
  `email` VARCHAR(64) NOT NULL,
  `serverprops` TEXT(20000) NOT NULL,
  `port` INT NULL,
  `address` VARCHAR(45) NULL,
  `created_timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE INDEX `address_UNIQUE` (`address` ASC))
ENGINE = InnoDB
COMMENT = '^																			';


-- -----------------------------------------------------
-- Table `minecraft`.`billings`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `minecraft`.`billings` ;

CREATE TABLE IF NOT EXISTS `minecraft`.`billings` (
  `billid` INT NOT NULL AUTO_INCREMENT,
  `amount` DECIMAL(5,2) NOT NULL,
  `ispayed` INT(1) NOT NULL DEFAULT 0,
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userid` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`billid`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
