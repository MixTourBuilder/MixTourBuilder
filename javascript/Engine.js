var Engine = function () {

    //Variables :
    var plateau = new Array(5);
    var ligne;
    for (ligne = 0; ligne < 5; ligne++) {
        plateau[ligne] = new Array(5);
    }

    var nombre_pions_total = 0;

    // Initialise le plateau
    this.init_plateau = function () {
        var ligne, colonne;
        for (ligne=0; ligne<plateau.length; ligne++){
            for (colonne=0; colonne<plateau.length; colonne++){
                plateau[ligne][colonne] = new pile();
            }
        }
    };

    // Le nombre de pion total
    this.get_nb_piece_plateau = function () {
        return nombre_pions_total;
    };

};