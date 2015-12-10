<?php

session_start();
/*if(!isset($_SESSION['email'])){
	session_destroy();
	header('Location:index.php');
}*/

	/*on se connecte a la bdd*/
	function connection_bd() {
		$bdd = mysqli_connect('sql2.olympe.in', 'zxpdp04f', 'mixtourbuilder62', 'zxpdp04f');
		if(!$bdd) {
			echo ("Connexion Impossible : " .mysqli_error());
			return false;
		}
		/*on choisit la bd*/
		$selectionBD = mysqli_select_db($bdd, 'zxpdp04f');
		if(!$selectionBD) {
			echo ("Selection de la BDD impossible : " .mysqli_error());
			return false;
		}
		return $bdd;
	}

	if ($bdd = connection_bd()) {
		// Récupération des 10 derniers messages
		$sql = "SELECT Sexe, Nom, Prenom, Pseudo, Email, DateNaissance FROM joueur";
		$req = mysqli_query($bdd, $sql) or die('Erreur SQL : <br />'.$sql);

		// Affichage de chaque message (toutes les données sont protégées par htmlspecialchars)
		while ($data = mysqli_fetch_assoc($req)) {
			echo '<p>' . htmlspecialchars($data['Sexe']) . ' || ' . htmlspecialchars($data['Nom']) . ' || ' . htmlspecialchars($data['Prenom']) . ' || ' . htmlspecialchars($data['Pseudo']) . ' || ' . htmlspecialchars($data['Email']) . ' || ' . htmlspecialchars($data['DateNaissance']) .'</p>';

			echo '<p> <strong> Civilite : </strong>' . htmlspecialchars($data['Sexe']) . '<p>';
			echo '<p> <strong> Nom : </strong>' . htmlspecialchars($data['Nom']) . '<p>';
			echo '<p> <strong> Prenom : </strong>' . htmlspecialchars($data['Prenom']) . '<p>';
			echo '<p> <strong> Date de naissance : </strong>' . htmlspecialchars($data['DateNaissance']) . '<p>';
			echo '<p> <strong> Mail : </strong>' . htmlspecialchars($data['Email']) . '<p>';
			echo '<p> <strong> Pseudo : </strong>' . htmlspecialchars($data['Pseudo']) . '<p>';
			echo '<p> <strong> ========================================================== </strong><p>';
			
		}
	mysqli_close($bdd);
	}
?>
