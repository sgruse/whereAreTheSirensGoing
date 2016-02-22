(function(module) {
  function Incident(opts) {
    Object.keys(opts).forEach(function(e, index, keys){
      this[e] = opts[e];
    }, this);
  }

  Incident.all = [];

  Incident.loadAll = function(rows) {
    Incident.all = rows.map(function(ele) {
      return new Incident(ele);
    });
  };

  Incident.fetchAll = function(callback) {
    //call to ajax fetch goes here. building skeleton function in the meantime
    if (rows.length) {
      Incident.loadAll(rows);
      callback();
    } else {
      //inserting skeleton json call in the meantime
      $.getJSON('source goes here', function(rawData) {
        rawData.forEach(function(item){
          var incident = new Incident(item);
        });
        Incident.loadAll(rows)
        callback();
      });
    };
  };
  
  module.Incident = Incident;
})(window);
