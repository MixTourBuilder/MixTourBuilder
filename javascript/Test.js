var projectEngineTestCase = TestCase("projectEngineTestCase");

projectEngineTestCase.prototype.testInitPlateau = function () {
    var e = new Engine();
    e.initBoard();
    assertTrue(e.getNbPiece == 0);
};
