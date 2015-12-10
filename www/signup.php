<!DOCTYPE HTML>
<html>
	<head>
		<title>SignUp</title>
		<link rel="icon" href="images/favicon.jpg" />
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" href="assets/css/signup.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/slid.css" />
    <script type="text/javascript" src="assets/js/modernizr.custom.86080.js"></script>


      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
      <link rel="stylesheet" type="text/css" href="assets/css/jquery.floating-social-share.min.css" />
      <script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
      <script type="text/javascript" src="assets/js/jquery.floating-social-share.min.js"></script>


      <meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">

		</head>

	<body>

<!--
		<header>

      <ul class="cb-slideshow">
        <li><span>Image 01</span></li>
        <li><span>Image 02</span></li>
        <li><span>Image 03</span></li>
        <li><span>Image 04</span></li>
        <li><span>Image 05</span></li>
        <li><span>Image 06</span></li>
      </ul>
     --> 
    </header>

    <div class="body body-s">
		
			<form class="sky-form" method="post" action="inscription.php">
				<header>Inscription</header>
				
				<fieldset>					
					<section>
						<label class="input">
							<i class="icon-append icon-user"></i>
							
							<input type="text" name="pseudo" id="pseudo" maxlength="40" placeholder="Pseudo"  required/>
							<b class="tooltip tooltip-bottom-right">Only latin characters and numbers</b>
						</label>
					</section>
					
					<section>
						<label class="input">
							<i class="icon-append icon-envelope-alt"></i>
							<input type="mail" name="mail" id="mail" maxlength="40" placeholder="Email"  required/>
							<b class="tooltip tooltip-bottom-right">Needed to verify your account</b>
						</label>
					</section>
					
					<section>
						<label class="input">
							<i class="icon-append icon-lock"></i>
							<input type="password" name="password" placeholder="Mot de passe">
							<b class="tooltip tooltip-bottom-right">Only latin characters and numbers</b>
						</label>
					</section>
					
					</section>
					<section>
						<label class="input">
							<i class="icon-append icon-calendar"></i>
							<input type="date" name="age" id="age" maxlength="40" required/>
							<b class="tooltip tooltip-bottom-right">Needed to verify your age</b>
						</label>
					</section>
				</fieldset>
					
				<fieldset>
					<div class="row">
						<section class="col col-6">
							<label class="input">
								<input type="text" name="nom" id="nom" maxlength="40" placeholder="Nom"  required/>
							</label>
						</section>
						<section class="col col-6">
							<label class="input">
								<input type="text" name="prenom" id="prenom" maxlength="40" placeholder="Prenom"  required/>
							</label>
						</section>
					</div>
					
					<section>
							<input type="radio" name="sexe" value="M" />Homme
      						&nbsp;&nbsp;<input type="radio" name="sexe" value="F" />Femme
					</section>
					
					<section>
						<label class="checkbox"><input type="checkbox" name="checkbox"><i></i>J'accepte les <a href="reglement.html">conditions d'utilisations</a></label>
					</section>
				</fieldset>
				<footer>
					<button type="submit" name="play" class="button">Inscription</button>
				</footer>
			</form>
			
		</div>

    <div id="main">
            <script>
                  $("body").floatingSocialShare({
                    place: "top-left", // alternatively top-right
                      counter: true, // set to false for hiding the counters of buttons
                      buttons: [ "facebook", "twitter", "google-plus"], // all of the currently avalaible social buttons
                      title: document.title, // your title, default is current page's title
                      url: "https://www.facebook.com/MixtourEventOfficiel/?fref=ts",  // your url, default is current page's url
                      text: "share with ", // the title of a tags
                      description: $('meta[name="description"]').attr("content"), // your description, default is current page's description
                      popup_width: 400, // the sharer popup width, default is 400px
                      popup_height: 300 // the sharer popup height, default is 300px
                  });

            </script>
			



			</div>
	</body>
</html>							
