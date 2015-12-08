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


