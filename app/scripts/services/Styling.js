(function(){

  function Styling(){
    var Styling = {};

    Styling.setLinkColor = function(homeColor, historyColor){
      this.homeColor = {color: homeColor};
      this.historyColor = {color: historyColor};
    }

    return Styling
  }

  angular
    .module('blocitoff')
    .factory('Styling',[Styling])
})();
