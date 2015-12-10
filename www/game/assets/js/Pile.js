/***
 *  Created by MixTourBuilder.
 * ***/

var Pile = function () {

    /* La classe Pile est une classe qui crée une pile de pion. */

    "use strict";
    var pile = new Array(10), nb_pion = 0, ligne; // Nombre des pions.& Liste des pions

    for (ligne = 0; ligne < 10; ligne = ligne + 1) {
        pile[ligne] = -1; // On initialise la pile
    }

    /* Nombre de pions. */
    this.get_nb_pion = function () {
        return nb_pion;
    };

    /* Pion d'indice "indice" */
    this.get_pion = function (indice) {
        return pile[indice];
    };

    /* La couleur du dernier pion */
    this.get_couleur_dernier_pion = function () {
        return pile[nb_pion - 1];
    };

    /* Ajoute un pion si la case est vide*/
    this.ajouter_pion = function (color) {
        if (pile[0] === -1) {
            pile[nb_pion] = color;
            nb_pion = nb_pion + 1;
            return true;
        }
        return false;
    };


    /* Ajoute une pile à une pile*/
    this.ajouter_pile = function (pile_depart, nombre) {
        var i, taille = pile_depart.get_nb_pion() - nombre;
        for (i = 0; i < nombre; i++) {
            pile[nb_pion + i] = pile_depart.get_pion(taille + i);
        }
        nb_pion = nb_pion + nombre;
    };

    this.supprimer_pile = function (nombre) {
        var i;
        for (i = 0; i < nombre; i++) {
            pile[this.get_nb_pion() - i - 1] = -1;
        }
        nb_pion = this.get_nb_pion() - nombre;
    };

    this.supprimer_pion = function () {
        var i;
        for (i = 0; i < 10; i++) {
            pile[i] = -1;
        }
        nb_pion = 0;
    };

    this.copie = function (pile2) {
        var i;
        for (i = 0; i < 10; i++) {
            pile[i] = pile2.get_pion(i);
            nb_pion = pile2.get_nb_pion();
        }
    };

    this.egal = function (pile2) {
        var i;
        for (i = 0; i < 10; i++) {
            if (this.get_pion(i) !== pile2.get_pion(i)) {
                return false;
            }
        }
        return true;
    };

};