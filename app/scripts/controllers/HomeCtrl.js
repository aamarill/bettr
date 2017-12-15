(function() {

  function HomeCtrl($interval, Firebase){
    this.toDos = Firebase.toDos;
    this.submitToDo = Firebase.submitToDo;
    this.expirationCheck = Firebase.expirationCheck;
  }

  angular
    .module('blocitoff')
    .controller('HomeCtrl', ['$interval','Firebase', HomeCtrl]);
})();
