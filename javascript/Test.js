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
    var e  = new Engine();
    e.init_plateau();
    e.jouer(2);
    assertEquals(e.get_nb_pions_joueur(1), 24);
    assertEquals(e.get_joueur_courant(), 2);
    assertEquals(e.get_pile(2).getCouleurDernierPion(), 1);

};



projectEngineTestCase.prototype.test_jouer_colonne = function () {
    var e  = new Engine();
    e.init_plateau();
    e.jouer(2);
    e.jouer(3);
    e.move(3, 2, 1);
    assertEquals(e.get_pile(2).getCouleurDernierPion(), 2);
    assertEquals(e.get_pile(2).get_nb_pion(), 2);

    e.jouer(11);
    e.jouer(16);
    e.move(16, 11, 1);
    assertEquals(e.get_pile(11).getCouleurDernierPion(), 2);
    assertEquals(e.get_pile(11).get_nb_pion(), 2);

    e.jouer(11);
    e.jouer(16);
    e.move(18, 12, 1);
    assertEquals(e.get_pile(12).getCouleurDernierPion(), 2);
    assertEquals(e.get_pile(12).get_nb_pion(), 2);

};
