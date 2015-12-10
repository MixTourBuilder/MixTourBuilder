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
    var plateau = new Array(5), dernier_plateau = new Array(5), avant_dernier_plateau = new Array(5), ligne,
        nb_pions_total = 0, nb_pions_joueur1 = 25, nb_pions_joueur2 = 25, score_joueur1 = 0, score_joueur2 = 0,
        joueur_courant = 1, liste_coup, liste_mouvement, liste2 = new Array();


    for (ligne = 0; ligne < 5; ligne++) {
        plateau[ligne] = new Array(5);
        dernier_plateau[ligne] = new Array(5);
        avant_dernier_plateau[ligne] = new Array(5);
    }


    /* --------------------ENGINE---------------------------------*/


    // Initialise le plateau
    this.init_plateau = function () {
        var i, j;
        for (i = 0; i < plateau.length; i++) {
            for (j = 0; j < plateau.length; j++) {
                plateau[i][j] = new Pile();
                dernier_plateau[i][j] = new Pile();
                avant_dernier_plateau[i][j] = new Pile();
            }
        }
    };

    /*------Getter & Setter-------------*/


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


    /*-----------Conversion--------*/

    // Converti une position en un objet avec deux coordonnées
    this.convert_position = function (position) {
        return {positionX: position % 5, positionY: parseInt(position / 5, 10)};
    };

    // Converti un objet avec deux coordonnées en une position
    this.convert_coup = function (positionX, positionY) {
        return (positionY * 5) + positionX;
    };


    /*-------Jeu de base-------*/

    // Change le joueur courant
    this.switch_joueur = function () {
        joueur_courant = (joueur_courant % 2) + 1;
    };

    // Decremente le nombre de pions du joueur courant.
    this.decrementer_joueur = function () {
        if (joueur_courant === 1) {
            nb_pions_joueur1--;
        } else {
            nb_pions_joueur2--;
        }
    };

    // Sauvegarde le plateau et transfère l'historique.
    this.sauv_plateau = function () {
        var i, j;
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 5; j++) {
                avant_dernier_plateau[i][j].copie(dernier_plateau[i][j]);
                dernier_plateau[i][j].copie(plateau[i][j]);
            }
        }
    };

    // Jouer un coup quand la case est vide
    this.jouer = function (position) {
        var coup = this.convert_position(position), value;
        if (joueur_courant === 1) {
            value = nb_pions_joueur1;
        } else {
            value = nb_pions_joueur2;
        }

        if (this.coup_sur_plateau(coup) &&
                plateau[coup.positionY][coup.positionX].get_nb_pion() === 0 && value !== 0) {
            this.sauv_plateau();
            plateau[coup.positionY][coup.positionX].ajouter_pion(joueur_courant);
            nb_pions_total++;
            this.decrementer_joueur();
            this.switch_joueur();
        } else {
            throw new Exception_jouer();
        }
    };

    // On déplace une pile sur une autre
    this.deplacer = function (depart, destination, nombre) {
        var coupA = this.convert_position(depart), coupB = this.convert_position(destination);
        if (this.mouvement_valide(depart, destination, nombre)) {
            this.sauv_plateau();
            plateau[coupB.positionY][coupB.positionX].
                ajouter_pile(plateau[coupA.positionY][coupA.positionX], nombre);
            plateau[coupA.positionY][coupA.positionX].supprimer_pile(nombre);

            if (this.sans_repetition()) {
                this.verif_score(plateau[coupB.positionY][coupB.positionX]);
                this.switch_joueur();
            } else {
                plateau[coupA.positionY][coupA.positionX].
                    ajouter_pile(plateau[coupB.positionY][coupB.positionX], nombre);
                plateau[coupB.positionY][coupB.positionX].supprimer_pile(nombre);

                throw new Exception_deplacer();
            }

        } else {
            throw new Exception_deplacer();
        }

    };


    /*---------------Verifications diverses ------------------*/

    // Vérifie que le coup est dans les bornes
    this.coup_sur_plateau = function (coup) {
        return (coup.positionX < 5 && coup.positionX >= 0 &&
        coup.positionY < 5 && coup.positionY >= 0);
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
            if ((coupA.positionX > coupB.positionX && coupA.positionY > coupB.positionY) ||
                    (coupA.positionX < coupB.positionX && coupA.positionY < coupB.positionY)) {
                return "diagonal1";
            }
            return "diagonal2";
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
        while (this.coup_sur_plateau(tmp_coup)) {
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

    this.sans_repetition = function () {
        var i, j, value;
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 5; j++) {
                value = avant_dernier_plateau[i][j].egal(plateau[i][j]);
                if (!value) {
                    return true;
                }
            }
        }
        return false;
    };

    this.verif_score = function (pile) {
        if (this.verifier_Pile(pile) === 1) {
            score_joueur1++;
            pile.supprimer_pion();
        } else if (this.verifier_Pile(pile) === 2) {
            score_joueur2++;
            pile.supprimer_pion();
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


    /*--------------Jouer & Evaluer------------------*/

    this.jouer_ia = function () {
        var tmp, depart, dest, n;
        this.liste_coup_possible();
        //tmp = this.random_ia();
        tmp = this.hill_climber();

        if (tmp.charCodeAt(0) === 32) {
            depart = this.convert_coup(tmp.charCodeAt(3) - 48, tmp.charCodeAt(1) - 48);
            dest = this.convert_coup(tmp.charCodeAt(8) - 48, tmp.charCodeAt(6) - 48);
            n = (tmp.charCodeAt(10) - 48);
            this.deplacer(depart, dest, n);
        } else {
            this.jouer(parseInt(tmp, 10));
        }
    };

    this.evaluation = function (joueur) {
        var i, j, value = 0, value_tmp;
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 5; j++) {
                if (plateau[i][j].get_couleur_dernier_pion() === joueur) {
                    value_tmp = plateau[i][j].get_nb_pion();
                    if (value_tmp >= 5) {
                        value += value_tmp * 100;
                    } else {
                        value += value_tmp * 5 + Math.exp(value_tmp);
                    }
                } else {
                    value_tmp = plateau[i][j].get_nb_pion();
                    if (value_tmp >= 5) {
                        value -= value_tmp * 100000;
                    } else {
                        value -= value_tmp * 2;
                    }
                }
            }
        }
        return value;
    };


    /* -------------Liste des coups possibles -------------*/


    // Créer la liste des coups possibles.
    this.liste_coup_possible = function () {
        liste_coup = [];//new Array ();
        liste_mouvement = [];//new Array ();
        liste_coup = this.liste_coup_pions(liste_coup);
        liste_mouvement = this.liste_coup_colonnes(liste_mouvement);
    };

    // Crée la liste des coups a rajouter.
    this.liste_coup_pions = function (liste) {
        var i, j;
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 5; j++) {
                if (plateau[i][j].get_nb_pion() === 0) {
                    liste.push((i * 5) + j);
                }
            }
        }
        return liste;
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


    /* Random IA */

    this.random_ia = function () {
        var random = Math.floor(Math.random() * 2) + 1;
        if (random === 1 && liste_coup.length !== 0) {
            random = Math.floor(Math.random() * (liste_coup.length));
            return liste_coup[random].toString();
        }
        if (liste_mouvement.length !== 0) {
            random = Math.floor(Math.random() * (liste_mouvement.length));
            return liste_mouvement[random];
        }
        if (random === 2) {
            // Si on a random 2 mais qu'il n'y a pas de mouvement disponible.
            return this.random_ia();
        }
        throw new Exception_ia();
    };

    /*----------ALGO D'OPTIMISATION----------------*/

    // Algo Hill_climber qui trouve le meilleur coup.
    this.hill_climber = function () {
        var meilleur_coup = liste_coup[0], meilleur_valeur = -9999999999.0, i, valeur_courante, depart, dest;

        for (i = 0; i < liste_coup.length; i++) {
            this.ajouter_coup(liste_coup[0]);
            valeur_courante = this.evaluation(joueur_courant);

            if (valeur_courante > meilleur_valeur) {
                meilleur_valeur = valeur_courante;
                meilleur_coup = liste_coup[i];
            } else if (valeur_courante === meilleur_valeur && Math.floor(Math.random() * 100) < 5) {
                meilleur_valeur = valeur_courante;
                meilleur_coup = liste_coup[i];
            }
            this.enlever_coup(liste_coup[0]);

        }

        for (i = 0; i < liste_mouvement.length; i++) {
            dest = this.convert_position(this.convert_coup(liste_mouvement[i].charCodeAt(8) - 48,
                liste_mouvement[i].charCodeAt(6) - 48));
            depart = this.convert_position(this.convert_coup(liste_mouvement[i].charCodeAt(3) - 48,
                liste_mouvement[i].charCodeAt(1) - 48));

            this.deplacer_sans_verif(depart, dest, (liste_mouvement[i].charCodeAt(10) - 48));

            valeur_courante = this.evaluation(joueur_courant);
            if (valeur_courante > meilleur_valeur) {
                meilleur_valeur = valeur_courante;
                meilleur_coup = liste_mouvement[i];
            }
            this.deplacer_sans_verif(dest, depart, (liste_mouvement[i].charCodeAt(10) - 48));
        }
        return String(meilleur_coup);
    };


    /*------------Fonctions utiles pour l'IA---------------*/
    this.deplacer_sans_verif = function (depart, destination, nombre) {
        plateau[destination.positionY][destination.positionX].
            ajouter_pile(plateau[depart.positionY][depart.positionX], nombre);
        plateau[depart.positionY][depart.positionX].supprimer_pile(nombre);
    };

    this.ajouter_coup = function (indice) {
        var coup = this.convert_position(indice);
        plateau[coup.positionY][coup.positionX].ajouter_pion(joueur_courant);
    };

    this.enlever_coup = function (indice) {
        var coup = this.convert_position(indice);
        plateau[coup.positionY][coup.positionX].supprimer_pion();
    };

    // on ajoute un coup dans la liste avec pour syntaxe X,Y->X1,Y1(N),
    // avec X,Y les coordonnées du point de départ,
    // et X1,Y1 les coordonnées du point d'arrivée.  N est la taille de la pile a bouger
    this.ajouter_mouvement_possible = function (liste, i, j, tmpi, tmpj) {
        var k;
        for (k = 1; k <= plateau[i + tmpi][j + tmpj].get_nb_pion(); k++) {
            liste.push(" " + (i + tmpi) + "," + (j + tmpj) + "->" + i + "," + j + "(" + k + ")");
        }
        return liste;
    };


    // On vérifie les côtés des coups, savoir s'il y a des mouvements possibles.
    this.verification_cote = function (liste, i, j) {
        var increment;
        for (increment = 1; increment < plateau[i][j].get_nb_pion() + 1; increment++) {
            // Vertical
            liste = this.verification_direction(liste, i, j, increment,
                (i + increment < 5 && plateau[i + increment][j].get_nb_pion() !== 0),
                (i - increment >= 0 && plateau[i - increment][j].get_nb_pion() !== 0), 1, 0);

            // Horizontal
            liste = this.verification_direction(liste, i, j, increment,
                (j + increment < 5 && plateau[i][j + increment].get_nb_pion() !== 0),
                (j - increment >= 0 && plateau[i][j - increment].get_nb_pion() !== 0), 0, 1);

            // Diagonal1
            liste = this.verification_direction(liste, i, j, increment,
                (i + increment < 5 && j + increment < 5 &&
                plateau[i + increment][j + increment].get_nb_pion() !== 0),
                (i - increment >= 0 && j - increment >= 0 &&
                plateau[i - increment][j - increment].get_nb_pion() !== 0), 1, 1);

            // Diagonal2
            liste = this.verification_direction(liste, i, j, increment,
                (i + increment < 5 && j - increment >= 0 &&
                plateau[i + increment][j - increment].get_nb_pion() !== 0),
                (i - increment >= 0 && j + increment < 5 &&
                plateau[i - increment][j + increment].get_nb_pion() !== 0), 1, -1);

        }

        return liste;
    };

    // On vérifie une direction particulière, fonction des bool1 et 2 et des int1 et 2
    this.verification_direction = function (liste, i, j, tmp, bool1, bool2, int1, int2) {
        if (bool1) {
            liste = this.ajouter_mouvement_possible(liste, i, j, int1 * tmp, int2 * tmp);
        }
        if (bool2) {
            liste = this.ajouter_mouvement_possible(liste, i, j, -int1 * tmp, -int2 * tmp);
        }
        return liste;
    };


    /*-----------------Fonctions de test & Débug--------------------*/

    // Fonction d'affichage, utile uniquement dans les tests.
    this.afficher = function () {
        console.log("Joueur " + joueur_courant);
        for (var i = 0; i < 5; i++) {

            console.log(plateau[i][0].get_nb_pion() + " " + plateau[i][1].get_nb_pion() + " " +
                plateau[i][2].get_nb_pion() + " " + plateau[i][3].get_nb_pion() + " " +
                plateau[i][4].get_nb_pion());
        }
        console.log(" ");
    };


};