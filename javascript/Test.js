var projectEngineTestCase = TestCase("projectEngineTestCase");

projectEngineTestCase.prototype.testInitPlateau = function () {
    var e = new Engine();
    e.init_plateau();
    assertTrue(e.get_nb_piece_plateau == 0);
};

projectEngineTestCase.prototype.testInitJoueur = function () {
    var e = new Engine();
    e.initBoard();
    assertEquals(e.get_pion_joueur(0), 25);
    assertEquals(e.get_pion_joueur(1), 25);
    assertEquals(e.get_score_joueur(0), 0);
    assertEquals(e.get_score_joueur(1), 0);
    assertEquals(e.get_joueur_courant(), 0);
    e.switch_joueur();
    assertEquals(e.get_joueur_courant(), 1);
};

