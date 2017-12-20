(function() {

  function HomeCtrl($interval, Firebase, General){
    this.allToDosSortedByPriority = Firebase.allToDosSortedByPriority;
    this.checkObjectKey = General.checkObjectKey;
    this.markCompleted = Firebase.markCompleted;

    this.submitToDoAndTrackExpiration = function(toDoText, priority){
      if(toDoText && priority){
        Firebase.submitToDoAndTrackExpiration(toDoText, priority);
        this.toDoText = "";
        this.priority = "";
      } else{
        alert("Make sure you have entered a To-Do and selected a priority");
      }
    }

  }

  angular
    .module('blocitoff')
    .controller('HomeCtrl', ['$interval', 'Firebase', 'General', HomeCtrl]);
})();
