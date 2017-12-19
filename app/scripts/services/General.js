(function(){

  function General(){
    var General = {};

    General.getAllByKeyValuePair =  function (inputArray, key, value){
      var outputArray = [];
      for(i=0; i < inputArray.length; ++i){
        if(inputArray[i][key] == value){
          outputArray.push(inputArray[i]);
        }
      }
      return outputArray
    }

    General.checkObjectKey = function(object, key, value){
      return object[key] == value
    }


    return General
  }


  angular
    .module('blocitoff')
    .factory('General',[General])
})();
