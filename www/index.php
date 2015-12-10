<?php 
session_start();

// Verifie si utilisateur connecté
if (isset($_SESSION['email'])) {
	// Redirection vers l'espace privé
	header('Location:game.php');
}
else {
	// Redirection vers la page de connexion
	header('Location:login.php');
}
?>
