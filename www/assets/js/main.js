// action on page load
window.addEventListener('load', function () {launch();}, false);

/***** interface utilisateur ****/

	//game
	var pile = new Pile();
	var game = new Engine();
	
	// Variables
	var board = new Image();
	var pion_J1 = new Image();
	var pion_J2 = new Image();
	

	//on charge les ressources
	board.src = 'assets/img/board.png';
   	pion_J1.src = 'assets/img/pion_J1.png';
    pion_J2.src = 'assets/img/pion_J2.png';

    var player = 1;

  	function launch(){
  		game.init_plateau();//init game

  		var canvas = document.getElementById('canvas');
		// On récupère le contexte 2D
		var context = canvas.getContext('2d');

		context.drawImage(board,0,0);// draw board

		context.drawImage(pion_J1,68,110);// draw board
		context.drawImage(pion_J2,68,100);// draw board
  		context.drawImage(pion_J1,68,90);// raw board
  		context.drawImage(pion_J2,68,80);// draw board
  		context.drawImage(pion_J1,68,70);// draw board
		
  		//while pas de gagnant
  		//while(game.verifier_Gagner() === 0){
  			
  			//if(game.get_joueur_courant() === 1){
  			
  				canvas.addEventListener("click", doOnClick);
			//}
  		//}
  	}

  	function removeMouseListener(canvas){
  		// Remove the event handler from the canvas
		canvas.removeEventListener("click", doOnClick);
  	}

  	function displayboard(context){
  		for (var coup =0 ; coup <25; coup++) {
  			var pile = game.get_pile(coup);// je recupere la pile correspondant a la case du plateau
  			for (var hauteur = 0; hauteur < pile.get_nb_pion(); hauteur++) {// je parcours la pile
  				var coord = position_to_coord(coup,hauteur); //on convertit une position en coordonée sur le canvas
  				if(pile.get_pion(hauteur) ===1 ){//Joueur 1
  					context.drawImage(pion_J1,coord[0],coord[1]); // on dessine l'image
  				}else if(pile.get_pion(hauteur) ===2 ){//Joueur 2
  					context.drawImage(pion_J2,coord[0],coord[1]); // on dessine l'image
  				}
  			}
  		}
  	}

  	//fonction qui gere le click
  	function doOnClick(event){
  		var canvas = document.getElementById('canvas');
		// On récupère le contexte 2D
		var context = canvas.getContext('2d');
		
 		//ici, on va se servir de la variable event
		// on calcul la position exact dans le canvas et pas la position sur la page
  		coords = relMouseCoords(event);
		canvasX = coords.mouseX;
		canvasY = coords.mouseY;
  		position = coord_to_position(canvasX,canvasY);

  		//la pile est vide on joue dans la case
  		if(game.get_pile(position).get_nb_pion()===0 && position!==null){
  			try{
		  		game.jouer(position);
		  		//removeMouseListener(document.getElementById('canvas'));
	  		}catch(e){
		  		if(e instanceof Exception_jouer){
	  				alert("Coup impossible");
	  				console.log("Coup impossible");
		  		}
	  		}
	  	}else{// sinon on deplace la pile
	  		var hauteurSelect = coord_to_hauteur(canvasY);
			
			var last_pos = position;

			

	  	}
	  
	  	//on affiche l'etat du plateau
		displayboard(context);
	}

	function onClickEvent(position,hauteurSelect,event){
		
	  	if(position !==null && hauteurSelect!=null){
			var coord = relMouseCoords(event);
			
			var pos2 = coord_to_position(coord.mouseX,coord.mouseY);
			
			console.log(position,pos2);
	  	}
	}

	//retourne le numero de la case où le joueur a cliqué
	function coord_to_position(x,y){
		var margX = 60;
		var margY = 60;

		var abs = (x-margX)/78;
		var ord = (y-margY)/78;

		var roundAbs = Math.floor(abs);	
		var roundOrd = Math.floor(ord);
		
		return roundAbs+5*roundOrd;
	}

	//retourne la hauteur de pile selectionné
	function coord_to_hauteur(c){
		var margY = 60;
		
		var ord = Math.floor((c-margY)/78);
		
		console.log("ord :"+ord);

		var ycase = ((ord+1) * 78) + margY - 7;
		
		//console.log(ycase);

		var hauteur = Math.floor((-c+ycase)/10);
		console.log("h:" + hauteur);
		if(hauteur>=0 && hauteur<5){
			return hauteur;
		}else{
			return null;
		}
	}

	//les fonctions suivant convertissent un coup en coordonée de pixel sur la page 
	function coup_to_x(coup){
		var coordinate = new Array();

		switch(coup){
			case 0: 
			case 5:
			case 10:
			case 15:
			case 20:
					return 68;break; // premiere colonne
			case 1:
			case 6:
			case 11:
			case 16:
			case 21:
					return 145;break; // deuxieme colonne

			case 2: 
			case 7:
			case 12:
			case 17:
			case 22:
					return 222;	break; // troisieme colonne
			case 3: 
			case 8:
			case 13:
			case 18:
			case 23:
					return 299;	break; // quatrieme colonne
			case 4: 
			case 9:
			case 14:
			case 19:
			case 24:
					return 375; break; // cinquieme colonne
			
		}
	}

	function coup_to_y(coup,hauteur){
		switch(coup){
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
					switch(hauteur){
						case 0:
								return 110;
						case 1:
								return 100;
						case 2:
								return 90;
						case 3:
								return 80;
						case 4:
								return 70;
					}
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
					switch(hauteur){
						case 0:
								return 185;
						case 1:
								return 175;
						case 2:
								return 165;
						case 3:
								return 155;
						case 4:
								return 145;
					}
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
					switch(hauteur){
						case 0:
								return 263;
						case 1:
								return 253;
						case 2:
								return 243;
						case 3:
								return 155;
						case 4:
								return 145;
					}	
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
					switch(hauteur){
						case 0:
								return 340;
						case 1:
								return 330;
						case 2:
								return 320;
						case 3:
								return 310;
						case 4:
								return 300;
					}
			case 20:
			case 21:
			case 22:
			case 23:
			case 24:
					switch(hauteur){
						case 0:
								return 420;
						case 1:
								return 410;
						case 2:
								return 400;
						case 3:
								return 390;
						case 4:
								return 380;
					}

		}
	}

	function position_to_coord(coup,hauteur){
		var coordinate = new Array();

		coordinate.push(coup_to_x(coup));
		coordinate.push(coup_to_y(coup,hauteur));
		return coordinate;
	}

	function relMouseCoords(event){
    	var div=document.getElementById('wrap');
		var canvas = document.getElementById('canvas');
		var pos=getOffset(canvas);
		
		var x=event.clientX - pos.left + div.scrollLeft;
		var y=event.clientY - pos.top + div.scrollTop;
		return{
			mouseX:x,
			mouseY:y
		};
	}
	
	function getOffset(element) { 
		  var top = 0, left = 0;
		  do {
			  top += element.offsetTop+element.scrollTop;
			  left += element.offsetLeft+element.scrollLeft;
		  } while (element = element.offsetParent);
 
		  return {
			  top: top,
			  left: left
		  };
	}

