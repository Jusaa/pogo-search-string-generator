(function(angular) {
  'use strict';
angular.module('ngRepeat', ['ngAnimate']).controller('pokemonController', function($scope) {
  var pokemons = [
    {id:1, name: "test"},
    {id:2, name: "test2"},
    {id:3, name: "test3"}
  ];
  $scope.removeFirst = function() {
    $scope.pokemons.shift();
  };

  $scope.copy = function() {
    $scope.pokemons = angular.copy($scope.pokemons);
  };

  $scope.reset = function() {
    $scope.pokemons = angular.copy(pokemons);
  };

  $scope.reset();
});
})(window.angular);
