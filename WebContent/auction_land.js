
(function() {
var app = angular.module('auction_land',['ngResource']);

app.factory('User',['$resource',function($resource){
	return $resource('http://localhost:8080/webauctions/services/users');
}]);

app.controller('UserController',['$scope','User',
    function($scope,User){
		$scope.submit_function = function() {
			/*User.save($scope.user);*/
			console.log("key pressed");
		}
	}]);

app.controller('TestController',function($scope,$window) {
	$scope.test_function = function() {
		$window.alert("test");
	};
});

})();
