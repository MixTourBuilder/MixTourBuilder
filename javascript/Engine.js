var Engine = function () {

    //Variables :
    "use strict";
    var plateau = new Array(5), ligne, nb_pions_total = 0,
        nb_pions_joueur1 = 25, nb_pions_joueur2 = 25,
        score_joueur1 = 0, score_joueur2 = 0, joueur_courant = 1;
    for (ligne = 0; ligne < 5; ligne = ligne + 1) {
        plateau[ligne] = new Array(5);
    }
    // Initialise le plateau
    this.init_plateau = function () {
        var i, j;
        for (i = 0; i < plateau.length; i = i + 1) {
            for (j = 0; j < plateau.length; j = j + 1) {
                plateau[i][j] = new Pile();
            }
        }
    };

    this.get_pile = function (position) {
        var coup = this.convert_position(position);
        return plateau[coup.positionX][coup.positionY];
    };

    // Return le nombre de pion total
    this.get_nb_pions_plateau = function () {
        return nb_pions_total;
    };

    this.get_tableau = function () {
        return plateau;
    };


    // Return le nombre de pion du joueur "joueur"
    this.get_nb_pions_joueur = function (joueur) {
        if (joueur === 1) {
            return nb_pions_joueur1;
        }
        return nb_pions_joueur2;
    };

    // Return le score du joueur
    this.get_score_joueur = function (joueur) {
        if (joueur === 1) {
            return score_joueur1;
        }
        return score_joueur2;
    };

    // Return le joueur courant
    this.get_joueur_courant = function () {
        return joueur_courant;
    };

    // Change le joueur courant
    this.switch_joueur = function () {
        joueur_courant = (joueur_courant % 2) + 1;
    };

    this.convert_position = function (position) {
        return { positionX: position % 5, positionY: parseInt(position / 5) };
    };

    this.jouer = function (position) {
        var coup = this.convert_position(position);
        plateau[coup.positionX][coup.positionY].ajouterPion(joueur_courant);
        nb_pions_total++;
        if (joueur_courant == 1) {
            nb_pions_joueur1--;
        } else {
            nb_pions_joueur2--;
        }
        this.switch_joueur();
    };
};
