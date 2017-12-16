(function(){

  function Firebase($interval, $firebaseArray){
    var Firebase ={};
    var toDosReference = firebase.database().ref().child("To-Dos");
    Firebase.toDos = $firebaseArray(toDosReference);

    Firebase.expirationCheck = function(toDo){
      if(toDo.state == "active"){
        return true
      }else{
        return false
      }
    }

    Firebase.submitToDo = function(toDoText, priorityText){
      if(toDoText, priorityText){
        var timer = 0;
        var secondsInOneDay = 86400;
        var secondsToExpiration = 7 * secondsInOneDay;
        var date = Date.now();
        var parent = this;
        var toDos = $firebaseArray(toDosReference);

        toDos.$add({
          priority: priorityText,
          state: "active",
          text: toDoText,
          timeAdded: date
	      }).then(function(lastToDoAddedReference){
          parent.toDoText = "";
          parent.priorityText = "";
          var test = $interval(checkExpirationTimer, 1000);
          function checkExpirationTimer(){
            timer++;
            if (timer > secondsToExpiration){
              var lastToDoAdded = $firebaseArray(lastToDoAddedReference);
              lastToDoAdded.$loaded().then(function(){
                lastToDoAdded[1].$value = "expired";
                lastToDoAdded.$save(1);
              });
              $interval.cancel(test);
            }
          }
        });

      }
    }

    return Firebase
  }

  angular
    .module('blocitoff')
    .factory('Firebase', ['$interval', '$firebaseArray', Firebase])

})();
