CREATE DATABASE IF NOT EXISTS `electron`;

USE `electron`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `endereco` VARCHAR(255),
  `cep` VARCHAR(10)
);
