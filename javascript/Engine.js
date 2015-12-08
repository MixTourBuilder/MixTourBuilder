function exception_jouer() {
    this.name = "exception_jouer";
    console.log("Exception, impossible de jouer ici.")
}

function exception_deplacer() {
    this.name = "exception_deplacer";
    console.log("Exception, impossible de deplacer ici.")
}


var Engine = function () {

    //Variables :
    var plateau = new Array(5);
    var ligne;
    for (ligne = 0; ligne < 5; ligne++) {
        plateau[ligne] = new Array(5);
    }

    var nb_pions_total = 0;
    var nb_pions_joueur1 = 25;
    var nb_pions_joueur2 = 25;
    var score_joueur1 = 0;
    var score_joueur2 = 0;
    var joueur_courant = 1;

    // Initialise le plateau
    this.init_plateau = function () {
        var ligne, colonne;
        for (ligne=0; ligne<plateau.length; ligne++){
            for (colonne=0; colonne<plateau.length; colonne++){
                plateau[ligne][colonne] = new Pile();
            }
        }
    };

    this.get_pile = function (position){
        var coup = this.convert_position(position);
        return plateau[coup.positionX][coup.positionY];
    };

    // Le nombre de pion total
    this.get_nb_pions_plateau = function () {
        return nb_pions_total;
    };

    this.get_tableau = function(){
        return plateau;
    };


    // Le nombre de pion du joueur "joueur"
    this.get_nb_pions_joueur = function(joueur){
        if(joueur == 1){
            return nb_pions_joueur1;
        }else return nb_pions_joueur2;
    };

    // Le score du joueur
    this.get_score_joueur = function(joueur){
        if(joueur == 1){
            return score_joueur1;
        }else return score_joueur2;
    };

    // Le joueur courant
    this.get_joueur_courant = function(){
        return joueur_courant;
    };

    // Change le joueur courant
    this.switch_joueur = function (){
        joueur_courant = (joueur_courant % 2) + 1;
    };

    this.convert_position = function(position){
        return { positionX: position % 5 , positionY: parseInt(position/5) };
    };

    this.decrementer_joueur = function() {
        if(joueur_courant == 1){
            nb_pions_joueur1--;
        } else {
            nb_pions_joueur2--;
        }
    };

    this.coup_possible = function(coup) {
        if(coup.positionX < 5 && coup.positionX >= 0 && coup.positionY < 5 && coup.positionY >= 0){
            return true;
        }
        return false;
    };

    this.jouer = function (position) {
        var coup = this.convert_position(position);
        if(this.coup_possible(coup) &&
            plateau[coup.positionX][coup.positionY].get_nb_pion() == 0){
            plateau[coup.positionX][coup.positionY].ajouterPion(joueur_courant);
            nb_pions_total++;
            this.decrementer_joueur();
            this.switch_joueur();

        } else {
            throw new exception_jouer();
        }
    };

    //Verification si le pion depart peut se déplacer sur destination.
    this.verification_position = function (depart, destination){
        var coupA = this.convert_position(depart);
        var coupB = this.convert_position(destination);

        if (coupA.positionY == coupB.positionY) { // Horizontal
            return "horizontal";
        }else if( coupA.positionX == coupB.positionX) { // Vertical
            return "vertical";
        }else if (Math.abs(coupA.positionX-coupB.positionX) == Math.abs(coupA.positionY-coupB.positionY)) {
            return "diagonal1";
        } else if ( (coupA.positionX + coupA.positionY) == (coupB.positionX+ coupB.positionY)){
            return "diagonal2"
        }

        return 0;
    };

    // On vérifie que les pions sont à bonne distance.
    this.verification_distance = function (depart, destination, position){
        var coupA = this.convert_position(depart);
        var coupB = this.convert_position(destination);
        var taille= plateau[coupB.positionX][coupB.positionY].get_nb_pion();
        if ( position == "horizontal" &&  (coupA.positionX - coupB.positionX) <= taille ) {
            return true;
        } else if ( position == "vertical" &&  (coupA.positionY - coupB.positionY) <= taille ) {
            return true;
        } else if (  ( position == "diagonal1" || position == "diagonal2") &&
            (Math.abs(coupA.positionX - coupB.positionX) + Math.abs(coupA.positionY - coupB.positionY))/2 <= taille) {
            return true;
        }

        return false;
    };

    // On vérifie que destination est bien la premiere pile rencontrée .
    this.verification_premier = function (depart, destination, position){
        var coupA = this.convert_position(depart);
        var coupB = this.convert_position(destination);
        var tmp_posX, tmp_posY;
        var flag = true;
        if ( position == "horizontal" ) {
            tmp_posX = 1;
            tmp_posY = 0;
        } else if ( position == "vertical") {
            tmp_posX = 0;
            tmp_posY = 1;
        } else if (  position == "diagonal1" ) {
            tmp_posX = 1;
            tmp_posY = 1;
        } else if ( position == "diagonal2" ) {
            tmp_posX = 1;
            tmp_posY = -1;
        }

        var tmp_coup = coupA;
        while (this.coup_possible(tmp_coup)) {
            tmp_coup.positionX += tmp_posX;
            tmp_coup.positionY += tmp_posY;
            if(tmp_coup.positionX == coupB.positionX && tmp_coup.positionY == coupB.positionY){
                return true;
            }
        }

        tmp_coup = coupB;
        while (this.coup_possible(tmp_coup)) {
            tmp_coup.positionX += tmp_posX;
            tmp_coup.positionY += tmp_posY;
            if(tmp_coup.positionX == coupA.positionX && tmp_coup.positionY == coupA.positionY){
                return true;
            }
        }

        return false;
    };

    // On fait toutes les vérifications pour être sur que le mouvement de pile est autorisé
    this.mouvement_valide = function(depart, destination, nombre){
        var position = this.verification_position(depart, destination);
        var coup = this.convert_position(depart);

        if ( position != 0 &&
            this.verification_distance(depart, destination, position) &&
            this.verification_premier(depart, destination, position) &&
            plateau[coup.positionX][coup.positionY].get_nb_pion() >= nombre){
            return true;
        }
        return false;
    };

    // On déplace une pile sur une autre 
    this.deplacer = function (depart, destination, nombre) {
        var coupA = this.convert_position(depart);
        var coupB = this.convert_position(destination);
        if(this.mouvement_valide(depart, destination, nombre)){
            plateau[coupB.positionX][coupB.positionY].ajouterPile(plateau[coupA.positionX][coupA.positionY], nombre);
            plateau[coupA.positionX][coupA.positionY].supprimerPile(nombre);
        } else {
            throw new exception_deplacer();
        }

    }

};
