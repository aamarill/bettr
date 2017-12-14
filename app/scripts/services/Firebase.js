(function(){

  function Firebase($firebaseArray){
    var Firebase ={};
    var ref = firebase.database().ref().child("To-Dos");
    toDos = $firebaseArray(ref);
    Firebase.toDos = toDos;
    Firebase.submitToDo = function(toDoText){
      $firebaseArray(ref).$add({
					text: toDoText
				});
    }
    return Firebase
  }

  angular
    .module('blocitoff')
    .factory('Firebase', ['$firebaseArray',Firebase])

})();
