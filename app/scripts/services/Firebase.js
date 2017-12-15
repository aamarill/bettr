(function(){

  function Firebase($firebaseArray){
    var Firebase ={};
    var ref = firebase.database().ref().child("To-Dos");

    Firebase.toDos = $firebaseArray(ref);

    Firebase.submitToDo = function(toDoText){
      if(toDoText){
        $firebaseArray(ref).$add({
					text: toDoText
				});
        this.toDoText = "";
      }
    }

    return Firebase
  }

  angular
    .module('blocitoff')
    .factory('Firebase', ['$firebaseArray', Firebase])

})();
