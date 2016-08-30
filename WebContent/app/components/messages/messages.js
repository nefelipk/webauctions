
angular.module('auction_land').controller('MessagesController',['$scope',function($scope) {
	$scope.pages = [1,2];		
	$scope.current_page = 1;
	$scope.selected = false;
}]);