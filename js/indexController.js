(function(module) {
  var indexController = {};

  indexController.index = function(ctx, next) {
    indexContent.index(ctx.incidents);
  };



  indexController.loadAll = function(ctx, next) {
    var incidentData = function(allIncidents) {
      ctx.incidents = Incident.all;
      next();
    };

    if (Incident.all.length) {
      ctx.incidents = Incident.all;
      next();
    } else {
      Incident.fetchAll(articleData);
    }
  };

  module.indexController = indexController;
})(window);
