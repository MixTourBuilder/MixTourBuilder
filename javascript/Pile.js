/***
 *  Created by MixTourBuilder.
 * ***/

var Pile = function () {

    /* La classe Pile est une classe qui crée une pile de pion. */


    "use strict";
    var pile = new Array(10), nbPion = 0, ligne; // Nombre des pions.& Liste des pions

    for (ligne = 0; ligne < 10; ligne = ligne + 1) {
        pile[ligne] = -1; // On initialise la pile
    }

    /* Nombre de pions. */
    this.get_nb_pion = function () {
        return nbPion;
    };

    /* Pion d'indice "indice" */
    this.getPion = function (indice) {
        return pile[indice];
    };

    /* Retourne le tableau de la pile.*/
    this.get_pile_total = function () {
        return pile;
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

    /* Ajoute une pile à une pile*/
    this.ajouterPile = function (pile_depart, nombre) {
        var i;
        for (i = 0; i < pile_depart.get_nb_pion(); i++){
            pile[nbPion + i] = pile_depart.getPion(i);
        }
        nbPion = nbPion + pile_depart.get_nb_pion();
    };

    this.supprimerPion = function () {
        pile[nbPion - 1] = -1;
        nbPion = nbPion - 1;
    };

    this.supprimerPile = function (nombre) {
        var i;
        for (i = this.get_nb_pion() - 1; i >= 0; i--) {
            pile[i] = -1;
        }
        nbPion = this.get_nb_pion() - nombre;
    };

};