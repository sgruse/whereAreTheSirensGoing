page('/', indexController.loadAll, indexController.index);
// page('/results', resultsController.loadAll, resultsController.index);
page('/results', resultsController.loadIndexPage);
// page('/results/:date', resultsController.loadByDate, resultsController.loadByLatLon resultsController.index);
page('/results/:parameters', resultsController.detectParameters, dataFetcher.fetchData, resultsController.index);
page('/overview', overviewController.loadAll, overviewController.index);

page();
