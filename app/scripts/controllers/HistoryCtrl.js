(function() {

  function HistoryCtrl(Firebase){

    this.allToDosSortedByPriority = Firebase.allToDosSortedByPriority;

    this.checkToDoState = function(toDo){
      return toDo.state == 'expired' || toDo.state == 'completed'
    }

  }

  angular
    .module('do-bettr')
    .controller('HistoryCtrl', ['Firebase', HistoryCtrl]);
})();
