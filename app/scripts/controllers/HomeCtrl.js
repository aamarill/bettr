(function() {

  function HomeCtrl(Firebase, $firebaseArray, Metrcs){

    var SECONDS_TO_EXPIRATION = 604800;
    var allTimeoutIds = {};

    this.markCompleted = Firebase.markCompleted;

    this.allToDosSortedByPriority = Firebase.allToDosSortedByPriority;

    this.addToDo = function(toDoText, priority){
      if(toDoText && priority){
        Firebase.addToDo(toDoText, priority);
        this.toDoText = "";
        this.priority = "";
        Metrcs.report('To-Do Added');
      } else{
        alert("Make sure you have entered a To-Do and selected a priority");
      }
    }

    this.checkToDoState = function(toDo){
      if (toDo.state == 'active'){
        this.setupToDoExpirationTracking(toDo);
        return true
      }else{
        return false
      }
    }

    this.setupToDoExpirationTracking = function(toDo){
      if(!allTimeoutIds[toDo.$id]){
        var timeToExpiration = this.calculateTimeToExpiration(toDo)
        var timeoutId = setTimeout(this.expireToDo, timeToExpiration, toDo);
        allTimeoutIds[toDo.$id] = timeoutId;
      }
    }

    this.calculateTimeToExpiration = function(toDo){
      var currentDate = Date.now();
      var toDoAgeInSeconds = (currentDate - toDo.timeAdded)/1000;
      return (SECONDS_TO_EXPIRATION - toDoAgeInSeconds)*1000
    }

    this.expireToDo = function(toDo){
      var allToDos = Firebase.allToDosSortedByPriority;
      allToDos.$loaded(
        function(allToDos){
          var index = allToDos.$indexFor(toDo.$id);
          allToDos[index].state = 'expired';
          allToDos.$save(index);
          delete allTimeoutIds[toDo.$id];
        }
      );
    }

  }

  angular
    .module('do-bettr')
    .controller('HomeCtrl', ['Firebase', '$firebaseArray', 'Metrcs', HomeCtrl]);
})();
