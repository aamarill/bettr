(function(){

  function Firebase($interval, $firebaseArray){
    var Firebase ={};
    var toDosReference = firebase.database().ref().child("To-Dos");

    Firebase.toDos = $firebaseArray(toDosReference.orderByChild("priority"));

    Firebase.expirationCheck = function(toDo){
      if(toDo.state == "active"){
        return true
      }else{
        return false
      }
    }

    Firebase.submitToDo = function(toDoText, priority){
      if(toDoText && priority){
        var timer = 0;
        var SECONDS_TO_EXPIRATION = 604800;
        var date = Date.now();
        var parent = this;
        var toDos = $firebaseArray(toDosReference);

        toDos.$add({
          priority: priority,
          state: "active",
          text: toDoText,
          timeAdded: date
	      }).then(function(lastToDoAddedReference){
          parent.toDoText = "";
          parent.priority = "";
          var test = $interval(checkExpirationTimer, 1000);
          function checkExpirationTimer(){
            timer++;
            if (timer > SECONDS_TO_EXPIRATION){
              var lastToDoAdded = $firebaseArray(lastToDoAddedReference);
              lastToDoAdded.$loaded().then(function(){
                lastToDoAdded[1].$value = "expired";
                lastToDoAdded.$save(1);
              });
              $interval.cancel(test);
            }
          }
        });
      } else {
        alert("Make sure you have entered a To-Do and selected a priority");
      }
    }

    return Firebase
  }

  angular
    .module('blocitoff')
    .factory('Firebase', ['$interval', '$firebaseArray', Firebase])

})();
