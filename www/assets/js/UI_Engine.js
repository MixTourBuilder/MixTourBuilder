
/*  Benjamin Maes - All Rights Reserved - Copyright © 2015
            .______    _______ .__   __.       __       ___      .___  ___.  __  .__   __. 
            |   _  \  |   ____||  \ |  |      |  |     /   \     |   \/   | |  | |  \ |  | 
            |  |_)  | |  |__   |   \|  |      |  |    /  ^  \    |  \  /  | |  | |   \|  | 
            |   _  <  |   __|  |  . `  | .-.  |  |   /  /_\  \   |  |\/|  | |  | |  . `  | 
            |  |_)  | |  |____ |  |\   | |  `-'  |  /  _____  \  |  |  |  | |  | |  |\   | 
            |______/  |_______||__| \__|  \______/ /__/     \__\ |__|  |__| |__| |__| \__| 
*/

// action on page load
window.addEventListener('load', function () {var gui = new UI_Engine(); gui.initialization( document.getElementById('canvas') )}, false);

UI_Engine = function( ){
	var game;
	var canvas;
	var context;

	var manager;
	var height;
	var width;

	var deltaX;
	var deltaY;

	var offsetX;
	var offsetY;

	var scaleX;
	var scaleY;

	var firstPos;
	var firstPosition;

	var numberClick =0 ;

	this.initialization = function(cvs){
		game = new Engine();
		game.init_plateau();

		canvas = cvs;
		context = cvs.getContext("2d");
		height = canvas.height;
		width = canvas.width;
		canvas.addEventListener("click",onClick,true);

		deltaX = (width * 0.95 - 10) / 5;
        deltaY = (height * 0.95 - 10) / 5;
        offsetX = width / 2 - deltaX * 2.5;
        offsetY = height / 2 - deltaY * 2.5;
        scaleX = height / canvas.offsetHeight;
        scaleY = width / canvas.offsetWidth;
        
        draw();

	}

	//Mouse Click Event
	var onClick = function(event){
		var pos = getClickPosition(event);
		var x = Math.floor((pos.x - offsetX) / deltaX);
        var y = Math.floor((pos.y - offsetY) / deltaY);

        console.log(x,y);
        var position = coord_to_position(x,y);
        
        //if(game.get_joueur_courant()===1){
        	if(game.get_pile(position).get_nb_pion()===0){
        		try{
        			console.log(position);
	        		game.jouer(position);
        		}catch(e){
	        		if(e instanceof Exception_jouer){
        				alert("Coup Impossible !");
        				console.log("Coup Impossible !");
        			}
        		}
        		draw();
        	}else{
        		if(numberClick == 0){
        			firstPos ={x:x,y:y};
        			firstPosition = position;
        			numberClick = 1;
        			draw_number_click(numberClick, x, y);
        		} else if (x == firstPos.x && y == firstPos.y) {
                    if(numberClick < game.get_pile(firstPosition).get_nb_pion()) {
                    	numberClick++;
                        draw_number_click(numberClick, x, y);
                    }else{
                        alert("You can't select that much Pawns, please try select less Pawn to move !");
                         numberClick = 0;
                    }
        		} else {
                	try{
                		game.deplacer(firstPosition,position,numberClick);
                		 numberClick = 0;
                		 draw();
                	}catch(e){
                		if(e instanceof Exception_deplacer){
                			alert("Deplacement Impossible !");
                			console.log("Deplacement Impossible !");
                			 numberClick = 0;
                		}
                	}
                	draw();
                	numberClick = 0;
       		    }
        	}
        //}
	};

	// get click position on canvas
	var getClickPosition = function (e) {
        var rect = canvas.getBoundingClientRect();
        return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
    };

    var draw = function () {
        context.lineWidth = 1;
        context.fillStyle = "#003366";
        roundRect(0, 0, canvas.width, canvas.height, 17, true, false);
        
        draw_grid(); // draw the board
        
        draw_state(); // draw the state of game
        if (game.get_score_joueur(1) <5 && game.get_score_joueur(2) <5) {
            draw_score(game.get_score_joueur(1), game.get_score_joueur(2));
        }
        else if (game.verifier_Gagner() == 1){
            draw_winner(1);
        }
        else if(game.verifier_Gagner() == 2) {
            draw_winner(2);
        }
         draw_state(); // draw the state of game
    };

    var draw_grid = function () {
        context.lineWidth = 1;
        context.strokeStyle = "#000000";
        for (var i = 0; i < 5; ++i) {
            for (var j = 0; j < 5; ++j) {
                if (i % 2 == 0 && j % 2 == 0) {
                    context.fillStyle = "#c0c0c0";
                }else if (i % 2 != 0 && j % 2 != 0) {
                    context.fillStyle = "#c0c0c0";
                }else {
                    context.fillStyle = "#007fff";
                }
                context.beginPath();
                context.moveTo(offsetX + i * deltaX, offsetY + j * deltaY);
                context.lineTo(offsetX + (i + 1) * deltaX - 2, offsetY + j * deltaY);
                context.lineTo(offsetX + (i + 1) * deltaX - 2, offsetY + (j + 1) * deltaY - 2);
                context.lineTo(offsetX + i * deltaX, offsetY + (j + 1) * deltaY - 2);
                context.moveTo(offsetX + i * deltaX, offsetY + j * deltaY);
                context.closePath();
                context.fill();
            }
        }
    };

    var draw_state = function(){
    	for (var coupX =0 ; coupX <5; coupX++) {
        	for (var coupY =0 ; coupY <5; coupY++) {
        		var tmpPos = coord_to_position(coupX,coupY);
  				var pile = game.get_pile(tmpPos);// je recupere la pile correspondant a la case du plateau
  				for (var hauteur = 0; hauteur < pile.get_nb_pion(); hauteur++) {// je parcours la pile
  					if(pile.get_pion(hauteur) === 1 ){//Joueur 1
  						draw_pion(coupX,coupY,1); // on dessine le pion
  					}else if(pile.get_pion(hauteur) ===2 ){//Joueur 2
	  					draw_pion(coupX,coupY,2); // on dessine le pion
  					}
  				}
  			}
  		}
    };

    var roundRect = function (x, y, width, height, radius, fill, stroke) {
        if (typeof stroke === "undefined") {
            stroke = true;
        }
        if (typeof radius === "undefined") {
            radius = 5;
        }
        context.beginPath();
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);
        context.quadraticCurveTo(x + width, y, x + width, y + radius);
        context.lineTo(x + width, y + height - radius);
        context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        context.lineTo(x + radius, y + height);
        context.quadraticCurveTo(x, y + height, x, y + height - radius);
        context.lineTo(x, y + radius);
        context.quadraticCurveTo(x, y, x + radius, y);
        context.closePath();
        if (stroke) {
            context.stroke();
        }
        if (fill) {
            context.fill();
        }
    };

    var draw_number_click = function (chiffre, IndiceX, IndiceY) {
        context.beginPath();
        context.font = "20px Verdana";
        context.fillStyle = "#ffff00";
        context.strokeStyle = "#000000";
        context.arc(offsetX + (IndiceX + 0.15) * deltaX, offsetY + (IndiceY + 0.15) * deltaY, 14, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();
        context.fill();
        context.beginPath();
        context.font = "20px Verdana";
        context.fillStyle = "#aa00ff";
        context.fillText(chiffre, offsetX + (IndiceX + 0.12) * deltaX, offsetY + (IndiceY + 0.18) * deltaY);
        context.closePath();
        context.stroke();
        context.fill();
    };

    var draw_pion = function(posX,posY,player){
    	context.beginPath();
      	context.arc(offsetX + (posX + 0.5) * deltaX, offsetY + (posY + 0.5) * deltaY, 40, 0, 2 * Math.PI);
      	if(player === 1){
    		context.fillStyle = "#003366";
    	}else{
    		context.fillStyle = "#ffffff";
    	}
      	context.fill();
      	context.lineWidth = 5;
      	context.strokeStyle = '#003300';
      	context.closePath();
      	context.stroke();
    };

    var draw_score = function (chiffre1, chiffre2){
        context.beginPath();
        context.font = "20px Verdana";
        context.fillStyle = "#FF6EB4";
        context.fillText("Joueur 1 : " + chiffre1,( offsetX + 0.5)*5 ,15);
        context.closePath();
        context.stroke();
        context.fill();

        context.beginPath();
        context.font = "20px Verdana";
        context.fillStyle = "#62B1F6";
        context.fillText("Joueur 2 : " + chiffre2,( offsetX + 0.5)*15 ,15);
        context.closePath();
        context.stroke();
        context.fill();
    };

    var draw_winner = function (winner){
        context.beginPath();
        context.font = "20px Verdana";
        context.fillStyle = "#FF6EB4";
        if(winner ==1){
        	context.fillText("Congratulations, You win the game !",( offsetX + 0.5)*4,15);
        	alert("Congratulations, You win the game !");
        }else{
        	context.fillText("Sorry, You Lost the game !",( offsetX + 0.5)*6,15);
        	alert("Sorry, You Lost the game !");
        }
        context.closePath();
        context.stroke();
        context.fill();
        initGame();
    };

    var draw_void_grid = function(){
    	canvas = document.getElementById("canvas");
		ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		draw();

    };

    var initGame = function () {
    	game = new Engine();
        game.init_plateau();

        draw_void_grid();
    };

    //retourne le numero de la case où le joueur a cliqué
	function coord_to_position(x,y){return x+5*y;}

}


