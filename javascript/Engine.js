function Exception_jouer() {
    this.name = "exception_jouer";
}

function Exception_deplacer() {
    this.name = "exception_deplacer";
}


var Engine = function () {

    //Variables :
    var plateau = new Array(5), ligne, nb_pions_total = 0, nb_pions_joueur1 = 25,
        nb_pions_joueur2 = 25, score_joueur1 = 0, score_joueur2 = 0, joueur_courant = 1;
    for (ligne = 0; ligne < 5; ligne++) {
        plateau[ligne] = new Array(5);
    }



    // Initialise le plateau
    this.init_plateau = function () {
        var i, j;
        for (i = 0; i < plateau.length; i++) {
            for (j = 0; j < plateau.length; j++) {
                plateau[i][j] = new Pile();
            }
        }
    };

    // Retourne une pile
    this.get_pile = function (position) {
        var coup = this.convert_position(position);
        return plateau[coup.positionX][coup.positionY];
    };

    // Le nombre de pion total
    this.get_nb_pions_plateau = function () {
        return nb_pions_total;
    };

    // Retourne le tableau 2D
    this.get_tableau = function () {
        return plateau;
    };


    // Le nombre de pion du joueur "joueur"
    this.get_nb_pions_joueur = function (joueur) {
        if (joueur === 1) {
            return nb_pions_joueur1;
        }
        return nb_pions_joueur2;
    };

    // Le score du joueur
    this.get_score_joueur = function (joueur) {
        if (joueur === 1) {
            return score_joueur1;
        }
        return score_joueur2;
    };

    // Le joueur courant
    this.get_joueur_courant = function () {
        return joueur_courant;
    };

    // Change le joueur courant
    this.switch_joueur = function () {
        joueur_courant = (joueur_courant % 2) + 1;
    };

    this.convert_position = function (position) {
        return {positionX: position % 5, positionY: parseInt(position / 5, 10)};
    };

    this.decrementer_joueur = function () {
        if (joueur_courant === 1) {
            nb_pions_joueur1--;
        } else {
            nb_pions_joueur2--;
        }
    };

    this.coup_possible = function (coup) {
        return (coup.positionX < 5 && coup.positionX >= 0 &&
            coup.positionY < 5 && coup.positionY >= 0);
    };

    // Jouer un coup quand la case est vide
    this.jouer = function (position) {
        var coup = this.convert_position(position), value;
        if (joueur_courant === 1) {
            value = nb_pions_joueur1;
        } else {
            value = nb_pions_joueur2;
        }

        if (this.coup_possible(coup) &&
                plateau[coup.positionX][coup.positionY].get_nb_pion() === 0 &&
                value !== 0) {
            plateau[coup.positionX][coup.positionY].ajouter_pion(joueur_courant);
            nb_pions_total++;
            this.decrementer_joueur();
            this.switch_joueur();

        } else {
            throw new Exception_jouer();
        }
    };

    //Verification si le pion depart peut se déplacer sur destination.
    this.verification_position = function (depart, destination) {
        var coupA = this.convert_position(depart), coupB = this.convert_position(destination);

        if (coupA.positionY === coupB.positionY) { // Horizontal
            return "horizontal";
        }
        if (coupA.positionX === coupB.positionX) { // Vertical
            return "vertical";
        }
        if (Math.abs(coupA.positionX - coupB.positionX) ===
                Math.abs(coupA.positionY - coupB.positionY)) {
            return "diagonal1";
        }
        if ((coupA.positionX + coupA.positionY) === (coupB.positionX + coupB.positionY)) {
            return "diagonal2";
        }

        return 0;
    };

    // On vérifie que les pions sont à bonne distance.
    this.verification_distance = function (depart, destination, position) {
        var coupA = this.convert_position(depart), coupB = this.convert_position(destination),
            taille = plateau[coupB.positionX][coupB.positionY].get_nb_pion();
        if (position === "horizontal" && (coupA.positionX - coupB.positionX) <= taille) {
            return true;
        }
        if (position === "vertical" && (coupA.positionY - coupB.positionY) <= taille) {
            return true;
        }
        return ((position === "diagonal1" || position === "diagonal2") &&
                (Math.abs(coupA.positionX - coupB.positionX) +
                Math.abs(coupA.positionY - coupB.positionY)) / 2 <= taille);
    };

    this.verif_parcours = function (depart, arrivee, tmp_posX, tmp_posY) {
        var tmp_coup = depart, tmp_arret = arrivee;
        while (this.coup_possible(tmp_coup)) {
            tmp_coup.positionX += tmp_posX;
            tmp_coup.positionY += tmp_posY;
            if (tmp_coup.positionX === tmp_arret.positionX &&
                    tmp_coup.positionY === tmp_arret.positionY) {
                return true;
            }
        }
        return false;
    };

    // On vérifie que destination est bien la premiere pile rencontrée .
    this.verification_premier = function (depart, destination, position) {
        var coupA = this.convert_position(depart), coupB = this.convert_position(destination),
            tmp_posX = 1, tmp_posY = 0;
        if (position === "vertical") {
            tmp_posX = 0;
            tmp_posY = 1;
        } else if (position === "diagonal1") {
            tmp_posX = 1;
            tmp_posY = 1;
        } else if (position === "diagonal1") {
            tmp_posX = 1;
            tmp_posY = -1;
        }
        return this.verif_parcours(coupA, coupB, tmp_posX, tmp_posY) ||
            this.verif_parcours(coupB, coupA, tmp_posX, tmp_posY);

    };

    // On fait toutes les vérifications pour être sur que le mouvement de pile est autorisé
    this.mouvement_valide = function (depart, destination, nombre) {
        var position = this.verification_position(depart, destination),
            coup = this.convert_position(depart);

        return (position !== 0 && this.verification_distance(depart, destination, position) &&
            this.verification_premier(depart, destination, position) &&
            plateau[coup.positionX][coup.positionY].get_nb_pion() >= nombre);
    };

    // On déplace une pile sur une autre 
    this.deplacer = function (depart, destination, nombre) {
        var coupA = this.convert_position(depart), coupB = this.convert_position(destination);
        if (this.mouvement_valide(depart, destination, nombre)) {
            plateau[coupB.positionX][coupB.positionY].
                ajouter_pile(plateau[coupA.positionX][coupA.positionY], nombre);
            plateau[coupA.positionX][coupA.positionY].supprimer_pile(nombre);
            this.verif_score(plateau[coupB.positionX][coupB.positionY]);
        } else {
            throw new Exception_deplacer();
        }

    };

    this.verif_score = function (pile) {
        if (this.verifier_Pile(pile) === 1) {
            score_joueur1++;
        } else if (this.verifier_Pile(pile) === 2) {
            score_joueur2++;
        }
    };

    // Verifie que la pile "pile" est plus de 5
    this.verifier_Pile = function (pile) {
        if (pile.get_pile_total().length >= 5) {
            return pile.get_couleur_dernier_pion();
        }
        return 0;
    };

    // MAJ les scores
    this.verifier_Gagner = function () {
        if (score_joueur1 >= 5) {
            return 1;
        }
        if (score_joueur2 >= 5) {

            return 2;
        }
        return 0;


    };


};
