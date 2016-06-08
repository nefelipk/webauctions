/**
 * 
 */

(function() {
var app = angular.module('auction_land',[]);

app.controller('SignUpController',function($scope,$modalInstance){
	$scope.submit_function = function() {
		$modalInstance.close();
	}
});

app.controller('TestController',function($scope,$window) {
	$scope.test_function = function() {
		$window.alert("test");
	}
});

})();
