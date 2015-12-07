<!DOCTYPE HTML>
<html>
	<head>
		<title>Mixtour Event</title>
		<link rel="icon" href="images/favicon.jpg" />
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" href="assets/css/index.css" />

	</head>
	<body>
		<header>
			<h1>Gagnez un Jeu</h1>
		</header>
		<div>
			<form method="post" action="inscription.php" >
  				<h1>Inscrivez vous pour participer</h1>
  				<div class="inset">
  					<p>
  						<label for="civilite">Civilité :</label>
      					<input type="radio" name="civilite" value="M." />M.
      					<input type="radio" name="civilite" value="Mlle" />Mlle
						<input type="radio" name="civilite" value="Mme" />Mme
    				</p>
  					<p>
    					<label for="nom">Nom :</label>
    					<input type="text" name="nom" id="nom" maxlength="40" placeholder="Nom"  required/>
  					</p>
  					<p>
    					<label for="nom">Prenom :</label>
    					<input type="text" name="prenom" id="prenom" maxlength="40" placeholder="Prenom"  required/>
  					</p>
  					<p>
    					<label for="nom">Email :</label>
    					<input type="mail" name="mail" id="mail" maxlength="40" placeholder="E-mail"  required/>
  					</p>
  					<p>
  						<input type="checkbox" name="rules" />J'accepte le réglement
  					</p>
  					<p class="paragraphe">
    					<input type="submit" name="play" id="sign-in" value="> Je Joue"/>
  					</p>
  					
  				</div> 
			</form>

			<div>
				<h2>Un Gagnant par Semaine</h2>
			</div>
		</div>
	</body>
</html>							