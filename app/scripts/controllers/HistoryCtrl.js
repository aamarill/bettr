(function() {

  function HistoryCtrl(Firebase){

    this.allToDosSortedByPriority = Firebase.allToDosSortedByPriority;

    this.checkToDoState = function(toDo){
      return toDo.state == 'expired' || toDo.state == 'completed'
    }

  }

  angular
    .module('blocitoff')
    .controller('HistoryCtrl', ['Firebase', HistoryCtrl]);
})();
