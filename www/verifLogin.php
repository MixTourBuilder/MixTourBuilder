<?php
// On démarre la session
session_start();
$loginOK = false;



/*on se connecte a la bdd*/
function connection_bd(){
	$bdd = mysqli_connect('sql2.olympe.in', 'zxpdp04f', 'mixtourbuilder62', 'zxpdp04f');
	if(!$bdd){
		echo ("Connexion Impossible : " .mysqli_error());
		return false;
	}
	/*on choisit la bd*/
	$selectionBD = mysqli_select_db($bdd, 'zxpdp04f');
	if(!$selectionBD){
		echo ("Selection de la BDD impossible : " .mysqli_error());
		return false;
	}
	return $bdd;
}



if ($bdd = connection_bd()){
	// On n'effectue les traitement qu'à la condition que 
	// les informations aient été effectivement postées
	if ( isset($_POST) ) {
		extract($_POST);
		$email = htmlspecialchars($_POST['email']);
		$mdp = htmlspecialchars($_POST['password']);
		// On va chercher le mot de passe afférent à ce login
		$sql = "SELECT * FROM joueur WHERE Email = '.$email.'";
		$req = mysqli_query($bdd, $sql) or die('Erreur SQL : <br />'.$sql);

		// On vérifie que l'utilisateur existe bien
		if (mysqli_num_rows($req) > 0) {
			$data = mysqli_fetch_assoc($req);

			// On vérifie que son mot de passe est correct
			if ($mdp == $data['Password']) {
		  		$loginOK = true;
			}
		}
	}

	//Si le login a été validé on met les données en sessions
	if ($loginOK) {
		$_SESSION['email'] = $data['email'];
		$_SESSION['Pseudo'] = $data['Pseudo'];
		header('Location:game.html');
	}
	else {
		header('Location:index.html');
	}

	mysqli_close($bdd);
}

?>
