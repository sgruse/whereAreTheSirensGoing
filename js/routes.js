page('/', indexController.index);
page.exit('/', indexController.onExit);
page('/results', resultsController.loadIndexPage);
page('/results/:parameters', resultsController.detectParameters, resultsController.index, resultsController.fetchInitialData); //resultsController.afterAjaxCall
page('/overview', overviewController.index, overviewController.fetchInitialData); //overviewController.afterAjaxCall

page();
