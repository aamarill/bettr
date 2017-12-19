(function() {

  function IndexCtrl(Styling){
    this.setLinkColor = Styling.setLinkColor;
  }

  angular
    .module('blocitoff')
    .controller('IndexCtrl', ['Styling', IndexCtrl]);
})();
