(function() {

  function HomeCtrl(Firebase){
    this.FirebaseData = Firebase;
    this.submitToDo = Firebase.submitToDo
  }

  angular
    .module('blocitoff')
    .controller('HomeCtrl', ['Firebase', HomeCtrl]);
})();
