(function(){

  function Firebase($firebaseArray){

    var Firebase ={};
    var toDosReference = firebase.database().ref().child("To-Dos");

    Firebase.allToDosSortedByPriority = $firebaseArray(toDosReference.orderByChild("priority"));

    Firebase.addToDo = function(toDoText, priority){
      var date = Date.now();
      var toDoAddedPromise = Firebase.allToDosSortedByPriority.$add({
        priority: priority,
        state: "active",
        text: toDoText,
        timeAdded: date
      });
      return toDoAddedPromise
    }

    Firebase.markCompleted = function(toDo){
      var allToDos = this.allToDosSortedByPriority;
      var index = allToDos.$indexFor(toDo.$id);
      allToDos[index].state = 'completed';
      allToDos.$save(index);
    }

    return Firebase
  }

  angular
    .module('do-bettr')
    .factory('Firebase', ['$firebaseArray', Firebase])

})();
