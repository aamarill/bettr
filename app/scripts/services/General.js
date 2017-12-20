(function(){

  function General(){
    var General = {};

    General.checkObjectKey = function(object, key, value){
      return object[key] == value
    }

    return General
  }

  angular
    .module('blocitoff')
    .factory('General',[General])
})();
