(function(module) {
  indexController = {};

  $('#addressSubmit').on('click', function(e) {
    e.preventDefault();
    search.processSearchBarInput();
  });

  module.indexController = indexController;
})(window);
