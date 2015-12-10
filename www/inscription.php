<?php
/*on se connecte a la bdd*/
session_start();

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

	if(isset($_POST['play'])){
		
		$query = "INSERT INTO zxpdp04f.joueur(NumJoueur,Nom,Prenom,Pseudo,Password,Sexe,DateNaissance,Email) VALUES ('','".$_POST['nom']."','".$_POST['prenom']."','".$_POST['pseudo']."','".$_POST['password']."','".$_POST['sexe']."','".$_POST['age']."','".$_POST['mail']."')";
		mysqli_query($bdd,$query);
		mysqli_close($bdd);
		
		header('Location:game.html');
	}
}
?>
