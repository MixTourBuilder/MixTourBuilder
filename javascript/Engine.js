function Exception_jouer() {
    this.name = "exception_jouer";
}

function Exception_deplacer() {
    this.name = "exception_deplacer";
}

function Exception_ia() {
    this.name = "exception_ia";
}

var Engine = function () {

    //Variables :
    var plateau = new Array(5), ligne, nb_pions_total = 0, nb_pions_joueur1 = 25,
        nb_pions_joueur2 = 25, score_joueur1 = 0, score_joueur2 = 0, joueur_courant = 1,
        liste_coup = new Array(), liste_mouvement = new Array();


    for (ligne = 0; ligne < 5; ligne++) {
        plateau[ligne] = new Array(5);
    }


    /* --------------------ENGINE---------------------------------*/


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
        return plateau[coup.positionY][coup.positionX];
    };

    // Le nombre de pion total
    this.get_nb_pions_plateau = function () {
        return nb_pions_total;
    };

    // Retourne le tableau 2D
    this.get_tableau = function () {
        return plateau;
    };

    // Retourne la liste des coups possible de poser
    this.get_liste_coup = function () {
        return liste_coup;
    };

    // Retourne la liste des coups possible de deplacer
    this.get_liste_mouvement = function () {
        return liste_mouvement;
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

    this.convert_coup = function (positionX, positionY) {

        return (positionY * 5) + positionX;
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
            plateau[coup.positionY][coup.positionX].get_nb_pion() === 0 &&
            value !== 0) {
            plateau[coup.positionY][coup.positionX].ajouter_pion(joueur_courant);
            nb_pions_total++;
            this.decrementer_joueur();
            this.switch_joueur();

        } else {
            throw new Exception_jouer();
        }
    };


    this.afficher = function () {
        console.log(" ");
        for (var i = 0; i < 5; i++) {

            console.log(plateau[i][0].get_nb_pion() + " " + plateau[i][1].get_nb_pion() + " " + plateau[i][2].get_nb_pion() + " " + plateau[i][3].get_nb_pion() + " " + plateau[i][4].get_nb_pion());
        }
        console.log(" ");

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
            if (( coupA.positionX > coupB.positionX && coupA.positionY > coupB.positionY) ||
                ( coupA.positionX < coupB.positionX && coupA.positionY < coupB.positionY))
                return "diagonal1";
            else {
                return "diagonal2"
            }
        }

        return 0;
    };

    // On vérifie que les pions sont à bonne distance.
    this.verification_distance = function (depart, destination, position) {
        var coupA = this.convert_position(depart), coupB = this.convert_position(destination),
            taille = plateau[coupB.positionY][coupB.positionX].get_nb_pion();
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

    this.verif_parcours = function (depart, arrivee, tmp_posX, tmp_posY) {
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
            tmp_posY = 0, tmp_posX = 1;
        if (position === "vertical") {
            tmp_posY = 1;
            tmp_posX = 0;
        } else if (position === "diagonal1") {
            tmp_posY = 1;
            tmp_posX = 1;
        } else if (position === "diagonal2") {
            tmp_posY = -1;
            tmp_posX = 1;
        }
        //console.log(position+" :"+" Y : "+tmp_posY+" X : "+tmp_posX);
        return this.verif_parcours(coupA, coupB, tmp_posX, tmp_posY) ||
            this.verif_parcours(coupB, coupA, tmp_posX, tmp_posY);

    };

    // On fait toutes les vérifications pour être sur que le mouvement de pile est autorisé
    this.mouvement_valide = function (depart, destination, nombre) {
        var position = this.verification_position(depart, destination),
            coup = this.convert_position(depart);

        return (position !== 0 && this.verification_distance(depart, destination, position) &&
        this.verification_premier(depart, destination, position) &&
        plateau[coup.positionY][coup.positionX].get_nb_pion() >= nombre);
    };

    // On déplace une pile sur une autre
    this.deplacer = function (depart, destination, nombre) {
        var coupA = this.convert_position(depart), coupB = this.convert_position(destination);
        if (this.mouvement_valide(depart, destination, nombre)) {
            plateau[coupB.positionY][coupB.positionX].
                ajouter_pile(plateau[coupA.positionY][coupA.positionX], nombre);
            plateau[coupA.positionY][coupA.positionX].supprimer_pile(nombre);
            this.verif_score(plateau[coupB.positionY][coupB.positionX]);
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
        if (pile.get_nb_pion() >= 5) {
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


    /* --------------------IA---------------------------*/

    /* Liste des coups possibles */


    // Créer la liste des coups possibles.
    this.liste_coup_possible = function () {
        liste_coup = this.liste_coup_pions(liste_coup);
        liste_mouvement = this.liste_coup_colonnes(liste_mouvement);
    };

    // Crée la liste des mouvement possibles.
    this.liste_coup_colonnes = function (liste) {
        var i, j;
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 5; j++) {
                if (plateau[i][j].get_nb_pion() !== 0) {
                    liste = this.verification_cote(liste, i, j);
                }
            }
        }
        return liste;
    };

    // Crée la liste des coups a rajouter.
    this.liste_coup_pions = function (liste) {
        var i, j;
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 5; j++) {
                if (plateau[i][j].get_nb_pion() === 0) {
                    liste.push((i * 5) + j)
                }
            }
        }
        return liste;
    };

    // on ajoute un coup dans la liste avec pour syntaxe X,Y->X1,Y1(N), avec X,Y les coordonnées du point de départ, et
    // X1,Y1 les coordonnées du point d'arrivée.  N est la taille de la pile a bouger.
    this.ajouter_coup_possible = function (liste, i, j, tmpi, tmpj) {
        var k;
        for (k = 1; k <= plateau[i + tmpi][j + tmpj].get_nb_pion(); k++) {
            liste.push(" " + (i + tmpi) + "," + (j + tmpj) + "->" + i + "," + j + "(" + k + ")");
        }
        return liste;
    };

    // Verification horizontale.
    this.verification_horizontale = function (liste, i, j, tmp) {
        if (j + tmp < 5 && plateau[i][j + tmp].get_nb_pion() != 0) {
            liste = this.ajouter_coup_possible(liste, i, j, 0, tmp);
        }
        if (j - tmp >= 0 && plateau[i][j - tmp].get_nb_pion() != 0) {
            liste = this.ajouter_coup_possible(liste, i, j, 0, -tmp);
        }
        return liste;
    };

    // Verification verticale.
    this.verification_verticale = function (liste, i, j, tmp) {
        if (i + tmp < 5 && plateau[i + tmp][j].get_nb_pion() != 0) {
            liste = this.ajouter_coup_possible(liste, i, j, tmp, 0);
        }
        if (i - tmp >= 0 && plateau[i - tmp][j].get_nb_pion() != 0) {
            liste = this.ajouter_coup_possible(liste, i, j, -tmp, 0);
        }
        return liste;
    };

    // Verification en diagonale haut gauche vers bas droit.
    this.verification_diagonale1 = function (liste, i, j, tmp) {
        if (i + tmp < 5 && j + tmp < 5 && plateau[i + tmp][j + tmp].get_nb_pion() != 0) {
            liste = this.ajouter_coup_possible(liste, i, j, tmp, tmp);
        }
        if (i - tmp >= 0 && j - tmp >= 0 && plateau[i - tmp][j - tmp].get_nb_pion() != 0) {
            liste = this.ajouter_coup_possible(liste, i, j, -tmp, -tmp);
        }
        return liste;
    };

    // Verification en diagonale haut droite vers bas gauche.
    this.verification_diagonale2 = function (liste, i, j, tmp) {
        if (i + tmp < 5 && j - tmp >= 0 && plateau[i + tmp][j - tmp].get_nb_pion() != 0) {
            liste = this.ajouter_coup_possible(liste, i, j, tmp, -tmp);
        }
        if (i - tmp >= 0 && j + tmp < 5 && plateau[i - tmp][j + tmp].get_nb_pion() != 0) {
            liste = this.ajouter_coup_possible(liste, i, j, -tmp, tmp);
        }
        return liste;
    };

    // On vérifie les côtés des coups, savoir s'il y a des mouvements possibles.
    this.verification_cote = function (liste, i, j) {
        var increment;
        for (increment = 1; increment < plateau[i][j].get_nb_pion() + 1; increment++) {
            liste = this.verification_verticale(liste, i, j, increment);
            liste = this.verification_horizontale(liste, i, j, increment);
            liste = this.verification_diagonale1(liste, i, j, increment);
            liste = this.verification_diagonale2(liste, i, j, increment);
        }
        return liste;
    };


    /* Random IA */

    this.jouer_ia = function () {
        var random = Math.floor(Math.random() * 2) + 1;
        this.liste_coup_possible();
        if (random == 1 && liste_coup.length !== 0) {
            random = Math.floor(Math.random() * (liste_coup.length));
            this.jouer(liste_coup[random]);

        } else if (liste_mouvement.length !== 0) {
            random = Math.floor(Math.random() * (liste_mouvement.length));
            var coup = liste_mouvement[random];
            var Y = coup.charCodeAt(1) - 48, X = coup.charCodeAt(3) - 48;
            var depart = this.convert_coup(X, Y);
            Y = coup.charCodeAt(6) - 48;
            X = coup.charCodeAt(8) - 48;
            var dest = this.convert_coup(X, Y);
            var n = coup.charCodeAt(10) - 48;
            this.deplacer(depart, dest, n);

        } else if (random == 2) {
            // Si on a random 2 mais qu'il n'y a pas de mouvement disponible.
            this.jouer_ia()
        } else {
            throw new Exception_ia();
        }
    };

};
