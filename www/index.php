<!DOCTYPE HTML>
<html>
	<head>
		<title>Mixtour Event</title>
		<link rel="icon" href="images/favicon.jpg" />
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" href="assets/css/index.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/slid.css" />
    <script type="text/javascript" src="assets/js/modernizr.custom.86080.js"></script>

	</head>
	<body>
		<header>
      <ul class="cb-slideshow">
        <li><span>Image 01</span></li>
        <li><span>Image 02</span></li>
        <li><span>Image 03</span></li>
        <li><span>Image 04</span></li>
        <li><span>Image 05</span></li>
        <li><span>Image 06</span></li>
      </ul>
    </header>
    <div id="main">
		  <form method="post" action="inscription.php" >
  			<h1>Inscrivez vous pour participer</h1>
  			  <div class="inset">
  				  <p>
  					  <label for="civilite">Civilité : </label>
      			 	<input type="radio" name="civilite" value="M." />M.
      				<input type="radio" name="civilite" value="Mlle" />Mlle.
						  <input type="radio" name="civilite" value="Mme" />Mme.
    				</p>
  					<p>
    					<label for="nom">Nom : </label>
    					<input type="text" name="nom" id="nom" maxlength="40" placeholder="Nom"  required/>
  					</p>
  					<p>
    					<label for="prenom">Prenom : </label>
    					<input type="text" name="prenom" id="prenom" maxlength="40" placeholder="Prenom"  required/>
  					</p>
            <p>
              <label for="age">Date de Naissance : </label>
              <input type="date" name="age" id="age" maxlength="40" required/>
            </p>
            <p>
              <label for="pseudo">Pseudo : </label>
              <input type="text" name="pseudo" id="pseudo" maxlength="40" placeholder="Pseudo"  required/>
            </p>
  					<p>
    					<label for="mail">Email : </label>
    					<input type="mail" name="mail" id="mail" maxlength="40" placeholder="E-mail"  required/>
  					</p>
            <p>
              <label for="password">Password : </label>
              <input type="password" name="password" id="password" maxlength="40" placeholder="Mot de Passe"  required/>
            </p>
  					<p>
  						<input type="checkbox" name="rules" required/>&nbsp;<a href="reglement.html"> J'accepte le réglement </a>
  					</p>
  					<p class="btn">
    					<input type="submit" name="play" id="sign-in" value="> Je Joue" />
  					</p>
			</form>
		</div>
	</body>
</html>							