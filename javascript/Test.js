var projectEngineTestCase = TestCase("projectEngineTestCase");

projectEngineTestCase.prototype.testInitPlateau = function () {
    var e = new Engine();
    e.init_plateau();
    assertEquals(e.get_nb_pions_plateau(), 0);
};

projectEngineTestCase.prototype.testInitJoueur = function () {
    var e = new Engine();
    e.init_plateau();
    assertEquals(e.get_nb_pions_joueur(1), 25);
    assertEquals(e.get_nb_pions_joueur(2), 25);
    assertEquals(e.get_score_joueur(1), 0);
    assertEquals(e.get_score_joueur(2), 0);
    assertEquals(e.get_joueur_courant(), 1);
    e.switch_joueur();
    assertEquals(e.get_joueur_courant(), 2);
};

projectEngineTestCase.prototype.test_jouer_pion = function () {
    var e = new Engine();
    e.init_plateau();
    e.jouer(2);
    assertEquals(e.get_nb_pions_joueur(1), 24);
    assertEquals(e.get_joueur_courant(), 2);
    assertEquals(e.get_pile(2).get_couleur_dernier_pion(), 1);

};


projectEngineTestCase.prototype.test_jouer_colonne = function () {
    var e = new Engine();
    e.init_plateau();
    e.jouer(2);
    e.jouer(3);
    e.deplacer(3, 2, 1);
    assertEquals(e.get_pile(2).get_couleur_dernier_pion(), 2);
    assertEquals(e.get_pile(2).get_nb_pion(), 2);
    assertEquals(e.get_pile(3).get_nb_pion(), 0);

    e.jouer(11);
    e.jouer(16);
    e.deplacer(16, 11, 1);
    assertEquals(e.get_pile(11).get_couleur_dernier_pion(), 2);
    assertEquals(e.get_pile(11).get_nb_pion(), 2);
    assertEquals(e.get_pile(16).get_nb_pion(), 0);

    e.jouer(12);
    e.jouer(18);
    e.deplacer(18, 12, 1);
    assertEquals(e.get_pile(12).get_couleur_dernier_pion(), 2);
    assertEquals(e.get_pile(12).get_nb_pion(), 2);
    assertEquals(e.get_pile(18).get_nb_pion(), 0);

};


projectEngineTestCase.prototype.test_jouer_colonne2 = function () {
    var e = new Engine();
    e.init_plateau();
    e.jouer(2);
    e.jouer(3);
    e.deplacer(3, 2, 1);
    assertEquals(e.get_pile(2).get_couleur_dernier_pion(), 2);
    assertEquals(e.get_pile(2).get_nb_pion(), 2);
    assertEquals(e.get_pile(3).get_nb_pion(), 0);
    e.jouer(3);
    e.deplacer(3, 2, 1);
    assertEquals(e.get_pile(2).get_couleur_dernier_pion(), 1);
    assertEquals(e.get_pile(2).get_nb_pion(), 3);
    assertEquals(e.get_pile(3).get_nb_pion(), 0);
    e.jouer(3);
    e.deplacer(3, 2, 1);
    assertEquals(e.get_pile(2).get_couleur_dernier_pion(), 2);
    assertEquals(e.get_pile(2).get_nb_pion(), 4);
    assertEquals(e.get_pile(3).get_nb_pion(), 0);
    e.jouer(3);
    e.deplacer(2, 3, 3);
    assertEquals(e.get_pile(3).get_couleur_dernier_pion(), 2);
    assertEquals(e.get_pile(3).get_nb_pion(), 4);
    assertEquals(e.get_pile(2).get_nb_pion(), 1);

};

projectEngineTestCase.prototype.test_verif_pile = function () {
    var e = new Engine(), convert = e.convert_position(2);
    e.init_plateau();
    e.jouer(2);//1
    e.jouer(3);//2
    e.deplacer(3, 2, 1);
    e.jouer(3);//3
    e.deplacer(3, 2, 1);
    e.jouer(3);//4
    e.deplacer(3, 2, 1);
    e.jouer(3);//5
    e.deplacer(3, 2, 1);
    assertEquals(e.verifier_Pile(e.get_tableau()[convert.positionY][convert.positionX]), 1);

};

projectEngineTestCase.prototype.test_verif_gagner = function () {
    var e = new Engine(), convert = e.convert_position(2);
    e.init_plateau();
    e.jouer(2);//1
    e.jouer(3);//2
    e.deplacer(3, 2, 1);
    e.jouer(3);//1
    e.deplacer(3, 2, 1);
    e.jouer(3);//2
    e.deplacer(3, 2, 1);
    e.jouer(3);//1
    e.deplacer(3, 2, 1);

    e.jouer(4);//2
    e.jouer(5);//1
    e.jouer(6);//2
    e.deplacer(6, 5, 1);
    e.jouer(6);//1
    e.deplacer(6, 5, 1);
    e.jouer(6);//2
    e.deplacer(6, 5, 1);
    e.jouer(6);//1
    e.deplacer(6, 5, 1);

    e.jouer(16);//2
    e.jouer(7);//1
    e.jouer(8);//2
    e.deplacer(8, 7, 1);
    e.jouer(8);//1
    e.deplacer(8, 7, 1);
    e.jouer(8);//2
    e.deplacer(8, 7, 1);
    e.jouer(8);//1
    e.deplacer(8, 7, 1);

    e.jouer(9);//2
    e.jouer(10);//1
    e.jouer(11);//2
    e.deplacer(11, 10, 1);
    e.jouer(11);//1
    e.deplacer(11, 10, 1);
    e.jouer(11);//1
    e.deplacer(11, 10, 1);
    e.jouer(11);//1
    e.deplacer(11, 10, 1);

    e.jouer(17);//2
    e.jouer(12);//1
    e.jouer(13);//2
    e.deplacer(13, 12, 1);
    e.jouer(13);//1
    e.deplacer(13, 12, 1);
    e.jouer(13);//2
    e.deplacer(13, 12, 1);
    e.jouer(13);//1
    e.deplacer(13, 12, 1);

    assertEquals(e.verifier_Gagner(), 1);

};

projectEngineTestCase.prototype.test_liste_coup_possible = function () {
    var e = new Engine();
    e.init_plateau();

    e.jouer(8);//2
    e.jouer(9);//1
    e.deplacer(9, 8, 1);


    e.jouer(12);//2
    e.jouer(13);//1
    e.deplacer(13, 12, 1);
    e.jouer(13);//1
    e.deplacer(13, 12, 1);

    e.jouer(18);//1


    e.afficher();
    /*e.liste_coup_possible();
     console.log(e.get_liste_coup().length);
     console.log(e.get_liste_coup());

     console.log(e.get_liste_mouvement().length);
     console.log(e.get_liste_mouvement());*/
    e.jouer_ia();
    e.afficher();

};