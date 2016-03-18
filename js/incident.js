(function(module) {
  function Incident(opts) {
    Object.keys(opts).forEach(function(e, index, keys){
      this[e] = opts[e];
    }, this);
    
    if(mapHolderController.currentTimeFilter === 'today'){
      var currentTime = new Date();
      var thatTime = new Date(this.event_clearance_date);
      var deltaT = currentTime.getHours() - thatTime.getUTCHours();
      if(deltaT){
        this.event_clearance_date = deltaT + ' hours ago.';
      } else {
        deltaT = currentTime.getMinutes() - thatTime.getUTCMinutes();
        this.event_clearance_date = deltaT + ' minutes ago.';
      }
    } else {
      this.event_clearance_date = this.event_clearance_date.replace('T', ' ').slice(0, -7);
    }
    
  }

  Incident.all = [];

  Incident.loadAll = function(rows) {
    console.log('Incident.loadAll called');
    Incident.all = rows.map(function(ele) {
      return new Incident(ele);
    });
    console.log('Incident.all is ', Incident.all);
  };

  //obsolete?
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
        Incident.loadAll(rows);
        callback();
      });
    };
  };

  module.Incident = Incident;
})(window);
