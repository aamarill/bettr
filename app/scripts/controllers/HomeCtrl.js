(function() {

  function HomeCtrl(Firebase){
    this.toDos = Firebase.toDos;
    this.submitToDo = Firebase.submitToDo;
  }

  angular
    .module('blocitoff')
    .controller('HomeCtrl', ['Firebase', HomeCtrl]);
})();
