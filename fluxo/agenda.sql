-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tempo de Geração: 03/01/2012 às 17h42min
-- Versão do Servidor: 5.5.16
-- Versão do PHP: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de Dados: `agenda`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `teagenda`
--

CREATE TABLE IF NOT EXISTS `teagenda` (
  `idAgenda` int(11) NOT NULL AUTO_INCREMENT,
  `teCategoria_idCategoria` int(11) NOT NULL,
  `NmContato` varchar(100) COLLATE utf8_bin NOT NULL,
  `DsTelefone` varchar(25) COLLATE utf8_bin NOT NULL,
  `DtNiver` date NOT NULL,
  PRIMARY KEY (`idAgenda`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=11 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tecategoria`
--

CREATE TABLE IF NOT EXISTS `tecategoria` (
  `idCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `NmCategoria` varchar(100) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=34 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `teusuario`
--

CREATE TABLE IF NOT EXISTS `teusuario` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `NmUsuario` varchar(100) COLLATE utf8_bin NOT NULL,
  `DsEmail` varchar(255) COLLATE utf8_bin NOT NULL,
  `DsSenha` varchar(25) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=23 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
