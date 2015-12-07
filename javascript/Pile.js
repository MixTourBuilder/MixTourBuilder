/***
 *  Created by MixTourBuilder.
 * ***/

var Pile = function () {

    /* La classe Pile est une classe qui crée une pile de pion. */



    var pile = new Array(5); // Liste des pions
    var nbPion = 0; // Nombre des pions.

    var ligne;
    for (ligne = 0; ligne<5; ligne++) {
        pile[ligne] = -1; // On initialise la pile
    }

    /* Nombre de pions. */
    this.getNbPion = function () {
        return nbPion;
    };

    /* Pion d'indice "indice" */
    this.getPion = function (indice) {
        return pile[indice];
    };

    /* La couleur du dernier pion */
    this.getCouleurDernierPion = function () {
        return pile[nbPion-1];
    };

    /* Ajoute un pion si la case est vide*/
    this.ajouterPion = function (color) {
        if (pile[0] == -1) {
            pile[nbPion] = color;
            nbPion = nbPion + 1;
            return true;
        } else {
            return false;
        }
    };

    /* Ajoute un pion à une pile*/
    this.ajouterPile = function (color) {
        pile[nbPion] = color;
        nbPion = nbPion + 1;
    };

    this.supprimerPion = function () {
        pile[nbPion-1] = -1;
        nbPion = nbPion - 1;
    };

    this.supprimerPile = function () {
        var pile;
        for(pile = 0;pile<pile.length;pile++){
            pile[pile] = -1;
        }
        nbPion = 0;
    };

};