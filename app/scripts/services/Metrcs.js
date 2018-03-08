(function(){

  function Metrcs(){

    Metrcs.report = function(eventName){
      var event = {event:{name: eventName}};
      var request = new XMLHttpRequest();
      request.open("POST", "https://metrcs.herokuapp.com/api/events", true);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(event));
    }

    return Metrcs
  }

  angular
    .module('do-bettr')
    .factory('Metrcs', [Metrcs])

})();
