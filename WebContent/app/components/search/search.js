angular.module('auction_land').controller('SearchController',['$scope','$route','localStorageService','$location','Item','SearchService',
	                                   function($scope,$route,localStorageService,$location,Item,SearchService) {
		$scope.search = function(term) {
			Item.query({term : term}).$promise.then(function (data) {
				localStorageService.remove('auctions');
				$scope.items = data.slice();
				SearchService.add_items($scope.items);
				console.log($scope.items);
				localStorageService.set('auctions',$scope.items);
				$route.reload();
				$location.path("/search");
			});	
		};
		
		$scope.print = function() {
			console.log("search_controller");
		};
	}]);
		