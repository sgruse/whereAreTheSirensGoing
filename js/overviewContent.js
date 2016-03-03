(function(module){

  overviewContent = {};

  overviewContent.index = function(){
    maps.buildMap(null, {zoom: 10});
    console.log('overviewContent.index was called');
  };
  
  overviewContent.attachReadOnListenerAndHide = function(){
    $('#overview-handlebars-here li:nth-of-type(n+6)').hide();
    $('#overviewReadOn').on('click', function(e){
      event.preventDefault();
      overviewContent.readOn();
    });  
  };

  overviewContent.readOn = function() {
    $('#overview-handlebars-here li:nth-of-type(n+6)').show();
    $('#overviewReadOn').hide();
  };

  module.overviewContent = overviewContent;
})(window);
