-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mar 08 Décembre 2015 à 13:14
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
  `Password` varchar(20) NOT NULL,
  `Sexe` enum('F','M') NOT NULL,
  `DateNaissance` date NOT NULL,
  PRIMARY KEY (`NumJoueur`),
  UNIQUE KEY `Pseudo` (`Pseudo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `joueur`
--

INSERT INTO `joueur` (`NumJoueur`, `Nom`, `Prenom`, `Pseudo`, `Password`, `Sexe`, `DateNaissance`) VALUES
(1, 'Dupont', 'Jean', 'Jean2015', 'password', 'M', '1985-12-09'),
(2, 'Dupond', 'Jeanne', 'Jeanne2015', 'password', 'F', '1990-12-03'),
(3, 'Tarzan', 'WildJungle', 'Banana2015', 'password', 'M', '1989-12-03');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `partie`
--

INSERT INTO `partie` (`NumPartie`, `Tournoi`, `DatePartie`, `NumJoueur`, `NumJoueur2`, `Score`, `NumJoueurGagnant`) VALUES
(1, 1, '2015-12-07', 1, 3, 10, 3),
(2, 0, '2015-12-01', 1, 2, 10, 2),
(3, 1, '2015-12-07', 2, 3, 10, 2),
(4, 1, '2015-12-16', 3, 1, 10, 3),
(5, 1, '2015-12-09', 1, 2, 50, 2);

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
