
angular.module('auction_land').controller('NoResutlsCtrl',['$scope','$routeParams',function($scope,$routeParams){
	$scope.term = $routeParams.term;
}]);