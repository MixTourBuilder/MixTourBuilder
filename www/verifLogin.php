<?php
// On d�marre la session
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
	// On n'effectue les traitement qu'� la condition que 
	// les informations aient �t� effectivement post�es
	if ( isset($_POST) ) {
		extract($_POST);
		$email = htmlspecialchars($_POST['email']);
		$mdp = htmlspecialchars($_POST['password']);
		// On va chercher le mot de passe aff�rent � ce login
		$sql = "SELECT * FROM joueur WHERE Email = '.$email.'";
		$req = mysqli_query($bdd, $sql) or die('Erreur SQL : <br />'.$sql);

		// On v�rifie que l'utilisateur existe bien
		if (mysqli_num_rows($req) > 0) {
			$data = mysqli_fetch_assoc($req);

			// On v�rifie que son mot de passe est correct
			if ($mdp == $data['Password']) {
		  		$loginOK = true;
			}
		}
	}

	//Si le login a �t� valid� on met les donn�es en sessions
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
