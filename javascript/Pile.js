/***
 *  Created by MixTourBuilder.
 * ***/

var Pile = function () {

    /* La classe Pile est une classe qui crée une pile de pion. */


    "use strict";
    var pile = new Array(5), nbPion = 0, ligne; // Nombre des pions.& Liste des pions

    for (ligne = 0; ligne < 5; ligne = ligne + 1) {
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
        return pile[nbPion - 1];
    };

    /* Ajoute un pion si la case est vide*/
    this.ajouterPion = function (color) {
        if (pile[0] === -1) {
            pile[nbPion] = color;
            nbPion = nbPion + 1;
            return true;
        }
        return false;

    };

    /* Ajoute un pion à une pile*/
    this.ajouterPile = function (color) {
        pile[nbPion] = color;
        nbPion = nbPion + 1;
    };

    this.supprimerPion = function () {
        pile[nbPion - 1] = -1;
        nbPion = nbPion - 1;
    };

    this.supprimerPile = function () {
        //var pile;
        for (pile = 0; pile < pile.length; pile = pile + 1) {
            pile[pile] = -1;
        }
        nbPion = 0;
    };

};