(function() {

  function HistoryCtrl($interval, Firebase){
    this.toDos = Firebase.toDos;
    this.expirationCheck = Firebase.expirationCheck;

  }

  angular
    .module('blocitoff')
    .controller('HistoryCtrl', ['$interval','Firebase', HistoryCtrl]);
})();
