<?php 
session_start();
?>

<!DOCTYPE HTML>
<html>
	<head>
		<title>Mixtour Event</title>
		<link rel="icon" href="images/favicon.jpg" />
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" href="assets/css/index.css" />
    <link rel="stylesheet" type="text/css" href="assets/css/slid.css" />
    <script type="text/javascript" src="assets/js/modernizr.custom.86080.js"></script>


      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
      <link rel="stylesheet" type="text/css" href="assets/css/jquery.floating-social-share.min.css" />
      <script type="text/javascript" src="https://code.jquery.com/jquery-latest.min.js"></script>
      <script type="text/javascript" src="assets/js/jquery.floating-social-share.min.js"></script>

 <link rel="stylesheet" href="assets/css/style.css" />


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

</form>
    </div> 
  <form action="verifLogin.php" id="login-form" method="POST">
      <div class="head">Login</div>
      <div class="social">
        <h4>Connect with</h4>
        <ul>
          <li> 
          <a href="" class="facebook">
            <span class="fa fa-facebook"></span>
          </a>
          </li>
          <li>
            <a href="" class="twitter">
              <span class="fa fa-twitter"></span>
            </a>
          </li>
          <li>
            <a href="" class="google-plus">
              <span class="fa fa-google-plus"></span>
            </a>
          </li>
        </ul>
       </div>

       <div class="divider">
         <span>or</span>
       </div>


      <div class="login">

        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="email@email.com" required/>

        <label for="password">Password</label>
 		<input type="password" name="password" placeholder="Password" maxlength="40" required/>

        <input type="submit" name="login" id="log-in" value="Login" />.

        <p class="text-p">

        Don't have an account? 


       
     <a href="signup.php">Sign up</a>
        

        </p>
      </div>
  </form>

</div>

  








        


	</body>
</html>							
