(function() {

  function HistoryCtrl(Firebase, General){
    this.allToDosSortedByPriority = Firebase.allToDosSortedByPriority;
    this.checkObjectKey = General.checkObjectKey;
  }

  angular
    .module('blocitoff')
    .controller('HistoryCtrl', ['Firebase', 'General', HistoryCtrl]);
})();
