page('/', indexController.loadAll, indexController.index);
page('/results', resultsController.loadAll, resultsController.index);
page('/results/:date', resultsController.loadByDate, resultsController.index);
page('/results/:incident', resultsController.loadByIncident, resultsController.index);
page('/overview', overviewController.loadAll, overviewController.index);

page();
