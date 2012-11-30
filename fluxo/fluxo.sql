-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tempo de Geração: 
-- Versão do Servidor: 5.1.57-community
-- Versão do PHP: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de Dados: `fluxo`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `contas`
--

CREATE TABLE IF NOT EXISTS `contas` (
  `idConta` int(11) NOT NULL AUTO_INCREMENT,
  `dsDescricao` varchar(100) NOT NULL,
  `fgTipo` int(11) NOT NULL,
  `Conta_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`idConta`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Extraindo dados da tabela `contas`
--

INSERT INTO `contas` (`idConta`, `dsDescricao`, `fgTipo`) VALUES
(1, 'Combustivel', 2),
(2, 'Alimentacao', 2),
(3, 'Pagamento', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `fluxo`
--

CREATE TABLE IF NOT EXISTS `fluxo` (
  `idFluxo` int(11) NOT NULL AUTO_INCREMENT,
  `conta_id` int(11) NOT NULL,
  `dsDescricao` varchar(100) NOT NULL,
  `NuValor` double NOT NULL,
  `dtFluxo` date NOT NULL,
  PRIMARY KEY (`idFluxo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Extraindo dados da tabela `fluxo`
--

INSERT INTO `fluxo` (`idFluxo`, `conta_id`, `dsDescricao`, `NuValor`, `dtFluxo`) VALUES
(2, 2, 'Combustivel carro empresa', 100, '2012-11-09'),
(4, 1, 'sorvete', 10, '2012-11-09'),
(5, 2, 'testeteste', 1, '2012-11-10');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nmUsuario` varchar(100) NOT NULL,
  `dsEmail` varchar(100) NOT NULL,
  `dsSenha` varchar(100) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nmUsuario`, `dsEmail`, `dsSenha`) VALUES
(1, 'admin', 'admin@admin.com', '123');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
=======
-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tempo de Geração: 
-- Versão do Servidor: 5.5.27
-- Versão do PHP: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de Dados: `fluxo`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `contas`
--

CREATE TABLE IF NOT EXISTS `contas` (
  `idConta` int(11) NOT NULL AUTO_INCREMENT,
  `conta_id` int(11) DEFAULT NULL,
  `dsDescricao` varchar(100) NOT NULL,
  `fgTipo` int(11) NOT NULL,
  PRIMARY KEY (`idConta`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Extraindo dados da tabela `contas`
--

INSERT INTO `contas` (`idConta`, `conta_id`, `dsDescricao`, `fgTipo`) VALUES
(1, 0, 'Combustivel', 2),
(2, 0, 'Alimentacao', 2),
(3, 0, 'Pagamento', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `fluxo`
--

CREATE TABLE IF NOT EXISTS `fluxo` (
  `idFluxo` int(11) NOT NULL AUTO_INCREMENT,
  `conta_id` int(11) NOT NULL,
  `dsDescricao` varchar(100) NOT NULL,
  `NuValor` double NOT NULL,
  `dtFluxo` datetime NOT NULL,
  PRIMARY KEY (`idFluxo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `fluxo`
--

INSERT INTO `fluxo` (`idFluxo`, `conta_id`, `dsDescricao`, `NuValor`, `dtFluxo`) VALUES
(2, 12, 'Combustivel carro empresa', 100, '2012-11-02 00:00:00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nmUsuario` varchar(100) NOT NULL,
  `dsEmail` varchar(100) NOT NULL,
  `dsSenha` varchar(100) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nmUsuario`, `dsEmail`, `dsSenha`) VALUES
(1, 'admin', 'admin@admin.com', '123');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

