-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Jeu 10 Décembre 2015 à 11:16
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `mixtourbuilder`
--

-- --------------------------------------------------------

--
-- Structure de la table `joueur`
--

CREATE TABLE IF NOT EXISTS `joueur` (
  `NumJoueur` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(165) NOT NULL,
  `Prenom` varchar(165) NOT NULL,
  `Pseudo` varchar(10) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Sexe` enum('F','M') NOT NULL,
  `DateNaissance` date NOT NULL,
  `Email` varchar(50) NOT NULL,
  PRIMARY KEY (`NumJoueur`),
  UNIQUE KEY `Pseudo` (`Pseudo`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=32 ;

--
-- Contenu de la table `joueur`
--

INSERT INTO `joueur` (`NumJoueur`, `Nom`, `Prenom`, `Pseudo`, `Password`, `Sexe`, `DateNaissance`, `Email`) VALUES
(25, 'hafid', 'zakaria', 'zachari93', '1993206', 'M', '1993-06-20', 'zhafid16@gmail.com'),
(26, 'Ropital', 'Kevin', 'Keke', 'Keke2015', 'M', '1993-07-20', 'ropital.kevin@hotmail.fr'),
(27, 'Trabelsi', 'Nadir', 'DracZakk', 'password123', 'M', '1992-10-13', 'nadir1310@gmail.com'),
(28, 'Aoudia', 'Moncef', 'Spica199', 'Root19', 'M', '1993-05-19', 'moncf1999@gmail.com'),
(29, 'test1', 'test1', 'test1', '$1$r54.YV0.$jhUVLq6Eez0Hwmd1PG1kR.', 'M', '2015-12-01', 'test1@gmail.com'),
(30, 'hza', 'zakaria', 'massawi33', '$1$WE0.nu4.$x7NfqE5KvHoHtiTrpsYJQ0', 'M', '1993-03-21', 'massawi33@gmail.com'),
(31, 'Echchouik', 'Yassine', 'yassinou92', '$1$kl3.dj0.$Qpc0cxFHqwWk0bfSqPG211', 'M', '1992-06-21', 'E.Yassine92@gmail.com');

--
-- Déclencheurs `joueur`
--
DROP TRIGGER IF EXISTS `CheckDate`;
DELIMITER //
CREATE TRIGGER `CheckDate` BEFORE INSERT ON `joueur`
 FOR EACH ROW begin
Declare msg varchar(165);
if((NOW()<=New.DateNaissance) )then
  set msg = concat('MyTriggerError: Trying to insert a superior date to now ');
        signal sqlstate '45000' set message_text = msg;
    end if;
end
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `partie`
--

CREATE TABLE IF NOT EXISTS `partie` (
  `NumPartie` int(11) NOT NULL AUTO_INCREMENT,
  `Tournoi` tinyint(1) NOT NULL,
  `DatePartie` date NOT NULL,
  `NumJoueur` int(11) NOT NULL,
  `NumJoueur2` int(11) NOT NULL,
  `Score` int(11) NOT NULL,
  `NumJoueurGagnant` int(11) NOT NULL,
  PRIMARY KEY (`NumPartie`),
  KEY `FK_Partie_Num_Joueur` (`NumJoueur`),
  KEY `FK_Partie_Num_Joueur_1` (`NumJoueur2`),
  KEY `FK_Partie_Num_Joueur_2` (`NumJoueurGagnant`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Déclencheurs `partie`
--
DROP TRIGGER IF EXISTS `CheCkwinner`;
DELIMITER //
CREATE TRIGGER `CheCkwinner` BEFORE INSERT ON `partie`
 FOR EACH ROW begin
Declare msg varchar(165);
if((New.NumJoueurGagnant<>New.NumJoueur) and (New.NumJoueurGagnant<>New.NumJoueur2))then
  set msg = concat('MyTriggerError: Trying to insert a non existing player in the game: ');
        signal sqlstate '45000' set message_text = msg;
    end if;
end
//
DELIMITER ;

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `partie`
--
ALTER TABLE `partie`
  ADD CONSTRAINT `FK_Partie_Num_Joueur` FOREIGN KEY (`NumJoueur`) REFERENCES `joueur` (`NumJoueur`),
  ADD CONSTRAINT `FK_Partie_Num_Joueur_1` FOREIGN KEY (`NumJoueur2`) REFERENCES `joueur` (`NumJoueur`),
  ADD CONSTRAINT `FK_Partie_Num_Joueur_2` FOREIGN KEY (`NumJoueurGagnant`) REFERENCES `joueur` (`NumJoueur`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
