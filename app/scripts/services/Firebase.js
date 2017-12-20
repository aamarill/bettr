(function(){

  function Firebase($interval, $firebaseArray){
    var SECONDS_TO_EXPIRATION = 604800;
    var expirationIntervalPromise;
    var Firebase ={};
    var toDosReference = firebase.database().ref().child("To-Dos");

    Firebase.allToDosSortedByPriority = $firebaseArray(toDosReference.orderByChild("priority"));

    Firebase.submitToDoAndTrackExpiration = function(toDoText, priority){
      var date = Date.now();

      Firebase.allToDosSortedByPriority.$add({
        priority: priority,
        state: "active",
        text: toDoText,
        timeAdded: date
      }).then(function(lastToDoAddedReference){
        expirationIntervalPromise = $interval(checkExpiration, 1000, SECONDS_TO_EXPIRATION, true, lastToDoAddedReference);
      });
    }

    Firebase.markCompleted = function(toDo){
      var allToDos = Firebase.allToDosSortedByPriority;
      var index = allToDos.$indexFor(toDo.$id);
      allToDos[index].state = 'completed';
      allToDos.$save(index);
    }

    function checkExpiration(firebaseReference){
      expirationIntervalPromise.then(function(){
        var expiredToDo = $firebaseArray(firebaseReference);
        expiredToDo.$loaded().then(function(){
          expiredToDo[1].$value = "expired";
          expiredToDo.$save(1);
        });
      });
    }

    return Firebase
  }

  angular
    .module('blocitoff')
    .factory('Firebase', ['$interval', '$firebaseArray', Firebase])

})();
